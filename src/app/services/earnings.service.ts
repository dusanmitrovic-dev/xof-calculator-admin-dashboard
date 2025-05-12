import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define an interface for the Earning structure
export interface Earning {
  _id?: string;      // MongoDB ID
  id: string;        // Your custom unique ID
  guild_id: string;  // Discord Guild ID
  date: string;      // Date string
  total_cut: number;
  gross_revenue: number;
  period: string;
  shift: string;
  role: string;
  models: string[];    // Change to string[] if multiple models allowed
  hours_worked: number;
  user_mention: string; // Discord user mention string
}

interface DeleteResponse {
  message?: string;
  msg?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  private apiUrl = '/api/earnings'; // Base URL

  constructor(private http: HttpClient) { }

  /**
   * GET /api/earnings/:guild_id
   * Fetches all earning records for a specific guild.
   */
  getGuildEarnings(guildId: string): Observable<Earning[]> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID cannot be empty when fetching earnings.'));
    }
    console.log(`EarningsService: Fetching earnings for guild ${guildId}...`);
    return this.http.get<Earning[]>(`${this.apiUrl}/${guildId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST /api/earnings/:guild_id
   * Creates a new earning record for a specific guild.
   */
  createEarning(guildId: string, earningData: Earning): Observable<Earning> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID cannot be empty for creating an earning.'));
    }
    if (!earningData?.id) {
      return throwError(() => new Error('Earning data must include a unique custom ID.'));
    }
    console.log(`EarningsService: Creating earning with ID ${earningData.id} for guild ${guildId}...`);
    const payload: Earning = { ...earningData, guild_id: guildId };
    delete payload._id;
    return this.http.post<Earning>(`${this.apiUrl}/${guildId}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET /api/earnings/entry/:custom_id
   * Fetches a specific earning record by its custom ID.
   */
  getEarningByCustomId(customId: string): Observable<Earning> {
     if (!customId) {
      return throwError(() => new Error('Custom Earning ID cannot be empty.'));
    }
    console.log(`EarningsService: Fetching earning with custom ID ${customId}...`);
    return this.http.get<Earning>(`${this.apiUrl}/entry/${customId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT /api/earnings/entry/:custom_id
   * Updates a specific earning record by its custom ID.
   */
  updateEarningByCustomId(customId: string, updateData: Partial<Earning>): Observable<Earning> {
    if (!customId) {
      return throwError(() => new Error('Custom Earning ID cannot be empty for update.'));
    }
    console.log(`EarningsService: Updating earning with custom ID ${customId}...`);
    const payload = { ...updateData };
    delete payload._id;
    delete payload.id;
    delete payload.guild_id;
    return this.http.put<Earning>(`${this.apiUrl}/entry/${customId}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE /api/earnings/entry/:earning_id
   * Deletes a specific earning record using its custom earning ID.
   * Updated URL to match backend route definition.
   */
  deleteEarning(guildId: string, earningId: string): Observable<DeleteResponse> {
    // Note: guildId is kept as an argument for potential future checks or context, 
    // but it's not used in the URL per the current route definition.
    if (!earningId) {
      return throwError(() => new Error('Earning ID cannot be empty for delete.'));
    }
    console.log(`EarningsService: Deleting earning with custom ID ${earningId}... (Guild context: ${guildId})`);
    // Use the correct API endpoint: /api/earnings/entry/:earning_id
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/entry/${earningId}`).pipe(
      catchError(this.handleError)
    );
  }

  // --- Error Handling ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred in Earnings Service!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.message}`;
    } else {
      // Try to get a more specific message from the backend error response
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.msg || error.error?.message || 'Unknown server error'}`;
    }
    console.error('EarningsService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
