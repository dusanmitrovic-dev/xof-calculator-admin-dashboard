import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define an interface for the GuildConfig structure based on your backend model
// This is a basic structure, refine it based on your actual GuildConfig model
export interface GuildConfig {
  _id?: string; // Optional _id from MongoDB
  guild_id: string;
  models?: string[];
  shifts?: string[];
  periods?: string[];
  bonus_rules?: { from: number; to: number; amount: number }[];
  display_settings?: { 
    ephemeral_responses?: boolean;
    show_average?: boolean;
    agency_name?: string;
    show_ids?: boolean;
    bot_name?: string; 
  };
  commission_settings?: {
    roles?: { [roleId: string]: { commission_percentage?: number } };
    users?: { [userId: string]: { hourly_rate?: number; override_role?: boolean } };
  };
  roles?: { [roleId: string]: number }; // Original simple roles mapping
  // Add any other fields from your GuildConfig model
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  private apiUrl = '/api/config'; // Base URL for config endpoints

  constructor() { }

  // Get config for a specific guild
  getGuildConfig(guildId: string): Observable<GuildConfig | null> {
    if (!guildId) return of(null); // Don't fetch if no guild ID
    return this.http.get<GuildConfig>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(err => {
        console.error(`Error fetching config for guild ${guildId}:`, err);
        // Return null or a default config object on error?
        // Returning null for now
        return of(null); 
      })
    );
  }

  // Create or Update config for a specific guild
  saveGuildConfig(guildId: string, configData: GuildConfig): Observable<GuildConfig | null> {
     if (!guildId) return of(null); // Don't save if no guild ID
     // Ensure guild_id is part of the data being sent
     configData.guild_id = guildId; 
     // The backend route POST /:guild_id handles upsert
    return this.http.post<GuildConfig>(`${this.apiUrl}/${guildId}`, configData).pipe(
      catchError(err => {
        console.error(`Error saving config for guild ${guildId}:`, err);
        // Maybe return the original data or throw an error?
        // Returning null indicates failure
        return of(null);
      })
    );
  }

  // -- Add methods for specific field updates if needed --
  // Example: Update display settings field
  // updateDisplaySetting(guildId: string, field: string, value: any): Observable<GuildConfig | null> {
  //   if (!guildId) return of(null);
  //   return this.http.put<GuildConfig>(`${this.apiUrl}/${guildId}/display_settings.${field}`, { value }).pipe(
  //     catchError(err => {
  //       console.error(`Error updating display setting ${field} for guild ${guildId}:`, err);
  //       return of(null);
  //     })
  //   );
  // }

  // Note: Deleting a config might be an admin-only action handled elsewhere or via UserService
}
