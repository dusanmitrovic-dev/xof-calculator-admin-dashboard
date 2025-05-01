import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserService, User } from '../../../services/user.service'; // Adjust path
import { AuthService } from '../../../auth/auth.service'; // To check if editing self
import { finalize } from 'rxjs/operators';
import { 
    ModalModule, 
    AlertComponent, 
    SpinnerComponent, 
    GridModule, 
    FormModule, // For c-form-check, etc.
    ButtonDirective // For c-button
} from '@coreui/angular'; // Import necessary CoreUI modules/components

@Component({
  selector: 'app-user-edit-modal',
  standalone: true, // Make component standalone
  imports: [ // Add imports array
    CommonModule, // For *ngIf, *ngFor
    ReactiveFormsModule, // For formGroup, formControlName, etc.
    ModalModule, // For c-modal, c-modal-header, etc.
    AlertComponent, // For c-alert
    SpinnerComponent, // For c-spinner
    GridModule, // For c-row, c-col
    FormModule, // For c-form-check, form controls
    ButtonDirective // For c-button
  ],
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() userToEdit: User | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userSaved = new EventEmitter<User>();

  userForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  availableGuilds: string[] = [];
  loadingGuilds: boolean = false;
  currentUserId: string | null = null; // Prevent admin from demoting self
  isEditingSelf: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.userForm = this.buildForm();
    
    // Listen to role changes to enable/disable managedGuilds
    this.userForm.get('role')?.valueChanges.subscribe(role => {
        this.toggleManagedGuildsControl(role);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      console.log('User edit modal opening for:', this.userToEdit?.email);
      this.isEditingSelf = !!this.currentUserId && !!this.userToEdit && this.userToEdit._id === this.currentUserId;
      this.loadAvailableGuilds(); // Load guilds when modal opens
      if (this.userToEdit) {
          this.patchForm(this.userToEdit);
      } else {
          // Should not happen if modal is always opened with a user
          this.errorMessage = "User data is missing.";
          if (this.userForm) this.userForm.reset(); // Check if userForm exists before reset
      }
    }

    if (changes['visible'] && !this.visible) {
       this.resetModalState();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
        // Email is usually not editable
        email: [{ value: '', disabled: true }], 
        role: ['manager', Validators.required], // Default to manager?
        // managedGuilds uses a FormArray of FormControls holding boolean values (checked state)
        // We map availableGuilds to this structure
        managedGuilds: this.fb.array([]) 
    });
  }
  
   private buildManagedGuildsArray(guildIds: string[], selectedGuilds: string[] | undefined): FormArray {
      const formArray = this.fb.array<FormControl>([]);
      (guildIds || []).forEach(id => {
          const isSelected = (selectedGuilds || []).includes(id);
          formArray.push(this.fb.control(isSelected));
      });
      return formArray;
  }

  private patchForm(user: User): void {
    if (!user || !this.userForm) return;
    
    this.userForm.patchValue({
        email: user.email,
        role: user.role
        // managedGuilds is handled separately
    });
    
    // Rebuild the managedGuilds FormArray based on availableGuilds and user's managedGuilds
    this.userForm.setControl('managedGuilds', 
       this.buildManagedGuildsArray(this.availableGuilds, user.managedGuilds)
    );
    
    // Set initial state for enabled/disabled based on patched role
    this.toggleManagedGuildsControl(user.role);
    
    // Prevent admin from changing their own role
     if (this.isEditingSelf && user.role === 'admin') {
       this.userForm.get('role')?.disable();
     } else {
        this.userForm.get('role')?.enable();
     }

    console.log('User form patched:', this.userForm.value);
  }
  
   private toggleManagedGuildsControl(role: string): void {
    const managedGuildsControl = this.userForm.get('managedGuilds');
    if (!managedGuildsControl) return;

    if (role === 'manager') {
      managedGuildsControl.enable();
    } else { // Admin role or other
      managedGuildsControl.disable();
      // Optionally clear selection if role changes from manager
      // managedGuildsControl.reset(); // Resets to initial values (might not be desired)
      // Or set all controls to false
       (managedGuildsControl as FormArray).controls.forEach(control => control.setValue(false));
    }
  }

  // Fetch available Guild IDs for the multi-select
  private loadAvailableGuilds(): void {
    this.loadingGuilds = true;
    this.errorMessage = null; // Clear previous errors
    this.userService.getAvailableGuilds()
      .pipe(finalize(() => this.loadingGuilds = false))
      .subscribe({
        next: (guildIds) => {
          this.availableGuilds = guildIds || [];
          console.log('Available guilds loaded:', this.availableGuilds);
          // Re-patch form if user data is already loaded to build FormArray correctly
          if(this.userToEdit) {
             this.patchForm(this.userToEdit); 
          }
        },
        error: (err) => {
          console.error('Error loading available guilds:', err);
          this.errorMessage = `Failed to load available guilds: ${err.message || 'Unknown error'}`;
        }
      });
  }
  
   // Getter for the FormArray to use in template
  get managedGuildsControls(): FormControl[] {
     const fa = this.userForm.get('managedGuilds') as FormArray;
     return fa ? (fa.controls as FormControl[]) : [];
  }

  // --- Modal Actions ---
  saveChanges(): void {
    if (!this.userToEdit || !this.userToEdit._id) {
      this.errorMessage = 'Cannot save. User data or ID is missing.';
      return;
    }
    
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
       this.errorMessage = 'Please correct the errors in the form. Check required fields.';
       // Log specific errors for debugging
       console.error('Form Errors:', this.getFormValidationErrors());
       return;
    }
    
    // Prevent admin self-demotion (extra check)
    const intendedRole = this.userForm.getRawValue().role;
    if (this.isEditingSelf && intendedRole !== 'admin') {
        this.errorMessage = "Admin cannot change their own role.";
        return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.userForm.getRawValue();
    
    // Extract selected managed guilds from the FormArray
    let selectedGuilds: string[] = [];
    if (formValue.role === 'manager') {
         selectedGuilds = (formValue.managedGuilds as boolean[])
           .map((checked, index) => checked ? this.availableGuilds[index] : null)
           .filter((id): id is string => id !== null);
    }

    // Ensure updateData keys match the backend expectations (role, managedGuilds)
    const updateData: Partial<Pick<User, 'role' | 'managedGuilds'>> = {
        role: formValue.role,
        managedGuilds: formValue.role === 'manager' ? selectedGuilds : [] // Send empty array if not manager
    };
    
    console.log('Updating user:', this.userToEdit._id, updateData);

    this.userService.updateUser(this.userToEdit._id, updateData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (savedUser) => {
          this.userSaved.emit(savedUser);
          this.closeModal();
        },
        error: (err) => {
           // Attempt to get a more specific error message
           const message = err?.error?.message || err?.message || 'Failed to update user.';
           this.errorMessage = message;
           console.error('Update user error:', err);
        }
      });
  }
  
   // Helper to get form validation errors for debugging
   private getFormValidationErrors() {
       const errors: any = {};
       Object.keys(this.userForm.controls).forEach(key => {
           const controlErrors = this.userForm.get(key)?.errors;
           if (controlErrors) {
               errors[key] = controlErrors;
           }
       });
       // Check FormArray errors if applicable
       const managedGuildsErrors = (this.userForm.get('managedGuilds') as FormArray)?.errors;
       if(managedGuildsErrors) {
           errors['managedGuilds'] = managedGuildsErrors;
       }
       return errors;
   }


  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    // Reset happens in ngOnChanges when visibility changes to false
  }
  
  // Ensure the event type is boolean as expected by CoreUI's visibleChange
  handleVisibleChange(event: boolean): void {
     this.visible = event;
     this.visibleChange.emit(event);
     // Reset happens in ngOnChanges when visibility changes to false
  }
  
  private resetModalState(): void {
       console.log('Resetting user modal state');
       this.isLoading = false;
       this.errorMessage = null;
       this.userToEdit = null;
       this.isEditingSelf = false;
       // No need to reload availableGuilds unless they change frequently
       if (this.userForm) {
            this.userForm.reset({ role: 'manager', email: { value: '', disabled: true } }); // Reset with default role and disabled email
            // Clear the FormArray manually
             const managedGuildsArray = this.userForm.get('managedGuilds') as FormArray;
             if (managedGuildsArray) {
                 // Ensure the array is properly cleared and reset
                 while (managedGuildsArray.length) {
                     managedGuildsArray.removeAt(0);
                 }
             }
             // Re-apply initial state for the guilds control based on default role
             this.toggleManagedGuildsControl('manager'); 
             // Ensure role control is enabled after reset unless it was disabled for self-edit admin
             if (!this.isEditingSelf || this.userForm.get('role')?.value !== 'admin') {
                 this.userForm.get('role')?.enable();
             }
       }
  }
}
