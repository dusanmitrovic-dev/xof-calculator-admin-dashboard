import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service'; // Adjust path
import {
  CommissionSettings,
  RoleSetting,
  UserOverrideSetting,
} from '../../../core/models/commission-settings.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-commission-settings-page',
  templateUrl: './commission-settings-page.component.html',
  styleUrls: ['./commission-settings-page.component.scss'],
  standalone: false
})
export class CommissionSettingsPageComponent implements OnInit, OnDestroy {
  commissionForm!: FormGroup; // Declare without initialization
  isLoading = true;
  private destroy$ = new Subject<void>();

  // Helper properties to easily access roles/users in the template
  roleKeys: string[] = [];
  userKeys: string[] = [];

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.commissionForm = this.fb.group({}); // Initialize form here
    this.settingsService
      .getCommissionSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (settings) => {
          this.buildForm(settings);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching commission settings', error);
          this.snackBar.open('Failed to load commission settings.', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm(settings: CommissionSettings): void {
    const rolesGroup: { [key: string]: FormGroup } = {};
    this.roleKeys = Object.keys(settings.roles);
    this.roleKeys.forEach((key) => {
      rolesGroup[key] = this.fb.group({
        commission_percentage: [
          settings.roles[key].commission_percentage,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      });
    });

    const usersGroup: { [key: string]: FormGroup } = {};
    this.userKeys = Object.keys(settings.users);
    this.userKeys.forEach((key) => {
      usersGroup[key] = this.fb.group({
        hourly_rate: [
          settings.users[key].hourly_rate,
          [Validators.required, Validators.min(0)],
        ],
        override_role: [settings.users[key].override_role ?? false], // Default to false if null/undefined
      });
    });

    this.commissionForm = this.fb.group({
      roles: this.fb.group(rolesGroup),
      users: this.fb.group(usersGroup),
    });
  }

  get rolesFormGroup(): FormGroup {
    return this.commissionForm.get('roles') as FormGroup;
  }

  get usersFormGroup(): FormGroup {
    return this.commissionForm.get('users') as FormGroup;
  }

  // --- Methods for Adding/Removing Roles/Users (Simplified Example) ---
  // In a real scenario, you'd likely use MatDialog for adding new entries
  // and get the ID + initial values from the dialog result.
  addRole(roleId: string, percentage: number): void {
    if (!roleId || this.rolesFormGroup.contains(roleId)) {
      this.snackBar.open('Invalid Role ID or Role already exists.', 'Close', {
        duration: 3000,
      });
      return;
    }
    const newRoleGroup = this.fb.group({
      commission_percentage: [
        percentage,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    this.rolesFormGroup.addControl(roleId, newRoleGroup);
    this.roleKeys.push(roleId); // Update helper array
  }

  removeRole(roleId: string): void {
    if (this.rolesFormGroup.contains(roleId)) {
      this.rolesFormGroup.removeControl(roleId);
      this.roleKeys = this.roleKeys.filter((key) => key !== roleId); // Update helper array
    }
  }

  // Add this method to handle user removal # NOTE: added
  removeUser(userId: string): void {
      const usersFormGroup = this.commissionForm.get('users') as FormGroup;
      if (usersFormGroup) {
          usersFormGroup.removeControl(userId);
          this.snackBar.open('User override removed successfully.', 'Close', { duration: 3000 });
      }
  }
  // Similar add/remove logic for users...

  onSubmit(): void {
    if (this.commissionForm.invalid) {
      this.snackBar.open('Please correct the errors in the form.', 'Close', {
        duration: 3000,
      });
      this.commissionForm.markAllAsTouched(); // Show validation errors
      return;
    }

    this.isLoading = true;
    const settingsToSave: CommissionSettings = this.commissionForm.value;

    this.settingsService
      .saveCommissionSettings(settingsToSave)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (savedSettings) => {
          this.snackBar.open('Commission Settings Saved!', 'Close', {
            duration: 2000,
          });
          // Optionally re-build form if save response differs, though likely not needed if service just echoes
          // this.buildForm(savedSettings);
          this.isLoading = false;
          this.commissionForm.markAsPristine(); // Mark form as unchanged
        },
        (error) => {
          console.error('Error saving commission settings', error);
          this.snackBar.open('Failed to save commission settings.', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      );
  }
}
