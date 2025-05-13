import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'; // Import ReactiveFormsModule and FormBuilder
import { Router } from '@angular/router'; // Router is used for navigation
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, of, switchMap, tap } from 'rxjs';

// Import Services
import { EarningsService, Earning } from '../../services/earnings.service';
// GuildConfigService might still be needed if user/role data depends on it, but not directly for dashboard stats
// import { GuildConfigService, AvailableGuild } from '../../services/guild-config.service';

// Import CoreUI modules
import {
  ContainerComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  WidgetStatAComponent,
  ButtonDirective,
  SharedModule,
  TableDirective,
  ColComponent, // Added ColComponent
  RowComponent, // Added RowComponent
  FormControlDirective, // Keep for filters
  FormLabelDirective,  // Keep for filters
  // InputGroupComponent, // Removed - not used in template
  // InputGroupTextDirective, // Removed - not used in template
  // CardFooterComponent // Removed - not used in template
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Icon Import (optional, can be removed if no icons used)
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilChartLine, cilPlus, cilList } from '@coreui/icons'; // Example icons

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
    ReactiveFormsModule, // Added ReactiveFormsModule
    // RouterLink, // Removed - not used directly in template (navigation is programmatic)
    ContainerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    WidgetStatAComponent,
    ButtonDirective,
    SharedModule,
    ChartjsComponent,
    TableDirective,
    ColComponent, // Added
    RowComponent, // Added
    FormControlDirective, // Keep
    FormLabelDirective,  // Keep
    // InputGroupComponent, // Removed
    // InputGroupTextDirective, // Removed
    // CardFooterComponent, // Removed
    IconModule // Keep if icons are used
  ],
  providers: [DatePipe, DecimalPipe, CurrencyPipe, IconSetService] // Added CurrencyPipe
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  // private guildConfigService = inject(GuildConfigService); // Uncomment if needed
  private datePipe = inject(DatePipe);
  private router = inject(Router); // Inject Router
  private fb = inject(FormBuilder); // Inject FormBuilder
  private iconSetService = inject(IconSetService); // Keep if icons are used

  allEarnings: Earning[] = [];
  filteredEarnings: Earning[] = [];
  recentRevenueEntries: Earning[] = [];

  // Use the new interface for summary stats
  summaryStats: DashboardSummaryStats = {
    totalGrossRevenue: 0,
    totalEntries: 0,
    avgCutPerEntry: 0
  };

  // Form group for filters
  filterForm: FormGroup;

  revenueOverTimeChartData: ChartData<'line'> = { labels: [], datasets: [] };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                // Optional: Format y-axis ticks as currency
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
                       // Format tooltip value as currency
                       label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    }
  };


  constructor() {
    // Assign necessary icons
    this.iconSetService.icons = { cilChartLine, cilPlus, cilList };

    // Initialize the filter form
    this.filterForm = this.fb.group({
      guildFilter: [''],
      userFilter: [''],
      dateFilter: ['']
    });
  }

  ngOnInit(): void {
    this.fetchData();
    // Subscribe to form changes to apply filters automatically (optional)
    // this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  fetchData(): void {
    // Simplified fetch - focusing only on earnings data for dashboard
    this.earningsService.getAllEarningsAcrossGuilds().pipe(
      catchError(err => {
          console.error('Error fetching all earnings:', err);
          return of([]); // Return an empty array on error
      })
    ).subscribe((earnings: Earning[]) => {
        this.allEarnings = earnings;
        // Calculate stats and prepare charts based on all data initially
        this.calculateSummaryStats(this.allEarnings);
        this.prepareRevenueChartData(this.allEarnings);
        // Apply initial filters (or display all recent entries)
        this.applyFilters();
    });
  }

  // Updated to calculate new metrics based on provided earnings array
  calculateSummaryStats(earnings: Earning[]): void {
    this.summaryStats.totalGrossRevenue = earnings.reduce((sum, e) => sum + (e.gross_revenue || 0), 0);
    this.summaryStats.totalEntries = earnings.length;
    const totalCut = earnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    // Calculate average only if there are entries to avoid division by zero
    this.summaryStats.avgCutPerEntry = this.summaryStats.totalEntries > 0
      ? (totalCut / this.summaryStats.totalEntries)
      : 0;
  }

  // Updated to plot Gross Revenue over time
  prepareRevenueChartData(earnings: Earning[]): void {
    const revenueByDate: { [key: string]: number } = {};
    earnings.forEach(e => {
      // Ensure date is valid before transforming
      const dateStr = e.date ? this.datePipe.transform(e.date, 'yyyy-MM-dd') : null;
      if (dateStr) { // Check if dateStr is not null
          revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + (e.gross_revenue || 0);
      }
    });

    const sortedDates = Object.keys(revenueByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.revenueOverTimeChartData = {
      labels: sortedDates.map(date => this.datePipe.transform(date, 'MMM d')), // Format date labels for readability
      datasets: [
        {
          label: 'Gross Revenue', // Updated label
          data: sortedDates.map(date => revenueByDate[date]),
          borderColor: '#321fdb',
          tension: 0.1,
          fill: false
        }
      ]
    };
  }

  // Applies filters based on form values
  applyFilters(): void {
    const { guildFilter, userFilter, dateFilter } = this.filterForm.value;
    const guildFilterLower = guildFilter?.toLowerCase().trim();
    const userFilterLower = userFilter?.toLowerCase().trim();

    this.filteredEarnings = this.allEarnings.filter(earning => {
      // TODO: Add guild name/ID filtering if needed (requires guild data mapping)
      // const guildMatch = !guildFilterLower // ... add logic ...

      const userMention = earning.user_mention?.toLowerCase() || '';
      // Use the 'id' field (which is the custom ID) for filtering if user_mention is not present
      const userIdMatch = earning.id?.toLowerCase().includes(userFilterLower) || false;
      const userMatch = !userFilterLower || userMention.includes(userFilterLower) || userIdMatch;

      // Ensure date exists before transforming
      const earningDateStr = earning.date ? this.datePipe.transform(earning.date, 'yyyy-MM-dd') : null;
      const dateMatch = !dateFilter || (earningDateStr === dateFilter);

      // Combine matches - Add guildMatch if implemented
      return userMatch && dateMatch; // && guildMatch;
    });

    // Update recent entries based on the filtered list (latest first)
    this.recentRevenueEntries = this.filteredEarnings
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
                                    .slice(0, 10); // Take the latest 10

     // Optionally: Recalculate stats and charts based on filtered data
     // this.calculateSummaryStats(this.filteredEarnings);
     // this.prepareRevenueChartData(this.filteredEarnings);
     // Note: The current setup keeps stats/charts based on ALL data, filters only affect the "Recent Entries" table.
  }

  // Resets the filter form and reapplies filters
  resetFilters(): void {
    this.filterForm.reset({
      guildFilter: '',
      userFilter: '',
      dateFilter: ''
    });
    this.applyFilters();
  }

  // Placeholder navigation methods
  navigateToAddEntry(): void {
    console.log('Navigating to add revenue entry...');
    // Example: this.router.navigate(['/revenue/add']); // Adjust route as needed
    alert('Navigation to "Add Revenue Entry" page not yet implemented.');
  }

  navigateToViewAll(): void {
    console.log('Navigating to view all records...');
    // Example: this.router.navigate(['/revenue/records']); // Adjust route as needed
    alert('Navigation to "View All Records" page not yet implemented.');
     // Or potentially navigate to a dedicated 'earnings-list' or 'revenue-records' component/route
     // Example: this.router.navigate(['/guild-management/earnings-list']); // If using existing structure
  }
}
