import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

// --- Interfaces (Keep existing interfaces: BonusRule, DisplaySettings, etc.) ---
export interface BonusRule {
  from: number;
  to: number;
  amount: number;
}

export interface DisplaySettings {
  ephemeral_responses: boolean;
  show_average: boolean;
  agency_name: string;
  show_ids: boolean;
  bot_name: string;
}

export interface CommissionRoleSetting {
  commission_percentage: number;
}

export interface CommissionUserSetting {
  hourly_rate?: number;
  override_role?: boolean;
}

export interface CommissionSettings {
  // Using Map for easier manipulation in Angular if needed, 
  // but backend expects plain object keys
  roles: { [roleId: string]: CommissionRoleSetting }; 
  users: { [userId: string]: CommissionUserSetting }; 
}

export interface GuildConfig {
  _id?: string; // Optional from backend perspective for creation
  guild_id: string;
  models: string[];
  shifts: string[];
  periods: string[];
  bonus_rules: BonusRule[];
  display_settings: DisplaySettings;
  commission_settings: CommissionSettings;
  roles?: { [roleId: string]: number }; // From DB example
}
// --- End Interfaces ---

@Injectable({
  providedIn: 'root'
})
export class GuildConfigService {

  private apiUrl = '/api/config'; // Base path for config endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Note: The AuthInterceptor should handle adding the headers automatically.
  // We don't strictly need getAuthHeaders() here anymore, but keep it if you have requests outside interceptor scope.

  /**
   * GET /api/config/:guild_id
   * Get config for a specific guild.
   */
  getGuildConfig(guildId: string): Observable<GuildConfig> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID is required'));
    }
    return this.http.get<GuildConfig>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST /api/config/:guild_id
   * Create or fully update a guild config.
   * Assumes the backend endpoint handles both creation (upsert) and complete replacement.
   */
  createOrUpdateGuildConfig(guildId: string, config: GuildConfig): Observable<GuildConfig> {
    if (!guildId) {
       return throwError(() => new Error('Guild ID is required'));
    }
    // Ensure guild_id in the body matches the path param if necessary backend logic depends on it
    config.guild_id = guildId; 
    return this.http.post<GuildConfig>(`${this.apiUrl}/${guildId}`, config).pipe(
       catchError(this.handleError)
    );
  }

  /**
   * DELETE /api/config/:guild_id
   * Delete config for a specific guild (Admin only).
   */
  deleteGuildConfig(guildId: string): Observable<{ msg: string }> { // Expecting { msg: '...' } response
    if (!guildId) {
       return throwError(() => new Error('Guild ID is required'));
    }
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/config/:guild_id/:field
   * Get a specific field from a guild's config.
   */
  getGuildConfigField<T>(guildId: string, field: keyof GuildConfig): Observable<T> {
    if (!guildId || !field) {
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    return this.http.get<{ [key: string]: T }>(`${this.apiUrl}/${guildId}/${field}`).pipe(
      map(response => response[field]), // Extract the value from the { field: value } object
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/config/:guild_id/:field
   * Update a specific field in a guild's config.
   */
  updateGuildConfigField(guildId: string, field: keyof GuildConfig, value: any): Observable<GuildConfig> {
    if (!guildId || !field) {
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    // Backend expects { "value": ... } in the body
    const payload = { value };
    return this.http.put<GuildConfig>(`${this.apiUrl}/${guildId}/${field}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  // --- Error Handling --- 
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.msg || error.message}`;
    }
    console.error('GuildConfigService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage)); 
  }
}
