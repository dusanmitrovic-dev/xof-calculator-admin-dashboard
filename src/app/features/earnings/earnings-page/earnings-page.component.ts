import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { of, Subject, throwError } from 'rxjs';
import {
  takeUntil,
  finalize,
  catchError,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { EarningsService } from '../../../core/services/earnings.service';
import { SettingsService } from '../../../core/services/settings.service';
import { Earning } from '../../../core/models/earning.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
// TODO: Import Actual Dialog Components
// import { EditEarningDialogComponent } from './dialogs/edit-earning-dialog/edit-earning-dialog.component';
// import { AddEarningDialogComponent } from './dialogs/add-earning-dialog/add-earning-dialog.component';
// import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss'], // Link SCSS file
  standalone: false,
})
export class EarningsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  // Base columns always present
  displayedColumnsBase: string[] = [
    'user',
    // 'id', // Added dynamically based on showIds
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
  displayedColumns: string[] = []; // Dynamically set based on settings
  dataSource = new MatTableDataSource<Earning>([]); // Initialize with empty array
  isLoading = true;
  showIds = false;

  // Use non-null assertion cautiously, ensure initialization in AfterViewInit
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') filterInput!: ElementRef<HTMLInputElement>; // Reference to filter input

  private destroy$ = new Subject<void>();

  constructor(
    private earningsService: EarningsService,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDisplaySettingsAndEarnings(); // Load settings first, then data
  }

  ngAfterViewInit(): void {
    // Ensure dataSource is initialized before assigning paginator/sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupCustomSorting();

    // It's generally safe to detect changes here after setup
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDisplaySettingsAndEarnings(): void {
    this.isLoading = true;
    this.settingsService
      .getDisplaySettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (settings) => {
          this.showIds = settings?.show_ids ?? false;
          this.updateDisplayedColumns();
          this.loadEarnings(); // Load earnings AFTER columns are set
        },
        error: (error) => {
          console.error('Error fetching display settings', error);
          this.snackBar.open(
            'Failed to load display settings, using defaults.',
            'Close',
            { duration: 3000 }
          );
          this.showIds = false; // Default on error
          this.updateDisplayedColumns();
          this.loadEarnings(); // Proceed with loading earnings
        },
      });
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = [...this.displayedColumnsBase];
    if (this.showIds) {
      // Insert 'id' after 'user'
      const userIndex = this.displayedColumns.indexOf('user');
      if (userIndex !== -1) {
        this.displayedColumns.splice(userIndex + 1, 0, 'id');
      } else {
        this.displayedColumns.unshift('id'); // Fallback: add at beginning
      }
    }
  }

  loadEarnings(): void {
    this.isLoading = true; // Ensure loading state is true
    this.earningsService
      .getEarnings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          // CDR might be needed if updates happen outside Angular's zone,
          // but often finalize runs within it. Use if view isn't updating.
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (earnings) => {
          this.dataSource.data = earnings ?? []; // Handle null response gracefully
          // Re-assign paginator/sort if they might not have been ready initially
          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error('Error fetching earnings', error);
          this.snackBar.open(
            'Failed to load earnings data. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
          this.dataSource.data = []; // Clear data on error
        },
      });
  }

  setupCustomSorting(): void {
    this.dataSource.sortingDataAccessor = (
      item: Earning,
      property: string
    ): string | number => {
      // Handle potential null values before accessing properties
      const value = item[property as keyof Earning];

      switch (property) {
        case 'date':
          // Attempt to parse date for reliable sorting
          const timestamp = value ? new Date(value).getTime() : 0;
          return isNaN(timestamp) ? 0 : timestamp;
        case 'user': // Sort by userId string
          return (value as string)?.toLowerCase() || '';
        case 'gross_revenue':
        case 'total_cut':
        case 'hours_worked':
          return Number(value) || 0; // Ensure numeric comparison, default 0 for null/NaN
        default:
          // Default case-insensitive string sorting
          return typeof value === 'string'
            ? value.toLowerCase()
            : value ?? ('' as any); // Coerce null/undefined to empty string for sorting
      }
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.setupCustomFilter(); // Ensure custom filter is applied

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    if (this.filterInput) {
      this.filterInput.nativeElement.value = '';
      this.dataSource.filter = '';
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  setupCustomFilter(): void {
    this.dataSource.filterPredicate = (
      data: Earning,
      filter: string
    ): boolean => {
      // Combine relevant fields into a single string for searching
      const dataStr = (
        (data.userId || '') +
        (this.showIds ? data.id || '' : '') + // Include ID only if shown
        (data.role || '') +
        (data.models || '') +
        (data.period || '') +
        (data.shift || '') +
        (data.date ? new Date(data.date).toLocaleDateString() : '') + // Format date consistently
        (data.gross_revenue ?? '') +
        (data.total_cut ?? '') +
        (data.hours_worked ?? '')
      ).toLowerCase();
      // Check if the combined string includes the filter term
      return dataStr.includes(filter);
    };
  }

  // --- CRUD Action Placeholders ---

  addNewEarning(): void {
    console.log('Add New Earning requested');
    this.snackBar.open('Add Earning Dialog not implemented.', 'Info', {
      duration: 2000,
    });

    // TODO: Implement MatDialog opening for AddEarningDialogComponent
    // const dialogRef = this.dialog.open(AddEarningDialogComponent, {
    //    width: '550px', // Adjust as needed
    //    disableClose: true, // Prevent closing on click outside
    //    data: {} // Pass any initial data if needed
    // });
    //
    // dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(newEarningData => {
    //    if (newEarningData) { // Check if dialog returned data (i.e., wasn't cancelled)
    //        this.isLoading = true;
    //        this.earningsService.addEarning(newEarningData)
    //           .pipe(
    //               takeUntil(this.destroy$),
    //               finalize(() => this.isLoading = false),
    //               catchError(error => {
    //                   console.error('Error adding earning', error);
    //                   this.snackBar.open(`Failed to add earning: ${error?.message || 'Server error'}`, 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
    //                   return of(null); // Prevent error breaking stream
    //               })
    //            )
    //           .subscribe(addedEarning => {
    //               if (addedEarning) {
    //                   this.snackBar.open('Earning added successfully!', 'Close', { duration: 2000, panelClass: ['snackbar-success'] });
    //                   this.loadEarnings(); // Refresh the table
    //               }
    //           });
    //    }
    // });
  }

  editEarning(earning: Earning): void {
    console.log('Edit requested:', earning);
    this.snackBar.open(
      `Edit Earning Dialog for ${earning.id} not implemented.`,
      'Info',
      { duration: 2000 }
    );

    // TODO: Implement MatDialog opening for EditEarningDialogComponent
    // const dialogRef = this.dialog.open(EditEarningDialogComponent, {
    //   width: '550px', // Adjust as needed
    //   disableClose: true,
    //   data: { ...earning } // Pass a *copy* of the data to prevent modifying original object before save
    // });
    //
    // dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
    //   if (result) { // Check if dialog returned updated data
    //     this.isLoading = true;
    //     this.earningsService.updateEarning(result as Earning)
    //        .pipe(
    //           takeUntil(this.destroy$),
    //           finalize(() => this.isLoading = false),
    //           catchError(error => {
    //              console.error('Error updating earning', error);
    //              this.snackBar.open(`Failed to update earning: ${error?.message || 'Server error'}`, 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
    //              return of(null); // Prevent error breaking stream
    //           })
    //        )
    //        .subscribe((updatedEarning) => {
    //           if (updatedEarning) {
    //               this.snackBar.open('Earning updated successfully!', 'Close', { duration: 2000, panelClass: ['snackbar-success'] });
    //               this.loadEarnings(); // Refresh the table data
    //            }
    //        });
    //   }
    // });
  }

  deleteEarning(earning: Earning): void {
    console.log('Delete requested:', earning);
    this.snackBar.open(
      `Confirm Delete Dialog for ${earning.id} not implemented.`,
      'Info',
      { duration: 2000 }
    );

    // TODO: Replace with a MatDialog for confirmation (using ConfirmDialogComponent)
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //     width: '400px',
    //     data: {
    //         title: 'Confirm Deletion',
    //         message: `Are you sure you want to permanently delete the earning record for user '${earning.userId}' on ${new Date(earning.date).toLocaleDateString()} (ID: ${earning.id})? This action cannot be undone.`
    //     },
    //     autoFocus: false // Prevent autofocus on cancel button
    // });
    //
    // dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(confirmed => {
    //     if (confirmed === true) { // Ensure confirmation value is strictly true
    // --- Move the service call inside this block ---
    //         this.isLoading = true;
    //         this.earningsService.deleteEarning(earning.id)
    //             .pipe(
    //                 takeUntil(this.destroy$),
    //                 finalize(() => (this.isLoading = false)),
    //                 catchError(error => {
    //                     console.error('Error deleting earning', error);
    //                     this.snackBar.open(`Failed to delete earning: ${error?.message || 'Server error'}`, 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
    //                     return of(false); // Indicate failure
    //                 })
    //             )
    //             .subscribe((success) => {
    //                 if (success) {
    //                     this.snackBar.open('Earning deleted successfully!', 'Close', { duration: 2000, panelClass: ['snackbar-success'] });
    //                     this.loadEarnings(); // Refresh data
    //                 } else if (!this.isLoading){ // Check isLoading to avoid showing second snackbar on caught error
    //                     // This case might be redundant if catchError handles the snackbar
    //                     // this.snackBar.open('Failed to delete earning.', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
    //                 }
    //             });
    //     } // End if confirmed
    // }); // End dialog subscribe
  }

  // trackBy function for ngFor performance in the table
  trackByEarningId(index: number, item: Earning): string {
    return item.id; // Use the unique ID for tracking rows
  }
}
