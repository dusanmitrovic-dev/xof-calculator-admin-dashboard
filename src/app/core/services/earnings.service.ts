import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Earning } from '../models/earning.model';

// Import Mock Data
import * as earningsDataJson from '../data/earnings.json';

interface RawEarningsData {
  [userId: string]: Omit<Earning, 'userId'>[];
}

@Injectable({
  providedIn: 'root',
})
export class EarningsService {
  private networkDelay = 1;
  private earnings: Earning[] = []; // Keep local copy for mock updates

  constructor() {
    // Pre-process the data on service initialization
    this.earnings = this.flattenEarnings((earningsDataJson as any).default);
    console.log(
      `Mock EarningsService: Initialized with ${this.earnings.length} flattened records.`
    );
  }

  private flattenEarnings(rawData: RawEarningsData): Earning[] {
    const flattened: Earning[] = [];
    for (const userId in rawData) {
      if (Object.prototype.hasOwnProperty.call(rawData, userId)) {
        rawData[userId].forEach((entry) => {
          // Ensure all required fields exist, potentially adding defaults if needed
          flattened.push({
            id: entry.id || `mock-${Date.now()}-${Math.random()}`, // Ensure ID exists
            userId: userId,
            date: entry.date,
            total_cut: entry.total_cut ?? 0,
            gross_revenue: entry.gross_revenue ?? 0,
            period: entry.period ?? 'N/A',
            shift: entry.shift ?? 'N/A',
            role: entry.role ?? 'Unknown',
            models: entry.models ?? 'N/A',
            hours_worked: entry.hours_worked ?? 0,
          });
        });
      }
    }
    console.log('Mock Service: Flattening Earnings Data Completed');
    return flattened;
  }

  getEarnings(): Observable<Earning[]> {
    console.log('Mock Service: Fetching Earnings');
    // Return a copy to prevent direct modification of the service's array
    return of([...this.earnings]).pipe(delay(this.networkDelay));
  }

  // --- Mock CRUD Operations ---

  addEarning(newEarningData: Omit<Earning, 'id'>): Observable<Earning> {
    console.log('Mock Service: Adding Earning', newEarningData);
    const newEarning: Earning = {
      ...newEarningData,
      // Generate a simple mock ID (ensure uniqueness better in real app)
      id: `earning-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    };
    this.earnings.push(newEarning);
    console.log(
      `Mock Service: Earning added. Total count: ${this.earnings.length}`
    );
    // Return a copy of the added earning
    return of({ ...newEarning }).pipe(delay(this.networkDelay));
  }

  updateEarning(updatedEarning: Earning): Observable<Earning> {
    console.log('Mock Service: Updating Earning', updatedEarning);
    const index = this.earnings.findIndex((e) => e.id === updatedEarning.id);
    if (index > -1) {
      this.earnings[index] = { ...updatedEarning }; // Update with a copy
      console.log(
        'Mock Service: Earning updated successfully.',
        updatedEarning.id
      );
      // Return a copy of the updated earning
      return of({ ...this.earnings[index] }).pipe(delay(this.networkDelay));
    } else {
      console.error(
        'Mock Service: Earning not found for update',
        updatedEarning.id
      );
      // Simulate API error
      return throwError(
        () => new Error(`Earning with ID ${updatedEarning.id} not found`)
      );
    }
  }

  deleteEarning(earningId: string): Observable<boolean> {
    console.log('Mock Service: Attempting to delete Earning', earningId);
    const initialLength = this.earnings.length;
    this.earnings = this.earnings.filter((e) => e.id !== earningId);
    const success = this.earnings.length < initialLength;
    if (success) {
      console.log(
        `Mock Service: Earning deleted. Total count: ${this.earnings.length}`
      );
    } else {
      console.error('Mock Service: Earning not found for deletion', earningId);
    }
    // Simulate API returning success status
    return of(success).pipe(delay(this.networkDelay));
  }
}
