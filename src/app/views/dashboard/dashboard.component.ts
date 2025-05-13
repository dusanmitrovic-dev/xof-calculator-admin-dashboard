import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, of } from 'rxjs';

import { EarningsService, Earning } from '../../services/earnings.service';

import {
  ButtonDirective, // For cButton
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
  InputGroupTextDirective
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
  cilSave // Icon for export
} from '@coreui/icons';

interface DashboardSummaryStats {
  totalGrossRevenue: number;
  totalEntries: number;
  avgCutPerEntry: number;
  totalCut: number;
  totalGrossRevenueTrend?: 'up' | 'down' | 'neutral';
  totalGrossRevenueDeltaPercentage?: string;
}

interface DisplayEarning extends Earning {
  parsedDate: Date | null;
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonDirective, // Add ButtonDirective
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
    IconModule,
    TooltipDirective,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    FormControlDirective,
    InputGroupComponent,
    InputGroupTextDirective
  ],
  providers: [DatePipe, DecimalPipe, CurrencyPipe, IconSetService]
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  private datePipe = inject(DatePipe);
  private iconSetService = inject(IconSetService);

  allRevenueEntries: DisplayEarning[] = [];
  displayableEntries: DisplayEarning[] = []; // Entries for the current page (filtered and paginated)
  filteredForExport: DisplayEarning[] = []; // Entries after filtering, before pagination (for export)

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  searchTerm: string = '';

  summaryStats: DashboardSummaryStats = {
    totalGrossRevenue: 0,
    totalEntries: 0,
    avgCutPerEntry: 0,
    totalCut: 0
  };
  revenueOverTimeChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartOptions<'line'> = { /* ... */ };

  constructor() {
    this.iconSetService.icons = {
      cilChartLine, cilDollar, cilCalculator, cilListNumbered, cilChartPie, 
      cilArrowTop, cilArrowBottom, cilSearch, cilSave
    };
    this.summaryStats = {
      totalGrossRevenue: 0, totalEntries: 0, avgCutPerEntry: 0, totalCut: 0,
      totalGrossRevenueTrend: 'neutral', totalGrossRevenueDeltaPercentage: ''
    };
    this.lineChartOptions = {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Revenue (USD)' }, ticks: { callback: (value) => typeof value === 'number' ? '$' + value.toLocaleString() : value }, grid: { display: true, color: 'rgba(0,0,0,0.1)' }},
        x: { title: { display: true, text: 'Date' }, grid: { display: true, color: 'rgba(0,0,0,0.1)' }}
      },
      plugins: {
        tooltip: { callbacks: { label: (context) => { let label = context.dataset.label || ''; if (label) label += ': '; if (context.parsed.y !== null) label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y); return label; }}},
        legend: { display: true }
      }
    };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private parseDateString(dateStr: string): Date | null { /* ... */ 
    if (!dateStr || typeof dateStr !== 'string') return null;
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
        if (date.getUTCFullYear() === year && date.getUTCMonth() === month && date.getUTCDate() === day) return date;
      }
    }
    return null;
  }

  fetchData(): void {
    this.earningsService.getAllEarningsAcrossGuilds().pipe(
      catchError(err => { console.error('[Dashboard] Error fetching all earnings:', err); return of([]); })
    ).subscribe((earnings: Earning[]) => {
      this.allRevenueEntries = [...earnings]
        .map(earning => ({ ...earning, parsedDate: this.parseDateString(earning.date) }))
        .sort((a, b) => (b.parsedDate?.getTime() || 0) - (a.parsedDate?.getTime() || 0));
      
      this.applyFiltersAndPagination();
      this.calculateSummaryStats(earnings);
      this.prepareRevenueChartData(earnings);
    });
  }

  calculateSummaryStats(earnings: Earning[]): void { /* ... */ 
    this.summaryStats.totalGrossRevenue = earnings.reduce((sum, e) => sum + (e.gross_revenue || 0), 0);
    this.summaryStats.totalEntries = earnings.length;
    this.summaryStats.totalCut = earnings.reduce((sum, e) => sum + (e.total_cut || 0), 0);
    this.summaryStats.avgCutPerEntry = this.summaryStats.totalEntries > 0 ? (this.summaryStats.totalCut / this.summaryStats.totalEntries) : 0;
    const previousTotalGrossRevenue = 10000; // Example previous value
    if (this.summaryStats.totalGrossRevenue > previousTotalGrossRevenue) {
      this.summaryStats.totalGrossRevenueTrend = 'up';
      const percentageChange = ((this.summaryStats.totalGrossRevenue - previousTotalGrossRevenue) / previousTotalGrossRevenue) * 100;
      this.summaryStats.totalGrossRevenueDeltaPercentage = `+${percentageChange.toFixed(1)}%`;
    } else if (this.summaryStats.totalGrossRevenue < previousTotalGrossRevenue) {
      this.summaryStats.totalGrossRevenueTrend = 'down';
      const percentageChange = ((previousTotalGrossRevenue - this.summaryStats.totalGrossRevenue) / previousTotalGrossRevenue) * 100;
      this.summaryStats.totalGrossRevenueDeltaPercentage = `-${percentageChange.toFixed(1)}%`;
    } else {
      this.summaryStats.totalGrossRevenueTrend = 'neutral';
      this.summaryStats.totalGrossRevenueDeltaPercentage = '0.0%';
    }
  }
  prepareRevenueChartData(earnings: Earning[]): void { /* ... */ 
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
    const chartLineColor = 'rgba(75, 192, 192, 1)';
    const chartFillColor = 'rgba(75, 192, 192, 0.2)';
    this.revenueOverTimeChartData = {
      labels: sortedDates.map(dateKey => this.datePipe.transform(dateKey, 'MMM d')),
      datasets: [{
        label: 'Gross Revenue', data: sortedDates.map(dateKey => revenueByDate[dateKey]),
        borderColor: chartLineColor, borderWidth: 3, tension: 0.1, fill: true, backgroundColor: chartFillColor
      }]
    };
  }

  onSearchTermChange(): void {
    this.currentPage = 1;
    this.applyFiltersAndPagination();
  }

  applyFiltersAndPagination(): void {
    let filtered = this.allRevenueEntries;
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const lowerSearchTerm = this.searchTerm.toLowerCase().trim();
      filtered = this.allRevenueEntries.filter(entry => {
        return (entry.user_mention?.toLowerCase().includes(lowerSearchTerm) || 
                entry.role?.toLowerCase().includes(lowerSearchTerm) || 
                entry.shift?.toLowerCase().includes(lowerSearchTerm) ||
                (entry.parsedDate && this.datePipe.transform(entry.parsedDate, 'shortDate')?.toLowerCase().includes(lowerSearchTerm)) ||
                (entry.gross_revenue?.toString().toLowerCase().includes(lowerSearchTerm)) ||
                (entry.total_cut?.toString().toLowerCase().includes(lowerSearchTerm)))
      });
    }
    this.filteredForExport = filtered; // Store the filtered list for export

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    if (this.totalPages > 0 && this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    else if (this.totalPages === 0) this.currentPage = 1;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayableEntries = filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void { if (page >= 1 && page <= this.totalPages) { this.currentPage = page; this.applyFiltersAndPagination(); } }
  nextPage(): void { if (this.currentPage < this.totalPages) { this.currentPage++; this.applyFiltersAndPagination(); } }
  previousPage(): void { if (this.currentPage > 1) { this.currentPage--; this.applyFiltersAndPagination(); } }

  exportToCsv(): void {
    const dataToExport = this.filteredForExport; // Export the currently filtered data
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

    let csvContent = csvHeaders.join(',') + '';
    dataToExport.forEach((entry: DisplayEarning) => {
      const row = [
        this.datePipe.transform(entry.parsedDate, 'yyyy-MM-dd') || '',
        escapeCsvValue(entry.user_mention || 'N/A'),
        escapeCsvValue(entry.role || 'N/A'),
        escapeCsvValue(entry.shift || 'N/A'),
        escapeCsvValue(entry.gross_revenue?.toString() || '0'),
        escapeCsvValue(entry.total_cut?.toString() || '0')
      ];
      csvContent += row.join(',') + '';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'revenue_entries.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
}
