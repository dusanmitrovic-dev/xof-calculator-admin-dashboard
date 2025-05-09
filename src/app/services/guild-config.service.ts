import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, map, catchError, tap } from 'rxjs';

// --- Interfaces matching DB structure ---
export interface Model {
  name: string;
  payout: number;
  commission: number;
}

export interface Shift {
  name: string;
  multiplier: number;
}

export interface Period {
  name: string;
  startDate: string; // Store as ISO string date (YYYY-MM-DD)
  endDate: string;   // Store as ISO string date (YYYY-MM-DD)
}

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
  models: Model[];
  shifts: Shift[];
  periods: Period[];
  bonus_rules: BonusRule[];
  display_settings: DisplaySettings;
  commission_settings: CommissionSettings;
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


  getGuildConfig(guildId: string): Observable<GuildConfig> {
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
    // Uses POST /api/config - handled by createOrUpdateGuildConfig on backend
    const targetUrl = `${this.apiUrl}/${config.guild_id}`; // Backend POST expects guild_id in URL 
    console.log(`GuildConfigService: Creating config for guild ${config.guild_id} at ${targetUrl}`);
    const { _id, ...configData } = config;
    if (!configData.guild_id) {
       console.warn('GuildConfigService: createGuildConfig called without guild_id in payload, relying on API structure.');
    }
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
    console.log(`[LOG_SERVICE_UPDATE_PARAM] GuildConfigService: updateGuildConfig - guildId PARAMETER is: "${guildId}" (length: ${guildId?.length})`);
    
    const { _id, ...payload } = configDataToSave;
    payload.guild_id = guildId; 

    const targetUrl = `${this.apiUrl}/${guildId}`;
    console.log(`[LOG_SERVICE_UPDATE_URL] GuildConfigService: Updating config using POST. Target URL: "${targetUrl}"`); 

    // --- Use POST instead of PUT --- 
    return this.http.post<GuildConfig>(targetUrl, payload).pipe(
      catchError(this.handleError)
    );
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
    // Uses PUT /api/config/:guild_id/:field as defined in backend routes
    if (!guildId || !field) {
      console.error('GuildConfigService: updateGuildConfigField called with empty guildId or field.');
      return throwError(() => new Error('Guild ID and field name are required'));
    }
    const targetUrl = `${this.apiUrl}/${guildId}/${field}`;
    console.log(`GuildConfigService: Updating field '${field}' for guild ${guildId} at ${targetUrl}`);
    const payload = { value };
    return this.http.put<GuildConfig>(targetUrl, payload).pipe(
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
