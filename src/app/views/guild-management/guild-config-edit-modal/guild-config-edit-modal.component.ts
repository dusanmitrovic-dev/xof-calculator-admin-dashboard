import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// FIX: Import AbstractControl
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

// Import CoreUI Modules
import {
  AlertModule,
  ButtonModule,
  FormModule,
  GridModule,
  ModalModule,
  SpinnerModule,
  UtilitiesModule
} from '@coreui/angular';

import { GuildConfigService, GuildConfig, BonusRule, CommissionSettings } from '../../../services/guild-config.service';

@Component({
  selector: 'app-guild-config-edit-modal',
  templateUrl: './guild-config-edit-modal.component.html',
  styleUrls: ['./guild-config-edit-modal.component.scss'],
  standalone: true, // Make component standalone
  imports: [ // Add imports array
    CommonModule, // For *ngIf, *ngFor
    ReactiveFormsModule, // For formGroup, formControlName, formArrayName etc.
    ModalModule, // For c-modal, c-modal-header, c-modal-body, c-modal-footer
    ButtonModule, // For cButton
    FormModule, // For cFormControl, cFormLabel, cFormCheck etc.
    SpinnerModule, // For c-spinner
    AlertModule, // For c-alert
    GridModule, // For c-row, c-col
    UtilitiesModule // For spacing/text utilities if needed
  ]
})
export class GuildConfigEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() guildConfig!: GuildConfig; // Use definite assignment assertion if always provided when visible
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() configSaved = new EventEmitter<GuildConfig>();

  configForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
    private guildConfigService: GuildConfigService
  ) { }

  ngOnInit(): void {
    this.configForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Patch form only when modal becomes visible AND config is available
    if (changes['visible'] && this.visible && this.guildConfig) {
        console.log('GuildConfig modal opening/config changed:', this.guildConfig);
        // Ensure form exists before patching (should exist from ngOnInit)
        if (this.configForm) {
            this.patchForm(this.guildConfig);
        } else {
            console.error("Config form not initialized in ngOnChanges!");
            this.configForm = this.buildForm(); // Re-initialize as fallback
            this.patchForm(this.guildConfig);
        }
    }

    // Reset state when modal is closed
    if (changes['visible'] && !this.visible) {
       this.resetModalState();
    }
  }

  // Build the main form structure
  private buildForm(): FormGroup {
    return this.fb.group({
      models: this.fb.array([]),
      shifts: this.fb.array([]),
      periods: this.fb.array([]),
      bonus_rules: this.fb.array([]),
      display_settings: this.buildDisplaySettingsForm(),
      commission_settings: this.buildCommissionSettingsForm(),
      // roles (the simple map) is not directly edited in this form
    });
  }

  private buildDisplaySettingsForm(): FormGroup {
      return this.fb.group({
          ephemeral_responses: [false],
          show_average: [true],
          agency_name: ['Agency', Validators.maxLength(50)], // Add validation
          show_ids: [true],
          bot_name: ['Shift Calculator', Validators.maxLength(50)] // Add validation
      });
  }

  private buildCommissionSettingsForm(): FormGroup {
      return this.fb.group({
          roles: this.fb.group({}), // Populated dynamically
          users: this.fb.group({})  // Populated dynamically
      });
  }

  private patchForm(config: GuildConfig): void {
    if (!config || !this.configForm) return;

    // Reset the form to clear previous states, especially for dynamic FormGroups
    this.configForm.reset();

    // Patch top-level static parts
    this.configForm.patchValue({
      display_settings: config.display_settings || {}, // Patch display settings
    });

    // Set FormArray data
    this.setFormArrayData(this.models, config.models);
    this.setFormArrayData(this.shifts, config.shifts);
    this.setFormArrayData(this.periods, config.periods);
    this.patchBonusRules(config.bonus_rules);
    this.patchCommissionSettings(config.commission_settings); // Handles roles & users dynamically

    console.log('Config Form patched:', this.configForm.value);
  }

  private setFormArrayData(formArray: FormArray, data: string[] | undefined): void {
      formArray.clear();
      (data || []).forEach(item => formArray.push(this.fb.control(item, Validators.required)));
  }

  private patchBonusRules(rules: BonusRule[] | undefined): void {
      this.bonus_rules.clear();
      (rules || []).forEach(rule => this.bonus_rules.push(this.fb.group({
          from: [rule.from, [Validators.required, Validators.min(0)]],
          to: [rule.to, [Validators.required, Validators.min(0)]], // Add validation to >= from?
          amount: [rule.amount, [Validators.required, Validators.min(0)]]
      })));
  }

  private patchCommissionSettings(settings: CommissionSettings | undefined): void {
    const rolesGroup = this.configForm.get('commission_settings.roles') as FormGroup;
    const usersGroup = this.configForm.get('commission_settings.users') as FormGroup;

    // Clear existing dynamic controls
    Object.keys(rolesGroup.controls).forEach(key => rolesGroup.removeControl(key));
    Object.keys(usersGroup.controls).forEach(key => usersGroup.removeControl(key));

    // Re-add controls based on the input config
    if (settings?.roles) {
      Object.entries(settings.roles).forEach(([roleId, roleSetting]) => {
         if (roleId && roleSetting != null) { // Check roleSetting exists
             rolesGroup.addControl(roleId, this.fb.group({
                 commission_percentage: [roleSetting.commission_percentage, [Validators.required, Validators.min(0), Validators.max(100)]]
             }));
         }
      });
    }

    if (settings?.users) {
      Object.entries(settings.users).forEach(([userId, userSetting]) => {
         if (userId && userSetting != null) { // Check userSetting exists
             usersGroup.addControl(userId, this.fb.group({
                 hourly_rate: [userSetting.hourly_rate ?? null, [Validators.min(0)]], // Allow null/0
                 override_role: [userSetting.override_role ?? false] // Default to false
             }));
         }
      });
    }
  }


  // --- FormArray Getters ---
  get models(): FormArray { return this.configForm.get('models') as FormArray; }
  get shifts(): FormArray { return this.configForm.get('shifts') as FormArray; }
  get periods(): FormArray { return this.configForm.get('periods') as FormArray; }
  get bonus_rules(): FormArray { return this.configForm.get('bonus_rules') as FormArray; }
  get commissionRoles(): FormGroup { return this.configForm.get('commission_settings.roles') as FormGroup; }
  get commissionUsers(): FormGroup { return this.configForm.get('commission_settings.users') as FormGroup; }


  // --- FormArray Add/Remove Methods ---
  addItem(array: FormArray): void {
    array.push(this.fb.control('', Validators.required));
  }
  removeItem(array: FormArray, index: number): void {
    array.removeAt(index);
  }
  addBonusRule(): void {
    this.bonus_rules.push(this.fb.group({
      from: [0, [Validators.required, Validators.min(0)]],
      to: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]]
    }));
  }
  removeBonusRule(index: number): void {
    this.bonus_rules.removeAt(index);
  }
  // Note: Adding/removing roles/users within commission settings might need dedicated methods
  // if you want users to manage that dynamically in the UI. Currently, it's patched from input.


  saveChanges(): void {
    if (!this.guildConfig || !this.guildConfig.guild_id) {
      this.errorMessage = 'Cannot save. Original Guild configuration or ID is missing.';
      return;
    }

    this.configForm.markAllAsTouched();
    if (this.configForm.invalid) {
       console.log("Config Form invalid:", this.configForm.errors, this.configForm.controls);
       // Find specific errors
       let errorMessages: string[] = []; // Explicit type
       const findErrors = (control: AbstractControl, path: string) => { // Use AbstractControl
           if (control instanceof FormGroup || control instanceof FormArray) {
               Object.keys(control.controls).forEach(key => {
                   // Adjust type assertion for controls property
                   const nestedControl = (control as FormGroup | FormArray).get(key);
                   if (nestedControl) {
                       const currentPath = path ? `${path}.${key}` : key;
                       findErrors(nestedControl, currentPath);
                   }
               });
           }
           if (control?.errors) {
               errorMessages.push(`${path || 'Form'}: ${JSON.stringify(control.errors)}`);
           }
       }
       findErrors(this.configForm, '');
       this.errorMessage = `Please correct the errors in the form. Details: ${errorMessages.join('; ')}`;
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.configForm.getRawValue();
    const updatedData: GuildConfig = {
      _id: this.guildConfig._id, // Preserve original _id
      guild_id: this.guildConfig.guild_id, // Preserve original guild_id
      models: formValue.models,
      shifts: formValue.shifts,
      periods: formValue.periods,
      bonus_rules: formValue.bonus_rules.map((rule: any) => ({ // Ensure numbers
          from: Number(rule.from),
          to: Number(rule.to),
          amount: Number(rule.amount)
      })),
      display_settings: formValue.display_settings,
      commission_settings: { // Structure commission settings correctly
        roles: {}, // Initialize
        users: {} // Initialize
      },
      // Preserve original roles map if it's not part of the form
      roles: this.guildConfig.roles
    };

     // Reconstruct commission_settings.roles
     Object.keys(formValue.commission_settings.roles).forEach(roleId => {
         updatedData.commission_settings.roles[roleId] = {
             commission_percentage: Number(formValue.commission_settings.roles[roleId].commission_percentage)
         };
     });

     // Reconstruct commission_settings.users
     Object.keys(formValue.commission_settings.users).forEach(userId => {
         const userFormValue = formValue.commission_settings.users[userId];
         const hourlyRateValue = userFormValue.hourly_rate; // Value from form can be string, number, or null
         updatedData.commission_settings.users[userId] = {
             // FIX: Convert null or empty string from form to undefined for the target type number | undefined
             hourly_rate: (hourlyRateValue !== null && hourlyRateValue !== '') ? Number(hourlyRateValue) : undefined,
             override_role: userFormValue.override_role
         };
     });


    console.log('Saving config:', updatedData);

    this.guildConfigService.createOrUpdateGuildConfig(this.guildConfig.guild_id, updatedData)
      .subscribe({
        next: (savedConfig) => {
          this.isLoading = false;
          this.configSaved.emit(savedConfig); // Emit the updated config
          this.closeModal();
        },
        error: (err: any) => { // Add type
          this.isLoading = false;
          this.errorMessage = err?.error?.message || err?.message || 'Failed to save configuration.';
          console.error('Save config error:', err);
        }
      });
  }

  closeModal(): void {
    this.handleVisibleChange(false); // Trigger visibleChange to close and reset state
  }

  // Handle the boolean event from CoreUI modal
  handleVisibleChange(isVisible: boolean): void {
    if (this.visible !== isVisible) {
        this.visible = isVisible;
        this.visibleChange.emit(isVisible);
        // Reset logic is now primarily in ngOnChanges based on visible becoming false
    } else if (!isVisible) {
        // Explicitly call reset if closeModal was called (visible already false)
        this.resetModalState();
    }
  }

  private resetModalState(): void {
    console.log('Resetting config modal state');
    this.isLoading = false;
    this.errorMessage = null;
    // Reset form when closing to clear validation states etc.
    // It will be patched again when reopened via ngOnChanges
    if (this.configForm) {
        this.configForm.reset();
        // Clear dynamic FormArrays/FormGroups explicitly if reset doesn't handle them fully
        this.models.clear();
        this.shifts.clear();
        this.periods.clear();
        this.bonus_rules.clear();
        const rolesGroup = this.configForm.get('commission_settings.roles') as FormGroup;
        const usersGroup = this.configForm.get('commission_settings.users') as FormGroup;
        if (rolesGroup) Object.keys(rolesGroup.controls).forEach(key => rolesGroup.removeControl(key));
        if (usersGroup) Object.keys(usersGroup.controls).forEach(key => usersGroup.removeControl(key));
    }
  }

}
