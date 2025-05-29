import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, map, catchError, tap } from 'rxjs';

// --- Interfaces matching DB structure ---
// Note: Model, Shift, Period interfaces here are for potential broader use,
// but within GuildConfig, they are stored as string arrays as per backend schema.
export interface Model { // This interface can be kept for other uses if Models have more details elsewhere
  name: string;
  payout?: number; // Made optional as it's not in GuildConfig.models
  commission?: number; // Made optional
}

export interface Shift { // Kept for other uses
  name: string;
  multiplier?: number; // Made optional
}

export interface Period { // Kept for other uses
  name: string;
  startDate?: string; // Made optional
  endDate?: string;   // Made optional
}

export interface BonusRule {
  from: number;
  to: number;
  amount: number;
}

export interface DisplaySettings {
  ephemeral_responses?: boolean;
  show_average?: boolean;
  agency_name?: string;
  show_ids?: boolean;
  bot_name?: string;
  logo_image_base64?: string; // base64-encoded image for logo (optional)
  logo_text?: string; // logo text (optional)
}

export interface CommissionRoleSetting {
  commission_percentage?: number;
  hourly_rate?: number;
}

export interface CommissionUserSetting {
  hourly_rate?: number; // Optional
  commission_percentage?: number; // Optional
  override_role?: boolean; // Optional
}

export interface CommissionSettings {
  roles: { [roleId: string]: CommissionRoleSetting }; // Role ID -> Settings
  users: { [userId: string]: CommissionUserSetting }; // User ID -> Settings
}

export interface GuildConfig {
  _id?: string; // Provided by MongoDB
  guild_id: string; // Discord Guild ID
  models: string[]; // Changed to string array
  shifts: string[]; // Changed to string array
  periods: string[]; // Changed to string array
  bonus_rules: BonusRule[];
  display_settings?: DisplaySettings;
  commission_settings: CommissionSettings;
  roles: { [roleId: string]: number };
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

  private apiUrl = '/api/config'; // Consolidated API URL for all config operations

  private selectedGuildIdSource = new BehaviorSubject<string | null>(null);
  selectedGuildId$ = this.selectedGuildIdSource.asObservable();

  constructor(private http: HttpClient) { }

  selectGuild(guildId: string | null): void {
    console.log(`GuildConfigService: Selecting guild ID: "${guildId}"`);
    this.selectedGuildIdSource.next(guildId);
  }

  getSelectedGuildId(): string | null {
    return this.selectedGuildIdSource.getValue();
  }

  getAvailableGuilds(): Observable<AvailableGuild[]> {
    console.log('GuildConfigService: Fetching available guilds from ', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(rawConfigs => console.log('[LOG_SERVICE_RAW_GUILDS] GuildConfigService: RAW configs from /api/config:', JSON.stringify(rawConfigs))),
      map((configs: any[]) => configs.map(config => ({
        id: config.id,
        name: config.name
      }))),
      tap(guilds => console.log(`[LOG_SERVICE_MAPPED_GUILDS] GuildConfigService: Found ${guilds.length} available guilds after mapping. First guild.id: "${guilds.length > 0 ? guilds[0].id : 'N/A'}"`)),
      catchError(this.handleError)
    );
  }


  getGuildConfig(guildId: string | null): Observable<GuildConfig> {
    if (!guildId) {
      console.error('GuildConfigService: getGuildConfig called with empty guildId.');
      return throwError(() => new Error('Guild ID cannot be empty'));
    }
    const targetUrl = `${this.apiUrl}/${guildId}`;
    console.log(`[LOG_SERVICE_GET_CONFIG] GuildConfigService: Fetching config for guild ID: "${guildId}" from ${targetUrl}`);
    return this.http.get<GuildConfig>(targetUrl).pipe(
      tap(config => console.log('[LOG_SERVICE_GOT_CONFIG] GuildConfigService: Fetched config data:', JSON.stringify(config))),
      catchError(this.handleError)
    );
  }

