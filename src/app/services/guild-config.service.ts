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

  private apiUrl = '/api/guild-configs'; // Corrected base path for config endpoints

  private selectedGuildIdSource = new BehaviorSubject<string | null>(null);
  selectedGuildId$ = this.selectedGuildIdSource.asObservable();

  constructor(private http: HttpClient) { }

  selectGuild(guildId: string | null): void {
    console.log(`GuildConfigService: Selecting guild ${guildId}`);
    this.selectedGuildIdSource.next(guildId);
  }

  getSelectedGuildId(): string | null {
    return this.selectedGuildIdSource.getValue();
  }

  getAvailableGuilds(): Observable<AvailableGuild[]> {
    console.log('GuildConfigService: Fetching available guilds from ', this.apiUrl);
    // Assuming the backend returns an array of objects with at least id and name fields at the root endpoint
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((configs: any[]) => configs.map(config => ({
        id: config.id, // Assuming backend sends 'id' (as guild_id) and 'name' (as agency_name or chosen display name)
        name: config.name 
      }))),
      tap(guilds => console.log(`GuildConfigService: Found ${guilds.length} available guilds after mapping.`)),
      catchError(this.handleError)
    );
  }


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

  createGuildConfig(config: GuildConfig): Observable<GuildConfig> {
    console.log(`GuildConfigService: Creating config for guild ${config.guild_id}...`);
    const { _id, ...configData } = config;
    if (!configData.guild_id) {
       console.warn('GuildConfigService: createGuildConfig called without guild_id in payload, relying on API structure.');
    }
    return this.http.post<GuildConfig>(this.apiUrl, configData).pipe(
      catchError(this.handleError)
    );
  }

  updateGuildConfig(guildId: string, config: GuildConfig): Observable<GuildConfig> {
    if (!guildId) {
      console.error('GuildConfigService: updateGuildConfig called with empty guildId.');
      return throwError(() => new Error('Guild ID cannot be empty for update'));
    }
    console.log(`GuildConfigService: Updating config for guild ${guildId}...`);
    const { _id, ...configData } = config;
    configData.guild_id = guildId; // Ensure payload guild_id matches path param
    return this.http.put<GuildConfig>(`${this.apiUrl}/${guildId}`, configData).pipe(
      catchError(this.handleError)
    );
  }

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
