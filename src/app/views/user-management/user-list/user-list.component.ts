import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Subject } from 'rxjs'; // Removed Observable and of as we use a simple array
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { UserService, User } from '../../../services/user.service'; // Adjust path
import { AuthService } from '../../../auth/auth.service'; // To prevent self-action

// CoreUI Modules
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  GridModule,
  ModalModule,
  SpinnerModule,
  TableModule,
  UtilitiesModule,
  ButtonGroupModule // Added ButtonGroupModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

// Import the modal component
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AlertModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    GridModule,
    ModalModule,
    SpinnerModule,
    TableModule,
    UtilitiesModule,
    IconDirective,
    DatePipe,
    TitleCasePipe,
    UserEditModalComponent, // Import the modal component
    ButtonGroupModule    // Added ButtonGroupModule
  ]
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  currentUserId: string | null = null; // To disable actions on self

  // Modal State
  isUserEditModalVisible: boolean = false;
  selectedUserForEdit: User | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId(); // Get current user ID
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fetches users from the service.
   */
  loadUsers(): void {
    console.log('UserListComponent: Loading users...');
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usersData) => {
          this.users = usersData;
          this.isLoading = false;
          console.log('UserListComponent: Users loaded:', usersData);
        },
        error: (err) => {
          console.error('UserListComponent: Error loading users:', err);
          this.errorMessage = err.message || 'Failed to load users.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Opens the user edit modal.
   */
  openEditUserModal(user: User): void {
    // Pass a deep copy to prevent modifying the list directly
    this.selectedUserForEdit = JSON.parse(JSON.stringify(user));
    this.isUserEditModalVisible = true;
    console.log(`UserListComponent: Opening edit modal for user ${user.email}`);
  }

  /**
   * Handles the event emitted when the modal saves a user.
   * Renamed to match the template binding (userSaved)="onUserSaved($event)"
   */
  onUserSaved(savedUser: User | null): void {
    this.isUserEditModalVisible = false; // Close modal first
    if (savedUser) {
        console.log('UserListComponent: User saved event received. Reloading list.');
        // TODO: Add success toast
        this.loadUsers(); // Reload the list to reflect changes
    } else {
        console.log('UserListComponent: Modal closed without saving.');
    }
    // Clear the selected user regardless of save status when modal is handled here
    this.selectedUserForEdit = null;
  }

  /**
   * Handles the visibleChange event from the modal when closed via backdrop or X.
   * Ensures the selected user is cleared if the modal is closed without saving.
   */
  handleVisibleChange(visible: boolean): void {
    if (!visible && this.isUserEditModalVisible) {
        // The modal is closing (likely via backdrop/X)
        console.log('UserListComponent: Modal closed via visibleChange event.');
        this.isUserEditModalVisible = false;
        this.selectedUserForEdit = null; // Clear selection
        // Optionally emit null from userSaved if needed, but onUserSaved handles the explicit save/cancel
        // this.userSaved.emit(null); 
    }
  }

  /**
   * Deletes a user after confirmation.
   */
  deleteUser(user: User): void {
    if (!user._id) {
      this.errorMessage = 'Cannot delete user: ID is missing.';
      return;
    }

    // Prevent self-deletion
    if (user._id === this.currentUserId) {
      this.errorMessage = 'Action denied: You cannot delete your own account.';
      // TODO: Show this error in a more user-friendly way (e.g., toast)
      alert('You cannot delete your own account.'); // Simple alert for now
      return;
    }

    if (confirm(`Are you sure you want to delete user ${user.email} (ID: ${user._id})? This is irreversible!`)) {
      this.isLoading = true; // Optional: Show loading state during delete
      this.userService.deleteUser(user._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log(`User ${user._id} deleted successfully.`, response);
            // TODO: Add success toast
            this.loadUsers(); // Refresh the list
          },
          error: (err) => {
            this.isLoading = false;
            console.error(`Error deleting user ${user._id}:`, err);
            this.errorMessage = err.message || 'Failed to delete user.';
            // TODO: Add error toast
          }
        });
    }
  }

  /**
   * Determines the color for the role badge.
   */
  getRoleBadgeColor(role: 'admin' | 'user' | 'manager'): string { // Added 'manager'
    switch (role) {
      case 'admin': return 'danger';
      case 'manager': return 'warning';
      default: return 'secondary';
    }
  }
}
