import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common'; // Import CommonModule, DatePipe, TitleCasePipe
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService, User } from '../../../services/user.service'; // Adjust path if needed
import { AuthService } from '../../../auth/auth.service'; // To prevent self-deletion/demotion
import { 
    CardModule, 
    SpinnerComponent, 
    AlertComponent, 
    TableModule, 
    BadgeComponent, 
    ButtonGroupModule, 
    ButtonDirective 
} from '@coreui/angular'; // Import CoreUI Modules/Components
import { IconDirective } from '@coreui/icons-angular'; // Import IconDirective
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component'; // Import UserEditModalComponent

@Component({
  selector: 'app-user-list',
  standalone: true, // Make component standalone
  imports: [ // Add imports array
    CommonModule, // For *ngIf, *ngFor, async pipe, DatePipe, TitleCasePipe
    CardModule, 
    SpinnerComponent, 
    AlertComponent, 
    TableModule, 
    BadgeComponent, 
    ButtonGroupModule, 
    ButtonDirective,
    IconDirective, 
    UserEditModalComponent,
    DatePipe, // Explicitly import DatePipe
    TitleCasePipe // Explicitly import TitleCasePipe
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = of([]);
  loading: boolean = true;
  errorMessage: string | null = null;
  currentUserId: string | null = null; // To disable actions on self

  // Properties for the edit modal
  isUserEditModalVisible = false;
  selectedUserForEdit: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId(); // Get current user ID
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = null;
    this.users$ = this.userService.getUsers().pipe(
      tap(() => this.loading = false),
      catchError(err => {
        console.error('Error loading users:', err);
        this.errorMessage = err.message || 'Failed to load users.';
        this.loading = false;
        return of([]); // Return empty array on error
      })
    );
  }

  // Method to open the edit modal
  openEditUserModal(user: User): void {
    console.log('Opening edit modal for user:', user);
    this.selectedUserForEdit = user;
    this.isUserEditModalVisible = true;
  }

  // Method called when the modal saves a user
  onUserSaved(user: User | null): void {
    console.log('User saved event received:', user);
    this.isUserEditModalVisible = false; // Close modal
    this.selectedUserForEdit = null;
    if (user) { // Check if user data was actually returned (not just closed)
      this.loadUsers(); // Refresh the list if a user was saved
    }
  }
  
  // Method called when modal is closed without saving (necessary for [(visible)] binding)
  handleModalVisibleChange(visible: boolean): void {
      this.isUserEditModalVisible = visible;
      if (!visible) {
          this.selectedUserForEdit = null; // Clear selected user when modal closes
      }
  }

  deleteUser(user: User): void {
    if (!user || !user._id) return;
    
    // Prevent self-deletion
    if (user._id === this.currentUserId) {
      alert('You cannot delete your own account.');
      return;
    }

    if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
      this.userService.deleteUser(user._id).subscribe({
        next: (res) => {
          console.log('User deleted:', res?.msg || 'Success'); // Use optional chaining for res.msg
          this.loadUsers(); // Refresh the list
          // TODO: Show success toast/message
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.errorMessage = err.error?.message || err.message || 'Failed to delete user.'; // More robust error handling
          // TODO: Show error toast/message
        }
      });
    }
  }
}
