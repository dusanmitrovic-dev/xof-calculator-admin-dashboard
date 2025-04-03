import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize, startWith } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service'; // Adjust path
import {
  CommissionSettings,
  RoleSetting,
  UserOverrideSetting,
} from '../../../core/models/commission-settings.model';
import { MatSnackBar } from '@angular/material/snack-bar';
// TODO: Import MatDialog and Dialog Components when created
// import { MatDialog } from '@angular/material/dialog';
// import { AddRoleDialogComponent } from './dialogs/add-role-dialog/add-role-dialog.component';
// import { AddUserOverrideDialogComponent } from './dialogs/add-user-override-dialog/add-user-override-dialog.component';

@Component({
  selector: 'app-commission-settings-page',
  templateUrl: './commission-settings-page.component.html',
  styleUrls: ['./commission-settings-page.component.scss'], // Link SCSS file
  standalone: false,
})
export class CommissionSettingsPageComponent implements OnInit, OnDestroy {
  commissionForm!: FormGroup; // Definite assignment in constructor/ngOnInit
  isLoading = true;
  private destroy$ = new Subject<void>();
  private roleOverrideSubscriptions: { [key: string]: Subject<void> } = {}; // To manage individual user override subscriptions

  // Helper properties for template iteration
  roleKeys: string[] = [];
  userKeys: string[] = [];

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar // private dialog: MatDialog // Inject dialog service
  ) {
    // Initialize form structure immediately
    this.commissionForm = this.fb.group({
      roles: this.fb.group({}),
      users: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.isLoading = true;
    this.clearUserOverrideSubscriptions(); // Clear old listeners before loading new data
    this.settingsService
      .getCommissionSettings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (settings) => {
          this.buildForm(settings);
          this.commissionForm.markAsPristine();
        },
        error: (error) => {
          console.error('Error fetching commission settings', error);
          this.snackBar.open(
            'Failed to load commission settings. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
          // Ensure form is at least minimally initialized on error
          this.buildForm({ roles: {}, users: {} });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearUserOverrideSubscriptions(); // Clean up all user listeners
  }

  buildForm(settings: CommissionSettings): void {
    const rolesGroup: { [key: string]: FormGroup } = {};
    this.roleKeys = settings.roles ? Object.keys(settings.roles) : [];
    this.roleKeys.forEach((key) => {
      const roleData = settings.roles[key];
      rolesGroup[key] = this.fb.group({
        // Use nullish coalescing for default
        commission_percentage: [
          roleData?.commission_percentage ?? null, // Use null for better required handling
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        // hourly_rate in RoleSetting model is less common, ignoring for form unless needed
      });
    });

    const usersGroup: { [key: string]: FormGroup } = {};
    this.userKeys = settings.users ? Object.keys(settings.users) : [];
    this.userKeys.forEach((key) => {
      const userData = settings.users[key];
      const userFormGroup = this.fb.group({
        hourly_rate: [
          userData?.hourly_rate ?? null,
          [Validators.required, Validators.min(0)],
        ],
        override_role: [userData?.override_role ?? false],
        // commission_percentage is REQUIRED only if override_role is true
        commission_percentage: [
          userData?.commission_percentage ?? null,
          [Validators.min(0), Validators.max(100)], // Base validators
        ],
      });

      // Subscribe to override_role changes for this specific user
      const userDestroy$ = new Subject<void>();
      this.roleOverrideSubscriptions[key] = userDestroy$; // Store subject for cleanup

      userFormGroup
        .get('override_role')
        ?.valueChanges.pipe(
          startWith(userFormGroup.get('override_role')?.value), // Trigger initially
          takeUntil(userDestroy$) // Unsubscribe when user is removed or component destroyed
        )
        .subscribe((override) => {
          const percentageControl = userFormGroup.get('commission_percentage');
          if (override) {
            percentageControl?.setValidators([
              Validators.required,
              Validators.min(0),
              Validators.max(100),
            ]);
          } else {
            percentageControl?.setValidators([
              Validators.min(0),
              Validators.max(100),
            ]); // Remove required
            percentageControl?.setValue(percentageControl.value); // Keep existing value or set to null/default if desired
            // percentageControl?.setValue(null); // Optional: Clear value when not overriding
          }
          percentageControl?.updateValueAndValidity(); // Re-evaluate validation state
        });

      usersGroup[key] = userFormGroup;
    });

    // Replace existing empty groups - this triggers change detection
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
  // TODO: Implement using MatDialog for a much better UX
  openAddRoleDialog(): void {
    this.snackBar.open('Add Role Dialog not implemented.', 'Info', {
      duration: 2000,
    });
    // const dialogRef = this.dialog.open(AddRoleDialogComponent, { width: '400px' });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && result.roleId && result.percentage !== undefined) {
    //     this.addRole(result.roleId, result.percentage);
    //   }
    // });
  }

  openAddUserOverrideDialog(): void {
    this.snackBar.open('Add User Override Dialog not implemented.', 'Info', {
      duration: 2000,
    });
    // const dialogRef = this.dialog.open(AddUserOverrideDialogComponent, { width: '500px' });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && result.userId) {
    //     this.addUser(result.userId, result.rate, result.override, result.overridePercent);
    //   }
    // });
  }

  // Placeholder add methods (replace with dialog triggers)
  private addRole(roleId: string, percentage: number): void {
    const cleanRoleId = roleId.trim();
    if (!cleanRoleId || this.rolesFormGroup.contains(cleanRoleId)) {
      this.snackBar.open(
        `Role ID '${cleanRoleId}' is invalid or already exists.`,
        'Close',
        { duration: 3000, panelClass: ['snackbar-warning'] }
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
    this.roleKeys.push(cleanRoleId);
    this.commissionForm.markAsDirty();
    this.snackBar.open(
      `Role '${cleanRoleId}' added locally. Save changes to persist.`,
      'Info',
      { duration: 2500 }
    );
  }

  removeRole(roleId: string): void {
    // TODO: Add confirmation dialog
    if (this.rolesFormGroup.contains(roleId)) {
      this.rolesFormGroup.removeControl(roleId);
      this.roleKeys = this.roleKeys.filter((key) => key !== roleId);
      this.commissionForm.markAsDirty();
      this.snackBar.open(
        `Role '${roleId}' removed locally. Save changes to persist.`,
        'Info',
        { duration: 2500 }
      );
    }
  }

  private addUser(
    userId: string,
    rate: number,
    override: boolean,
    overridePercent: number
  ): void {
    const cleanUserId = userId.trim();
    if (!cleanUserId || this.usersFormGroup.contains(cleanUserId)) {
      this.snackBar.open(
        `User ID '${cleanUserId}' is invalid or already has an override.`,
        'Close',
        { duration: 3000, panelClass: ['snackbar-warning'] }
      );
      return;
    }

    const newUserGroup = this.fb.group({
      hourly_rate: [rate, [Validators.required, Validators.min(0)]],
      override_role: [override],
      commission_percentage: [
        overridePercent,
        [Validators.min(0), Validators.max(100)],
      ],
    });

    // Manually set up validator subscription for the new user
    const userDestroy$ = new Subject<void>();
    this.roleOverrideSubscriptions[cleanUserId] = userDestroy$;
    newUserGroup
      .get('override_role')
      ?.valueChanges.pipe(
        startWith(newUserGroup.get('override_role')?.value),
        takeUntil(userDestroy$)
      )
      .subscribe((isOverride) => {
        const percentageControl = newUserGroup.get('commission_percentage');
        if (isOverride) {
          percentageControl?.setValidators([
            Validators.required,
            Validators.min(0),
            Validators.max(100),
          ]);
        } else {
          percentageControl?.setValidators([
            Validators.min(0),
            Validators.max(100),
          ]);
        }
        percentageControl?.updateValueAndValidity();
      });
    // Trigger initial validation state
    newUserGroup.get('override_role')?.updateValueAndValidity();

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
    // TODO: Add confirmation dialog
    if (this.usersFormGroup.contains(userId)) {
      // Clean up subscription listener for this user
      if (this.roleOverrideSubscriptions[userId]) {
        this.roleOverrideSubscriptions[userId].next();
        this.roleOverrideSubscriptions[userId].complete();
        delete this.roleOverrideSubscriptions[userId];
      }

      this.usersFormGroup.removeControl(userId);
      this.userKeys = this.userKeys.filter((key) => key !== userId);
      this.commissionForm.markAsDirty();
      this.snackBar.open(
        `User override for '${userId}' removed locally. Save changes to persist.`,
        'Info',
        { duration: 3000 }
      );
    }
  }

  // Helper to clean up all user override subscriptions
  private clearUserOverrideSubscriptions(): void {
    Object.values(this.roleOverrideSubscriptions).forEach((sub) => {
      sub.next();
      sub.complete();
    });
    this.roleOverrideSubscriptions = {};
  }

  onSubmit(): void {
    if (this.commissionForm.invalid) {
      this.snackBar.open(
        'Please correct the errors highlighted in the form.',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        }
      );
      this.commissionForm.markAllAsTouched();
      return;
    }

    if (this.commissionForm.pristine) {
      this.snackBar.open('No changes detected to save.', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-info'],
      });
      return;
    }

    this.isLoading = true;
    const settingsToSave: CommissionSettings =
      this.commissionForm.getRawValue(); // Use getRawValue if disabled fields should be included

    // Optional: Clean up data before saving, e.g., remove commission_percentage if override is false
    Object.keys(settingsToSave.users).forEach((userId) => {
      if (!settingsToSave.users[userId].override_role) {
        // Keep the value or set to null? Depends on backend expectation.
        // Let's assume we keep the value but backend ignores it if override is false.
        // delete settingsToSave.users[userId].commission_percentage; // Or set to null
      }
    });

    this.settingsService
      .saveCommissionSettings(settingsToSave)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (savedSettings) => {
          this.snackBar.open(
            'Commission Settings Saved Successfully!',
            'Close',
            {
              duration: 2000,
              panelClass: ['snackbar-success'],
            }
          );
          // Rebuild form only if necessary (e.g., backend validation/cleanup)
          // Otherwise, just mark pristine
          // this.buildForm(savedSettings);
          this.commissionForm.markAsPristine();
        },
        error: (error) => {
          console.error('Error saving commission settings', error);
          this.snackBar.open(
            'Failed to save commission settings. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
        },
      });
  }

  // trackBy function for ngFor performance
  trackByKey(index: number, key: string): string {
    return key;
  }

  copyToClipboard(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0); // Deselect the text
  }
}
