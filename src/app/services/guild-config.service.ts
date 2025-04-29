import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

// Define interfaces for your data structures based on your DB examples
// (These are illustrative, adjust based on your actual full config structure)
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
  roles: { [roleId: string]: CommissionRoleSetting };
  users: { [userId: string]: CommissionUserSetting };
}

export interface GuildConfig {
  _id: string;
  guild_id: string;
  models: string[];
  shifts: string[];
  periods: string[];
  bonus_rules: BonusRule[];
  display_settings: DisplaySettings;
  commission_settings: CommissionSettings;
  roles?: { [roleId: string]: number }; // From DB example
}

@Injectable({
  providedIn: 'root'
})
export class GuildConfigService {

  // Use the same apiUrl as AuthService or define specifically
  private apiUrl = '/api/config'; // Adjust if your config endpoints are different

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // GET /:guild_id: Get config for a specific guild
  getGuildConfig(guildId: string): Observable<GuildConfig> {
    if (!guildId) {
      throw new Error('Guild ID is required to fetch config');
    }
    return this.http.get<GuildConfig>(`${this.apiUrl}/${guildId}`, {
      headers: this.getAuthHeaders()
    });
    // TODO: Add error handling (catchError)
  }

  // POST /: Create/Update a guild config
  createOrUpdateGuildConfig(guildId: string, config: Partial<GuildConfig>): Observable<GuildConfig> {
     if (!guildId) {
      throw new Error('Guild ID is required to update config');
    }
    // Assuming your POST endpoint for a specific guild is just /api/config/:guild_id ?
    // Or maybe it should be PUT? Based on your summary PUT /:guild_id/:field is for specific fields.
    // Let's assume POST to /:guild_id updates the whole config for that guild for now.
    // Adjust URL and method (POST/PUT) based on your actual backend API
    return this.http.post<GuildConfig>(`${this.apiUrl}/${guildId}`, config, {
       headers: this.getAuthHeaders()
    });
    // TODO: Add error handling
  }

  // DELETE /:guild_id: Delete config for a specific guild
  deleteGuildConfig(guildId: string): Observable<any> {
     if (!guildId) {
      throw new Error('Guild ID is required to delete config');
    }
    return this.http.delete(`${this.apiUrl}/${guildId}`, {
      headers: this.getAuthHeaders()
    });
    // TODO: Add error handling
  }

  // GET /:guild_id/:field - Example for getting a specific field (e.g., models)
  getGuildModels(guildId: string): Observable<string[]> {
     if (!guildId) {
      throw new Error('Guild ID is required to fetch models');
    }
    return this.http.get<string[]>(`${this.apiUrl}/${guildId}/models`, {
       headers: this.getAuthHeaders()
    });
     // TODO: Add error handling
  }

  // PUT /:guild_id/:field - Example for updating a specific field (e.g., models)
  updateGuildModels(guildId: string, models: string[]): Observable<any> {
     if (!guildId) {
      throw new Error('Guild ID is required to update models');
    }
    return this.http.put(`${this.apiUrl}/${guildId}/models`, { models }, { // Assuming body should be { models: [...] }
      headers: this.getAuthHeaders()
    });
     // TODO: Add error handling
  }

  // Add other methods for specific fields as needed (shifts, periods, bonus_rules, etc.)
}
