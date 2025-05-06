import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService, User } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';

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
  TooltipDirective, // Import TooltipDirective
  UtilitiesModule,
  ButtonGroupModule
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
    TooltipDirective, // Add TooltipDirective
    UtilitiesModule,
    IconDirective,
    DatePipe,
    TitleCasePipe,
    UserEditModalComponent,
    ButtonGroupModule
  ]
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  currentUserId: string | null = null;

  isUserEditModalVisible: boolean = false;
  selectedUserForEdit: User | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usersData) => {
          this.users = usersData;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Failed to load users.';
          this.isLoading = false;
        }
      });
  }

  openEditUserModal(user: User): void {
    this.selectedUserForEdit = JSON.parse(JSON.stringify(user)); // Deep copy
    this.isUserEditModalVisible = true;
  }

  // Method to open the modal for adding a new user
  openAddUserModal(): void {
    this.selectedUserForEdit = null; // Ensure no user is pre-selected for editing
    this.isUserEditModalVisible = true;
  }

  onUserSaved(savedUser: User | null): void {
    this.isUserEditModalVisible = false;
    if (savedUser) {
        this.loadUsers(); // Reload users if a user was saved
    } 
    this.selectedUserForEdit = null; // Clear selection
  }

  handleVisibleChange(visible: boolean): void {
    if (!visible && this.isUserEditModalVisible) {
        // This ensures that if the modal is closed by clicking backdrop or X button,
        // we also reset our component's state related to the modal.
        this.isUserEditModalVisible = false;
        this.selectedUserForEdit = null;
    }
  }

  deleteUser(user: User): void {
    if (!user._id) {
      this.errorMessage = 'Cannot delete user: ID is missing.';
      return;
    }
    if (user._id === this.currentUserId) {
      alert('You cannot delete your own account.'); // Or use a more styled notification
      return;
    }
    // Consider using a more styled confirmation dialog/modal here instead of confirm()
    if (confirm(`Are you sure you want to delete user ${user.email} (ID: ${user._id})? This is irreversible!`)) {
      this.isLoading = true; // Optional: set loading state for the row or table
      this.userService.deleteUser(user._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadUsers(); // Refresh the list
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.message || 'Failed to delete user.';
          }
        });
    }
  }

  getRoleBadgeColor(role: User['role']): string {
    switch (role?.toLowerCase()) {
      case 'admin': return 'danger-gradient'; // Using gradient for better visual
      case 'manager': return 'warning-gradient'; 
      case 'user': return 'secondary-gradient';
      default: return 'light';
    }
  }

  getRoleIcon(role: User['role']): string {
    switch (role?.toLowerCase()) {
      case 'admin': return 'cilShieldAlt';
      case 'manager': return 'cilUserFollow'; 
      case 'user': return 'cilUser';
      default: return 'cilBan';
    }
  }

  // Method to generate tooltip text for managed guilds
  getGuildsTooltipText(guildIds: string[] | undefined): string {
    if (!guildIds || guildIds.length === 0) {
      return 'No guilds assigned.';
    }
    return 'Manages Guilds: ' + guildIds.join(', ');
  }

  // This method seems to be for display, keeping it if used elsewhere, 
  // but getGuildsTooltipText is used in the current HTML for the tooltip.
  getManagedGuildsDisplay(managedGuilds?: string[] | 'all'): string {
    if (managedGuilds === 'all') {
      return 'All Guilds';
    } else if (managedGuilds && managedGuilds.length > 0) {
      if (managedGuilds.length > 3) {
        return `${managedGuilds.slice(0, 2).join(', ')}, ... (+${managedGuilds.length - 2})`;
      }
      return managedGuilds.join(', ');
    }
    return 'None';
  }

  // This method was suggested by the error message, but the HTML uses getGuildsTooltipText.
  // If getGuildsTooltip was intended, it would be defined here.
  // For now, ensuring getGuildsTooltipText exists as per the current HTML.
  /* 
  getGuildsTooltip(managedGuilds?: string[] | 'all'): string {
    if (managedGuilds === 'all') {
      return 'Manages all guilds in the system.';
    } else if (managedGuilds && managedGuilds.length > 0) {
      return `Manages: ${managedGuilds.join(', ')}`;
    }
    return 'No specific guilds managed.';
  }
  */
}
