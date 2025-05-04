import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms'; // Added FormArray
import { CommonModule } from '@angular/common';
import { UserService, User, UserUpdateData } from '../../../services/user.service'; // Adjust path
// *** Import specific types from GuildConfigService ***
import { GuildConfigService, GuildConfig, AvailableGuild } from '../../../services/guild-config.service'; 
import { AuthService } from '../../../auth/auth.service'; // To check if editing self
import { finalize, tap, catchError, map } from 'rxjs/operators'; // Added map
import { of } from 'rxjs'; // Import 'of' for catchError

// CoreUI Modules
import {
  ModalModule,
  AlertModule,
  SpinnerModule,
  GridModule,
  FormModule, // Includes FormCheckComponent, FormSelectDirective etc.
  ButtonModule
} from '@coreui/angular';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    AlertModule,
    SpinnerModule,
    GridModule,
    FormModule,
    ButtonModule
  ]
})
export class UserEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() userToEdit: User | null = null; // Changed input name to match template errors
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userSaved = new EventEmitter<User | null>();

  userForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Edit User';

  // Guild Management State
  loadingGuilds: boolean = false;
  availableGuilds: string[] = []; // Holds available guild IDs
  guildLoadError: string | null = null;

  currentUserId: string | null = null;
  isEditingSelf: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private guildConfigService: GuildConfigService // Inject GuildConfigService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.userForm = this.buildForm();

    // Listen for role changes to load/clear guilds and manage checkbox states
    this.userForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'manager') {
        this.loadAvailableGuilds();
      } else {
        this.clearManagedGuilds(); // Clear if role is not manager
        this.availableGuilds = []; // Clear available guilds list
        this.guildLoadError = null;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        this.prepareModal();
      } else {
        this.resetModalState(false);
      }
    }
    // If already visible, react to data changes
    else if (this.visible && changes['userToEdit']) {
        this.prepareModal();
    }
  }

  private prepareModal(): void {
    this.errorMessage = null;
    this.guildLoadError = null;
    this.isLoading = false;
    this.loadingGuilds = false;
    this.availableGuilds = [];
    this.userForm.reset(); // Always reset before patching
    this.clearManagedGuilds(); // Ensure FormArray is empty before patching

    if (this.userToEdit) {
      this.title = `Edit User (${this.userToEdit.email})`;
      this.isEditingSelf = !!this.currentUserId && this.userToEdit._id === this.currentUserId;
      this.patchForm(this.userToEdit);
      // If the user is a manager, load guilds immediately
      if (this.userToEdit.role === 'manager') {
          this.loadAvailableGuilds();
      }
    } else {
      this.errorMessage = "Error: User data is missing.";
      this.title = "Edit User";
      this.isEditingSelf = false;
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: [{ value: '', disabled: true }],
      role: ['user', Validators.required],
      // FormArray to hold the boolean controls for each managed guild checkbox
      managedGuilds: this.fb.array([])
    });
  }

  // Helper to get the FormArray controls for the template
  get managedGuildsControls() {
    return (this.userForm.get('managedGuilds') as FormArray).controls;
  }

  private patchForm(user: User): void {
    if (!user) return;
    this.userForm.patchValue({
        email: user.email,
        role: user.role
    });

    // Clear existing guild controls before patching new ones
    this.clearManagedGuilds();

    // We will patch managedGuilds after availableGuilds are loaded if role is manager

    const roleControl = this.userForm.get('role');
    if (this.isEditingSelf && user.role === 'admin') {
      roleControl?.disable();
    } else {
      roleControl?.enable();
    }
  }

  /**
   * Loads all available guild IDs from the GuildConfigService.
   * Uses getAvailableGuilds for lightweight list.
   */
  private loadAvailableGuilds(): void {
    console.log('UserEditModal: Loading available guilds...');
    this.loadingGuilds = true;
    this.guildLoadError = null;
    this.clearManagedGuilds(); // Clear previous controls

    // *** Use getAvailableGuilds instead of getAllGuildConfigs ***
    this.guildConfigService.getAvailableGuilds().pipe(
      finalize(() => { this.loadingGuilds = false; }),
      catchError(err => {
        console.error('UserEditModal: Error loading available guilds:', err);
        this.guildLoadError = err.message || 'Failed to load available guilds.';
        this.availableGuilds = [];
        return of([]); // Return empty array on error
      })
      // *** No map needed here if getAvailableGuilds returns {id: string, name: string}[] ***
    ).subscribe((guilds: AvailableGuild[]) => { // *** Add type AvailableGuild[] ***
      this.availableGuilds = guilds.map(g => g.id); // Extract only the IDs
      console.log('UserEditModal: Available guilds loaded:', this.availableGuilds);
      this.populateManagedGuildCheckboxes();
    });
  }

  /**
   * Populates the managedGuilds FormArray based on availableGuilds and userToEdit data.
   */
  private populateManagedGuildCheckboxes(): void {
    const managedGuildsArray = this.userForm.get('managedGuilds') as FormArray;
    this.clearManagedGuilds(); // Ensure it's empty before adding

    this.availableGuilds.forEach(guildId => {
      // Check if the user being edited manages this guild
      const isManaged = this.userToEdit?.managed_guild_ids?.includes(guildId) ?? false;
      managedGuildsArray.push(new FormControl(isManaged));
    });
    console.log('UserEditModal: Populated managed guild checkboxes.', managedGuildsArray.value);
  }

  /**
   * Clears the managedGuilds FormArray.
   */
  private clearManagedGuilds(): void {
    const managedGuildsArray = this.userForm.get('managedGuilds') as FormArray;
    while (managedGuildsArray.length !== 0) {
      managedGuildsArray.removeAt(0);
    }
  }

  saveChanges(): void {
    if (!this.userToEdit?._id) {
      this.errorMessage = 'Cannot save: User ID is missing.';
      return;
    }

    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      this.errorMessage = 'Please select a valid role.'; // Or other validation message
      return;
    }

    const formValue = this.userForm.getRawValue(); // Get raw value for potentially disabled role

    if (this.isEditingSelf && formValue.role !== 'admin') {
        this.errorMessage = "Action denied: Admin cannot change their own role.";
        alert(this.errorMessage); // Simple alert for now
        return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const updateData: UserUpdateData = {
        role: formValue.role,
        // Calculate managed_guild_ids based on the checkbox values if role is manager
        managed_guild_ids: formValue.role === 'manager'
            ? this.availableGuilds.filter((_, index) => formValue.managedGuilds[index])
            : [] // Empty array if not a manager
    };

    console.log(`UserEditModal: Updating user ${this.userToEdit._id} with:`, updateData);

    this.userService.updateUser(this.userToEdit._id, updateData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (savedUser) => {
          console.log('UserEditModal: Update successful', savedUser);
          this.userSaved.emit(savedUser);
          this.closeModal(false);
        },
        error: (err: any) => {
          this.errorMessage = err?.message || 'Failed to update user.';
          console.error('UserEditModal: Update error:', err);
        }
      });
  }

  closeModal(emitNull: boolean = true): void {
    this.handleVisibleChange(false, emitNull);
  }

  handleVisibleChange(isVisible: boolean, emitNullEvent: boolean = true): void {
    if (this.visible === isVisible) return;

    this.visible = isVisible;
    this.visibleChange.emit(isVisible);

    if (!isVisible && emitNullEvent) {
      this.userSaved.emit(null);
      this.resetModalState(false);
    }
  }

  private resetModalState(calledFromVisibleChange: boolean): void {
    console.log('UserEditModal: Resetting state');
    this.isLoading = false;
    this.loadingGuilds = false;
    this.errorMessage = null;
    this.guildLoadError = null;
    this.userToEdit = null;
    this.isEditingSelf = false;
    this.availableGuilds = [];
    if (this.userForm) {
        this.clearManagedGuilds(); // Clear form array
        this.userForm.reset({
            role: 'user',
            email: { value: '', disabled: true },
            managedGuilds: [] // Ensure array is reset
        });
        this.userForm.get('role')?.enable();
    }
  }
}
