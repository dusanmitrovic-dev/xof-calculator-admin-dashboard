import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  private networkDelay = 500;
  private earnings: Earning[] = []; // Keep local copy for mock updates

  constructor() {
    // Pre-process the data on service initialization
    this.earnings = this.flattenEarnings((earningsDataJson as any).default);
  }

  private flattenEarnings(rawData: RawEarningsData): Earning[] {
     console.log('Mock Service: Flattening Earnings Data');
    const flattened: Earning[] = [];
    for (const userId in rawData) {
      if (Object.prototype.hasOwnProperty.call(rawData, userId)) {
        rawData[userId].forEach(entry => {
          flattened.push({ ...entry, userId: userId });
        });
      }
    }
    // Optional: Sort by date initially?
    // flattened.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return flattened;
  }

  getEarnings(): Observable<Earning[]> {
     console.log('Mock Service: Fetching Earnings');
    // Return a copy to prevent direct modification of the service's array
    return of([...this.earnings]).pipe(delay(this.networkDelay));
  }

  // --- Mock CRUD Operations ---
  // In a real app, these would be API calls that return the result or confirmation

  addEarning(newEarning: Omit<Earning, 'id'>): Observable<Earning> {
    console.log('Mock Service: Adding Earning', newEarning);
    const earningWithId: Earning = {
        ...newEarning,
        // Generate a simple mock ID
        id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    };
    this.earnings.push(earningWithId);
    alert('Earning added (mock). Implement API call.');
    return of(earningWithId).pipe(delay(this.networkDelay));
  }

  updateEarning(updatedEarning: Earning): Observable<Earning> {
     console.log('Mock Service: Updating Earning', updatedEarning);
     const index = this.earnings.findIndex(e => e.id === updatedEarning.id);
     if (index > -1) {
         this.earnings[index] = updatedEarning;
         alert('Earning updated (mock). Implement API call.');
         return of(updatedEarning).pipe(delay(this.networkDelay));
     } else {
        console.error('Mock Service: Earning not found for update', updatedEarning.id);
        throw new Error('Earning not found'); // Simulate API error
     }
  }

  deleteEarning(earningId: string): Observable<boolean> {
     console.log('Mock Service: Deleting Earning', earningId);
     const initialLength = this.earnings.length;
     this.earnings = this.earnings.filter(e => e.id !== earningId);
     const success = this.earnings.length < initialLength;
     if (success) {
        alert('Earning deleted (mock). Implement API call.');
     } else {
         console.error('Mock Service: Earning not found for deletion', earningId);
     }
     return of(success).pipe(delay(this.networkDelay));
  }
}