import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'; // Import tap
import { AuthService } from '../auth/auth.service'; // Adjust path if needed
import { environment } from '../../environments/environment'; // Import environment

// ... (User, UserUpdateData, DeleteResponse interfaces remain the same) ...
export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  managed_guild_ids?: string[];
  createdAt?: string;
  updatedAt?: string;
}
export interface UserUpdateData {
  email?: string;
  role?: 'admin' | 'user' | 'manager';
  managed_guild_ids?: string[];
}
interface DeleteResponse {
  message?: string;
  msg?: string;
}

// This interface remains correct as it defines the desired output format
export interface AvailableGuild {
    guild_id: string;
    guild_name?: string; // Name might be unavailable from this endpoint
}

// Remove BackendGuildConfig interface as it's not what the API returns


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`; // Use environment.apiUrl

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ... other methods ...
  getUsers(): Observable<User[]> {
    console.log('UserService: Fetching all users...');
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  getUserById(userId: string): Observable<User> {
    if (!userId) {
      return throwError(() => new Error('User ID cannot be empty.'));
    }
    console.log(`UserService: Fetching user with ID ${userId}...`);
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
  updateUser(userId: string, updateData: UserUpdateData): Observable<User> {
    if (!userId) {
      return throwError(() => new Error('User ID cannot be empty for update.'));
    }
    console.log(`UserService: Updating user with ID ${userId}... Payload:`, updateData);
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updateData).pipe(
      catchError(this.handleError)
    );
  }
  deleteUser(userId: string): Observable<DeleteResponse> {
    if (!userId) {
      return throwError(() => new Error('User ID cannot be empty for delete.'));
    }
    console.log(`UserService: Deleting user with ID ${userId}...`);
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
  getCurrentUserProfile(): Observable<User> {
     console.log('UserService: Fetching current user profile...');
     return this.http.get<User>(`${this.apiUrl}/me`).pipe(
        catchError(this.handleError)
     );
  }


  getAvailableGuildIds(): Observable<AvailableGuild[]> {
    console.log('UserService: Fetching available guild IDs from /api/users/managed-guilds/available');
    // Expect an array of strings from the backend
    return this.http.get<string[]>(`${this.apiUrl}/managed-guilds/available`).pipe(
        tap(backendGuildIds => { // Log the raw response (array of strings)
            console.log('[LOG_SERVICE_RAW_GUILDS] UserService: Raw response from API:', JSON.stringify(backendGuildIds));
        }),
        map(backendGuildIds => {
            if (!backendGuildIds) {
                console.log('[LOG_SERVICE_MAPPING] UserService: Backend response is null/undefined, returning empty array.');
                return [];
            }
            // Transform each guild ID string into an AvailableGuild object
            const mappedGuilds = backendGuildIds.map(guildIdString => ({
                guild_id: guildIdString,
                guild_name: undefined // Name is not provided by this endpoint
            }));
            console.log('[LOG_SERVICE_MAPPING] UserService: Mapped guilds:', JSON.stringify(mappedGuilds));
            return mappedGuilds;
        }),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred in User Service!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.message}`;
    } else {
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.message || error.error?.msg || 'Unknown server error'}`;
    }
    console.error('UserService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
