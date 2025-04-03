import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef, // Import ChangeDetectorRef
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of, Subject } from 'rxjs';
import { takeUntil, finalize, catchError } from 'rxjs/operators'; // Import catchError
import { EarningsService } from '../../../core/services/earnings.service'; // Adjust path
import { SettingsService } from '../../../core/services/settings.service'; // For display settings
import { Earning } from '../../../core/models/earning.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// Import Edit/Delete Dialog components when created
// import { EditEarningDialogComponent } from './edit-earning-dialog/edit-earning-dialog.component';
// import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component'; // Example path

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
    'actions', // Ensure actions is part of base if always shown
  ];
  displayedColumns: string[] = []; // Will be adjusted based on show_ids
  dataSource = new MatTableDataSource<Earning>();
  isLoading = true;
  showIds = false; // Default

  // Use non-null assertion operator carefully, ensure they are available in ngAfterViewInit
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(
    private earningsService: EarningsService,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog, // For Edit/Delete modals
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDisplaySettings(); // Load display settings first
  }

  ngAfterViewInit(): void {
    // Ensure paginator and sort are assigned before using them
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      console.warn('MatPaginator not found.');
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
      // If using client-side sorting for date, provide custom sorting logic
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'date':
            // Handle potential invalid date strings gracefully
            const timestamp = new Date(item.date).getTime();
            return isNaN(timestamp) ? 0 : timestamp; // Sort invalid dates consistently
          case 'user':
            return item.userId?.toLowerCase(); // Sort case-insensitively
          case 'gross_revenue':
          case 'total_cut':
          case 'hours_worked':
            // Ensure numeric comparison
            return Number(item[property as keyof Earning]) || 0;
          default:
            // Ensure case-insensitive sorting for strings
            const value = (item as any)[property];
            return typeof value === 'string' ? value.toLowerCase() : value;
        }
      };
    } else {
      console.warn('MatSort not found.');
    }
    // Detect changes after setting up paginator/sort to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDisplaySettings(): void {
    this.isLoading = true; // Start loading indicator for settings fetch
    this.settingsService
      .getDisplaySettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (settings) => {
          this.showIds = settings.show_ids ?? false;
          this.updateDisplayedColumns();
          this.loadEarnings(); // Load earnings AFTER knowing if IDs should be shown
        },
        (error) => {
          console.error('Error fetching display settings', error);
          this.snackBar.open(
            'Failed to load display settings, using defaults.',
            'Close',
            { duration: 3000 }
          );
          this.showIds = false; // Use default
          this.updateDisplayedColumns();
          this.loadEarnings(); // Proceed with default settings
        }
      );
  }

  updateDisplayedColumns(): void {
    // Construct columns based on showIds setting
    let columns = [...this.displayedColumnsBase]; // Start with base columns
    if (this.showIds) {
      // Insert 'id' after 'user' for better context (or at the beginning)
      const userIndex = columns.indexOf('user');
      if (userIndex !== -1) {
        columns.splice(userIndex + 1, 0, 'id'); // Insert 'id' after 'user'
      } else {
        columns.unshift('id'); // Add 'id' at the beginning if 'user' column wasn't found
      }
    }
    this.displayedColumns = columns;
  }

  loadEarnings(): void {
    this.isLoading = true;
    this.earningsService
      .getEarnings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          // Manually trigger change detection if data load happens outside Angular zone
          // or after view initialization checks. Often needed with async operations updating view bindings.
          this.cdr.detectChanges();
        })
      )
      .subscribe(
        (earnings) => {
          this.dataSource.data = earnings;
          // Connect paginator and sort again if they might become available after data loads
          // This ensures they work correctly even if ngAfterViewInit runs before data is ready.
          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching earnings', error);
          this.snackBar.open('Failed to load earnings data.', 'Close', {
            duration: 3000,
          });
          this.dataSource.data = []; // Clear data on error
        }
      );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Custom filter predicate for more specific searching (optional but recommended)
    this.dataSource.filterPredicate = (data: Earning, filter: string) => {
      const dataStr = (
        data.id +
        data.userId +
        data.role +
        data.models +
        data.period +
        data.shift +
        // Format date consistently for searching
        new Date(data.date).toLocaleDateString() +
        data.gross_revenue +
        data.total_cut +
        data.hours_worked
      ).toLowerCase();
      return dataStr.includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEarning(earning: Earning): void {
    console.log('Edit requested:', earning);
    this.snackBar.open(
      `Edit action for ${earning.id}. (Dialog not implemented)`,
      'Info',
      { duration: 2000 }
    );

    // TODO: Implement MatDialog opening
    // const dialogRef = this.dialog.open(EditEarningDialogComponent, {
    //   width: '500px', // Adjust width as needed
    //   data: { ...earning } // Pass a copy of the data
    // });
    //
    // dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
    //   if (result) { // Check if the dialog returned updated data
    //     this.isLoading = true;
    //     this.earningsService.updateEarning(result as Earning)
    //        .pipe(
    //           takeUntil(this.destroy$),
    //           finalize(() => this.isLoading = false),
    //           catchError(error => {
    //              console.error('Error updating earning', error);
    //              this.snackBar.open(`Failed to update earning: ${error.message || 'Server error'}`, 'Close', { duration: 3000 });
    //              return of(null); // Prevent error from breaking pipe, return null/empty observable
    //           })
    //        )
    //        .subscribe((updatedEarning) => {
    //           if (updatedEarning) {
    //               this.snackBar.open('Earning updated successfully!', 'Close', { duration: 2000 });
    //               this.loadEarnings(); // Refresh the table data
    //            }
    //        });
    //   }
    // });
  }

  deleteEarning(earning: Earning): void {
    console.log('Delete requested:', earning);

    // TODO: Replace confirm with a MatDialog for better UX
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //     width: '350px',
    //     data: {
    //         title: 'Confirm Deletion',
    //         message: `Are you sure you want to delete the earning record for user '${earning.userId}' on ${new Date(earning.date).toLocaleDateString()} (ID: ${earning.id})? This action cannot be undone.`
    //     }
    // });
    //
    // dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(confirmed => {
    //     if (confirmed) {
    // Using basic browser confirm for now:
    if (
      confirm(
        `Are you sure you want to delete earning ${earning.id} for user ${earning.userId}?`
      )
    ) {
      this.isLoading = true;
      this.earningsService
        .deleteEarning(earning.id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => (this.isLoading = false)),
          catchError((error) => {
            console.error('Error deleting earning', error);
            this.snackBar.open(
              `Failed to delete earning: ${error.message || 'Server error'}`,
              'Close',
              { duration: 3000 }
            );
            return of(false); // Return false on error
          })
        )
        .subscribe((success) => {
          if (success) {
            this.snackBar.open('Earning deleted successfully!', 'Close', {
              duration: 2000,
            });
            this.loadEarnings(); // Refresh data
          } else if (!this.isLoading) {
            // Avoid showing 'failed' if error was caught
            this.snackBar.open(
              'Failed to delete earning (e.g., not found).',
              'Close',
              {
                duration: 3000,
              }
            );
          }
        }); // End subscribe
    } // End if confirm
    //     } // End if confirmed (from dialog)
    // }); // End dialog subscribe
  }

  // Optional: Add method for adding new earnings (would also need a dialog)
  addNewEarning(): void {
    console.log('Add New Earning requested');
    this.snackBar.open(
      'Add Earning functionality (Dialog) not implemented.',
      'Info',
      { duration: 2000 }
    );
    // TODO: Implement MatDialog for adding a new earning record
    // const dialogRef = this.dialog.open(AddEarningDialogComponent, { // Create this component
    //    width: '500px',
    //    data: {} // Pass any initial data if needed
    // });
    //
    // dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(newEarningData => {
    //    if (newEarningData) {
    //        this.isLoading = true;
    //        this.earningsService.addEarning(newEarningData) // Service method needs to exist
    //           .pipe(
    //               takeUntil(this.destroy$),
    //               finalize(() => this.isLoading = false),
    //               catchError(error => { /* Handle error */ return of(null); })
    //            )
    //           .subscribe(addedEarning => {
    //               if (addedEarning) {
    //                   this.snackBar.open('Earning added successfully!', 'Close', { duration: 2000 });
    //                   this.loadEarnings(); // Refresh
    //               }
    //           });
    //    }
    // });
  }
}
