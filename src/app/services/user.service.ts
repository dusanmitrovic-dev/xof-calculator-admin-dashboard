import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'; // Assuming AuthService is in ../auth and exports UserPayload

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; // Base URL for user endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper to get headers with JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
     if (!token) {
       throw new Error('Authentication token not found.'); // Throw error if token is essential
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Standard Bearer token
    });
  }

  // --- Methods relevant to Guild Management ---

  /**
   * Gets the Guild IDs managed by the currently authenticated user.
   * Assumes a backend endpoint exists to provide this information.
   */
  getManagedGuildIds(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    // Assumes an endpoint like /api/users/me/managed-guilds returns { managedGuilds: ["id1", "id2"] }
    // Adjust endpoint and response mapping as needed.
    return this.http.get<{ managedGuilds: string[] }>(`${this.apiUrl}/me/managed-guilds`, { headers }).pipe(
      map(response => response.managedGuilds || []), // Extract the array or return empty
      catchError(error => {
        console.error('Error fetching managed guild IDs:', error);
        // Depending on requirements, return empty array or re-throw
        return of([]); // Return empty array on error
      })
    );

    /* Alternative: If managed guilds are in JWT payload (less common/flexible) */
    // const payload = this.authService.getCurrentUser();
    // if (payload && payload.managedGuilds) { // Assuming payload has managedGuilds: string[]
    //   return of(payload.managedGuilds);
    // } else {
    //   return of([]);
    // }
  }

  // --- Methods for general user management (maybe admin only) ---

  /**
   * Gets a list of all unique Guild IDs present in the configs (Admin Only).
   * Assumes a specific backend endpoint for this admin action.
   */
  getAvailableGuildIdsForAdmin(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    // Example endpoint, adjust as necessary
    return this.http.get<string[]>(`${this.apiUrl}/all-guilds/available`, { headers });
    // TODO: Add proper error handling
  }

  // Add other user-related methods here (e.g., getUsers, getUserById, updateUser, deleteUser)
}
