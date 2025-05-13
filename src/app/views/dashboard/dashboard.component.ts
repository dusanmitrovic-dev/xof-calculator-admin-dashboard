import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, of, switchMap, tap } from 'rxjs';

// Import Services
import { EarningsService, Earning } from '../../services/earnings.service';
import { GuildConfigService, AvailableGuild } from '../../services/guild-config.service'; // GuildConfig not needed here anymore

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
  BadgeComponent,
  FormControlDirective,
  FormLabelDirective,
  GridModule
} from '@coreui/angular'; // Removed ListComponent and ListItemComponent
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Icon Import
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilSettings, cilCheckCircle } from '@coreui/icons'; // cilCheckCircle might be unused now

interface SummaryStats {
  totalGuilds: number;
  totalCoinsEarned: number;
  topGuild: { name: string | null; coins: number } | null;
  avgCoinsPerMessage: number;
}

// Define the ConfigHealth interface
interface ConfigHealth {
  missingPrefix: number;
  noRoles: number;
  noChannels: number;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ContainerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    WidgetStatAComponent,
    ButtonDirective,
    SharedModule,
    ChartjsComponent,
    TableDirective,
    BadgeComponent,
    FormControlDirective,
    FormLabelDirective,
    IconModule,
    GridModule
    // Removed ListComponent and ListItemComponent from here
  ],
  providers: [DatePipe, DecimalPipe, IconSetService]
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  private guildConfigService = inject(GuildConfigService);
  private datePipe = inject(DatePipe);
  private iconSetService = inject(IconSetService);

  allEarnings: Earning[] = [];
  filteredEarnings: Earning[] = [];
  availableGuilds: AvailableGuild[] = [];

  summaryStats: SummaryStats = {
    totalGuilds: 0,
    totalCoinsEarned: 0,
    topGuild: null,
    avgCoinsPerMessage: 0
  };

  // Initialize the configHealth property
  configHealth: ConfigHealth = {
    missingPrefix: 0,
    noRoles: 0,
    noChannels: 0
  };

  filters = {
    guild: '',
    user: '',
    date: ''
  };

  earningsOverTimeChartData: ChartData<'line'> = { labels: [], datasets: [] }; // Specify chart type
  topGuildsChartData: ChartData<'bar'> = { labels: [], datasets: [] }; // Specify chart type

  lineChartOptions: ChartOptions<'line'> = { // Specify chart type
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartOptions: ChartOptions<'bar'> = { // Specify chart type
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
  };

  constructor() {
    // cilCheckCircle might be unneeded if ConfigHealth section is fully removed from HTML
    this.iconSetService.icons = { cilSettings, cilCheckCircle };
  }

  ngOnInit(): void {
    this.fetchData();
    // TODO: Add logic here to fetch or calculate actual configHealth data
    // For now, it's initialized with zeros.
  }

  fetchData(): void {
    this.guildConfigService.getAvailableGuilds().pipe(
      tap(guilds => {
        this.availableGuilds = guilds;
        this.summaryStats.totalGuilds = guilds.length;
        // Potential place to calculate configHealth based on guilds if needed
        this.calculateConfigHealth(); // Example call
      }),
      switchMap(() => this.earningsService.getAllEarningsAcrossGuilds()),
      catchError(err => {
          console.error('Error fetching available guilds or all earnings:', err);
          return of([]); // Return an empty array on error
      })
    ).subscribe((earnings: Earning[]) => {
        this.allEarnings = earnings;
        // Initial filter application should happen after data is ready
        this.calculateSummaryStats(); // Calculate stats on full data
        this.prepareChartData(); // Prepare charts on full data
        this.applyFilters(); // Apply filters to display initial filtered view
    });
  }

  // Placeholder method for calculating config health
  calculateConfigHealth(): void {
     // Example: Fetch config health data from a service or calculate based on availableGuilds
     // This is just a placeholder to show where the logic might go.
     // Replace with actual implementation.
     console.log("Calculating or fetching config health (placeholder)...");
     // Simulating data fetch/calculation
     // this.configHealth = fetchedConfigHealthData;
  }


  calculateSummaryStats(): void {
    this.summaryStats.totalCoinsEarned = this.allEarnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    // Calculate average only if there are earnings to avoid division by zero
    this.summaryStats.avgCoinsPerMessage = this.allEarnings.length > 0
      ? (this.summaryStats.totalCoinsEarned / this.allEarnings.length)
      : 0;

    const guildEarnings: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
      // Ensure guild_id is treated as a string key
      const guildIdStr = String(e.guild_id);
      guildEarnings[guildIdStr] = (guildEarnings[guildIdStr] || 0) + (e.total_cut || 0);
    });

    let topGuildId: string | null = null;
    let maxCoins = -Infinity; // Initialize with negative infinity to handle zero/negative coins
    for (const guildId in guildEarnings) {
      if (guildEarnings[guildId] > maxCoins) {
        maxCoins = guildEarnings[guildId];
        topGuildId = guildId;
      }
    }

    if (topGuildId !== null) { // Check for null explicitly
       // Ensure comparison uses the same type (string)
      const topGuildInfo = this.availableGuilds.find(g => String(g.id) === topGuildId);
      this.summaryStats.topGuild = {
        // FIX: Corrected template literal syntax
        name: topGuildInfo?.name || `Guild ${topGuildId}`, // Use topGuildId which is a string
        coins: maxCoins
      };
    } else {
      this.summaryStats.topGuild = null;
    }
  }


  // Added method
  prepareChartData(): void {
    // Earnings Over Time Chart
    const earningsByDate: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
      // Ensure date is valid before transforming
      const dateStr = e.date ? this.datePipe.transform(e.date, 'yyyy-MM-dd') : 'unknown_date';
      if (dateStr) { // Check if dateStr is not null
          earningsByDate[dateStr] = (earningsByDate[dateStr] || 0) + (e.total_cut || 0);
      }
    });

    // Filter out 'unknown_date' before sorting and mapping
    const validDates = Object.keys(earningsByDate).filter(date => date !== 'unknown_date').sort();

    this.earningsOverTimeChartData = {
      labels: validDates,
      datasets: [
        {
          label: 'Coins Earned Daily',
          data: validDates.map(date => earningsByDate[date]),
          borderColor: '#321fdb',
          tension: 0.1,
          fill: false // Added for clarity in line charts
        }
      ]
    };

    // Top Guilds Chart
    const guildEarningsMap: { [key: string]: { name: string; coins: number } } = {};
    this.allEarnings.forEach(e => {
       // Ensure guild_id is treated as a string key
       const guildIdStr = String(e.guild_id);
       // Find guild info using string comparison
       const guildInfo = this.availableGuilds.find(g => String(g.id) === guildIdStr);
       const guildName = guildInfo?.name || `Guild ${guildIdStr}`; // Use guildIdStr if name not found
       if (!guildEarningsMap[guildIdStr]) {
         guildEarningsMap[guildIdStr] = { name: guildName, coins: 0 };
       }
       guildEarningsMap[guildIdStr].coins += (e.total_cut || 0);
    });

    const sortedGuilds = Object.values(guildEarningsMap)
                                .sort((a, b) => b.coins - a.coins)
                                .slice(0, 5); // Get top 5

    this.topGuildsChartData = {
      labels: sortedGuilds.map(g => g.name),
      datasets: [
        {
          label: 'Total Coins Earned',
          data: sortedGuilds.map(g => g.coins),
          backgroundColor: [ // Example colors for top 5
             '#321fdb',
             '#3399ff',
             '#2eb85c',
             '#f9b115',
             '#e55353'
          ],
          borderWidth: 1 // Added for clarity in bar charts
        }
      ]
    };
  }


  // Added method
  applyFilters(): void {
    const guildFilter = this.filters.guild?.toLowerCase().trim();
    const userFilter = this.filters.user?.toLowerCase().trim();
    const dateFilter = this.filters.date; // Assuming date is already in 'yyyy-MM-dd' format or empty

    this.filteredEarnings = this.allEarnings.filter(earning => {
      // Ensure consistent string comparison for guild ID
      const guildIdStr = String(earning.guild_id);
      const guildInfo = this.availableGuilds.find(g => String(g.id) === guildIdStr);
      const guildName = guildInfo?.name?.toLowerCase() || '';

      const userMention = earning.user_mention?.toLowerCase() || '';
      // Ensure date exists before transforming
      const earningDateStr = earning.date ? this.datePipe.transform(earning.date, 'yyyy-MM-dd') : '';
      if (!earningDateStr && dateFilter) return false; // If date filter exists, but earning has no date, filter out

      // Match checks
      const guildMatch = !guildFilter || guildName.includes(guildFilter) || guildIdStr.toLowerCase().includes(guildFilter);
      const userMatch = !userFilter || userMention.includes(userFilter);
      // Check date only if a date filter is provided
      const dateMatch = !dateFilter || earningDateStr === dateFilter;

      return guildMatch && userMatch && dateMatch;
    });

     // NOTE: This dashboard setup calculates stats and charts based on ALL earnings.
     // If you want the stats and charts to dynamically update based on filters,
     // you would need to call calculation/preparation methods here using `this.filteredEarnings`.
     // Example:
     // this.calculateFilteredSummaryStats(this.filteredEarnings);
     // this.prepareFilteredChartData(this.filteredEarnings);
     // And create those corresponding methods.
  }

}
