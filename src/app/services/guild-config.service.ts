import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, map, catchError, tap } from 'rxjs';

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
  // roles?: { [roleId: string]: number }; // Keep commented unless needed
}
// --- End Interfaces ---

// Interface for the guild selector dropdown
export interface AvailableGuild {
  id: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class GuildConfigService {

  private apiUrl = '/api/config'; // Base path for config endpoints

  // BehaviorSubject to hold the currently selected guild ID
  private selectedGuildIdSource = new BehaviorSubject<string | null>(null);
  selectedGuildId$ = this.selectedGuildIdSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Update the currently selected guild ID.
   */
  selectGuild(guildId: string | null): void {
    console.log(`GuildConfigService: Selecting guild ${guildId}`);
    this.selectedGuildIdSource.next(guildId);
    // Optional: Persist selection to local storage?
    // if (guildId) {
    //   localStorage.setItem('selectedGuildId', guildId);
    // } else {
    //   localStorage.removeItem('selectedGuildId');
    // }
  }

  /**
   * Gets the currently selected Guild ID directly.
   * Useful for initial checks, but prefer subscribing to selectedGuildId$ for reactive updates.
   */
  getSelectedGuildId(): string | null {
    return this.selectedGuildIdSource.getValue();
  }

  /**
   * GET /api/config
   * Get all guild configurations, mapped to AvailableGuild interface.
   * NOTE: This fetches ALL configs. In a real-world scenario with many guilds,
   * you'd ideally have an API endpoint that returns only the guilds accessible by the current user.
   */
  getAvailableGuilds(): Observable<AvailableGuild[]> {
    console.log('GuildConfigService: Fetching available guilds...');
    return this.http.get<GuildConfig[]>(this.apiUrl).pipe(
      map(configs => configs.map(config => ({
        id: config.guild_id,
        // Use agency_name from display_settings if available, otherwise use guild_id
        name: config.display_settings?.agency_name || config.guild_id
      }))),
      tap(guilds => console.log(`GuildConfigService: Found ${guilds.length} available guilds.`)),
      catchError(this.handleError)
    );
  }


  /**
   * GET /api/config/:guild_id
   * Get config for a specific guild.
   */
  getGuildConfig(guildId: string): Observable<GuildConfig> {
    if (!guildId) {
      console.error('GuildConfigService: getGuildConfig called with empty guildId.');
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
   */
  createGuildConfig(config: GuildConfig): Observable<GuildConfig> {
    console.log(`GuildConfigService: Creating config for guild ${config.guild_id}...`);
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
      console.error('GuildConfigService: updateGuildConfig called with empty guildId.');
      return throwError(() => new Error('Guild ID cannot be empty for update'));
    }
    console.log(`GuildConfigService: Updating config for guild ${guildId}...`);
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
       console.error('GuildConfigService: deleteGuildConfig called with empty guildId.');
      return throwError(() => new Error('Guild ID cannot be empty for delete'));
    }
    console.log(`GuildConfigService: Deleting config for guild ${guildId}...`);
    return this.http.delete<{ message?: string; msg?: string }>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  // --- Field-specific methods (Consider removing if not used elsewhere) ---

  /**
   * GET /api/config/:guild_id/:field
   * Get a specific field from a guild's config.
   */
  getGuildConfigField<T>(guildId: string, field: keyof GuildConfig): Observable<T> {
    if (!guildId || !field) {
       console.error('GuildConfigService: getGuildConfigField called with empty guildId or field.');
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    console.log(`GuildConfigService: Getting field '${field}' for guild ${guildId}...`);
    return this.http.get<{ [key: string]: T }>(`${this.apiUrl}/${guildId}/${field}`).pipe(
      map(response => response[field]),
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/config/:guild_id/:field
   * Update a specific field in a guild's config.
   */
  updateGuildConfigField(guildId: string, field: keyof GuildConfig, value: any): Observable<GuildConfig> {
    if (!guildId || !field) {
      console.error('GuildConfigService: updateGuildConfigField called with empty guildId or field.');
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    console.log(`GuildConfigService: Updating field '${field}' for guild ${guildId}...`);
    const payload = { value };
    return this.http.put<GuildConfig>(`${this.apiUrl}/${guildId}/${field}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  // --- Error Handling ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.message}`;
    } else {
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.message || error.error?.msg || 'Unknown server error'}`;
    }
    console.error('GuildConfigService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