  createGuildConfig(config: GuildConfig): Observable<GuildConfig> {
    // Uses POST /api/config/:guild_id - handled by createOrUpdateGuildConfig on backend
    const targetUrl = `${this.apiUrl}/${config.guild_id}`;
    console.log(`GuildConfigService: Creating config for guild ${config.guild_id} at ${targetUrl}`);
    const { _id, ...configData } = config;
    return this.http.post<GuildConfig>(targetUrl, configData).pipe(
      catchError(this.handleError)
    );
  }

  updateGuildConfig(guildId: string, configDataToSave: GuildConfig): Observable<GuildConfig> {
    // Uses POST /api/config/:guild_id - handled by createOrUpdateGuildConfig on backend
    if (!guildId) {
      console.error('GuildConfigService: updateGuildConfig called with empty guildId.');
      return throwError(() => new Error('Guild ID cannot be empty for update'));
    }
    const { _id, ...payload } = configDataToSave;
    payload.guild_id = guildId;

    const targetUrl = `${this.apiUrl}/${guildId}`;
    console.log(`[LOG_SERVICE_UPDATE_URL] GuildConfigService: Updating config using POST. Target URL: "${targetUrl}"`);
    return this.http.post<GuildConfig>(targetUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  updateModels(guildId: string, models: string[]): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'models', models);
  }

  updateShifts(guildId: string, shifts: string[]): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'shifts', shifts);
  }

  updatePeriods(guildId: string, periods: string[]): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'periods', periods);
  }

  updateBonusRules(guildId: string, bonus_rules: BonusRule[]): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'bonus_rules', bonus_rules);
  }

  updateDisplaySettings(guildId: string, display_settings: DisplaySettings): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'display_settings', display_settings);
  }

  updateCommissionSettings(guildId: string, commission_settings: CommissionSettings): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'commission_settings', commission_settings);
  }

  updateRoles(guildId: string, roles: { [roleId: string]: number }): Observable<GuildConfig> {
    return this.updateGuildConfigField(guildId, 'roles', roles);
  }


  deleteGuildConfig(guildId: string): Observable<{ message?: string; msg?: string }> {
    if (!guildId) {
       console.error('GuildConfigService: deleteGuildConfig called with empty guildId.');
      return throwError(() => new Error('Guild ID cannot be empty for delete'));
    }
    const targetUrl = `${this.apiUrl}/${guildId}`;
    console.log(`GuildConfigService: Deleting config for guild ${guildId} at ${targetUrl}`);
    return this.http.delete<{ message?: string; msg?: string }>(targetUrl).pipe(
      catchError(this.handleError)
    );
  }

  getGuildConfigField<T>(guildId: string, field: keyof GuildConfig): Observable<T> {
    if (!guildId || !field) {
       console.error('GuildConfigService: getGuildConfigField called with empty guildId or field.');
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    const targetUrl = `${this.apiUrl}/${guildId}/${field}`;
    console.log(`GuildConfigService: Getting field '${field}' for guild ${guildId} from ${targetUrl}`);
    return this.http.get<{ [key: string]: T }>(targetUrl).pipe(
      map(response => response[field]),
      catchError(this.handleError)
    );
  }

  updateGuildConfigField(guildId: string, field: keyof GuildConfig, value: any): Observable<GuildConfig> {
    // Backend expects PUT /api/config/:guild_id/:field
    if (!guildId || !field) {
      console.error('GuildConfigService: updateGuildConfigField called with empty guildId or field.');
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    const targetUrl = `${this.apiUrl}/${guildId}/${field}`;
    console.log(`GuildConfigService: Updating field '${field}' for guild ${guildId} with PUT to ${targetUrl}`);
    const payload = { value }; // Backend expects { "value": <new_value> }
    return this.http.put<GuildConfig>(targetUrl, payload).pipe( // Changed from PATCH to PUT
      catchError(this.handleError)
    );
  }

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
