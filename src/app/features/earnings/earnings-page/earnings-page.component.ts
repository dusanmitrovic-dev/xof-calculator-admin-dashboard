import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { EarningsService } from '../../../core/services/earnings.service'; // Adjust path
import { SettingsService } from '../../../core/services/settings.service'; // For display settings
import { Earning } from '../../../core/models/earning.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// Import Edit/Delete Dialog components when created
// import { EditEarningDialogComponent } from './edit-earning-dialog/edit-earning-dialog.component';

@Component({
  selector: 'app-earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss'],
  standalone: false,
})
export class EarningsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumnsBase: string[] = [
    'user',
    'date',
    'gross_revenue',
    'total_cut',
    'hours_worked',
    'role',
    'models',
    'period',
    'shift',
  ];
  displayedColumns: string[] = []; // Will be adjusted based on show_ids
  dataSource = new MatTableDataSource<Earning>();
  isLoading = true;
  showIds = false; // Default

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(
    private earningsService: EarningsService,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // For Edit/Delete modals
  ) {}

  ngOnInit(): void {
    this.loadDisplaySettings(); // Load display settings first
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // If using client-side sorting for date, provide custom sorting logic
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date':
          return new Date(item.date).getTime(); // Sort by actual date
        case 'user':
          return item.userId; // Allow sorting by user ID even if mention is shown
        default:
          return (item as any)[property];
      }
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDisplaySettings(): void {
    this.settingsService
      .getDisplaySettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (settings) => {
          this.showIds = settings.show_ids ?? false;
          this.updateDisplayedColumns();
          this.loadEarnings(); // Load earnings after knowing if IDs should be shown
        },
        (error) => {
          console.error('Error fetching display settings', error);
          this.snackBar.open(
            'Failed to load display settings, defaulting.',
            'Close',
            { duration: 3000 }
          );
          this.loadEarnings(); // Proceed with default settings
        }
      );
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = this.showIds
      ? ['id', ...this.displayedColumnsBase, 'actions']
      : [...this.displayedColumnsBase, 'actions'];
  }

  loadEarnings(): void {
    this.isLoading = true;
    this.earningsService
      .getEarnings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)) // Stop loading indicator regardless of success/error
      )
      .subscribe(
        (earnings) => {
          this.dataSource.data = earnings;
        },
        (error) => {
          console.error('Error fetching earnings', error);
          this.snackBar.open('Failed to load earnings data.', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEarning(earning: Earning): void {
    console.log('Edit:', earning);
    // TODO: Open MatDialog with a form pre-filled with earning data
    // const dialogRef = this.dialog.open(EditEarningDialogComponent, {
    //   width: '400px',
    //   data: { ...earning } // Pass a copy
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) { // result would be the updated earning object
    //     this.isLoading = true;
    //     this.earningsService.updateEarning(result)
    //        .pipe(takeUntil(this.destroy$), finalize(() => this.isLoading = false))
    //        .subscribe(() => {
    //            this.snackBar.open('Earning updated!', 'Close', { duration: 2000 });
    //            this.loadEarnings(); // Refresh data
    //        }, error => { /* handle error */ });
    //   }
    // });
    alert(`Edit functionality for ${earning.id} not fully implemented.`);
  }

  deleteEarning(earning: Earning): void {
    console.log('Delete:', earning);
    // TODO: Open confirmation MatDialog
    if (confirm(`Are you sure you want to delete earning ${earning.id}?`)) {
      this.isLoading = true;
      this.earningsService
        .deleteEarning(earning.id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => (this.isLoading = false))
        )
        .subscribe(
          (success) => {
            if (success) {
              this.snackBar.open('Earning deleted!', 'Close', {
                duration: 2000,
              });
              this.loadEarnings(); // Refresh data
            } else {
              this.snackBar.open('Failed to delete earning.', 'Close', {
                duration: 3000,
              });
            }
          },
          (error) => {
            console.error('Error deleting earning', error);
            this.snackBar.open('Error during deletion.', 'Close', {
              duration: 3000,
            });
          }
        );
    }
  }
}
