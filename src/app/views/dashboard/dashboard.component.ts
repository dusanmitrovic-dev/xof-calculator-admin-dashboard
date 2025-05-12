import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';

// Import Services
import { EarningsService, Earning } from '../../services/earnings.service';
import { GuildConfigService, GuildConfig } from '../../services/guild-config.service';

// Import CoreUI modules
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  WidgetStatAComponent,
  ButtonDirective,
  SharedModule,
  TableDirective,
  BadgeComponent,
  FormControlDirective,
  LabelDirective,
  IconDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Icon Import (ensure IconSetService is provided and icons are registered)
import { IconSetService } from '@coreui/icons-angular';
import { cilSettings, cilCheckCircle } from '@coreui/icons';

interface SummaryStats {
  totalGuilds: number;
  totalCoinsEarned: number;
  topGuild: { name: string | null; coins: number } | null;
  avgCoinsPerMessage: number;
}

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
    CommonModule, // Includes *ngFor, | date, | slice, | number
    FormsModule, // Includes [(ngModel)]
    RouterLink,
    ContainerComponent,
    RowComponent,
    ColComponent,
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
    LabelDirective,
    IconDirective
  ],
  providers: [DatePipe, DecimalPipe, IconSetService] // Add DatePipe, DecimalPipe, IconSetService
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  private guildConfigService = inject(GuildConfigService);
  private datePipe = inject(DatePipe);
  private iconSetService = inject(IconSetService);

  allEarnings: Earning[] = [];
  filteredEarnings: Earning[] = [];
  allConfigs: GuildConfig[] = [];

  summaryStats: SummaryStats = {
    totalGuilds: 0,
    totalCoinsEarned: 0,
    topGuild: null,
    avgCoinsPerMessage: 0
  };

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

  // Chart Data Properties
  earningsOverTimeChartData: ChartData = { labels: [], datasets: [] };
  topGuildsChartData: ChartData = { labels: [], datasets: [] };
  earningsDistributionChartData: ChartData = { labels: [], datasets: [] }; // Optional Pie chart

  // Chart Options (Optional, for customization)
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Horizontal bars might be better for guild names
  };

  constructor() {
    // Inject icons
    this.iconSetService.icons = { cilSettings, cilCheckCircle };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Use forkJoin or combineLatest if you want parallel fetching
    this.guildConfigService.getAllConfigs().subscribe({
      next: (configs) => {
        this.allConfigs = configs;
        this.summaryStats.totalGuilds = configs.length;
        this.calculateConfigHealth();
        // Fetch earnings only after configs are loaded if needed for guild names
        this.fetchEarnings();
      },
      error: (err) => console.error('Error fetching guild configurations:', err)
    });
  }

  fetchEarnings(): void {
     this.earningsService.getAllEarningsAcrossGuilds().subscribe({
      next: (earnings) => {
        // Ensure date objects are valid Date instances
        this.allEarnings = earnings.map(e => ({
          ...e,
          date: new Date(e.date) // Convert date string/number to Date object
        }));
        this.filteredEarnings = [...this.allEarnings]; // Initialize filtered list
        this.calculateSummaryStats();
        this.prepareChartData();
        this.applyFilters(); // Apply initial (empty) filters
      },
      error: (err) => console.error('Error fetching earnings:', err)
    });
  }

  calculateSummaryStats(): void {
    this.summaryStats.totalCoinsEarned = this.allEarnings.reduce((sum, e) => sum + (e.coinsEarned || 0), 0);
    this.summaryStats.avgCoinsPerMessage = this.allEarnings.length > 0
      ? this.summaryStats.totalCoinsEarned / this.allEarnings.length
      : 0;

    // Calculate top earning guild
    const guildEarnings: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
      guildEarnings[e.guildId] = (guildEarnings[e.guildId] || 0) + (e.coinsEarned || 0);
    });

    let topGuildId: string | null = null;
    let maxCoins = 0;
    for (const guildId in guildEarnings) {
      if (guildEarnings[guildId] > maxCoins) {
        maxCoins = guildEarnings[guildId];
        topGuildId = guildId;
      }
    }

    if (topGuildId) {
      const topConfig = this.allConfigs.find(c => c.guildId === topGuildId);
      this.summaryStats.topGuild = {
        name: topConfig?.guildName || `Guild ${topGuildId}`,
        coins: maxCoins
      };
    } else {
      this.summaryStats.topGuild = null;
    }
  }

  calculateConfigHealth(): void {
    this.configHealth.missingPrefix = this.allConfigs.filter(c => !c.prefix?.trim()).length;
    this.configHealth.noRoles = this.allConfigs.filter(c => !c.allowedRoles || c.allowedRoles.length === 0).length;
    this.configHealth.noChannels = this.allConfigs.filter(c => !c.allowedChannels || c.allowedChannels.length === 0).length;
  }

  prepareChartData(): void {
    // 1. Earnings Over Time (Line Chart)
    const earningsByDate: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
      const dateStr = this.datePipe.transform(e.date, 'yyyy-MM-dd') || 'unknown';
      earningsByDate[dateStr] = (earningsByDate[dateStr] || 0) + (e.coinsEarned || 0);
    });

    const sortedDates = Object.keys(earningsByDate).sort();
    this.earningsOverTimeChartData = {
      labels: sortedDates,
      datasets: [
        {
          label: 'Coins Earned Daily',
          data: sortedDates.map(date => earningsByDate[date]),
          borderColor: '#321fdb',
          tension: 0.1
        }
      ]
    };

    // 2. Top 5 Guilds by Earnings (Bar Chart)
    const guildEarnings: { [key: string]: { name: string; coins: number } } = {};
    this.allEarnings.forEach(e => {
       const config = this.allConfigs.find(c => c.guildId === e.guildId);
       const guildName = config?.guildName || `Guild ${e.guildId}`;
       if (!guildEarnings[e.guildId]) {
         guildEarnings[e.guildId] = { name: guildName, coins: 0 };
       }
      guildEarnings[e.guildId].coins += (e.coinsEarned || 0);
    });

    const sortedGuilds = Object.values(guildEarnings)
                                .sort((a, b) => b.coins - a.coins)
                                .slice(0, 5); // Top 5

    this.topGuildsChartData = {
      labels: sortedGuilds.map(g => g.name),
      datasets: [
        {
          label: 'Total Coins Earned',
          data: sortedGuilds.map(g => g.coins),
          backgroundColor: ['#321fdb', '#3399ff', '#2eb85c', '#f9b115', '#e55353'], // Example colors
        }
      ]
    };

    // Optional: Prepare Pie Chart data if needed
  }

  applyFilters(): void {
    const guildFilter = this.filters.guild?.toLowerCase();
    const userFilter = this.filters.user?.toLowerCase();
    const dateFilter = this.filters.date; // Expects 'YYYY-MM-DD'

    this.filteredEarnings = this.allEarnings.filter(earning => {
      const guildConfig = this.allConfigs.find(c => c.guildId === earning.guildId);
      const guildName = guildConfig?.guildName?.toLowerCase() || '';
      const userId = earning.userId?.toLowerCase() || '';
      const earningDateStr = this.datePipe.transform(earning.date, 'yyyy-MM-dd') || '';

      const guildMatch = !guildFilter || guildName.includes(guildFilter) || earning.guildId.toLowerCase().includes(guildFilter);
      const userMatch = !userFilter || userId.includes(userFilter);
      const dateMatch = !dateFilter || earningDateStr === dateFilter;

      return guildMatch && userMatch && dateMatch;
    });
  }
}
