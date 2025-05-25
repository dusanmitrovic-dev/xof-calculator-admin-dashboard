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
// Export added for use in other modules (e.g., guards)
export interface UserPayload {
  user: {
    id: string; // User ID from MongoDB
    role: 'admin' | 'manager' | 'user'; // Define expected roles
    // Add other fields if they are included in the JWT payload from your backend (e.g., username)
  };
  iat?: number; // Issued at timestamp (optional)
  exp?: number; // Expiration timestamp (optional)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Adjust if your API base path is different or use proxy.conf.json
  private apiUrl = '/api';
  private tokenKey = 'authToken';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Store the decoded user payload (includes role and id)
  private currentUserSubject = new BehaviorSubject<UserPayload | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkInitialToken(); // Check for existing token on service initialization
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
          console.log('AuthService: Session restored from token.');
        } else {
          console.log('AuthService: Token found but expired.');
          this.clearAuthData(); // Token expired
        }
      } catch (error) {
        console.error('AuthService: Error decoding token on init:', error);
        this.clearAuthData(); // Invalid token
      }
    } else {
        // console.log('AuthService: No token found in storage.'); // Optional log
        this.clearAuthData(); // No token found
    }
  }

  // Updates the authentication state subjects and stores token
  private updateAuthState(token: string, payload: UserPayload): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(payload);
    console.log(`AuthService: Auth state updated. User Role: ${payload.user.role}, ID: ${payload.user.id}`);
  }

  // Clears authentication state and removes token
  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
     console.log('AuthService: Auth data cleared.');
  }

  // --- API Methods ---

  /**
   * Registers a new user. Assumes backend handles first user as admin.
   * @param credentials User credentials (e.g., { email: string, password: string })
   * @returns Observable<AuthResponse> - Emits the response (likely containing a token) on success.
   */
  register(credentials: any): Observable<AuthResponse> {
    console.log('AuthService: Attempting registration...');
    // IMPORTANT: Backend should implement POST /api/auth/register
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials)
      .pipe(
        tap(response => {
          console.log('AuthService: Registration successful response received:', response);
          // Decide if you want to automatically log in after registration
          // If yes, handle the token here similar to the login method.
          // For now, we just return the response, user needs to log in separately.
        }),
        catchError(this.handleError) // Use shared error handler
      );
  }

  /**
   * Logs in a user.
   * @param credentials User credentials (e.g., { email: string, password: string })
   * @returns Observable<boolean> - Emits true on successful login and token storage, false otherwise.
   */
  login(credentials: any): Observable<boolean> {
    console.log('AuthService: Attempting login...');
    // IMPORTANT: Backend should implement POST /api/auth/login
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        map(response => {
          if (response && response.token) {
            console.log('AuthService: Token received on login.');
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
          console.warn('AuthService: No token in login response.');
          this.clearAuthData(); // Ensure clean state if no token
          return false; // Login failed (no token)
        }),
        catchError(err => {
          console.error('AuthService: Login API error:', err);
          this.clearAuthData(); // Clear any potentially stale data on login failure
          // Return an observable emitting false instead of re-throwing error
          return of(false);
        })
      );
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    console.log('AuthService: Logging out...');
    this.clearAuthData();
    // Optional: Call a backend logout endpoint if necessary (e.g., for session invalidation)
    // this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  // --- Helper Methods ---

  /**
   * Gets the raw JWT token from storage. Used by the interceptor.
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
   * Gets the role of the currently logged-in user. Useful for guards.
   * @returns The user's role ('admin', 'user') or null if not logged in.
   */
  getUserRole(): 'admin' | 'manager' | 'user' | null {
    // Add type assertion based on UserPayload definition
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
   * Checks if the user is currently authenticated based on the BehaviorSubject. Useful for guards.
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
      // Attempt to get message from backend response, fallback to status text or generic message
      errorMessage = `Server Error ${error.status}: ${error.error?.message || error.error?.msg || error.statusText}`;
    }
    console.error('AuthService API Error:', errorMessage, error);
    // Return an observable that emits the error, allowing components/services to catch it if needed
    return throwError(() => new Error(errorMessage));
  }
}
