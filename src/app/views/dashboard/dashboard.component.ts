import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
// Removed RouterLink as it's not used
// Removed ReactiveFormsModule, FormBuilder, FormGroup as filters are removed
// Removed Router as navigation buttons are removed
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, of } from 'rxjs'; // Removed switchMap, tap as they might not be needed if fetchData is simplified

// Import Services
import { EarningsService, Earning } from '../../services/earnings.service';

// Import CoreUI modules
import {
  ContainerComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  WidgetStatAComponent,
  // ButtonDirective, // Removed as buttons are gone
  SharedModule,
  TableDirective,
  ColComponent,
  RowComponent,
  // Removed FormControlDirective, FormLabelDirective as filters are gone
  // Removed InputGroupComponent, InputGroupTextDirective as filters are gone
  // Removed CardFooterComponent as buttons are gone
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Icon Import (optional, can be removed if no icons used)
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilChartLine } from '@coreui/icons'; // Removed unused icons cilPlus, cilList

// Interface for the new summary statistics
interface DashboardSummaryStats {
  totalGrossRevenue: number;
  totalEntries: number;
  avgCutPerEntry: number;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    // Removed ReactiveFormsModule
    // Removed RouterLink
    ContainerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    WidgetStatAComponent,
    // Removed ButtonDirective
    SharedModule,
    ChartjsComponent,
    TableDirective,
    ColComponent,
    RowComponent,
    // Removed FormControlDirective
    // Removed FormLabelDirective
    // Removed InputGroupComponent
    // Removed InputGroupTextDirective
    // Removed CardFooterComponent
    IconModule // Keep if icons are used in template (e.g., in widgets/cards)
  ],
  providers: [DatePipe, DecimalPipe, CurrencyPipe, IconSetService]
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  private datePipe = inject(DatePipe);
  // Removed router injection
  // Removed fb injection
  private iconSetService = inject(IconSetService); // Keep if icons are used

  allEarnings: Earning[] = [];
  // Removed filteredEarnings
  recentRevenueEntries: Earning[] = [];

  // Use the new interface for summary stats
  summaryStats: DashboardSummaryStats = {
    totalGrossRevenue: 0,
    totalEntries: 0,
    avgCutPerEntry: 0
  };

  // Removed filterForm

  revenueOverTimeChartData: ChartData<'line'> = { labels: [], datasets: [] };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: (value) => {
                    if (typeof value === 'number') {
                        return '$' + value.toLocaleString();
                    }
                    return value;
                }
            }
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                       label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    }
  };


  constructor() {
    // Assign necessary icons (only chart icon needed now)
    this.iconSetService.icons = { cilChartLine };
    // Removed filterForm initialization
  }

  ngOnInit(): void {
    this.fetchData();
    // Removed subscription to filterForm changes
  }

  fetchData(): void {
    this.earningsService.getAllEarningsAcrossGuilds().pipe(
      catchError(err => {
          console.error('Error fetching all earnings:', err);
          return of([]); // Return an empty array on error
      })
    ).subscribe((earnings: Earning[]) => {
        this.allEarnings = earnings;
        // Calculate stats based on all data
        this.calculateSummaryStats(this.allEarnings);
        // Prepare chart based on all data
        this.prepareRevenueChartData(this.allEarnings);
        // Populate recent entries directly from all data
        this.populateRecentEntries(this.allEarnings);
    });
  }

  // Calculates summary stats based on provided earnings array
  calculateSummaryStats(earnings: Earning[]): void {
    this.summaryStats.totalGrossRevenue = earnings.reduce((sum, e) => sum + (e.gross_revenue || 0), 0);
    this.summaryStats.totalEntries = earnings.length;
    const totalCut = earnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    this.summaryStats.avgCutPerEntry = this.summaryStats.totalEntries > 0
      ? (totalCut / this.summaryStats.totalEntries)
      : 0;
  }

  // Plots Gross Revenue over time
  prepareRevenueChartData(earnings: Earning[]): void {
    const revenueByDate: { [key: string]: number } = {};
    earnings.forEach(e => {
      const dateStr = e.date ? this.datePipe.transform(e.date, 'yyyy-MM-dd') : null;
      if (dateStr) {
          revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + (e.gross_revenue || 0);
      }
    });

    const sortedDates = Object.keys(revenueByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.revenueOverTimeChartData = {
      labels: sortedDates.map(date => this.datePipe.transform(date, 'MMM d')),
      datasets: [
        {
          label: 'Gross Revenue',
          data: sortedDates.map(date => revenueByDate[date]),
          borderColor: '#321fdb',
          tension: 0.1,
          fill: false
        }
      ]
    };
  }

  // Populates the recent entries table
  populateRecentEntries(earnings: Earning[]): void {
    this.recentRevenueEntries = [...earnings] // Create a copy to avoid mutating the original array
                                    .sort((a, b) => {
                                      // Handle potential null/undefined dates during sort
                                      const dateA = a.date ? new Date(a.date).getTime() : 0;
                                      const dateB = b.date ? new Date(b.date).getTime() : 0;
                                      return dateB - dateA; // Sort descending
                                    })
                                    .slice(0, 10); // Take the latest 10
  }

  // Removed applyFilters method
  // Removed resetFilters method
  // Removed navigateToAddEntry method
  // Removed navigateToViewAll method
}
