import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
      return this.getAvailableGuilds(); // Fetch all guilds from the backend
    } else {
      // Managers get their specific list (fetch current user data?)
      // Option 1: Assume managedGuilds are in the token (add to AuthService.decodeToken)
      // Option 2: Fetch current user details from backend
      // Let's go with Option 2 for now - fetch user data
      // This endpoint needs to exist on the backend (e.g., GET /api/users/me)
      // Since we don't have a /me endpoint yet, we might need to adjust
      // For now, let's return an empty array for managers pending backend update or using token
      console.warn('getManagedGuilds for manager role not fully implemented yet.');
      return of([]); 
    }
  }

  // Get all available Guild IDs (for admins to assign)
  getAvailableGuilds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/managed-guilds/available`).pipe(
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
