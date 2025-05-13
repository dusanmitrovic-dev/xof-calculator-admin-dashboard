import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, of } from 'rxjs';

import { EarningsService, Earning } from '../../services/earnings.service';

import {
  ContainerComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  WidgetStatAComponent,
  SharedModule,
  TableDirective,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilChartLine } from '@coreui/icons';

interface DashboardSummaryStats {
  totalGrossRevenue: number;
  totalEntries: number;
  avgCutPerEntry: number;
  totalCut: number; // Add this property
}

// Add a property to hold the parsed Date object for template use
interface DisplayEarning extends Earning {
  parsedDate: Date | null;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    WidgetStatAComponent,
    SharedModule,
    ChartjsComponent,
    TableDirective,
    ColComponent,
    RowComponent,
    IconModule
  ],
  providers: [DatePipe, DecimalPipe, CurrencyPipe, IconSetService]
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  private datePipe = inject(DatePipe);
  private iconSetService = inject(IconSetService);

  allEarnings: Earning[] = [];
  recentRevenueEntries: DisplayEarning[] = []; // Use the new interface

  summaryStats: DashboardSummaryStats = {
    totalGrossRevenue: 0,
    totalEntries: 0,
    avgCutPerEntry: 0,
    totalCut: 0 // Initialize here
  };

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
    this.iconSetService.icons = { cilChartLine };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private parseDateString(dateStr: string): Date | null {
    // ... (parsing logic remains the same) ...
     if (!dateStr || typeof dateStr !== 'string') {
      return null;
    }
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        const isoDate = new Date(dateStr);
        return !isNaN(isoDate.getTime()) ? isoDate : null;
    }
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(Date.UTC(year, month, day));
        if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) {
          return date;
        }
      }
    }
    console.warn(`[Dashboard] Could not parse invalid date string: ${dateStr}`);
    return null;
  }

  fetchData(): void {
    // ... (fetch logic remains the same) ...
     this.earningsService.getAllEarningsAcrossGuilds().pipe(
      catchError(err => {
          console.error('[Dashboard] Error fetching all earnings:', err);
          return of([]);
      })
    ).subscribe((earnings: Earning[]) => {
        console.log('[Dashboard] Fetched earnings data:', earnings);
        this.allEarnings = earnings;
        this.calculateSummaryStats(this.allEarnings);
        this.prepareRevenueChartData(this.allEarnings);
        this.populateRecentEntries(this.allEarnings);
    });
  }

  calculateSummaryStats(earnings: Earning[]): void {
    this.summaryStats.totalGrossRevenue = earnings.reduce((sum, e) => sum + (e.gross_revenue || 0), 0);
    this.summaryStats.totalEntries = earnings.length;
    // Calculate totalCut and assign it to the summaryStats object
    this.summaryStats.totalCut = earnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    this.summaryStats.avgCutPerEntry = this.summaryStats.totalEntries > 0
      ? (this.summaryStats.totalCut / this.summaryStats.totalEntries) // Use the stored totalCut
      : 0;
     console.log('[Dashboard] Calculated Summary Stats:', this.summaryStats);
  }

  prepareRevenueChartData(earnings: Earning[]): void {
    // ... (chart data logic remains the same) ...
     const revenueByDate: { [key: string]: number } = {};
    earnings.forEach(e => {
      const parsedDate = this.parseDateString(e.date);
      if (parsedDate) {
        const dateStrKey = this.datePipe.transform(parsedDate, 'yyyy-MM-dd');
        if (dateStrKey) {
            revenueByDate[dateStrKey] = (revenueByDate[dateStrKey] || 0) + (e.gross_revenue || 0);
        }
      }
    });

    const sortedDates = Object.keys(revenueByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.revenueOverTimeChartData = {
      labels: sortedDates.map(dateKey => this.datePipe.transform(dateKey, 'MMM d')),
      datasets: [
        {
          label: 'Gross Revenue',
          data: sortedDates.map(dateKey => revenueByDate[dateKey]),
          borderColor: '#321fdb',
          tension: 0.1,
          fill: false
        }
      ]
    };
    console.log('[Dashboard] Prepared Revenue Chart Data:', this.revenueOverTimeChartData);
  }

  populateRecentEntries(earnings: Earning[]): void {
    // ... (recent entries logic remains the same) ...
      this.recentRevenueEntries = [...earnings]
      .map(earning => ({
          ...earning,
          parsedDate: this.parseDateString(earning.date)
      }))
      .sort((a, b) => {
        const timeA = a.parsedDate ? a.parsedDate.getTime() : 0;
        const timeB = b.parsedDate ? b.parsedDate.getTime() : 0;
        return timeB - timeA;
      })
      .slice(0, 10);

    console.log('[Dashboard] Populated Recent Entries (with parsedDate):', this.recentRevenueEntries);
  }
}
