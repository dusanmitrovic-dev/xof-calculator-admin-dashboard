import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, of, finalize } from 'rxjs'; // Import finalize
import { Router } from '@angular/router';

import { EarningsService, Earning } from '../../services/earnings.service';

import {
  ButtonDirective,
  ContainerComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  WidgetStatAComponent,
  SharedModule,
  TableDirective,
  ColComponent,
  RowComponent,
  TooltipDirective,
  PaginationComponent,
  PageItemDirective,
  PageLinkDirective,
  FormControlDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  DropdownComponent, 
  DropdownToggleDirective, 
  DropdownMenuDirective, 
  DropdownItemDirective 
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import {
  cilChartLine,
  cilDollar,
  cilCalculator,
  cilListNumbered,
  cilChartPie,
  cilArrowTop,
  cilArrowBottom,
  cilSearch,
  cilSave,
  cilInfo 
} from '@coreui/icons';

interface TrendData {
  trend?: 'up' | 'down' | 'neutral';
  deltaPercentage?: string;
}

interface DashboardSummaryStats {
  totalGrossRevenue: number;
  totalEntries: number;
  avgCutPerEntry: number;
  totalCut: number;
  totalGrossRevenueTrend?: TrendData;
  totalCutTrend?: TrendData;
  totalEntriesTrend?: TrendData;
  avgCutPerEntryTrend?: TrendData;
}

interface DisplayEarning extends Earning {
  parsedDate: Date | null;
}

type MetricKey = 'totalGrossRevenue' | 'totalCut' | 'totalEntries' | 'avgCutPerEntry';


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonDirective,
    ContainerComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    // WidgetStatAComponent,
    SharedModule,
    ChartjsComponent,
    TableDirective,
    ColComponent,
    RowComponent,
    IconModule,
    TooltipDirective,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    FormControlDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective
  ],
  providers: [DatePipe, DecimalPipe, CurrencyPipe, IconSetService]
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  private datePipe = inject(DatePipe);
  private iconSetService = inject(IconSetService);
  private router = inject(Router);

  loading: boolean = true; // Add loading property
  userName: string = 'Dule'; // Add userName property (example)

  allRevenueEntries: DisplayEarning[] = [];
  currentPeriodEntries: DisplayEarning[] = [];
  displayableEntries: DisplayEarning[] = [];
  filteredForExport: DisplayEarning[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchTerm: string = '';

  selectedDateRangeLabel: string = 'All Time';
  selectedGuildName: string | null = null;

  summaryStats: DashboardSummaryStats = this.getInitialSummaryStats();
  revenueOverTimeChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'>;

  constructor() {
    this.iconSetService.icons = {
      cilChartLine, cilDollar, cilCalculator, cilListNumbered, cilChartPie,
      cilArrowTop, cilArrowBottom, cilSearch, cilSave, cilInfo
    };

    // Helper to get CSS variable values
    const getCssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue (USD)',
            font: { size: 14, weight: 'bold' }, // Increased size and weight
            color: getCssVar('--cui-body-color') // Use CSS var for dynamic color
          },
          ticks: {
            callback: (value) => typeof value === 'number' ? '$' + value.toLocaleString() : value,
            color: getCssVar('--cui-body-color') // Use CSS var for dynamic color
          },
          grid: {
            display: true, // Display Y-axis grid lines
            color: getCssVar('--cui-border-color-translucent') // Theme-aware grid color
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date',
            font: { size: 14, weight: 'bold' }, // Increased size and weight
            color: getCssVar('--cui-body-color') // Use CSS var for dynamic color
          },
          ticks: {
            color: getCssVar('--cui-body-color') // Use CSS var for dynamic color
          },
          grid: {
            display: true, // Display X-axis grid lines (Changed from false)
            color: getCssVar('--cui-border-color-translucent') // Theme-aware grid color
          }
        }
      },
      plugins: {
        legend: {
          display: true, // Changed to true to display the legend
          labels: {
            font: { size: 13, weight: 500 },
            color: getCssVar('--cui-body-color')
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: getCssVar('--cui-body-bg'),
          titleColor: getCssVar('--cui-body-color'),
          bodyColor: getCssVar('--cui-body-color'),
          borderColor: getCssVar('--cui-border-color'),
          borderWidth: 1,
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
      },
      elements: {
        point: {
          radius: 3,
          hoverRadius: 5,
          hitRadius: 10,
        },
        line: {
          tension: 0.1
        }
      }
    };
  }

  ngOnInit(): void {
    this.fetchAndProcessAllData();
    // Update chart options dynamically after view init when CSS variables are available
    setTimeout(() => this.updateChartColors(), 0);
  }

  // Method to update chart colors based on current CSS variables
  updateChartColors(): void {
    const getCssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (this.lineChartOptions?.scales?.['y']?.title) {
        (this.lineChartOptions.scales['y'].title.color as any) = getCssVar('--cui-body-color');
    }
    if (this.lineChartOptions?.scales?.['y']?.ticks) {
        (this.lineChartOptions.scales['y'].ticks.color as any) = getCssVar('--cui-body-color');
    }
    if (this.lineChartOptions?.scales?.['y']?.grid) {
        this.lineChartOptions.scales['y'].grid.color = getCssVar('--cui-border-color-translucent');
    }
    if (this.lineChartOptions?.scales?.['x']?.title) {
        (this.lineChartOptions.scales['x'].title.color as any) = getCssVar('--cui-body-color');
    }
    if (this.lineChartOptions?.scales?.['x']?.ticks) {
        (this.lineChartOptions.scales['x'].ticks.color as any) = getCssVar('--cui-body-color');
    }
    if (this.lineChartOptions?.plugins?.legend?.labels) {
        (this.lineChartOptions.plugins.legend.labels.color as any) = getCssVar('--cui-body-color');
    }
    if (this.lineChartOptions?.plugins?.tooltip) {
        (this.lineChartOptions.plugins.tooltip.backgroundColor as any) = getCssVar('--cui-body-bg');
        (this.lineChartOptions.plugins.tooltip.titleColor as any) = getCssVar('--cui-body-color');
        (this.lineChartOptions.plugins.tooltip.bodyColor as any) = getCssVar('--cui-body-color');
        this.lineChartOptions.plugins.tooltip.borderColor = getCssVar('--cui-border-color');
    }
    // Trigger chart update if it's already rendered
    if (this.revenueOverTimeChartData.datasets.length > 0) {
        this.revenueOverTimeChartData = { ...this.revenueOverTimeChartData };
    }
  }


  private getInitialSummaryStats(): DashboardSummaryStats {
    return {
      totalGrossRevenue: 0, totalEntries: 0, avgCutPerEntry: 0, totalCut: 0,
      totalGrossRevenueTrend: { trend: 'neutral', deltaPercentage: '—' },
      totalCutTrend: { trend: 'neutral', deltaPercentage: '—' },
      totalEntriesTrend: { trend: 'neutral', deltaPercentage: '—' },
      avgCutPerEntryTrend: { trend: 'neutral', deltaPercentage: '—' }
    };
  }

  private parseDateString(dateStr: string): Date | null {
    if (!dateStr || typeof dateStr !== 'string') return null;
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        const isoDate = new Date(dateStr);
        if (!isNaN(isoDate.getTime())) return isoDate;
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
    return null; 
  }


  fetchAndProcessAllData(): void {
    this.loading = true; // Set loading to true
    this.earningsService.getAllEarningsAcrossGuilds().pipe(
      catchError(err => {
        console.error('[Dashboard] Error fetching all earnings:', err);
        return of([]);
      }),
      finalize(() => { // Set loading to false when the observable completes or errors
        this.loading = false;
      })
    ).subscribe((earnings: Earning[]) => {
      this.allRevenueEntries = [...earnings]
        .map(earning => ({ ...earning, parsedDate: this.parseDateString(earning.date) }))
        .filter(e => e.parsedDate instanceof Date) 
        .sort((a, b) => (b.parsedDate!.getTime()) - (a.parsedDate!.getTime()));
      
      this.setDateRange('30days'); 
    });
  }

  setDateRange(rangeKey: '7days' | '30days' | '90days' | '365days' | 'all'): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let startDate = new Date(0); 

    switch (rangeKey) {
      case '7days':
        this.selectedDateRangeLabel = 'Last 7 Days';
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case '30days':
        this.selectedDateRangeLabel = 'Last 30 Days';
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        break;
      case '90days':
        this.selectedDateRangeLabel = 'Last 90 Days';
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 90);
        break;
      case '365days': // Added case for Last Year
        this.selectedDateRangeLabel = 'Last Year';
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 365);
        break;
      case 'all':
      default:
        this.selectedDateRangeLabel = 'All Time';
        break;
    }

    if (rangeKey === 'all') {
        this.currentPeriodEntries = [...this.allRevenueEntries];
    } else {
        this.currentPeriodEntries = this.allRevenueEntries.filter(entry => {
            return entry.parsedDate && entry.parsedDate.getTime() >= startDate.getTime();
        });
    }
    
    this.searchTerm = '';
    this.currentPage = 1;
    this.updateDataViews();
    // Ensure chart colors are updated if the theme might have changed or for initial load after data set
    setTimeout(() => this.updateChartColors(), 0);
  }

  updateDataViews(): void {
    let searchFilteredEntries = this.currentPeriodEntries;
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const lowerSearchTerm = this.searchTerm.toLowerCase().trim();
      searchFilteredEntries = this.currentPeriodEntries.filter(entry => {
        return (entry.user_mention?.toLowerCase().includes(lowerSearchTerm) ||
                entry.role?.toLowerCase().includes(lowerSearchTerm) ||
                entry.shift?.toLowerCase().includes(lowerSearchTerm) ||
                (entry.parsedDate && this.datePipe.transform(entry.parsedDate, 'shortDate')?.toLowerCase().includes(lowerSearchTerm)) ||
                (entry.gross_revenue?.toString().toLowerCase().includes(lowerSearchTerm)) ||
                (entry.total_cut?.toString().toLowerCase().includes(lowerSearchTerm)));
      });
    }
    this.filteredForExport = searchFilteredEntries;

    this.totalPages = Math.ceil(searchFilteredEntries.length / this.itemsPerPage);
    if (this.totalPages > 0 && this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    else if (this.totalPages === 0) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayableEntries = searchFilteredEntries.slice(startIndex, startIndex + this.itemsPerPage);

    this.calculateSummaryStats(this.currentPeriodEntries);
    this.prepareRevenueChartData(this.currentPeriodEntries);
  }


  calculateSummaryStats(entriesForPeriod: DisplayEarning[]): void {
    this.summaryStats = this.getInitialSummaryStats(); 

    if (!entriesForPeriod || entriesForPeriod.length === 0) {
      return; 
    }

    this.summaryStats.totalGrossRevenue = entriesForPeriod.reduce((sum, e) => sum + (e.gross_revenue || 0), 0);
    this.summaryStats.totalEntries = entriesForPeriod.length;
    this.summaryStats.totalCut = entriesForPeriod.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    this.summaryStats.avgCutPerEntry = this.summaryStats.totalEntries > 0 ? (this.summaryStats.totalCut / this.summaryStats.totalEntries) : 0;

    const mockPreviousPeriodFactor = 0.9; 
    
    this.summaryStats.totalGrossRevenueTrend = this.calculateTrend(this.summaryStats.totalGrossRevenue, this.summaryStats.totalGrossRevenue * mockPreviousPeriodFactor);
    this.summaryStats.totalCutTrend = this.calculateTrend(this.summaryStats.totalCut, this.summaryStats.totalCut * mockPreviousPeriodFactor);
    this.summaryStats.totalEntriesTrend = this.calculateTrend(this.summaryStats.totalEntries, this.summaryStats.totalEntries * mockPreviousPeriodFactor, false); 
    this.summaryStats.avgCutPerEntryTrend = this.calculateTrend(this.summaryStats.avgCutPerEntry, this.summaryStats.avgCutPerEntry * mockPreviousPeriodFactor);
  }

  private calculateTrend(currentValue: number, previousValue: number, lowerIsBetter: boolean = false): TrendData {
    if (previousValue === 0 && currentValue > 0) {
      return { trend: 'up', deltaPercentage: '+100%' }; // Simplified from +100.0% (New)
    }
    if (previousValue === 0 && currentValue === 0) {
        return { trend: 'neutral', deltaPercentage: '—' };
    }
    if (currentValue === previousValue) {
      return { trend: 'neutral', deltaPercentage: '0.0%' };
    }

    const safePreviousValue = previousValue === 0 ? 1 : previousValue;
    const diff = currentValue - safePreviousValue;
    const percentageChange = (diff / Math.abs(safePreviousValue)) * 100;

    let trend: 'up' | 'down';
    if (lowerIsBetter) {
        trend = diff < 0 ? 'up' : 'down';
    } else {
        trend = diff > 0 ? 'up' : 'down';
    }
    
    const sign = percentageChange > 0 ? '+' : '';

    return {
      trend: trend,
      deltaPercentage: `${sign}${percentageChange.toFixed(1)}%`
    };
  }


  prepareRevenueChartData(entriesForPeriod: DisplayEarning[]): void {
    const revenueByDate: { [key: string]: number } = {};
    entriesForPeriod.forEach(e => {
      if (e.parsedDate) { 
        const dateStrKey = this.datePipe.transform(e.parsedDate, 'yyyy-MM-dd');
        if (dateStrKey) {
          revenueByDate[dateStrKey] = (revenueByDate[dateStrKey] || 0) + (e.gross_revenue || 0);
        }
      }
    });

    const sortedDates = Object.keys(revenueByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
    const getCssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const brandInfo = getCssVar('--cui-info') || 'rgba(75, 192, 192, 1)';
    const brandInfoRgb = getCssVar('--cui-info-rgb') || '75, 192, 192'; // Default RGB if var not found
    const brandInfoBg = `rgba(${brandInfoRgb}, 0.2)`;

    this.revenueOverTimeChartData = {
      labels: sortedDates.map(dateKey => this.datePipe.transform(dateKey, 'MMM d')),
      datasets: [{
        label: 'Gross Revenue',
        data: sortedDates.map(dateKey => revenueByDate[dateKey]),
        borderColor: brandInfo,
        backgroundColor: brandInfoBg,
        borderWidth: 2, 
        tension: 0.1,
        fill: true,
        pointBackgroundColor: brandInfo, 
        pointBorderColor: getCssVar('--cui-card-bg'), // Use card-bg for contrast with line
        pointHoverBackgroundColor: getCssVar('--cui-card-bg'),
        pointHoverBorderColor: brandInfo
      }]
    };
  }

  onSearchTermChange(): void {
    this.currentPage = 1;
    this.updateDataViews(); 
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDataViews();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDataViews();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDataViews();
    }
  }
  
  navigateToEntryDetail(entryId: string | undefined): void {
    if (!entryId) return;
    console.log('Navigate to detail for entry ID:', entryId);
  }

  navigateToMetricDetail(metricKey: MetricKey): void {
    console.log('Navigate to detail for metric:', metricKey);
  }

  exportToCsv(): void {
    const dataToExport = this.filteredForExport;
    if (dataToExport.length === 0) {
      alert('No data to export.');
      return;
    }

    const csvHeaders = ['Date', 'User', 'Role', 'Shift', 'Gross Revenue', 'Total Cut'];
    
    const escapeCsvValue = (value: any): string => {
      if (value === null || typeof value === 'undefined') {
        return '';
      }
      let strValue = String(value);
      if (strValue.includes(',') || strValue.includes('"') || strValue.includes('')) {
        strValue = '"' + strValue.replace(/"/g, '""') + '"';
      }
      return strValue;
    };

    let csvContent = csvHeaders.join(',') + ''; // Added newline
    dataToExport.forEach((entry: DisplayEarning) => {
      const row = [
        this.datePipe.transform(entry.parsedDate, 'yyyy-MM-dd') || '', 
        escapeCsvValue(entry.user_mention || 'N/A'),
        escapeCsvValue(entry.role || 'N/A'),
        escapeCsvValue(entry.shift || 'N/A'),
        escapeCsvValue(entry.gross_revenue?.toString() || '0'),
        escapeCsvValue(entry.total_cut?.toString() || '0')
      ];
      csvContent += row.join(',') + ''; // Added newline
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'revenue_entries_dashboard.csv'); 
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
        alert('CSV export is not fully supported in this browser.');
    }
  }
}
