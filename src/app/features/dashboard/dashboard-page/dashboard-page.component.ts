import { Component, OnInit, OnDestroy } from '@angular/core';
import { EarningsService } from '../../../core/services/earnings.service';
// import { SettingsService } from '../../../core/services/settings.service'; // Only if needed
import { Earning } from '../../../core/models/earning.model';
import { Subject } from 'rxjs';
import { takeUntil, map, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'], // Link SCSS file
  standalone: false,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  isLoading = true;
  totalEntries = 0;
  totalGrossRevenue = 0;
  totalCut = 0;
  userCount = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private earningsService: EarningsService,
    private snackBar: MatSnackBar
  ) // private settingsService: SettingsService // Inject if settings are needed here
  {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.earningsService
      .getEarnings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)) // Ensure loading stops
      )
      .subscribe({
        next: (earnings: Earning[]) => {
          if (!earnings) {
            // Handle potential null/undefined response
            console.warn('Received null or undefined earnings data.');
            this.totalEntries = 0;
            this.totalGrossRevenue = 0;
            this.totalCut = 0;
            this.userCount = 0;
            return;
          }

          this.totalEntries = earnings.length;
          this.totalGrossRevenue = earnings.reduce(
            (sum, entry) => sum + (entry.gross_revenue || 0),
            0
          );
          this.totalCut = earnings.reduce(
            (sum, entry) => sum + (entry.total_cut || 0),
            0
          );
          const uniqueUsers = new Set(earnings.map((e) => e.userId));
          this.userCount = uniqueUsers.size;
        },
        error: (error) => {
          console.error('Error loading dashboard data', error);
          this.snackBar.open('Could not load dashboard statistics.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
          // Reset stats on error
          this.totalEntries = 0;
          this.totalGrossRevenue = 0;
          this.totalCut = 0;
          this.userCount = 0;
        },
      });
  }
}
