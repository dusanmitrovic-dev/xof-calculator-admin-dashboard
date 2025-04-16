import { Component, inject, signal, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; 
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
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import SnackBar

// Import the dialog component
import { EarningDialogComponent } from './components/earning-dialog/earning-dialog.component'; 

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
    MatTooltipModule, 
    DatePipe, 
    CurrencyPipe,
    // EarningDialogComponent, // Import standalone dialog component
    MatSnackBarModule // Import SnackBar module
  ],
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EarningsComponent implements OnInit, AfterViewInit {
  private earningsService = inject(EarningsService);
  private cdr = inject(ChangeDetectorRef); 
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar); // Inject SnackBar

  selectedGuildId = signal<string | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  displayedColumns: string[] = ['id', 'date', 'user_mention', 'gross_revenue', 'total_cut', 'role', 'shift', 'hours_worked', 'actions'];
  dataSource = new MatTableDataSource<Earning>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGuildSelected(guildId: string | null): void {
    console.log('[EarningsComponent] Guild selected:', guildId);
    this.selectedGuildId.set(guildId);
    this.error.set(null);
    this.dataSource.data = []; 
    if (guildId) {
      this.fetchEarnings(guildId);
    } else {
        this.cdr.detectChanges(); 
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
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
        this.isLoading.set(false);
        this.cdr.detectChanges(); 
        console.log('[EarningsComponent] dataSource updated.');
      },
      error: (err) => {
        console.error('[EarningsComponent] Error fetching earnings:', err);
        this.error.set('An error occurred while loading earnings records.');
        this.dataSource.data = []; 
        this.isLoading.set(false);
        this.cdr.detectChanges(); 
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

  // --- CRUD Actions --- 

  addEarning(): void {
    if (!this.selectedGuildId()) return;
    console.log('Add earning action triggered');
    const dialogRef = this.dialog.open(EarningDialogComponent, {
      width: '450px',
      data: { guildId: this.selectedGuildId(), earning: null },
      disableClose: true // Prevent closing on backdrop click
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.snackBar.open('Earning record added successfully!', 'Close', { duration: 3000 });
        this.fetchEarnings(this.selectedGuildId()!); // Refresh data on success
      }
    });
  }

  editEarning(earning: Earning): void {
     if (!this.selectedGuildId()) return; 
    console.log('Edit earning action triggered for:', earning.id);
    const dialogRef = this.dialog.open(EarningDialogComponent, {
      width: '450px',
      data: { guildId: this.selectedGuildId(), earning: earning },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
         this.snackBar.open('Earning record updated successfully!', 'Close', { duration: 3000 });
        this.fetchEarnings(this.selectedGuildId()!); // Refresh data on success
      }
    });
  }

  deleteEarning(earning: Earning): void {
    console.log('Delete earning action triggered for:', earning.id);
    // TODO: Replace confirm() with MatDialog for confirmation
    if (confirm(`Are you sure you want to delete earning entry ${earning.id}? This cannot be undone.`)) {
       // Can use isLoading signal or add a specific isDeleting signal
      // this.isLoading.set(true); 
      this.error.set(null); // Clear previous errors
      this.earningsService.deleteEarning(earning.id).subscribe({
        next: (response) => {
          if (response) {
            console.log('Deletion successful');
             this.snackBar.open(`Earning ${earning.id} deleted.`, 'Close', { duration: 3000 });
            this.fetchEarnings(this.selectedGuildId()!); // Refresh data
          } else {
            this.error.set('Failed to delete earning record.');
             this.snackBar.open('Error deleting record.', 'Close', { duration: 3000, panelClass: ['warn-snackbar'] }); // Add error style
          }
          // this.isLoading.set(false);
        },
        error: (err) => {
           console.error('Error deleting earning:', err);
           this.error.set('An error occurred during deletion.');
           this.snackBar.open('Error during deletion.', 'Close', { duration: 3000, panelClass: ['warn-snackbar'] });
           // this.isLoading.set(false);
        }
      });
    }
  }
}
