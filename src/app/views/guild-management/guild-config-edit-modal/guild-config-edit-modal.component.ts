import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs'; // Import Observable

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
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    FormModule,
    SpinnerModule,
    AlertModule,
    GridModule,
    UtilitiesModule
  ]
})
export class GuildConfigEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  // Changed Input name to match template binding [guildConfig]
  @Input() guildConfig: GuildConfig | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() configSaved = new EventEmitter<GuildConfig | null>();

  configForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Create Guild Configuration';

  // Determine mode based on whether guildConfig is provided
  get isEditMode(): boolean {
    return !!this.guildConfig;
  }

  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
    private guildConfigService: GuildConfigService
  ) { }

  ngOnInit(): void {
    this.configForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to visibility changes or changes to guildConfig while visible
    if (changes['visible'] && this.visible) {
      this.prepareFormForMode();
    } else if (this.visible && changes['guildConfig']) {
      this.prepareFormForMode();
    }
    // Handle closing
    else if (changes['visible'] && !this.visible) {
      this.resetModalState();
    }
  }

  private prepareFormForMode(): void {
    this.errorMessage = null;
    this.isLoading = false;
    this.configForm = this.buildForm(); // Rebuild form structure

    if (this.isEditMode && this.guildConfig) {
      this.title = `Edit Guild Configuration (${this.guildConfig.guild_id})`;
      this.patchForm(this.guildConfig);
      this.configForm.get('guild_id')?.disable(); // Disable guild_id in edit mode
      console.log('Modal prepared for EDIT mode');
    } else {
      this.title = 'Create New Guild Configuration';
      this.configForm.reset(); // Reset to default values
      this.configForm.get('guild_id')?.enable();
      // Ensure arrays/groups are clear
      this.models.clear();
      this.shifts.clear();
      this.periods.clear();
      this.bonus_rules.clear();
      this.clearCommissionControls();
      console.log('Modal prepared for CREATE mode');
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      guild_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      models: this.fb.array([]),
      shifts: this.fb.array([]),
      periods: this.fb.array([]),
      bonus_rules: this.fb.array([]),
      display_settings: this.buildDisplaySettingsForm(),
      commission_settings: this.buildCommissionSettingsForm(),
    });
  }

  private buildDisplaySettingsForm(): FormGroup {
      return this.fb.group({
          ephemeral_responses: [false],
          show_average: [true],
          agency_name: ['Agency', [Validators.required, Validators.maxLength(50)]],
          show_ids: [true],
          bot_name: ['Shift Calculator', [Validators.required, Validators.maxLength(50)]]
      });
  }
  private buildCommissionSettingsForm(): FormGroup {
      return this.fb.group({
          roles: this.fb.group({}),
          users: this.fb.group({}) 
      });
  }

 private patchForm(config: GuildConfig): void {
    if (!config || !this.configForm) return;

    this.configForm.patchValue({
      guild_id: config.guild_id,
      display_settings: config.display_settings || {},
    });

    this.setFormArrayData(this.models, config.models);
    this.setFormArrayData(this.shifts, config.shifts);
    this.setFormArrayData(this.periods, config.periods);
    this.patchBonusRules(config.bonus_rules);
    this.patchCommissionSettings(config.commission_settings);

    console.log('Config Form patched for edit:', this.configForm.value);
  }

  private setFormArrayData(formArray: FormArray, data: string[] | undefined): void {
      formArray.clear();
      (data || []).forEach(item => formArray.push(this.fb.control(item, Validators.required)));
  }

  private patchBonusRules(rules: BonusRule[] | undefined): void {
      this.bonus_rules.clear();
      (rules || []).forEach(rule => this.bonus_rules.push(this.fb.group({
          from: [rule.from, [Validators.required, Validators.min(0)]],
          to: [rule.to, [Validators.required, Validators.min(rule.from || 0)]],
          amount: [rule.amount, [Validators.required, Validators.min(0)]]
      })));
  }

  private patchCommissionSettings(settings: CommissionSettings | undefined): void {
    const rolesGroup = this.commissionRoles;
    const usersGroup = this.commissionUsers;

    this.clearCommissionControls();

    if (settings?.roles) {
      Object.entries(settings.roles).forEach(([roleId, roleSetting]) => {
         if (roleId && roleSetting != null) {
             rolesGroup.addControl(roleId, this.fb.group({
                 commission_percentage: [roleSetting.commission_percentage, [Validators.required, Validators.min(0), Validators.max(100)]]
             }));
         }
      });
    }

    if (settings?.users) {
      Object.entries(settings.users).forEach(([userId, userSetting]) => {
         if (userId && userSetting != null) {
             usersGroup.addControl(userId, this.fb.group({
                 hourly_rate: [userSetting.hourly_rate ?? null, [Validators.min(0)]],
                 override_role: [userSetting.override_role ?? false]
             }));
         }
      });
    }
  }

  private clearCommissionControls(): void {
    const rolesGroup = this.commissionRoles;
    const usersGroup = this.commissionUsers;
    if (rolesGroup) Object.keys(rolesGroup.controls).forEach(key => rolesGroup.removeControl(key));
    if (usersGroup) Object.keys(usersGroup.controls).forEach(key => usersGroup.removeControl(key));
  }

  // --- FormArray Getters ---
  get guild_id(): FormControl { return this.configForm.get('guild_id') as FormControl; }
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

  // --- Save Logic ---
  saveChanges(): void {
    this.configForm.markAllAsTouched();

    if (this.configForm.invalid) {
      this.displayFormErrors();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.configForm.getRawValue();

    const saveData: GuildConfig = {
      guild_id: formValue.guild_id,
      models: formValue.models || [],
      shifts: formValue.shifts || [],
      periods: formValue.periods || [],
      bonus_rules: (formValue.bonus_rules || []).map((rule: any) => ({
          from: Number(rule.from),
          to: Number(rule.to),
          amount: Number(rule.amount)
      })),
      display_settings: formValue.display_settings || {},
      commission_settings: this.prepareCommissionSettingsPayload(formValue.commission_settings)
    };

    // Add _id if editing
    if (this.isEditMode && this.guildConfig?._id) {
        saveData._id = this.guildConfig._id;
    }

    console.log(`Modal: Attempting to save in ${this.isEditMode ? 'edit' : 'create'} mode:`, saveData);

    // Use Observable<GuildConfig> for the type
    let saveObservable: Observable<GuildConfig>;

    if (!this.isEditMode) {
      saveObservable = this.guildConfigService.createGuildConfig(saveData);
    } else {
      saveObservable = this.guildConfigService.updateGuildConfig(formValue.guild_id, saveData);
    }

    saveObservable.subscribe({
      // Add explicit type for savedConfig
      next: (savedConfig: GuildConfig) => {
        console.log('Modal: Save successful', savedConfig);
        this.isLoading = false;
        this.configSaved.emit(savedConfig);
        this.closeModal(false);
      },
      // Add explicit type for err
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err?.message || 'Failed to save configuration.';
        console.error('Modal: Save config error:', err);
      }
    });
  }

  private prepareCommissionSettingsPayload(formCommissionSettings: any): CommissionSettings {
    const payload: CommissionSettings = { roles: {}, users: {} };
    if (formCommissionSettings?.roles) {
        Object.keys(formCommissionSettings.roles).forEach(roleId => {
            payload.roles[roleId] = {
                commission_percentage: Number(formCommissionSettings.roles[roleId].commission_percentage)
            };
        });
    }
    if (formCommissionSettings?.users) {
        Object.keys(formCommissionSettings.users).forEach(userId => {
            const userFormValue = formCommissionSettings.users[userId];
            const hourlyRateValue = userFormValue.hourly_rate;
            payload.users[userId] = {
                hourly_rate: (hourlyRateValue !== null && hourlyRateValue !== '') ? Number(hourlyRateValue) : undefined,
                override_role: userFormValue.override_role ?? false
            };
        });
    }
    return payload;
  }

  private displayFormErrors(): void {
      let errorMessages: string[] = [];
      const findErrors = (control: AbstractControl | null, path: string) => {
          if (!control) return;
          if (control instanceof FormGroup || control instanceof FormArray) {
              Object.keys(control.controls).forEach(key => {
                  const nestedControl = control.get(key);
                  const currentPath = path ? `${path}.${key}` : key;
                  findErrors(nestedControl, currentPath);
              });
          }
          if (control.errors) {
              errorMessages.push(`${path || 'Form'}: ${JSON.stringify(control.errors)}`);
          }
      }
      findErrors(this.configForm, '');
      this.errorMessage = `Please correct the errors in the form. Details: ${errorMessages.join('; ')}`;
      console.warn('Form validation failed:', errorMessages);
  }

  // --- Modal Closing / Resetting ---
  closeModal(emitNull: boolean = true): void {
    this.visible = false;
    this.visibleChange.emit(false);
    if (emitNull) {
      this.configSaved.emit(null);
    }
    this.resetModalState();
  }

  handleVisibleChange(isVisible: boolean): void {
     if (this.visible !== isVisible) {
         this.visible = isVisible;
         this.visibleChange.emit(isVisible);
         if (!isVisible) {
             this.configSaved.emit(null); // Signal close without save
             this.resetModalState();
         }
     }
   }

  private resetModalState(): void {
    console.log('Resetting config modal state');
    this.isLoading = false;
    this.errorMessage = null;
    this.guildConfig = null; // Clear input data reference
    if (this.configForm) {
        this.configForm.reset();
        this.guild_id?.enable();
        this.models?.clear();
        this.shifts?.clear();
        this.periods?.clear();
        this.bonus_rules?.clear();
        this.clearCommissionControls();
    }
  }
}
