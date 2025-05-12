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
  SharedModule,          // Provides templates like cTemplateId
  TableDirective,
  BadgeComponent,
  FormControlDirective,
  FormLabelDirective, // Corrected from LabelDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Icon Import (ensure IconSetService is provided and icons are registered)
import { IconModule, IconSetService } from '@coreui/icons-angular'; // Import IconModule
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
    FormLabelDirective, // Corrected
    IconModule         // Added for cIcon directive
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

  // Chart Options (Optional, for customization)
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
  };

  constructor() {
    // Inject icons
    this.iconSetService.icons = { cilSettings, cilCheckCircle };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Assuming the method name is getGuildConfigs(), replace if different
    this.guildConfigService.getGuildConfigs().subscribe({
      next: (configs: GuildConfig[]) => { // Added type
        this.allConfigs = configs;
        this.summaryStats.totalGuilds = configs.length;
        this.calculateConfigHealth();
        // Fetch earnings after configs are loaded
        this.fetchEarnings();
      },
      error: (err: any) => console.error('Error fetching guild configurations:', err) // Added type
    });
  }

  fetchEarnings(): void {
     this.earningsService.getAllEarningsAcrossGuilds().subscribe({
      next: (earnings: Earning[]) => {
        // Keep date as string/number as defined in Earning interface
        this.allEarnings = earnings;
        this.filteredEarnings = [...this.allEarnings];
        this.calculateSummaryStats();
        this.prepareChartData();
        this.applyFilters();
      },
      error: (err: any) => console.error('Error fetching earnings:', err)
    });
  }

  calculateSummaryStats(): void {
    // Assuming coins earned property is total_cut
    this.summaryStats.totalCoinsEarned = this.allEarnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    this.summaryStats.avgCoinsPerMessage = this.allEarnings.length > 0
      ? this.summaryStats.totalCoinsEarned / this.allEarnings.length
      : 0;

    // Calculate top earning guild
    const guildEarnings: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
      // Use guild_id and total_cut
      guildEarnings[e.guild_id] = (guildEarnings[e.guild_id] || 0) + (e.total_cut || 0);
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
      // Use guild_id and guild_name
      const topConfig = this.allConfigs.find(c => c.guild_id === topGuildId);
      this.summaryStats.topGuild = {
        name: topConfig?.guild_name || `Guild ${topGuildId}`, // Assuming guild_name
        coins: maxCoins
      };
    } else {
      this.summaryStats.topGuild = null;
    }
  }

  calculateConfigHealth(): void {
    // Assuming property names: command_prefix, allowed_roles, allowed_channels
    this.configHealth.missingPrefix = this.allConfigs.filter(c => !c.command_prefix?.trim()).length;
    this.configHealth.noRoles = this.allConfigs.filter(c => !c.allowed_roles || c.allowed_roles.length === 0).length;
    this.configHealth.noChannels = this.allConfigs.filter(c => !c.allowed_channels || c.allowed_channels.length === 0).length;
  }

  prepareChartData(): void {
    // 1. Earnings Over Time (Line Chart)
    const earningsByDate: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
      // Use total_cut
      const dateStr = this.datePipe.transform(e.date, 'yyyy-MM-dd') || 'unknown';
      earningsByDate[dateStr] = (earningsByDate[dateStr] || 0) + (e.total_cut || 0);
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
    const guildEarningsMap: { [key: string]: { name: string; coins: number } } = {};
    this.allEarnings.forEach(e => {
       // Use guild_id and guild_name
       const config = this.allConfigs.find(c => c.guild_id === e.guild_id);
       const guildName = config?.guild_name || `Guild ${e.guild_id}`; // Assuming guild_name
       if (!guildEarningsMap[e.guild_id]) {
         guildEarningsMap[e.guild_id] = { name: guildName, coins: 0 };
       }
       // Use total_cut
      guildEarningsMap[e.guild_id].coins += (e.total_cut || 0);
    });

    const sortedGuilds = Object.values(guildEarningsMap)
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
  }

  applyFilters(): void {
    const guildFilter = this.filters.guild?.toLowerCase();
    const userFilter = this.filters.user?.toLowerCase(); // Assuming filtering by user_mention
    const dateFilter = this.filters.date; // Expects 'YYYY-MM-DD'

    this.filteredEarnings = this.allEarnings.filter(earning => {
      // Use guild_id and guild_name
      const guildConfig = this.allConfigs.find(c => c.guild_id === earning.guild_id);
      const guildName = guildConfig?.guild_name?.toLowerCase() || ''; // Assuming guild_name
      // Assuming user identifier is user_mention
      const userMention = earning.user_mention?.toLowerCase() || '';
      const earningDateStr = this.datePipe.transform(earning.date, 'yyyy-MM-dd') || '';

      const guildMatch = !guildFilter || guildName.includes(guildFilter) || earning.guild_id.toLowerCase().includes(guildFilter);
      // Filter based on user_mention
      const userMatch = !userFilter || userMention.includes(userFilter);
      const dateMatch = !dateFilter || earningDateStr === dateFilter;

      return guildMatch && userMatch && dateMatch;
    });
  }
}
