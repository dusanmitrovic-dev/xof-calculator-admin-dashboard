import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// --- Interfaces matching DB structure ---
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
  hourly_rate?: number; // Optional
  override_role?: boolean; // Optional
}

export interface CommissionSettings {
  roles: { [roleId: string]: CommissionRoleSetting }; // Role ID -> Settings
  users: { [userId: string]: CommissionUserSetting }; // User ID -> Settings
}

export interface GuildConfig {
  _id?: string; // Provided by MongoDB
  guild_id: string; // Discord Guild ID
  models: string[];
  shifts: string[];
  periods: string[];
  bonus_rules: BonusRule[];
  display_settings: DisplaySettings;
  commission_settings: CommissionSettings;
  // The `roles` field from the DB example seems redundant if commission_settings.roles exists.
  // Stick to the detailed commission_settings structure unless the backend strictly uses the simpler roles map.
  // roles?: { [roleId: string]: number };
}
// --- End Interfaces ---

@Injectable({
  providedIn: 'root'
})
export class GuildConfigService {

  private apiUrl = '/api/config'; // Base path for config endpoints

  constructor(private http: HttpClient) { }

  /**
   * GET /api/config
   * Get all guild configurations.
   */
  getAllGuildConfigs(): Observable<GuildConfig[]> {
    console.log('GuildConfigService: Fetching all guild configs...');
    return this.http.get<GuildConfig[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/config/:guild_id
   * Get config for a specific guild.
   */
  getGuildConfig(guildId: string): Observable<GuildConfig> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID cannot be empty'));
    }
    console.log(`GuildConfigService: Fetching config for guild ${guildId}...`);
    return this.http.get<GuildConfig>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST /api/config
   * Create a new guild config.
   * Assumes the backend expects the full config object in the body.
   */
  createGuildConfig(config: GuildConfig): Observable<GuildConfig> {
    console.log(`GuildConfigService: Creating config for guild ${config.guild_id}...`);
    // Remove _id if present, backend should generate it
    const { _id, ...configData } = config;
    return this.http.post<GuildConfig>(this.apiUrl, configData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/config/:guild_id
   * Update an existing guild config.
   */
  updateGuildConfig(guildId: string, config: GuildConfig): Observable<GuildConfig> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID cannot be empty for update'));
    }
    console.log(`GuildConfigService: Updating config for guild ${guildId}...`);
    // Ensure guild_id in body matches path param consistency, remove _id
    const { _id, ...configData } = config;
    configData.guild_id = guildId; 
    return this.http.put<GuildConfig>(`${this.apiUrl}/${guildId}`, configData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE /api/config/:guild_id
   * Delete config for a specific guild.
   */
  deleteGuildConfig(guildId: string): Observable<{ message?: string; msg?: string }> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID cannot be empty for delete'));
    }
    console.log(`GuildConfigService: Deleting config for guild ${guildId}...`);
    // Expecting a response like { msg: '...' } or { message: '...' }
    return this.http.delete<{ message?: string; msg?: string }>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  // --- Field-specific methods (Keep as they might be useful) ---

  /**
   * GET /api/config/:guild_id/:field
   * Get a specific field from a guild's config.
   */
  getGuildConfigField<T>(guildId: string, field: keyof GuildConfig): Observable<T> {
    if (!guildId || !field) {
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    console.log(`GuildConfigService: Getting field '${field}' for guild ${guildId}...`);
    // Expecting response like { fieldName: value }
    return this.http.get<{ [key: string]: T }>(`${this.apiUrl}/${guildId}/${field}`).pipe(
      map(response => response[field]), // Extract the value
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
    console.log(`GuildConfigService: Updating field '${field}' for guild ${guildId}...`);
    // Backend likely expects { "value": ... } or { fieldName: ... } in the body. 
    // Assuming { "value": ... } based on previous code.
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
      errorMessage = `Network Error: ${error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.message || error.error?.msg || 'Unknown server error'}`;
    }
    console.error('GuildConfigService Error:', errorMessage, error);
    // Return an observable that emits the error, allowing components to catch it
    return throwError(() => new Error(errorMessage));
  }
}
