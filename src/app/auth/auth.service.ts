import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Corrected import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/auth'; // Base URL for your backend auth endpoints
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Basic check: checks for token existence and if it's potentially expired (client-side check)
    if (!token) {
      return false;
    }
    try {
      const decoded: any = jwtDecode(token);
      // Check if token has expired
      if (decoded.exp < Date.now() / 1000) {
        this.logout(); // Log out expired token
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout(); // Log out invalid token
      return false;
    }
  }

  getUserPayload(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getUserRole(): string | null {
    const payload = this.getUserPayload();
    return payload ? payload.user.role : null; // Assuming role is in payload.user.role
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
