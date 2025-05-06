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
    this.selectedUserForEdit = JSON.parse(JSON.stringify(user));
    this.isUserEditModalVisible = true;
  }

  onUserSaved(savedUser: User | null): void {
    this.isUserEditModalVisible = false;
    if (savedUser) {
        this.loadUsers();
    } 
    this.selectedUserForEdit = null;
  }

  handleVisibleChange(visible: boolean): void {
    if (!visible && this.isUserEditModalVisible) {
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
      alert('You cannot delete your own account.');
      return;
    }
    if (confirm(`Are you sure you want to delete user ${user.email} (ID: ${user._id})? This is irreversible!`)) {
      this.isLoading = true;
      this.userService.deleteUser(user._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.loadUsers();
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
      case 'admin': return 'danger';
      case 'manager': return 'warning'; // Or 'info' or 'success' if 'warning' implies issues
      case 'user': return 'secondary';
      default: return 'light'; // Fallback for unknown roles
    }
  }

  getRoleIcon(role: User['role']): string {
    switch (role?.toLowerCase()) {
      case 'admin': return 'cilShieldAlt'; // Shield icon for admin
      case 'manager': return 'cilUserFollow'; // User with gear or briefcase for manager
      case 'user': return 'cilUser'; // Standard user icon
      default: return 'cilBan'; // Fallback icon for unknown roles
    }
  }

  getManagedGuildsDisplay(managedGuilds?: string[] | 'all'): string {
    if (managedGuilds === 'all') {
      return 'All Guilds'; // Potentially add a count if available and meaningful
    } else if (managedGuilds && managedGuilds.length > 0) {
      if (managedGuilds.length > 3) {
        return `${managedGuilds.slice(0, 2).join(', ')}, ... (+${managedGuilds.length - 2})`;
      }
      return managedGuilds.join(', ');
    }
    return 'None';
  }

  getGuildsTooltip(managedGuilds?: string[] | 'all'): string {
    if (managedGuilds === 'all') {
      return 'Manages all guilds in the system.';
    } else if (managedGuilds && managedGuilds.length > 0) {
      return `Manages: ${managedGuilds.join(', ')}`;
    }
    return 'No specific guilds managed.';
  }
}
