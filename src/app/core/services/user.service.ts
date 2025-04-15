import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'; // Added tap
import { AuthService } from '../../auth/services/auth.service'; // To check role

// Define interfaces for user and potentially other data structures
export interface User {
  _id: string; // Or id
  email: string;
  role: 'admin' | 'manager';
  managedGuilds: string[];
  // Add other fields if needed (createdAt, etc.)
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = '/api/users'; // Base URL for user endpoints

  constructor() { }

  // Get the list of guilds the current user can manage
  getManagedGuilds(): Observable<string[]> {
    // Admins can manage all available guilds
    if (this.authService.isAdmin()) {
      console.log('[UserService] User is admin, fetching all available guilds.');
      return this.getAvailableGuilds(); // Fetch all guilds from the backend
    } else {
      // Managers get their specific list (fetch current user data?)
      // This part needs the backend /api/users/me endpoint or similar
      console.warn('[UserService] Getting managed guilds for manager role not fully implemented yet. Returning [].');
      // Fetch current user data here when backend is ready
      return of([]); 
    }
  }

  // Get all available Guild IDs (for admins to assign)
  getAvailableGuilds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/managed-guilds/available`).pipe(
      tap(guilds => {
        // Log the exact data received from the backend API
        console.log('[UserService.getAvailableGuilds] Received guilds from API:', guilds);
      }),
      catchError(err => {
        console.error('Error fetching available guilds:', err);
        return of([]); // Return empty array on error
      })
    );
  }

  // --- Methods for User Management Page (Admin Only) ---

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Error fetching users:', err);
        return of([]);
      })
    );
  }

  getUserById(userId: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(err => {
        console.error(`Error fetching user ${userId}:`, err);
        return of(null);
      })
    );
  }

  updateUser(userId: string, data: { role?: string; managedGuilds?: string[] }): Observable<User | null> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, data).pipe(
      catchError(err => {
        console.error(`Error updating user ${userId}:`, err);
        return of(null); // Or throw error / return specific error object
      })
    );
  }

  deleteUser(userId: string): Observable<{ msg: string } | null> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${userId}`).pipe(
      catchError(err => {
        console.error(`Error deleting user ${userId}:`, err);
        return of(null);
      })
    );
  }
}
