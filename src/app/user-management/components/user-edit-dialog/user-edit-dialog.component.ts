import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService, User } from '../../../core/services/user.service';
import { AuthService } from '../../../auth/services/auth.service'; // To get current user ID

// Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; // For selection list
import { MatDividerModule } from '@angular/material/divider';

// Interface for the data passed into the dialog
export interface UserEditDialogData {
  user: User;
}

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css'] // Keep CSS for now
})
export class UserEditDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  public dialogRef = inject(MatDialogRef<UserEditDialogComponent>);
  public data: UserEditDialogData = inject(MAT_DIALOG_DATA);

  userForm!: FormGroup;
  isSaving = signal(false);
  error = signal<string | null>(null);
  allGuilds = signal<string[]>([]); // All possible guilds to assign
  currentUserId = signal<string | null>(this.authService.getUserIdFromToken());

  ngOnInit(): void {
    this.initForm();
    this.loadAvailableGuilds();
  }

  initForm(): void {
    const user = this.data.user;
    this.userForm = this.fb.group({
      email: [{ value: user.email, disabled: true }], // Cannot edit email
      role: [user.role, Validators.required],
      // Use FormArray for managedGuilds to handle multi-selection
      managedGuilds: this.fb.array(user.managedGuilds || []) 
    });

    // Disable role change for self (admin)
    if (user._id === this.currentUserId()) {
        this.userForm.get('role')?.disable();
    }
    // Disable guild selection if role is admin
    if (user.role === 'admin') {
        this.userForm.get('managedGuilds')?.disable();
    }

    // Add listener to disable/enable guild selection based on role change
    this.userForm.get('role')?.valueChanges.subscribe(role => {
        const managedGuildsControl = this.userForm.get('managedGuilds');
        if (role === 'admin') {
            managedGuildsControl?.disable();
            managedGuildsControl?.setValue([]); // Admins conceptually manage all, clear specific assignments
        } else {
           if (user._id !== this.currentUserId()) { // Don't enable for self if role change is disabled
             managedGuildsControl?.enable();
           }
        }
    });
  }

  loadAvailableGuilds(): void {
    // Only needed if editing a manager or potentially promoting to manager
    this.userService.getAvailableGuilds().subscribe(guilds => {
      this.allGuilds.set(guilds);
    });
  }

  // Getter for managedGuilds FormArray (though not directly used in template this way)
  // get managedGuildsArray(): FormArray {
  //   return this.userForm.get('managedGuilds') as FormArray;
  // }

  save(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.error.set('Please correct the form errors.');
      return;
    }

    this.isSaving.set(true);
    this.error.set(null);

    // Get raw value to include disabled fields if necessary (like role for self)
    // But only send fields that are meant to be updated
    const formValue = this.userForm.getRawValue(); 
    const updateData: { role?: string; managedGuilds?: string[] } = {};

    // Only include role if it was editable
    if(this.userForm.get('role')?.enabled) {
       updateData.role = formValue.role;
    }

    // Only include managedGuilds if the role is manager and it was editable
    if(formValue.role === 'manager' && this.userForm.get('managedGuilds')?.enabled) {
       updateData.managedGuilds = formValue.managedGuilds;
    } else if (formValue.role === 'admin') {
       // If role is admin, explicitly send empty array or handle on backend?
       // Backend currently prevents setting guilds for admin, so sending is ok
       updateData.managedGuilds = []; 
    }
    
    // If no fields were actually changed/editable, don't call API?
    if (Object.keys(updateData).length === 0) {
       this.isSaving.set(false);
       this.dialogRef.close(); // Nothing to save
       return;
    }

    console.log("Updating user:", this.data.user._id, "with data:", updateData);

    this.userService.updateUser(this.data.user._id, updateData).subscribe({
      next: (result) => {
        this.isSaving.set(false);
        if (result) {
          this.dialogRef.close('saved'); // Close dialog and signal success
        } else {
          this.error.set('Failed to update user.');
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        this.error.set('An error occurred while saving.');
        console.error('Save error:', err);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(); // Close without signaling save
  }
}
