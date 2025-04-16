import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Import tap

// Interface for Earning record (match backend model)
export interface Earning {
  _id: string; // MongoDB ID
  id: string; // Custom ID
  guild_id: string;
  date: string; // Consider using Date type if converting
  total_cut: number;
  gross_revenue: number;
  period: string;
  shift: string;
  role: string;
  models: string;
  hours_worked: number;
  user_mention: string;
}

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/earnings'; // Base URL for earnings endpoints

  constructor() { }

  // Get all earnings for a specific guild
  getGuildEarnings(guildId: string): Observable<Earning[]> {
    if (!guildId) return of([]);
    const url = `${this.apiUrl}/${guildId}`;
    console.log(`[EarningsService] Fetching earnings from: ${url}`); // Log URL
    return this.http.get<Earning[]>(url).pipe(
      tap(data => console.log(`[EarningsService] Received earnings data for guild ${guildId}:`, data)), // Log successful data
      catchError(err => {
        console.error(`[EarningsService] Error fetching earnings for guild ${guildId}:`, err); // Log error
        return of([]);
      })
    );
  }

  // Create a new earning record
  createEarning(guildId: string, earningData: Omit<Earning, '_id'>): Observable<Earning | null> {
    if (!guildId) return of(null);
    const dataToSend = { ...earningData, guild_id: guildId };
    console.log(`[EarningsService] Creating earning for guild ${guildId}:`, dataToSend);
    return this.http.post<Earning>(`${this.apiUrl}/${guildId}`, dataToSend).pipe(
      catchError(err => {
        console.error('[EarningsService] Error creating earning:', err);
        return of(null);
      })
    );
  }

  // Update an earning record by its custom ID
  updateEarning(customId: string, earningData: Partial<Earning>): Observable<Earning | null> {
     const { _id, guild_id, ...updateData } = earningData;
     console.log(`[EarningsService] Updating earning ${customId}:`, updateData);
    return this.http.put<Earning>(`${this.apiUrl}/entry/${customId}`, updateData).pipe(
      catchError(err => {
        console.error(`[EarningsService] Error updating earning ${customId}:`, err);
        return of(null);
      })
    );
  }

  // Delete an earning record by its custom ID
  deleteEarning(customId: string): Observable<{ msg: string } | null> {
    console.log(`[EarningsService] Deleting earning ${customId}`);
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/entry/${customId}`).pipe(
      catchError(err => {
        console.error(`[EarningsService] Error deleting earning ${customId}:`, err);
        return of(null);
      })
    );
  }
}
