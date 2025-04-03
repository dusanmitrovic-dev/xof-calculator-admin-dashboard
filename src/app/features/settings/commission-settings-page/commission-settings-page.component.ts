import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators'; // Added finalize
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
  standalone: false,
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
    // Initialize form structure immediately to avoid template errors
    this.commissionForm = this.fb.group({
      roles: this.fb.group({}),
      users: this.fb.group({}),
    });
    this.loadSettings(); // Load data into the initialized form
  }

  loadSettings(): void {
    this.isLoading = true;
    this.settingsService
      .getCommissionSettings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)) // Ensure loading stops
      )
      .subscribe(
        (settings) => {
          this.buildForm(settings); // Build or rebuild the form with fetched data
          this.commissionForm.markAsPristine(); // Mark as pristine after loading
        },
        (error) => {
          console.error('Error fetching commission settings', error);
          this.snackBar.open('Failed to load commission settings.', 'Close', {
            duration: 3000,
          });
          // Optional: Initialize with empty structure on error?
          // this.buildForm({ roles: {}, users: {} });
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm(settings: CommissionSettings): void {
    const rolesGroup: { [key: string]: FormGroup } = {};
    // Ensure settings.roles exists and is an object
    this.roleKeys = settings.roles ? Object.keys(settings.roles) : [];
    this.roleKeys.forEach((key) => {
      const roleData = settings.roles[key];
      rolesGroup[key] = this.fb.group({
        // Provide default 0 if percentage is missing/null
        commission_percentage: [
          roleData?.commission_percentage ?? 0,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        // Note: hourly_rate was in RoleSetting model but not used here? Keeping consistent with original code.
      });
    });

    const usersGroup: { [key: string]: FormGroup } = {};
    // Ensure settings.users exists and is an object
    this.userKeys = settings.users ? Object.keys(settings.users) : [];
    this.userKeys.forEach((key) => {
      const userData = settings.users[key];
      usersGroup[key] = this.fb.group({
        // Provide default 0 if rate is missing/null
        hourly_rate: [
          userData?.hourly_rate ?? 0,
          [Validators.required, Validators.min(0)],
        ],
        // Provide default false if override is missing/null
        override_role: [userData?.override_role ?? false],
        // Note: commission_percentage was in UserOverrideSetting model but not used here?
        // If override_role is true, you likely need another field here for the override percentage.
        // Adding it based on model definition:
        commission_percentage: [
          // Added field based on model
          userData?.commission_percentage ?? 0, // Default to 0
          // Add validators if this field should be active when override is true
          // e.g., this might require conditional validation
          [Validators.min(0), Validators.max(100)],
        ],
      });
    });

    // Use setControl to replace the existing empty groups
    this.commissionForm.setControl('roles', this.fb.group(rolesGroup));
    this.commissionForm.setControl('users', this.fb.group(usersGroup));
  }

  get rolesFormGroup(): FormGroup {
    return this.commissionForm.get('roles') as FormGroup;
  }

  get usersFormGroup(): FormGroup {
    return this.commissionForm.get('users') as FormGroup;
  }

  // --- Methods for Adding/Removing Roles/Users ---
  // TODO: Implement proper dialogs for adding new roles/users.
  // These are placeholder examples for direct manipulation (less ideal UX).
  addRole(roleId: string = 'NEW_ROLE', percentage: number = 5): void {
    const cleanRoleId = roleId.trim();
    if (!cleanRoleId || this.rolesFormGroup.contains(cleanRoleId)) {
      this.snackBar.open(
        `Invalid Role ID ('${cleanRoleId}') or Role already exists.`,
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }
    const newRoleGroup = this.fb.group({
      commission_percentage: [
        percentage,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    this.rolesFormGroup.addControl(cleanRoleId, newRoleGroup);
    this.roleKeys.push(cleanRoleId); // Update helper array
    this.commissionForm.markAsDirty(); // Mark form as changed
    this.snackBar.open(
      `Role '${cleanRoleId}' added locally. Save changes to persist.`,
      'Info',
      { duration: 2500 }
    );
  }

  removeRole(roleId: string): void {
    if (this.rolesFormGroup.contains(roleId)) {
      this.rolesFormGroup.removeControl(roleId);
      this.roleKeys = this.roleKeys.filter((key) => key !== roleId); // Update helper array
      this.commissionForm.markAsDirty(); // Mark form as changed
      this.snackBar.open(
        `Role '${roleId}' removed locally. Save changes to persist.`,
        'Info',
        { duration: 2500 }
      );
    }
  }

  // TODO: Implement addUser using a dialog similar to addRole
  addUser(
    userId: string = 'NEW_USER',
    rate: number = 15,
    override: boolean = false,
    overridePercent: number = 0
  ): void {
    const cleanUserId = userId.trim();
    if (!cleanUserId || this.usersFormGroup.contains(cleanUserId)) {
      this.snackBar.open(
        `Invalid User ID ('${cleanUserId}') or User override already exists.`,
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }
    const newUserGroup = this.fb.group({
      hourly_rate: [rate, [Validators.required, Validators.min(0)]],
      override_role: [override],
      commission_percentage: [
        overridePercent,
        [Validators.min(0), Validators.max(100)],
      ], // Added field
    });
    this.usersFormGroup.addControl(cleanUserId, newUserGroup);
    this.userKeys.push(cleanUserId);
    this.commissionForm.markAsDirty();
    this.snackBar.open(
      `User override for '${cleanUserId}' added locally. Save changes to persist.`,
      'Info',
      { duration: 2500 }
    );
  }

  removeUser(userId: string): void {
    // No need to cast to FormGroup again if usersFormGroup getter is used
    if (this.usersFormGroup.contains(userId)) {
      this.usersFormGroup.removeControl(userId);
      this.userKeys = this.userKeys.filter((key) => key !== userId); // Update helper array
      this.commissionForm.markAsDirty(); // Mark form as changed
      this.snackBar.open(
        `User override for '${userId}' removed locally. Save changes to persist.`,
        'Info',
        { duration: 3000 }
      );
    }
  }

  onSubmit(): void {
    if (this.commissionForm.invalid) {
      this.snackBar.open('Please correct the errors in the form.', 'Close', {
        duration: 3000,
      });
      this.commissionForm.markAllAsTouched(); // Show validation errors
      return;
    }

    if (this.commissionForm.pristine) {
      this.snackBar.open('No changes detected.', 'Close', { duration: 2000 });
      return;
    }

    this.isLoading = true;
    const settingsToSave: CommissionSettings = this.commissionForm.value;
    // Optional: Clean up data before saving if needed (e.g., remove commission_percentage from user if override is false)

    this.settingsService
      .saveCommissionSettings(settingsToSave)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)) // Stop loading indicator
      )
      .subscribe(
        (savedSettings) => {
          this.snackBar.open('Commission Settings Saved!', 'Close', {
            duration: 2000,
          });
          // Rebuild form ONLY if backend might have altered data (e.g., validation/cleanup)
          // For mock, savedSettings is usually identical to settingsToSave, so just mark pristine.
          // If the service returned significantly different data, use:
          // this.buildForm(savedSettings);
          this.commissionForm.markAsPristine(); // Mark form as unchanged after successful save
        },
        (error) => {
          console.error('Error saving commission settings', error);
          this.snackBar.open('Failed to save commission settings.', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
