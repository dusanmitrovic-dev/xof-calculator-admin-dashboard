import { Component, OnInit, OnDestroy } from '@angular/core';
import { EarningsService } from '../../core/services/earnings.service'; // Adjust paths
import { SettingsService } from '../../core/services/settings.service';
import { Earning } from '../../core/models/earning.model';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  isLoading = true;
  totalEntries = 0;
  totalGrossRevenue = 0;
  totalCut = 0;
  userCount = 0;
  // Add more stats as needed

  private destroy$ = new Subject<void>();

  constructor(
    private earningsService: EarningsService,
    private settingsService: SettingsService // If settings needed for dashboard
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    // Example: Combine earnings and potentially user count from settings
    this.earningsService
      .getEarnings() // Using the already flattened data from service constructor
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (earnings: Earning[]) => {
          this.totalEntries = earnings.length;
          this.totalGrossRevenue = earnings.reduce(
            (sum, entry) => sum + (entry.gross_revenue || 0),
            0
          );
          this.totalCut = earnings.reduce(
            (sum, entry) => sum + (entry.total_cut || 0),
            0
          );
          // Calculate unique users based on the flattened data
          const uniqueUsers = new Set(earnings.map((e) => e.userId));
          this.userCount = uniqueUsers.size;

          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading dashboard data', error);
          this.isLoading = false;
          // Handle error display
        }
      );
  }
}
