import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    // Basic check: simply checks for token existence. 
    // For a more robust check, you might decode the token and check expiration.
    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // You can add methods here later for getting user info from the token payload
}

/*
LOG:
---
Date: 2023-10-27
Change: Enhanced AuthService to manage JWT token (store, retrieve, check auth status, logout).
File: src/app/auth/auth.service.ts
Reason: To enable frontend authentication state management.
---*/
