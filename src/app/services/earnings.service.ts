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
  models: string;    // Change to string[] if multiple models allowed
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
   * Renamed from getGuildEarnings to match usage in component
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
   * DELETE /api/earnings/:guild_id/:earning_id (assuming this route exists)
   * Deletes a specific earning record using guild ID and custom earning ID.
   * Added this method to match usage in component.
   */
  deleteEarning(guildId: string, earningId: string): Observable<DeleteResponse> {
    if (!guildId || !earningId) {
      return throwError(() => new Error('Guild ID and Earning ID cannot be empty for delete.'));
    }
    console.log(`EarningsService: Deleting earning with custom ID ${earningId} for guild ${guildId}...`);
    // Adjust URL structure based on your actual API endpoint for deletion
    // Common patterns: /api/earnings/:guild_id/:earning_id or /api/earnings/entry/:earning_id
    // Assuming /api/earnings/:guild_id/:earning_id based on component usage
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${guildId}/${earningId}`).pipe(
      catchError(this.handleError)
    );
  }

  // --- Error Handling ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred in Earnings Service!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.message}`;
    } else {
      errorMessage = `Server Error (Code: ${error.status}): ${error.error?.message || error.error?.msg || 'Unknown server error'}`;
    }
    console.error('EarningsService Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
