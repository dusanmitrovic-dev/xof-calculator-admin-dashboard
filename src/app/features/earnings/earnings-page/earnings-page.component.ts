import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef, // <- Keep
  ElementRef,
  inject, // <- Import inject
  NgZone, // <- Import NgZone
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of, Subject, fromEvent } from 'rxjs'; // <- Import fromEvent
import {
  takeUntil,
  finalize,
  catchError,
  debounceTime, // <- Import debounceTime
  distinctUntilChanged, // <- Import distinctUntilChanged
  map, // <- Import map
  tap, // <- Import tap
} from 'rxjs/operators';
import { EarningsService } from '../../../core/services/earnings.service';
import { SettingsService } from '../../../core/services/settings.service';
import { Earning } from '../../../core/models/earning.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// --- Dialog Component Imports ---
import { AddEarningDialogComponent } from '../dialogs/add-earning-dialog/add-earning-dialog.component';
import { EditEarningDialogComponent } from '../dialogs/edit-earning-dialog/edit-earning-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';


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
    'actions',
  ];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Earning>([]);
  isLoading = true;
  showIds = false;
  filterValue = ''; // Store current filter value

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') filterInput!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();
  // Inject NgZone and ChangeDetectorRef using constructor or inject()
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef); // Or use constructor injection

  constructor(
    private earningsService: EarningsService,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) // private cdr: ChangeDetectorRef // Alternative constructor injection
  {}

  ngOnInit(): void {
    this.loadDisplaySettingsAndEarnings();
  }

  ngAfterViewInit(): void {
    // Assign paginator and sort *after* view is initialized
    // Important: Check if they exist before assigning
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.setupCustomSorting(); // Setup sorting logic
    }

    // Setup debounced filtering directly on the input element
    if (this.filterInput) {
      fromEvent(this.filterInput.nativeElement, 'keyup')
        .pipe(
          map((event) => (event.target as HTMLInputElement).value),
          debounceTime(400), // Wait 400ms after last keystroke
          distinctUntilChanged(), // Only emit if value changed
          takeUntil(this.destroy$) // Unsubscribe on component destroy
        )
        .subscribe((value) => {
          this.applyFilter(value); // Apply the filter
        });
    }

    // Initial detect changes after setup
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDisplaySettingsAndEarnings(): void {
    this.isLoading = true;
    this.cdr.detectChanges(); // Indicate loading started
    this.settingsService
      .getDisplaySettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (settings) => {
          this.showIds = settings?.show_ids ?? false;
          this.updateDisplayedColumns();
          this.loadEarnings(); // Load earnings AFTER columns are potentially updated
        },
        error: (error) => {
          console.error('Error fetching display settings', error);
          this.snackBar.open(
            'Failed to load display settings, using defaults.',
            'Close',
            { duration: 3000 }
          );
          this.showIds = false;
          this.updateDisplayedColumns();
          this.loadEarnings(); // Proceed with default settings
        },
      });
  }

  updateDisplayedColumns(): void {
    // This logic seems correct, re-validate if columns aren't right
    const baseColumns = [...this.displayedColumnsBase];
    if (this.showIds) {
      const userIndex = baseColumns.indexOf('user');
      if (userIndex !== -1) {
        baseColumns.splice(userIndex + 1, 0, 'id');
      } else {
        baseColumns.unshift('id');
      }
    }
    this.displayedColumns = baseColumns;
    // Trigger change detection if columns change after view init might cause issues
    // It's generally better to set columns before the first data load if possible
    this.cdr.detectChanges();
  }

  loadEarnings(): void {
    this.isLoading = true;
    // Ensure loading state is reflected immediately
    this.cdr.detectChanges();
    this.earningsService
      .getEarnings()
      .pipe(
        takeUntil(this.destroy$)
        // finalize doesn't guarantee running inside zone or after data assignment visually complete
        // finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (earnings) => {
          // ** BUG FIX: Run data assignment and change detection within NgZone **
          this.zone.run(() => {
            this.dataSource.data = earnings ?? [];
            this.isLoading = false; // Set loading false *after* data is assigned

            // Re-connect paginator/sort if they weren't ready initially ( belt-and-suspenders)
            if (
              this.dataSource.paginator !== this.paginator &&
              this.paginator
            ) {
              this.dataSource.paginator = this.paginator;
            }
            if (this.dataSource.sort !== this.sort && this.sort) {
              this.dataSource.sort = this.sort;
            }

            // ** Explicitly tell Angular to check for changes NOW **
            this.cdr.detectChanges();
          });
        },
        error: (error) => {
          this.zone.run(() => {
            // Also run error handling UI updates in zone
            console.error('Error fetching earnings', error);
            this.snackBar.open('Failed to load earnings data.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
            this.dataSource.data = [];
            this.isLoading = false;
            this.cdr.detectChanges(); // Update view after error
          });
        },
      });
  }

  setupCustomSorting(): void {
    // This logic seems fine, just ensure it's called correctly in ngAfterViewInit
    this.dataSource.sortingDataAccessor = (
      item: Earning,
      property: string
    ): string | number => {
      const value = item[property as keyof Earning];
      switch (property) {
        case 'date':
          const timestamp = value ? new Date(value).getTime() : 0;
          return isNaN(timestamp) ? 0 : timestamp;
        case 'user':
          return (value as string)?.toLowerCase() || '';
        case 'gross_revenue':
        case 'total_cut':
        case 'hours_worked':
          return Number(value) || 0;
        default:
          return typeof value === 'string'
            ? value.toLowerCase()
            : value ?? ('' as any);
      }
    };
  }

  // Updated applyFilter to accept the value directly from debounced input
  applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim().toLowerCase(); // Store trimmed value
    this.dataSource.filter = this.filterValue;
    this.setupCustomFilter(); // Re-apply filter predicate if needed (usually not necessary unless predicate changes)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // No need for cdr.detectChanges here usually, filtering triggers it.
  }

  clearFilter(): void {
    if (this.filterInput) {
      this.filterInput.nativeElement.value = ''; // Clear input visually
      this.applyFilter(''); // Apply empty filter
    }
  }

  setupCustomFilter(): void {
    // This logic seems fine
    this.dataSource.filterPredicate = (
      data: Earning,
      filter: string
    ): boolean => {
      if (!filter) return true; // Show all if filter is empty
      const dataStr = (
        (data.userId || '') +
        (this.showIds ? data.id || '' : '') +
        (data.role || '') +
        (data.models || '') +
        (data.period || '') +
        (data.shift || '') +
        (data.date ? new Date(data.date).toLocaleDateString() : '') +
        (data.gross_revenue ?? '') +
        (data.total_cut ?? '') +
        (data.hours_worked ?? '')
      ).toLowerCase();
      return dataStr.includes(filter);
    };
  }

  // --- CRUD Actions ---

  addNewEarning(): void {
    const dialogRef = this.dialog.open(AddEarningDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: true, // Prevent accidental closing
      data: {}, // Pass initial data if needed (e.g., default date)
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newEarningData) => {
        if (newEarningData) {
          this.isLoading = true; // Show loading indicator during save
          this.cdr.detectChanges();
          this.earningsService
            .addEarning(newEarningData)
            .pipe(
              takeUntil(this.destroy$),
              finalize(() => {
                // No need to set isLoading false here if loadEarnings does it
                // this.isLoading = false;
                // this.cdr.detectChanges();
              }),
              catchError((error) => {
                console.error('Error adding earning', error);
                this.snackBar.open(
                  `Failed to add earning: ${error?.message || 'Server error'}`,
                  'Close',
                  { duration: 3500, panelClass: ['snackbar-error'] }
                );
                this.isLoading = false; // Ensure loading stops on error
                this.cdr.detectChanges();
                return of(null); // Complete the stream gracefully
              })
            )
            .subscribe((addedEarning) => {
              if (addedEarning) {
                this.snackBar.open('Earning added successfully!', 'Close', {
                  duration: 2500,
                  panelClass: ['snackbar-success'],
                });
                this.loadEarnings(); // Refresh the table <--- This will handle isLoading
              }
              // If addedEarning is null (due to catchError), loading is already stopped
            });
        }
      });
  }

  editEarning(earning: Earning): void {
    const dialogRef = this.dialog.open(EditEarningDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: true,
      data: { ...earning }, // Pass a *copy* to the dialog
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((updatedEarningData) => {
        if (updatedEarningData) {
          this.isLoading = true;
          this.cdr.detectChanges();
          this.earningsService
            .updateEarning(updatedEarningData) // The dialog should return the full Earning object
            .pipe(
              takeUntil(this.destroy$),
              // finalize(() => { this.isLoading = false; this.cdr.detectChanges(); }), // Let loadEarnings handle it
              catchError((error) => {
                console.error('Error updating earning', error);
                this.snackBar.open(
                  `Failed to update earning: ${
                    error?.message || 'Server error'
                  }`,
                  'Close',
                  { duration: 3500, panelClass: ['snackbar-error'] }
                );
                this.isLoading = false;
                this.cdr.detectChanges();
                return of(null);
              })
            )
            .subscribe((updatedEarning) => {
              if (updatedEarning) {
                this.snackBar.open('Earning updated successfully!', 'Close', {
                  duration: 2500,
                  panelClass: ['snackbar-success'],
                });
                this.loadEarnings(); // Refresh the table
              }
            });
        }
      });
  }

  deleteEarning(earning: Earning): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to permanently delete the earning record below? This action cannot be undone.`,
        details: `User: ${earning.userId}<br>Date: ${new Date(
          earning.date ?? ''
        ).toLocaleDateString()}<br>ID: ${earning.id}`, // Pass details to display
      },
      autoFocus: 'button[mat-dialog-close]', // Focus the 'Cancel' button
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed) => {
        if (confirmed === true) {
          this.isLoading = true;
          this.cdr.detectChanges();
          this.earningsService
            .deleteEarning(earning.id)
            .pipe(
              takeUntil(this.destroy$),
              // finalize(() => { this.isLoading = false; this.cdr.detectChanges(); }), // Let loadEarnings handle it
              catchError((error) => {
                console.error('Error deleting earning', error);
                this.snackBar.open(
                  `Failed to delete earning: ${
                    error?.message || 'Server error'
                  }`,
                  'Close',
                  { duration: 3500, panelClass: ['snackbar-error'] }
                );
                this.isLoading = false;
                this.cdr.detectChanges();
                return of(false); // Indicate failure
              })
            )
            .subscribe((success) => {
              if (success) {
                this.snackBar.open('Earning deleted successfully!', 'Close', {
                  duration: 2500,
                  panelClass: ['snackbar-success'],
                });
                this.loadEarnings(); // Refresh data
              }
              // If success is false (from catchError), loading is already stopped
            });
        }
      });
  }

  trackByEarningId(index: number, item: Earning): string {
    return item.id;
  }
}
