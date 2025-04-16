import { Component, inject, signal, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common'; // Added TitleCasePipe
import { UserService, User } from '../core/services/user.service';
import { AuthService } from '../auth/services/auth.service';

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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips'; 

// Import the Edit Dialog
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component'; 

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
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
    MatSnackBarModule,
    MatChipsModule,
    TitleCasePipe, // Add TitleCasePipe
    UserEditDialogComponent // Add Dialog Component
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'] 
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  private userService = inject(UserService);
  private authService = inject(AuthService); 
  private cdr = inject(ChangeDetectorRef);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  isLoading = signal(false);
  error = signal<string | null>(null);
  currentUserId = signal<string | null>(this.authService.getUserIdFromToken()); 

  displayedColumns: string[] = ['email', 'role', 'managedGuilds', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
     if (!this.authService.isAdmin()) {
        this.error.set("Access Denied: Admin role required.");
        return;
     }
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchUsers(): void {
    console.log('[UserManagement] Fetching users...');
    this.isLoading.set(true);
    this.error.set(null);
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('[UserManagement] Received users:', users);
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[UserManagement] Error fetching users:', err);
        this.error.set('Failed to load users.');
        this.isLoading.set(false);
        this.cdr.detectChanges();
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // --- Actions ---

  editUser(user: User): void {
    console.log('Edit user action triggered for:', user.email);
    // Open the dialog
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
       width: '500px',
       data: { user: user }, // Pass the user data to the dialog
       disableClose: true
    });

    // Handle dialog closing
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        this.fetchUsers(); // Refresh the user list
      }
    });
  }

  deleteUser(user: User): void {
    console.log('Delete user action triggered for:', user.email);
    if (user._id === this.currentUserId()) {
        this.snackBar.open('You cannot delete yourself!', 'Close', { duration: 3000 });
        return;
    }
    
    // TODO: Use MatDialog for confirmation instead of confirm()
    if (confirm(`Are you sure you want to delete user ${user.email}? This cannot be undone.`)) {
        this.isLoading.set(true); 
        this.userService.deleteUser(user._id).subscribe({
            next: (response) => {
                 if (response) {
                    this.snackBar.open(`User ${user.email} deleted successfully.`, 'Close', { duration: 3000 });
                    this.fetchUsers(); 
                 } else {
                     this.snackBar.open(`Failed to delete user ${user.email}.`, 'Close', { duration: 3000, panelClass: ['warn-snackbar'] });
                     this.isLoading.set(false);
                 }
                 // No need to set isLoading to false here if fetchUsers is called, 
                 // as fetchUsers will set it based on its own progress.
            },
            error: (err) => {
                console.error('Delete user error:', err);
                this.snackBar.open('An error occurred during deletion.', 'Close', { duration: 3000, panelClass: ['warn-snackbar'] });
                this.isLoading.set(false);
            }
        });
    }
  }
}
