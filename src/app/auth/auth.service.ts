import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Assuming you have jwt-decode installed
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  // Add other potential response fields if needed
}

interface UserPayload {
  id: string; // Or whatever identifier you use
  username: string;
  email: string;
  role: string; // e.g., 'admin', 'user'
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Replace with your actual backend API base URL
  private apiUrl = '/api'; // Example base URL
  private tokenKey = 'authToken';

  // Initialize subjects with default values first
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userPayloadSubject = new BehaviorSubject<UserPayload | null>(null);
  public userPayload$ = this.userPayloadSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Now that subjects are created, check the initial token state
    this.checkInitialToken();
  }

  // Method to check token on service initialization
  private checkInitialToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          // Valid token found
          this.isAuthenticatedSubject.next(true);
          this.userPayloadSubject.next(decoded);
        } else {
          // Token expired
          this.removeTokenInternal(); // Use internal remove to avoid state updates
        }
      } catch (error) {
        // Invalid token
        console.error('Error decoding token on init:', error);
        this.removeTokenInternal(); // Use internal remove
      }
    } else {
      // No token found
      this.isAuthenticatedSubject.next(false);
      this.userPayloadSubject.next(null);
    }
  }

  // Internal method to just remove token without updating subjects
  // (subjects are already updated by checkInitialToken)
  private removeTokenInternal(): void {
     localStorage.removeItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    try {
      const payload = jwtDecode<UserPayload>(token);
      // Check expiry again before setting state
      if (payload.exp * 1000 > Date.now()) {
         this.isAuthenticatedSubject.next(true);
         this.userPayloadSubject.next(payload);
      } else {
        this.logout(); // Token is immediately expired
      }
    } catch (error) {
        console.error('Error decoding token on set:', error);
        this.logout(); // Invalid token received
    }
  }

  // Public logout method handles state update and routing
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.userPayloadSubject.next(null);
    // TODO: Optionally call a backend logout endpoint if necessary
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  getToken(): string | null {
    // Check expiry whenever token is retrieved?
    // Optional: Could add expiry check here too, but might be redundant
    return localStorage.getItem(this.tokenKey);
  }

  // --- API Methods --- 

  register(username: string, email: string, password: string): Observable<boolean> {
    // TODO: Adjust endpoint and payload as needed for your backend
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/register`, { username, email, password })
      .pipe(
        map(response => !!response), // Return true on success (adjust if backend sends different success indicator)
        catchError(this.handleError)
      );
  }

  login(username: string, password: string): Observable<boolean> {
    // TODO: Adjust endpoint and payload as needed for your backend
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            this.setToken(response.token);
            // Check if token was successfully set (not expired/invalid)
            return this.isLoggedIn();
          }
          return false;
        }),
        catchError(this.handleError)
      );
  }


  // --- Helper Methods --- 

  isLoggedIn(): boolean {
    // Check the current state from the subject
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): UserPayload | null {
    return this.userPayloadSubject.value;
  }

  getUserRole(): string | null {
    return this.getCurrentUser()?.role ?? null;
  }

  // Basic error handler - enhance as needed
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error Code: ${error.status}
Message: ${error.message}`;
      if (error.error && typeof error.error === 'object' && error.error.message) {
        errorMessage = error.error.message; // Use backend error message if available
      }
    }
    console.error(errorMessage);
    // Return an observable that emits the error message
    return throwError(() => new Error(errorMessage));
  }
}
