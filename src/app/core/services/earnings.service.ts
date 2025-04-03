import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs'; // Import timer
import { delay, map, catchError } from 'rxjs/operators';
import { Earning } from '../models/earning.model';

// Import Mock Data using ES module imports if possible, or default import
// Adjust based on your tsconfig.json ("esModuleInterop": true, "allowSyntheticDefaultImports": true helps)
import * as earningsDataJson from '../data/earnings.json';

interface RawEarningsData {
  [userId: string]: Omit<Earning, 'userId'>[];
}

@Injectable({
  providedIn: 'root',
})
export class EarningsService {
  private networkDelay = 500; // ms
  private earnings: Earning[] = []; // In-memory store of flattened earnings

  constructor() {
    // Type assertion for the default import if needed
    const rawData = (earningsDataJson as any).default || earningsDataJson;
    this.earnings = this.flattenAndCleanEarnings(rawData);
    console.log(
      `Mock EarningsService: Initialized with ${this.earnings.length} flattened records.`
    );
  }

  // Combined flattening and basic data cleaning/defaulting
  private flattenAndCleanEarnings(rawData: RawEarningsData): Earning[] {
    const flattened: Earning[] = [];
    if (!rawData) {
      console.warn('Mock Service: Raw earnings data is null or undefined.');
      return flattened;
    }
    for (const userId in rawData) {
      // Ensure it's an actual property and not from the prototype chain
      if (Object.prototype.hasOwnProperty.call(rawData, userId)) {
        const userEntries = rawData[userId];
        if (Array.isArray(userEntries)) {
          userEntries.forEach((entry, index) => {
            // Provide defaults for potentially missing fields using nullish coalescing
            flattened.push({
              id: entry.id || `mock-${userId}-${index}-${Date.now()}`, // Generate a more unique mock ID
              userId: userId,
              date: entry.date || new Date().toISOString().split('T')[0], // Default to today if missing
              total_cut: entry.total_cut ?? null, // Use null as default for missing numbers
              gross_revenue: entry.gross_revenue ?? null,
              period: entry.period ?? null,
              shift: entry.shift ?? null,
              role: entry.role ?? null,
              models: entry.models ?? null,
              hours_worked: entry.hours_worked ?? null,
            });
          });
        }
      }
    }
    console.log(
      'Mock Service: Flattening and Cleaning Earnings Data Completed'
    );
    return flattened;
  }

  // --- Read Operation ---
  getEarnings(): Observable<Earning[]> {
    console.log('Mock Service: Fetching Earnings');
    // Simulate network delay and return a deep copy to prevent mutation
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this.earnings)))
    );
  }

  // --- Mock Create Operation ---
  addEarning(newEarningData: Omit<Earning, 'id'>): Observable<Earning> {
    console.log('Mock Service: Adding Earning', newEarningData);
    const newEarning: Earning = {
      ...newEarningData,
      id: `earning-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      // Ensure defaults for any potentially missing optional fields from input
      total_cut: newEarningData.total_cut ?? null,
      gross_revenue: newEarningData.gross_revenue ?? null,
      period: newEarningData.period ?? null,
      shift: newEarningData.shift ?? null,
      role: newEarningData.role ?? null,
      models: newEarningData.models ?? null,
      hours_worked: newEarningData.hours_worked ?? null,
    };
    this.earnings.push(newEarning);
    console.log(
      `Mock Service: Earning added. Total count: ${this.earnings.length}`
    );
    // Simulate delay and return a deep copy
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(newEarning)))
    );
  }

  // --- Mock Update Operation ---
  updateEarning(updatedEarning: Earning): Observable<Earning> {
    console.log('Mock Service: Updating Earning', updatedEarning);
    const index = this.earnings.findIndex((e) => e.id === updatedEarning.id);

    return timer(this.networkDelay).pipe(
      map(() => {
        if (index > -1) {
          // Update with a deep copy to ensure no reference issues
          this.earnings[index] = JSON.parse(JSON.stringify(updatedEarning));
          console.log(
            'Mock Service: Earning updated successfully.',
            updatedEarning.id
          );
          // Return a deep copy of the updated earning
          return this.earnings[index];
        } else {
          console.error(
            'Mock Service: Earning not found for update',
            updatedEarning.id
          );
          // Throw an error to be caught by the component
          throw new Error(`Earning with ID ${updatedEarning.id} not found`);
        }
      }),
      catchError((err) => throwError(() => err)) // Re-throw the error
    );
  }

  // --- Mock Delete Operation ---
  deleteEarning(earningId: string): Observable<boolean> {
    console.log('Mock Service: Attempting to delete Earning', earningId);
    const initialLength = this.earnings.length;
    this.earnings = this.earnings.filter((e) => e.id !== earningId);
    const success = this.earnings.length < initialLength;

    return timer(this.networkDelay).pipe(
      map(() => {
        if (success) {
          console.log(
            `Mock Service: Earning deleted. Total count: ${this.earnings.length}`
          );
          return true;
        } else {
          console.error(
            'Mock Service: Earning not found for deletion',
            earningId
          );
          // Throw an error or return false based on expected API behavior
          // Let's throw an error for consistency with update
          throw new Error(
            `Earning with ID ${earningId} not found for deletion`
          );
          // return false; // Alternative: return false if API would return 404 but not error
        }
      }),
      catchError((err) => throwError(() => err)) // Re-throw the error
    );
  }
}
