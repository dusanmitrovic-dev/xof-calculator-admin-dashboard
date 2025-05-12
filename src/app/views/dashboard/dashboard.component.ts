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
  FormLabelDirective,
  GridModule // Import GridModule for gutter directive
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Icon Import
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilSettings, cilCheckCircle } from '@coreui/icons';

interface SummaryStats {
  totalGuilds: number;
  totalCoinsEarned: number;
  topGuild: { name: string | null; coins: number } | null;
  avgCoinsPerMessage: number; // Note: This is avg per *earning record*, not message
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
    CommonModule,
    FormsModule,
    RouterLink,
    ContainerComponent,
    // RowComponent, // Provided by GridModule
    // ColComponent, // Provided by GridModule
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
    GridModule // Replaced GutterDirective with GridModule
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

  // Chart Options
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
    this.iconSetService.icons = { cilSettings, cilCheckCircle };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Using getAllConfigs() - Ensure this method exists in GuildConfigService
    this.guildConfigService.getAllConfigs().subscribe({
      next: (configs: GuildConfig[]) => {
        this.allConfigs = configs;
        this.summaryStats.totalGuilds = configs.length;
        this.calculateConfigHealth();
        this.fetchEarnings(); // Fetch earnings only after configs are available
      },
      error: (err: any) => {
         console.error('Error fetching guild configurations with getAllConfigs():', err);
         // Handle error appropriately - maybe show a message to the user
      }
    });
  }

  fetchEarnings(): void {
     this.earningsService.getAllEarningsAcrossGuilds().subscribe({
      next: (earnings: Earning[]) => {
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
    this.summaryStats.totalCoinsEarned = this.allEarnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    this.summaryStats.avgCoinsPerMessage = this.allEarnings.length > 0
      ? this.summaryStats.totalCoinsEarned / this.allEarnings.length
      : 0;

    const guildEarnings: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
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
      const topConfig = this.allConfigs.find(c => c.guild_id === topGuildId);
      // Using camelCase properties for GuildConfig based on TS errors
      this.summaryStats.topGuild = {
        name: topConfig?.guildName || `Guild ${topGuildId}`,
        coins: maxCoins
      };
    } else {
      this.summaryStats.topGuild = null;
    }
  }

  calculateConfigHealth(): void {
    // Using camelCase properties for GuildConfig based on TS errors
    this.configHealth.missingPrefix = this.allConfigs.filter(c => !c.prefix?.trim()).length;
    this.configHealth.noRoles = this.allConfigs.filter(c => !c.allowedRoles || c.allowedRoles.length === 0).length;
    this.configHealth.noChannels = this.allConfigs.filter(c => !c.allowedChannels || c.allowedChannels.length === 0).length;
  }

  prepareChartData(): void {
    // 1. Earnings Over Time (Line Chart)
    const earningsByDate: { [key: string]: number } = {};
    this.allEarnings.forEach(e => {
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
       const config = this.allConfigs.find(c => c.guild_id === e.guild_id);
       // Using camelCase properties for GuildConfig
       const guildName = config?.guildName || `Guild ${e.guild_id}`;
       if (!guildEarningsMap[e.guild_id]) {
         guildEarningsMap[e.guild_id] = { name: guildName, coins: 0 };
       }
      guildEarningsMap[e.guild_id].coins += (e.total_cut || 0);
    });

    const sortedGuilds = Object.values(guildEarningsMap)
                                .sort((a, b) => b.coins - a.coins)
                                .slice(0, 5);

    this.topGuildsChartData = {
      labels: sortedGuilds.map(g => g.name),
      datasets: [
        {
          label: 'Total Coins Earned',
          data: sortedGuilds.map(g => g.coins),
          backgroundColor: ['#321fdb', '#3399ff', '#2eb85c', '#f9b115', '#e55353'],
        }
      ]
    };
  }

  applyFilters(): void {
    const guildFilter = this.filters.guild?.toLowerCase();
    const userFilter = this.filters.user?.toLowerCase();
    const dateFilter = this.filters.date;

    this.filteredEarnings = this.allEarnings.filter(earning => {
      const guildConfig = this.allConfigs.find(c => c.guild_id === earning.guild_id);
      // Using camelCase for GuildConfig
      const guildName = guildConfig?.guildName?.toLowerCase() || '';
      const userMention = earning.user_mention?.toLowerCase() || '';
      const earningDateStr = this.datePipe.transform(earning.date, 'yyyy-MM-dd') || '';

      const guildMatch = !guildFilter || guildName.includes(guildFilter) || earning.guild_id.toLowerCase().includes(guildFilter);
      const userMatch = !userFilter || userMention.includes(userFilter);
      const dateMatch = !dateFilter || earningDateStr === dateFilter;

      return guildMatch && userMatch && dateMatch;
    });
  }
}
