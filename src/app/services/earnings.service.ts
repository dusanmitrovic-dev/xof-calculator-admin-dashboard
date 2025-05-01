import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'; // Correct path might be needed

// Define an interface for the Earning structure based on your DB data
export interface Earning {
  _id?: string; // MongoDB ID, optional on creation
  id: string;   // Your custom unique ID (required)
  guild_id: string; // Changed to string based on GuildConfig
  date: string; // Consider using Date objects if consistency allows
  total_cut: number;
  gross_revenue: number;
  period: string;
  shift: string;
  role: string;
  models: string; // Could be string[] if multiple models
  hours_worked: number;
  user_mention: string;
}

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  private apiUrl = '/api/earnings'; // Base URL for earnings endpoints

  // AuthService might still be needed if you need user info for requests, 
  // but not for adding the token itself.
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Note: AuthInterceptor handles adding the Authorization header.

  /**
   * GET /api/earnings/:guild_id
   * List all earnings for a specific guild.
   */
  getGuildEarnings(guildId: string): Observable<Earning[]> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID is required'));
    }
    return this.http.get<Earning[]>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST /api/earnings/:guild_id
   * Create a new earning record for a specific guild.
   * Requires custom 'id' field in the earningData payload.
   */
  createEarning(guildId: string, earningData: Earning): Observable<Earning> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID is required'));
    }
    if (!earningData || !earningData.id) {
      return throwError(() => new Error('Earning data with custom ID is required'));
    }
    // Ensure guild_id matches path param if needed
    earningData.guild_id = guildId; 
    return this.http.post<Earning>(`${this.apiUrl}/${guildId}`, earningData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/earnings/entry/:custom_id
   * Get a specific earning by its custom id.
   */
  getEarningByCustomId(customId: string): Observable<Earning> {
     if (!customId) {
      return throwError(() => new Error('Custom Earning ID is required'));
    }
    return this.http.get<Earning>(`${this.apiUrl}/entry/${customId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/earnings/entry/:custom_id
   * Update a specific earning by its custom id.
   */
  updateEarningByCustomId(customId: string, updateData: Partial<Earning>): Observable<Earning> {
    if (!customId) {
      return throwError(() => new Error('Custom Earning ID is required'));
    }
    // Remove _id and id from update payload if present, as they shouldn't be changed directly via PUT
    // delete updateData._id;
    // delete updateData.id; // Custom ID is the identifier, should not be changed
    // delete updateData.guild_id; // Guild ID should likely not be changed

    return this.http.put<Earning>(`${this.apiUrl}/entry/${customId}`, updateData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE /api/earnings/entry/:custom_id
   * Delete a specific earning by its custom id.
   */
  deleteEarningByCustomId(customId: string): Observable<{ msg: string }> {
    if (!customId) {
      return throwError(() => new Error('Custom Earning ID is required'));
    }
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/entry/${customId}`).pipe(
      catchError(this.handleError)
    );
  }

  // --- Error Handling ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.msg || error.message}`;
    }
    console.error('EarningsService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
