import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Assuming AuthService is in ../auth

@Injectable({
  providedIn: 'root'
})
export class GuildConfigService {
  private baseUrl = '/api/config'; // Base URL for guild config endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper to get headers with JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': `${token}` // Or 'Authorization': `Bearer ${token}` depending on backend
    });
  }

  // Get config for a specific guild
  getGuildConfig(guildId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/${guildId}`, { headers });
  }

  // Create or Update config for a specific guild
  createOrUpdateGuildConfig(guildId: string, configData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    // Your backend POST /api/config/:guild_id handles both create and update
    return this.http.post(`${this.baseUrl}/${guildId}`, configData, { headers });
  }

   // Delete config for a specific guild (Admin Only backend)
  deleteGuildConfig(guildId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${guildId}`, { headers });
  }

  // Get a specific field from a guild's config
  getGuildConfigField(guildId: string, field: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/${guildId}/${field}`, { headers });
  }

  // Update a specific field in a guild's config
  updateGuildConfigField(guildId: string, field: string, value: any): Observable<any> {
    const headers = this.getAuthHeaders();
    // Your backend PUT /api/config/:guild_id/:field expects { value: ... }
    return this.http.put(`${this.baseUrl}/${guildId}/${field}`, { value }, { headers });
  }
}