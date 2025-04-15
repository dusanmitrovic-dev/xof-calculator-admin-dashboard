import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, catchError, of, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Correct import

interface LoginResponse {
  token: string;
}

interface DecodedToken {
  user: {
    id: string;
    role: 'admin' | 'manager';
    // managedGuilds?: string[]; // May add later if needed
  };
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Backend API URL - should move to environment config later
  private apiUrl = '/api/auth'; // Assuming proxy config handles localhost:5000

  private readonly TOKEN_KEY = 'authToken';

  // Signals or Subjects for authentication state
  // Use a signal for simpler state management in standalone components
  isAuthenticated = signal<boolean>(this.hasValidToken());
  currentUserRole = signal<'admin' | 'manager' | null>(this.getRoleFromToken());
  // Or use BehaviorSubject for broader compatibility/more complex scenarios
  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  // public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Optional: Check token validity on service initialization
    if (!this.hasValidToken()) {
       this.logout(); // Clean up if token expired while app was closed
    }
    console.log('AuthService initialized. IsAuthenticated:', this.isAuthenticated());
    console.log('CurrentUserRole:', this.currentUserRole());
  }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.updateAuthState(true);
          console.log('Login successful, token stored.');
        } else {
          console.error('Login failed: No token received');
          this.updateAuthState(false);
        }
      }),
      map(response => !!response?.token), // Return true if token exists
      catchError(error => {
        console.error('Login failed:', error);
        this.updateAuthState(false);
        return of(false); // Return false on error
      })
    );
  }

  register(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, credentials).pipe(
       tap(response => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.updateAuthState(true);
          console.log('Registration successful, token stored.');
        } else {
          console.error('Registration failed: No token received');
          this.updateAuthState(false);
        }
      }),
      map(response => !!response?.token), // Return true if token exists
      catchError(error => {
        console.error('Registration failed:', error);
        this.updateAuthState(false);
        return of(false); // Return false on error
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.updateAuthState(false);
    console.log('Logged out, token removed.');
    this.router.navigate(['/auth/login']); // Redirect to login
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getUserRole(): 'admin' | 'manager' | null {
    return this.currentUserRole();
  }

  isAdmin(): boolean {
    return this.currentUserRole() === 'admin';
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private updateAuthState(isAuthenticated: boolean): void {
    this.isAuthenticated.set(isAuthenticated);
    this.currentUserRole.set(isAuthenticated ? this.getRoleFromToken() : null);
    // If using Subject:
    // this.isAuthenticatedSubject.next(isAuthenticated);
    console.log('Auth state updated. IsAuthenticated:', this.isAuthenticated());
    console.log('CurrentUserRole:', this.currentUserRole());
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (isExpired) {
        console.warn('Token expired.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

   private getRoleFromToken(): 'admin' | 'manager' | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
       // Check expiry just in case, though hasValidToken should handle it
      if (Date.now() >= decoded.exp * 1000) {
           return null;
      }
      return decoded.user.role;
    } catch (error) {
      console.error('Error decoding token for role:', error);
      return null;
    }
  }
}
