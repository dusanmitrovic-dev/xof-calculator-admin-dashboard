import { Injectable, inject } from '@angular/core'; // Import inject
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin, of } from 'rxjs'; // Import forkJoin, of
import { catchError, map, switchMap, defaultIfEmpty } from 'rxjs/operators'; // Import switchMap, defaultIfEmpty
import { UserService, AvailableGuild } from './user.service'; // Import UserService and AvailableGuild

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
  private userService = inject(UserService); // Inject UserService

  constructor(private http: HttpClient) { }

  /**
   * GET /api/earnings/:guild_id
   * Fetches all earning records for a specific guild.
   * Renamed from getGuildEarnings to avoid confusion with the new method
   */
  getEarningsForGuild(guildId: string): Observable<Earning[]> {
    if (!guildId) {
      return throwError(() => new Error('Guild ID cannot be empty when fetching earnings.'));
    }
    console.log(`EarningsService: Fetching earnings for guild ${guildId}...`);
    return this.http.get<Earning[]>(`${this.apiUrl}/${guildId}`).pipe(
      map(earnings => earnings || []), // Ensure array even if null/undefined returned
      catchError(err => {
          console.error(`EarningsService: Error fetching earnings for guild ${guildId}:`, err.message);
          // Return an empty array for this specific guild on error to allow forkJoin to complete
          return of([]);
      })
    );
  }

  /**
   * Fetches earnings for all available guilds and combines them.
   */
  getAllEarningsAcrossGuilds(): Observable<Earning[]> {
    console.log('EarningsService: Fetching all earnings across all guilds...');
    return this.userService.getAvailableGuildIds().pipe(
        switchMap((guilds: AvailableGuild[]) => {
            console.log(`EarningsService: Found ${guilds.length} available guilds.`);
            if (!guilds || guilds.length === 0) {
                // No guilds found, return an empty array immediately
                return of([]);
            }

            // Create an array of Observables, each fetching earnings for one guild
            const earningsObservables = guilds.map(guild =>
                this.getEarningsForGuild(guild.guild_id)
            );

            // Use forkJoin to run all fetches in parallel and combine results
            // forkJoin emits an array containing the results of each inner observable
            // We use defaultIfEmpty([]) in case the earningsObservables array is empty,
            // although the previous check should prevent this.
            return forkJoin(earningsObservables).pipe(
                defaultIfEmpty([] as Earning[][]) // Ensure forkJoin emits even if input is empty
            );
        }),
        map((arrayOfEarningsArrays: Earning[][]) => {
            // Flatten the array of arrays into a single array of Earning objects
            const allEarnings = arrayOfEarningsArrays.flat();
            console.log(`EarningsService: Total earnings fetched across all guilds: ${allEarnings.length}`);
            return allEarnings;
        }),
        catchError(this.handleError) // Catch errors from userService.getAvailableGuildIds or the overall process
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
