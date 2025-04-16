import { Component, inject, signal, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectionStrategy, ChangeDetectorRef
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // Added DatePipe, CurrencyPipe
import { EarningsService, Earning } from '../core/services/earnings.service';
import { GuildSelectorComponent } from '../core/components/guild-selector/guild-selector.component';

// Material Modules
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip'; // Added tooltip

// Placeholder for Add/Edit Dialog Component (Create later)
// import { EarningDialogComponent } from './earning-dialog/earning-dialog.component';

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [
    CommonModule,
    GuildSelectorComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatTooltipModule, // Added tooltip
    DatePipe, // Added DatePipe
    CurrencyPipe // Added CurrencyPipe
  ],
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss'],
  // Consider OnPush for performance with table data
  // changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EarningsComponent implements OnInit, AfterViewInit {
  private earningsService = inject(EarningsService);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  public dialog = inject(MatDialog);

  selectedGuildId = signal<string | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  displayedColumns: string[] = ['id', 'date', 'user_mention', 'gross_revenue', 'total_cut', 'role', 'shift', 'hours_worked', 'actions'];
  dataSource = new MatTableDataSource<Earning>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initial assignment
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGuildSelected(guildId: string | null): void {
    console.log('[EarningsComponent] Guild selected:', guildId);
    this.selectedGuildId.set(guildId);
    this.error.set(null);
    this.dataSource.data = []; // Clear table immediately
    if (guildId) {
      this.fetchEarnings(guildId);
    } else {
        this.cdr.detectChanges(); // Ensure view updates when clearing
    }
  }

  fetchEarnings(guildId: string): void {
    console.log(`[EarningsComponent] Starting fetchEarnings for guild ${guildId}`);
    this.isLoading.set(true);
    this.error.set(null);
    this.earningsService.getGuildEarnings(guildId).subscribe({
      next: (earnings) => {
        console.log(`[EarningsComponent] Received earnings data:`, earnings);
        this.dataSource.data = earnings; 
        // Ensure paginator and sort are re-assigned AFTER data is set
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
        this.isLoading.set(false);
        this.cdr.detectChanges(); // Manually trigger change detection
        console.log('[EarningsComponent] dataSource updated.');
      },
      error: (err) => {
        console.error('[EarningsComponent] Error fetching earnings:', err);
        this.error.set('An error occurred while loading earnings records.');
        this.dataSource.data = []; // Clear data on error
        this.isLoading.set(false);
        this.cdr.detectChanges(); // Update view on error
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(`[EarningsComponent] Applying filter: ${this.dataSource.filter}`);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // --- CRUD Actions (Placeholders) ---
  addEarning(): void {
    if (!this.selectedGuildId()) return;
    console.log('Add earning action triggered');
    // ... (Dialog logic commented out)
  }

  editEarning(earning: Earning): void {
     if (!this.selectedGuildId()) return; 
    console.log('Edit earning action triggered for:', earning.id);
    // ... (Dialog logic commented out)
  }

  deleteEarning(earning: Earning): void {
    console.log('Delete earning action triggered for:', earning.id);
    // ... (Confirmation and delete logic commented out)
  }
}