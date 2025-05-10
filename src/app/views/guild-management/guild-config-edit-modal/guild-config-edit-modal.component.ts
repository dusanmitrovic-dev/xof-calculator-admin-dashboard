import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GuildConfigService, GuildConfig, BonusRule, CommissionSettings, DisplaySettings, Model, Shift, Period } from '../../../services/guild-config.service'; // Assuming Model, Shift, Period are exported

import {
  AlertModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  SpinnerModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

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
    UtilitiesModule,
    CardModule,
    IconDirective
  ]
})
export class GuildConfigEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() guildConfig: GuildConfig | null = null;
  @Input() guildId: string | null = null;
  @Input() editSection: string = 'full';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() configSaved = new EventEmitter<GuildConfig | null>();

  configForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Create Guild Configuration';
  submitAttempted: boolean = false;
  originalConfig: GuildConfig | null = null; // Store original config data

  // For MSP display in template
  currentMspData: { models: Model[], shifts: Shift[], periods: Period[] } = { models: [], shifts: [], periods: [] };

  get isEditMode(): boolean {
    return !!this.guildConfig;
  }

  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
    private guildConfigService: GuildConfigService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.configForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.prepareFormForMode();
    } else if (this.visible && (changes['guildConfig'] || changes['guildId'] || changes['editSection'])) {
      this.prepareFormForMode();
    } else if (changes['visible'] && !this.visible) {
      this.resetModalState();
    }
  }

  private setConditionalValidators(): void {
    const guildIdCtrl = this.configForm.get('guild_id');
    const modelsCtrl = this.configForm.get('models');
    const shiftsCtrl = this.configForm.get('shifts');
    const periodsCtrl = this.configForm.get('periods');

    guildIdCtrl?.clearValidators();
    modelsCtrl?.clearValidators();
    shiftsCtrl?.clearValidators();
    periodsCtrl?.clearValidators();

    guildIdCtrl?.setValidators([Validators.pattern('^[0-9]+$')]);

    if (!this.isEditMode || this.editSection === 'full') {
      guildIdCtrl?.addValidators(Validators.required);
      if (this.editSection === 'full') {
        // Validators for FormArrays should be on their controls, not the array itself.
        // However, we can check if the array is empty if needed.
        // For now, individual items will have Validators.required.
      }
    }

    guildIdCtrl?.updateValueAndValidity();
    modelsCtrl?.updateValueAndValidity();
    shiftsCtrl?.updateValueAndValidity();
    periodsCtrl?.updateValueAndValidity();
    this.configForm.get('display_settings.agency_name')?.updateValueAndValidity();
    this.configForm.get('display_settings.bot_name')?.updateValueAndValidity();
  }

  private prepareFormForMode(): void {
    this.errorMessage = null;
    this.isLoading = false;
    this.submitAttempted = false;

    if (!this.configForm) {
        this.configForm = this.buildForm();
    }

    // Reset the form before populating it with data
    this.configForm.reset();
    this.currentMspData = { models: [], shifts: [], periods: [] }; // Reset MSP data

    if (this.isEditMode && this.guildConfig) {
      // Store original config for later reference
      this.originalConfig = JSON.parse(JSON.stringify(this.guildConfig));
      
      // Patch all the form with existing data - this ensures we start with real values
      this.patchForm(this.guildConfig);
      
      this.configForm.get('guild_id')?.disable();
      let sectionTitlePart = 'Guild Configuration';
      switch(this.editSection) {
        case 'general_info': sectionTitlePart = 'General Info (Names)'; break;
        case 'display_settings': sectionTitlePart = 'Display Settings (Toggles)'; break;
        case 'bonus_rules': sectionTitlePart = 'Bonus Rules'; break;
        case 'commission_settings_roles': sectionTitlePart = 'Role Commissions'; break;
        case 'commission_settings_users': sectionTitlePart = 'User Overrides'; break;
        default: sectionTitlePart = 'Full Configuration';
      }
      this.title = `Edit ${sectionTitlePart} (${this.guildConfig.guild_id || this.guildId})`;
    } else {
      this.title = 'Create New Guild Configuration';
      this.editSection = 'full';
      this.originalConfig = null;
      this.configForm.get('guild_id')?.enable();
      this.configForm.get('guild_id')?.setValue(this.guildId || '');
      this.configForm.get('display_settings')?.patchValue({
        ephemeral_responses: false,
        show_average: true,
        agency_name: 'Agency2',
        show_ids: true,
        bot_name: 'Shift Calculator'
      });
      this.models.clear();
      this.shifts.clear();
      this.periods.clear();
      this.bonus_rules.clear();
      this.clearCommissionControls();
    }
    this.setConditionalValidators();
    this.changeDetectorRef.detectChanges();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      guild_id: [{ value: '', disabled: false }, [Validators.pattern('^[0-9]+$')]],
      models: this.fb.array([]), // FormArray for strings (e.g., names)
      shifts: this.fb.array([]), // FormArray for strings
      periods: this.fb.array([]), // FormArray for strings
      bonus_rules: this.fb.array([]),
      display_settings: this.buildDisplaySettingsForm(),
      commission_settings: this.buildCommissionSettingsForm(),
    });
  }

  private buildDisplaySettingsForm(): FormGroup {
      return this.fb.group({
          ephemeral_responses: [this.guildConfig?.display_settings.ephemeral_responses, Validators.required],
          show_average: [this.guildConfig?.display_settings.show_average, Validators.required],
          agency_name: [this.guildConfig?.display_settings.agency_name, [Validators.required, Validators.maxLength(50)]],
          show_ids: [this.guildConfig?.display_settings.show_ids, Validators.required],
          bot_name: [this.guildConfig?.display_settings.bot_name, [Validators.required, Validators.maxLength(50)]]
      });
  }
  private buildCommissionSettingsForm(): FormGroup {
      return this.fb.group({
          roles: this.fb.group({}),
          users: this.fb.group({})
      });
  }

  private patchForm(config: GuildConfig): void {
    this.configForm.patchValue({ // Patch top-level controls
      guild_id: config.guild_id,
    });
    this.configForm.get('guild_id')?.disable();

    const displaySettingsForm = this.configForm.get('display_settings');
    if (displaySettingsForm && config.display_settings) {
      // Use real display settings from database instead of merging with defaults
      displaySettingsForm.patchValue(config.display_settings);
    }

    // Populate currentMspData for template display
    this.currentMspData = {
        models: config.models || [],
        shifts: config.shifts || [],
        periods: config.periods || [],
    };

    // Populate FormArrays with string names for editing
    this.setFormArrayData(this.models, config.models);
    this.setFormArrayData(this.shifts, config.shifts);
    this.setFormArrayData(this.periods, config.periods);
    
    this.patchBonusRules(config.bonus_rules);
    this.patchCommissionSettings(config.commission_settings);
  }

  // Assuming Model, Shift, Period types have a 'name' property
  private setFormArrayData(formArray: FormArray, data: { name: string }[] | string[] | undefined): void {
      formArray.clear();
      (data || []).forEach(item => {
          if (typeof item === 'string') {
            formArray.push(this.fb.control(item, Validators.required));
          } else if (item && typeof item.name === 'string') { // Check if item and item.name exist
            formArray.push(this.fb.control(item.name, Validators.required));
          }
          // Add else if or error handling if items are not strings or {name: string}
      });
  }


  private patchBonusRules(rules: BonusRule[] | undefined): void {
      this.bonus_rules.clear();
      (rules || []).forEach(rule => this.bonus_rules.push(this.fb.group({
          from: [rule.from, [Validators.required, Validators.min(0)]],
          to: [rule.to, [Validators.required, Validators.min(0)]],
          amount: [rule.amount, [Validators.required, Validators.min(0)]]
      }, { validators: this.bonusRuleValidator })));
  }

  private bonusRuleValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;
    if (from !== null && to !== null && parseFloat(to) < parseFloat(from)) {
      return { 'toLessThanFrom': true };
    }
    return null;
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

  get guild_id_control(): FormControl { return this.configForm.get('guild_id') as FormControl; }
  get models(): FormArray { return this.configForm.get('models') as FormArray; }
  get shifts(): FormArray { return this.configForm.get('shifts') as FormArray; }
  get periods(): FormArray { return this.configForm.get('periods') as FormArray; }
  get bonus_rules(): FormArray { return this.configForm.get('bonus_rules') as FormArray; }
  get commissionRoles(): FormGroup { return this.configForm.get('commission_settings.roles') as FormGroup; }
  get commissionUsers(): FormGroup { return this.configForm.get('commission_settings.users') as FormGroup; }

  addItemManually(array: FormArray, value: string): void {
    if (value) {
        array.push(this.fb.control(value, Validators.required));
        array.markAsDirty();
        array.updateValueAndValidity();
    }
  }

  handleItemAdd(array: FormArray, input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.addItemManually(array, value);
      input.value = '';
    }
  }

  handleItemAddOnBlur(array: FormArray, input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.addItemManually(array, value);
      input.value = '';
    }
  }

  removeItem(array: FormArray, index: number): void {
    array.removeAt(index);
    array.markAsDirty();
    array.updateValueAndValidity();
  }
  addBonusRule(): void {
    this.bonus_rules.push(this.fb.group({
      from: [0, [Validators.required, Validators.min(0)]],
      to: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]]
    }, { validators: this.bonusRuleValidator }));
    this.bonus_rules.markAsDirty();
  }
  removeBonusRule(index: number): void {
    this.bonus_rules.removeAt(index);
    this.bonus_rules.markAsDirty();
  }

  // Placeholder for MSP modal
  openMspSettingsModal(): void {
    console.warn('openMspSettingsModal clicked - Not Implemented');
    // Here you would typically open another modal component
    // and pass `this.currentMspData` or `this.guildConfig` to it.
    // After that modal closes, you might get updated MSP data back
    // which you would then use to update `this.currentMspData`
    // and potentially the main form's FormArrays if they are directly editable here too.
  }


  saveChanges(): void {
    this.submitAttempted = true;
    this.configForm.markAllAsTouched();
    this.setConditionalValidators();

    if (this.configForm.invalid) {
      this.displayFormErrors();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const formValue = this.configForm.getRawValue();
    
    // Start with a base save payload
    let saveData: Partial<GuildConfig> = { 
      guild_id: formValue.guild_id 
    };

    const defaultDisplaySettings: DisplaySettings = {
      ephemeral_responses: false,
      show_average: true,
      agency_name: 'Agency4',
      show_ids: true,
      bot_name: 'Shift Calculator'
    };

    // For edit mode, we should merge with original config to preserve data
    if (this.isEditMode && this.originalConfig) {
      // Start with a deep copy of the original config
      saveData = JSON.parse(JSON.stringify(this.originalConfig));
    } else {
      // For create mode, ensure display_settings is initialized
      saveData.display_settings = { ...defaultDisplaySettings };
    }

    // If there's an ID from the original config, preserve it
    if (this.isEditMode && this.guildConfig?._id) {
      saveData._id = this.guildConfig._id;
    }

    // Ensure display_settings exists on saveData if not already set by full merge
    if (!saveData.display_settings) {
      saveData.display_settings = this.originalConfig?.display_settings 
        ? { ...this.originalConfig.display_settings } 
        : { ...defaultDisplaySettings };
    }

    // Now apply only the sections being edited based on editSection
    if (this.editSection === 'full') {
      // For full edit, we update everything
      saveData.models = this.currentMspData.models.length > 0 ? 
        this.currentMspData.models :
        (formValue.models || []).map((name: string) => ({name} as Model));
      
      saveData.shifts = this.currentMspData.shifts.length > 0 ? 
        this.currentMspData.shifts :
        (formValue.shifts || []).map((name: string) => ({name} as Shift));
      
      saveData.periods = this.currentMspData.periods.length > 0 ? 
        this.currentMspData.periods :
        (formValue.periods || []).map((name: string) => ({name} as Period));
      
      // Ensure formValue.display_settings is used for 'full' edit
      saveData.display_settings = formValue.display_settings;
      saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({
        from: Number(rule.from), 
        to: Number(rule.to), 
        amount: Number(rule.amount)
      }));
      saveData.commission_settings = this.prepareCommissionSettingsPayload(formValue.commission_settings);
    } 
    else if (this.editSection === 'general_info') {
      saveData.display_settings!.agency_name = formValue.display_settings.agency_name;
      saveData.display_settings!.bot_name = formValue.display_settings.bot_name;
    } 
    else if (this.editSection === 'display_settings') {
      saveData.display_settings!.ephemeral_responses = formValue.display_settings.ephemeral_responses;
      saveData.display_settings!.show_average = formValue.display_settings.show_average;
      saveData.display_settings!.show_ids = formValue.display_settings.show_ids;
    } 
    else if (this.editSection === 'bonus_rules') {
      saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({
        from: Number(rule.from), 
        to: Number(rule.to), 
        amount: Number(rule.amount)
      }));
    } 
    else if (this.editSection === 'commission_settings_roles') {
      if (!saveData.commission_settings) saveData.commission_settings = { roles: {}, users: {} };
      saveData.commission_settings.roles = this.prepareCommissionRolesPayload(formValue.commission_settings.roles);
    } 
    else if (this.editSection === 'commission_settings_users') {
      if (!saveData.commission_settings) saveData.commission_settings = { roles: {}, users: {} };
      saveData.commission_settings.users = this.prepareCommissionUsersPayload(formValue.commission_settings.users);
    }

    let saveObservable: Observable<GuildConfig>;

    if (!this.isEditMode) {
      // For create mode, construct a full GuildConfig payload
      const createPayload: GuildConfig = {
        guild_id: saveData.guild_id || formValue.guild_id, // Ensure guild_id is taken from formValue if not on saveData
        models: saveData.models || (formValue.models || []).map((name: string) => ({name} as Model)),
        shifts: saveData.shifts || (formValue.shifts || []).map((name: string) => ({name} as Shift)),
        periods: saveData.periods || (formValue.periods || []).map((name: string) => ({name} as Period)),
        bonus_rules: saveData.bonus_rules || [],
        display_settings: saveData.display_settings || defaultDisplaySettings,
        commission_settings: saveData.commission_settings || {roles: {}, users: {}},
      };
      if (saveData._id) createPayload._id = saveData._id;
      saveObservable = this.guildConfigService.createGuildConfig(createPayload);
    } else {
      if (!this.guildId) {
        this.isLoading = false;
        this.errorMessage = 'Guild ID is missing. Cannot update configuration.';
        return;
      }
      
      // For update mode, ensure we're sending a complete GuildConfig object
      // by merging the partial saveData with the originalConfig.
      if (!this.originalConfig) {
        this.isLoading = false;
        this.errorMessage = 'Original configuration is missing. Cannot update.';
        console.error('Original config is null in edit mode during save.');
        return;
      }

      const updatePayload: GuildConfig = {
        ...this.originalConfig, // Start with the original full config
        ...saveData, // Override with changes from saveData
        guild_id: this.guildId, // Ensure guild_id is the correct one for the update call
        // Ensure nested objects are also correctly formed if partially updated
        display_settings: {
          ...(this.originalConfig.display_settings || defaultDisplaySettings),
          ...(saveData.display_settings || {})
        },
        commission_settings: {
            ...(this.originalConfig.commission_settings || { roles: {}, users: {} }),
            ...(saveData.commission_settings || {})
        },
        bonus_rules: saveData.bonus_rules !== undefined ? saveData.bonus_rules : this.originalConfig.bonus_rules,
        models: saveData.models !== undefined ? saveData.models : this.originalConfig.models,
        shifts: saveData.shifts !== undefined ? saveData.shifts : this.originalConfig.shifts,
        periods: saveData.periods !== undefined ? saveData.periods : this.originalConfig.periods,
      };
      if (saveData._id) updatePayload._id = saveData._id; // Carry over MongoDB _id if present
      
      saveObservable = this.guildConfigService.updateGuildConfig(this.guildId, updatePayload);
    }

    saveObservable.subscribe({
      next: (savedConfig: GuildConfig) => {
        this.isLoading = false;
        this.configSaved.emit(savedConfig);
        this.closeModal(false);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.message || 'Failed to save configuration.';
        console.error('Modal: Save config error:', err);
      }
    });
  }

  private prepareCommissionRolesPayload(formRoles: any): any {
    const roles: any = {};
    if (formRoles) {
      Object.keys(formRoles).forEach(roleId => {
        roles[roleId] = {
          commission_percentage: Number(formRoles[roleId].commission_percentage)
        };
      });
    }
    return roles;
  }

  private prepareCommissionUsersPayload(formUsers: any): any {
    const users: any = {};
    if (formUsers) {
      Object.keys(formUsers).forEach(userId => {
        const userFormValue = formUsers[userId];
        const hourlyRateValue = userFormValue.hourly_rate;
        users[userId] = {
          override_role: userFormValue.override_role ?? false
        };
        if (hourlyRateValue !== null && hourlyRateValue !== undefined && hourlyRateValue !== '') {
          users[userId].hourly_rate = Number(hourlyRateValue);
        }
      });
    }
    return users;
  }

  private prepareCommissionSettingsPayload(formCommissionSettings: any): CommissionSettings {
    return {
      roles: this.prepareCommissionRolesPayload(formCommissionSettings.roles),
      users: this.prepareCommissionUsersPayload(formCommissionSettings.users)
    };
  }

  private displayFormErrors(): void {
      let errorMessages: string[] = [];
      const findErrors = (control: AbstractControl | null, path: string) => {
          if (!control) return;
          if (control.errors) {
              for (const keyError of Object.keys(control.errors)) {
                errorMessages.push(`Error at '${path || 'Form'}.${keyError}': ${JSON.stringify(control.errors[keyError])}`);
              }
          }
          if (control instanceof FormGroup || control instanceof FormArray) {
              Object.keys(control.controls).forEach(key => {
                  const nestedControl = control.get(key);
                  const currentPath = path ? `${path}.${key}` : key;
                  if (nestedControl && (nestedControl.invalid || nestedControl instanceof FormGroup || nestedControl instanceof FormArray)) {
                    findErrors(nestedControl, currentPath);
                  }
              });
          }
      }
      findErrors(this.configForm, '');
      this.errorMessage = `Please correct the errors in the form. Details: ${errorMessages.join('; ')}`;
      console.warn('Form validation failed. Errors:', errorMessages, 'Form Values:', this.configForm.getRawValue());
  }

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
        this.resetModalState();
      }
    }
  }

  private resetModalState(): void {
    this.isLoading = false;
    this.errorMessage = null;
    this.submitAttempted = false;
    this.currentMspData = { models: [], shifts: [], periods: [] };
    this.originalConfig = null;

    if (this.configForm) {
      this.configForm.reset();
      
      this.models.clear();
      this.shifts.clear();
      this.periods.clear();
      this.bonus_rules.clear();
      this.clearCommissionControls();
      
      this.setConditionalValidators();
    }
  }
}
