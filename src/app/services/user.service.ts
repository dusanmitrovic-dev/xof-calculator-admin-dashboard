import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService, UserPayload } from '../auth/auth.service'; // Adjust path if needed

// Interface for the User object (matching backend schema, excluding password)
export interface User {
  _id: string; // MongoDB ID
  email: string;
  role: 'admin' | 'manager';
  managedGuilds: string[];
  createdAt?: string; // Optional timestamp
  updatedAt?: string; // Optional timestamp
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; // Base URL for user endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Note: AuthInterceptor handles adding the Authorization header.

  // --- User Management Methods (Admin Only) ---

  /**
   * GET /api/users
   * Get all users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/users/:user_id
   * Get a specific user by ID.
   */
  getUserById(userId: string): Observable<User> {
    if (!userId) {
      return throwError(() => new Error('User ID is required'));
    }
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/users/:user_id
   * Update a user's details (role, managedGuilds).
   */
  updateUser(userId: string, updateData: { role?: 'admin' | 'manager'; managedGuilds?: string[] }): Observable<User> {
    if (!userId) {
      return throwError(() => new Error('User ID is required'));
    }
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updateData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE /api/users/:user_id
   * Delete a user.
   */
  deleteUser(userId: string): Observable<{ msg: string }> {
    if (!userId) {
      return throwError(() => new Error('User ID is required'));
    }
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/users/managed-guilds/available
   * Get a list of all unique Guild IDs present in the configs (for assignment).
   */
  getAvailableGuilds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/managed-guilds/available`).pipe(
      catchError(this.handleError)
    );
  }

  // --- Methods for Current User (Potentially used by non-admins too) ---

  /**
   * Gets the Guild IDs managed by the currently authenticated user.
   * This might involve fetching the user profile if not stored in JWT.
   * Assumes a dedicated backend endpoint like /api/users/me or similar.
   * If managedGuilds ARE in the JWT, get them directly from AuthService.
   */
  getCurrentUserManagedGuilds(): Observable<string[]> {
    // Option 1: Get from JWT via AuthService (If available)
    // const currentUser = this.authService.getCurrentUser();
    // if (currentUser?.user?.managedGuilds) { // Adjust path based on your UserPayload
    //    return of(currentUser.user.managedGuilds);
    // }
    
    // Option 2: Fetch from a dedicated endpoint (e.g., /api/users/me)
    return this.http.get<User>(`${this.apiUrl}/me`).pipe( // Replace /me with your actual endpoint
       map(user => user.managedGuilds || []), 
       catchError(err => {
         console.error('Could not fetch managed guilds for current user:', err);
         return of([]); // Return empty on error
       })
    );
    
    // For now, let's assume managedGuilds are NOT in the JWT and need fetching
    // If your backend doesn't have a /me endpoint, you might need to get the user ID
    // from authService and call getUserById(userId)
    /*
    const userId = this.authService.getUserId();
    if (userId) {
      return this.getUserById(userId).pipe(
        map(user => user.managedGuilds || []), 
        catchError(err => {
           console.error('Could not fetch managed guilds for current user:', err);
           return of([]); 
        })
      );
    } else {
       return of([]); // No user ID available
    }
    */
  }


  // --- Error Handling ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred in UserService!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.msg || error.message}`;
    }
    console.error('UserService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
