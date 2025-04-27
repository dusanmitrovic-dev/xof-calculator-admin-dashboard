import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Assuming AuthService is in ../auth

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  private baseUrl = '/api/earnings'; // Base URL for earnings endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper to get headers with JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Use x-auth-token as per your backend middleware
      'x-auth-token': `${token}`
    });
  }

  // List all earnings for a specific guild
  getGuildEarnings(guildId: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/${guildId}`, { headers });
  }

  // Create a new earning record for a specific guild
  createEarning(guildId: string, earningData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    // Your backend expects earningData including 'id'
    return this.http.post(`${this.baseUrl}/${guildId}`, earningData, { headers });
  }

  // Get a specific earning by its custom id
  getEarningByCustomId(customId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/entry/${customId}`, { headers });
  }

  // Update a specific earning by its custom id
  updateEarningByCustomId(customId: string, updateData: any): Observable<any> {
    const headers = this.getAuthHeaders();
     // Your backend expects updateData (partial earning object)
    return this.http.put(`${this.baseUrl}/entry/${customId}`, updateData, { headers });
  }

  // Delete a specific earning by its custom id
  deleteEarningByCustomId(customId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/entry/${customId}`, { headers });
  }
}