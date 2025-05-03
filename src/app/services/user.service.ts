import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'; // Adjust path if needed

// Interface for the User object
export interface User {
  _id: string; // MongoDB ID
  email: string;
  // Add 'manager' to the possible roles
  role: 'admin' | 'user' | 'manager';
  // Add managed_guild_ids (optional)
  managed_guild_ids?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Interface for the update payload
export interface UserUpdateData {
  email?: string;
  // Add 'manager' to the possible roles
  role?: 'admin' | 'user' | 'manager';
  // Add managed_guild_ids (optional)
  managed_guild_ids?: string[];
}

// Interface for Delete response
interface DeleteResponse {
  message?: string;
  msg?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; // Base URL for user endpoints

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * GET /api/users
   * Get all users.
   */
  getUsers(): Observable<User[]> {
    console.log('UserService: Fetching all users...');
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/users/:userId
   * Get a specific user by ID.
   */
  getUserById(userId: string): Observable<User> {
    if (!userId) {
      return throwError(() => new Error('User ID cannot be empty.'));
    }
    console.log(`UserService: Fetching user with ID ${userId}...`);
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/users/:userId
   * Update a user's details (role, email, managed_guild_ids).
   */
  updateUser(userId: string, updateData: UserUpdateData): Observable<User> {
    if (!userId) {
      return throwError(() => new Error('User ID cannot be empty for update.'));
    }
    console.log(`UserService: Updating user with ID ${userId}... Payload:`, updateData);
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updateData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE /api/users/:userId
   * Delete a user.
   */
  deleteUser(userId: string): Observable<DeleteResponse> {
    if (!userId) {
      return throwError(() => new Error('User ID cannot be empty for delete.'));
    }
    console.log(`UserService: Deleting user with ID ${userId}...`);
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/users/me (Example endpoint)
   * Gets the profile of the currently logged-in user.
   */
  getCurrentUserProfile(): Observable<User> {
     console.log('UserService: Fetching current user profile...');
     return this.http.get<User>(`${this.apiUrl}/me`).pipe(
        catchError(this.handleError)
     );
  }


  // --- Error Handling ---
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
