import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed (npm install jwt-decode)
import { Router } from '@angular/router';

// Interface for the expected response from login/register API
interface AuthResponse {
  token: string;
  // Add other potential response fields if needed (e.g., user details)
}

// Interface for the payload decoded from the JWT
// FIX: Add export keyword
export interface UserPayload {
  user: {
    id: string; // User ID from MongoDB
    role: string; // 'admin' or 'manager'
    // Add other fields if they are included in the JWT payload from your backend
  };
  iat?: number; // Issued at timestamp (optional)
  exp?: number; // Expiration timestamp (optional)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Assuming your backend runs on the same host or is proxied
  // If backend is on a different port (e.g., 5000), use proxy.conf.json or full URL
  private apiUrl = '/api'; // Adjust if your API base path is different
  private tokenKey = 'authToken';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Store the decoded user payload (includes role and id)
  private currentUserSubject = new BehaviorSubject<UserPayload | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkInitialToken(); // Check for existing token on startup
  }

  // Checks local storage for a token on app load
  private checkInitialToken(): void {
    const token = this.getTokenFromStorage();
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        // Check if token is expired
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          this.updateAuthState(token, decoded);
        } else {
          this.clearAuthData(); // Token expired
        }
      } catch (error) {
        console.error('Error decoding token on init:', error);
        this.clearAuthData(); // Invalid token
      }
    } else {
      this.clearAuthData(); // No token found
    }
  }

  // Updates the authentication state subjects and stores token
  private updateAuthState(token: string, payload: UserPayload): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(payload);
    console.log('Auth state updated. User:', payload.user.role, payload.user.id);
  }

  // Clears authentication state and removes token
  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  // --- API Methods ---

  /**
   * Registers a new user.
   * @param email User's email
   * @param password User's password
   * @returns Observable<AuthResponse> - Emits the response (likely containing a token) on success.
   */
  register(email: string, password: string): Observable<AuthResponse> {
    console.log('AuthService: register called for', email);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { email, password })
      .pipe(
        tap(response => {
          console.log('AuthService: Register successful response:', response);
          // Automatically log in the user after successful registration
          if (response && response.token) {
             try {
                const payload = jwtDecode<UserPayload>(response.token);
                if (payload.exp && payload.exp * 1000 > Date.now()) {
                    this.updateAuthState(response.token, payload);
                } else {
                     console.warn('AuthService: Token received on register but already expired.');
                     this.clearAuthData(); // Should not happen ideally
                }
            } catch (error) {
                console.error('AuthService: Error decoding token on register:', error);
                this.clearAuthData(); // Invalid token received
            }
          } else {
             console.warn('AuthService: No token received on register.');
             // Don't automatically log in if no token
          }
        }),
        catchError(this.handleError) // Use shared error handler
      );
  }

  /**
   * Logs in a user.
   * @param email User's email
   * @param password User's password
   * @returns Observable<boolean> - Emits true on successful login and token storage, false otherwise.
   */
  login(email: string, password: string): Observable<boolean> {
    console.log('AuthService: login called for', email);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            console.log('AuthService: Token received on login');
            try {
              const payload = jwtDecode<UserPayload>(response.token);
              // Double-check expiry before setting state
              if (payload.exp && payload.exp * 1000 > Date.now()) {
                this.updateAuthState(response.token, payload);
                return true; // Login successful
              } else {
                console.warn('AuthService: Token received on login but already expired.');
                this.clearAuthData();
                return false; // Login failed (expired token)
              }
            } catch (error) {
              console.error('AuthService: Error decoding token on login:', error);
              this.clearAuthData();
              return false; // Login failed (invalid token)
            }
          }
          console.log('AuthService: No token in login response');
          return false; // Login failed (no token)
        }),
        catchError(err => {
          console.error('AuthService: Login API error:', err);
          this.clearAuthData(); // Clear any potentially stale data on login failure
          // Return an observable emitting false instead of throwing
          return of(false);
        })
      );
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    console.log('AuthService: logout called');
    this.clearAuthData();
    // Optional: Call a backend logout endpoint if necessary
    // this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    this.router.navigate(['/login']); // Redirect to login page
  }

  // --- Helper Methods ---

  /**
   * Gets the raw JWT token from storage.
   * @returns The token string or null if not found.
   */
  getTokenFromStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   /**
   * Gets the currently decoded user payload.
   * @returns The UserPayload object or null if not logged in.
   */
  getCurrentUser(): UserPayload | null {
    return this.currentUserSubject.value;
  }

  /**
   * Gets the role of the currently logged-in user.
   * @returns The user's role ('admin', 'manager') or null if not logged in.
   */
  getUserRole(): string | null {
    return this.getCurrentUser()?.user?.role ?? null;
  }

   /**
   * Gets the ID of the currently logged-in user.
   * @returns The user's ID string or null if not logged in.
   */
  getUserId(): string | null {
    return this.getCurrentUser()?.user?.id ?? null;
  }

  /**
   * Checks if the user is currently authenticated based on the BehaviorSubject.
   * @returns True if authenticated, false otherwise.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Basic error handler - can be enhanced
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      errorMessage = `Server Error Code: ${error.status}
Message: ${error.error?.msg || error.message}`; // Prefer backend 'msg' field if exists
    }
    console.error('AuthService Error Handler:', errorMessage, error);
    // Return an observable that emits the error, allowing components to catch it
    return throwError(() => new Error(errorMessage));
  }
}
