import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Assuming AuthService is in ../auth

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api/users'; // Base URL for user endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper to get headers with JWT (assuming adminOnly or similar protection)
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
     if (!token) {
      // Handle case where token is missing, maybe throw error or return empty headers
      return new HttpHeaders({'Content-Type': 'application/json'});
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': `${token}` // Or 'Authorization': `Bearer ${token}`
    });
  }

  // Get a list of all unique Guild IDs present in the configs (Admin Only backend)
  getAvailableGuildIds(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(`${this.baseUrl}/managed-guilds/available`, { headers });
  }

  // Add other user-related methods here later (e.g., getUsers, getUserById, updateUser, deleteUser)
}