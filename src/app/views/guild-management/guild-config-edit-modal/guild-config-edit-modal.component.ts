import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core'; 
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GuildConfigService, GuildConfig, BonusRule, CommissionSettings, DisplaySettings } from '../../../services/guild-config.service';

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
        modelsCtrl?.setValidators(Validators.required);
        shiftsCtrl?.setValidators(Validators.required);
        periodsCtrl?.setValidators(Validators.required);
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
    
    const currentRawValue = this.configForm.getRawValue();
    this.configForm.reset(); 

    if (this.isEditMode && this.guildConfig) {
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
      this.configForm.get('guild_id')?.enable();
      this.configForm.get('guild_id')?.setValue(this.guildId || currentRawValue.guild_id || ''); 
      this.configForm.get('display_settings')?.patchValue({
        ephemeral_responses: false,
        show_average: true,
        agency_name: 'Agency',
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
          ephemeral_responses: [false, Validators.required],
          show_average: [true, Validators.required],
          agency_name: ['Agency', [Validators.required, Validators.maxLength(50)]],
          show_ids: [true, Validators.required],
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
    this.configForm.patchValue({
      guild_id: config.guild_id,
      display_settings: config.display_settings || {},
    });
    this.configForm.get('guild_id')?.disable(); 

    this.setFormArrayData(this.models, config.models);
    this.setFormArrayData(this.shifts, config.shifts);
    this.setFormArrayData(this.periods, config.periods);
    this.patchBonusRules(config.bonus_rules);
    this.patchCommissionSettings(config.commission_settings);
  }

  private setFormArrayData(formArray: FormArray, data: string[] | undefined): void {
      formArray.clear();
      (data || []).forEach(item => formArray.push(this.fb.control(item, Validators.required)));
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
    let saveData: Partial<GuildConfig> = { guild_id: formValue.guild_id };

    if (this.isEditMode && this.guildConfig?._id) {
        saveData._id = this.guildConfig._id;
    }
    
    const defaultDisplaySettings: DisplaySettings = {
        ephemeral_responses: false,
        show_average: true,
        agency_name: 'Agency',
        show_ids: true,
        bot_name: 'Shift Calculator'
    };

    if (this.editSection === 'full') {
      saveData.models = formValue.models || [];
      saveData.shifts = formValue.shifts || [];
      saveData.periods = formValue.periods || [];
      saveData.display_settings = formValue.display_settings || defaultDisplaySettings;
      saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({ from: Number(rule.from), to: Number(rule.to), amount: Number(rule.amount) }));
      saveData.commission_settings = this.prepareCommissionSettingsPayload(formValue.commission_settings);
    } else if (this.editSection === 'general_info') {
      const originalDisplay = this.guildConfig?.display_settings || defaultDisplaySettings;
      saveData.display_settings = {
        ...originalDisplay,
        agency_name: formValue.display_settings.agency_name,
        bot_name: formValue.display_settings.bot_name
      };
    } else if (this.editSection === 'display_settings') {
      const originalDisplay = this.guildConfig?.display_settings || defaultDisplaySettings;
      saveData.display_settings = {
        ...originalDisplay,
        ephemeral_responses: formValue.display_settings.ephemeral_responses,
        show_average: formValue.display_settings.show_average,
        show_ids: formValue.display_settings.show_ids
      };
    } else if (this.editSection === 'bonus_rules') {
      saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({ from: Number(rule.from), to: Number(rule.to), amount: Number(rule.amount) }));
    } else if (this.editSection === 'commission_settings_roles') {
        const formCommRoles = formValue.commission_settings.roles;
        saveData.commission_settings = {
            ...(this.guildConfig?.commission_settings || { roles: {}, users: {} }), // Preserve users and other parts
            roles: formCommRoles ? 
                   Object.fromEntries(Object.entries(formCommRoles).map(([k, v]: [string, any]) => [k, { commission_percentage: Number(v.commission_percentage) }])) 
                   : {}
        };
    } else if (this.editSection === 'commission_settings_users') {
        const formCommUsers = formValue.commission_settings.users;
        saveData.commission_settings = {
            ...(this.guildConfig?.commission_settings || { roles: {}, users: {} }), // Preserve roles and other parts
            users: formCommUsers ? 
                   Object.fromEntries(Object.entries(formCommUsers).map(([k, v]: [string, any]) => {
                       const userVal: any = { override_role: v.override_role ?? false };
                       if (v.hourly_rate !== null && v.hourly_rate !== undefined && v.hourly_rate !== '') {
                           userVal.hourly_rate = Number(v.hourly_rate);
                       }
                       return [k, userVal];
                   }))
                   : {}
        };
    }

    let saveObservable: Observable<GuildConfig>;

    if (!this.isEditMode) {
      const createPayload: GuildConfig = {
        guild_id: saveData.guild_id!,
        models: saveData.models || [],
        shifts: saveData.shifts || [],
        periods: saveData.periods || [],
        bonus_rules: saveData.bonus_rules || [],
        display_settings: saveData.display_settings || defaultDisplaySettings,
        commission_settings: saveData.commission_settings || {roles: {}, users: {}}
      };
      saveObservable = this.guildConfigService.createGuildConfig(createPayload);
    } else {
      if (!this.guildId || !this.guildConfig) {
        this.isLoading = false;
        this.errorMessage = 'Guild ID or original config is missing. Cannot update configuration.';
        return;
      }
      const updatePayload: GuildConfig = {
        ...(this.guildConfig as GuildConfig),
        ...saveData,
        guild_id: this.guildId
      };
      if (saveData._id) updatePayload._id = saveData._id;

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
                hourly_rate: (hourlyRateValue !== null && hourlyRateValue !== undefined && hourlyRateValue !== '') ? Number(hourlyRateValue) : undefined,
                override_role: userFormValue.override_role ?? false
            };
            if (payload.users[userId].hourly_rate === undefined) {
              delete payload.users[userId].hourly_rate; 
            }
        });
    }
    return payload;
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
    
    if (this.configForm) {
        const wasEditMode = this.isEditMode;
        // Store a deep copy of potentially complex objects if they are to be restored
        const originalDisplaySettings = this.isEditMode && this.guildConfig?.display_settings ? JSON.parse(JSON.stringify(this.guildConfig.display_settings)) : null;
        const originalModels = this.isEditMode && this.guildConfig ? [...this.guildConfig.models] : [];
        const originalShifts = this.isEditMode && this.guildConfig ? [...this.guildConfig.shifts] : [];
        const originalPeriods = this.isEditMode && this.guildConfig ? [...this.guildConfig.periods] : [];
        const originalBonusRules = this.isEditMode && this.guildConfig?.bonus_rules ? JSON.parse(JSON.stringify(this.guildConfig.bonus_rules)) : [];
        const originalCommissionSettings = this.isEditMode && this.guildConfig?.commission_settings ? JSON.parse(JSON.stringify(this.guildConfig.commission_settings)) : { roles: {}, users: {} };

        this.configForm.reset();

        if (wasEditMode && this.guildConfig) {
            this.patchForm(this.guildConfig); // repopulate with original data for this edit session
            this.configForm.get('guild_id')?.disable();
        } else { // Create mode defaults
            this.configForm.get('guild_id')?.enable();
            this.configForm.get('guild_id')?.setValue(this.guildConfig?.guild_id || ''); // Use guildConfig.guild_id if somehow available, else empty
            this.configForm.get('display_settings')?.patchValue(originalDisplaySettings || {
                ephemeral_responses: false,
                show_average: true,
                agency_name: 'Agency',
                show_ids: true,
                bot_name: 'Shift Calculator'
            });
            this.setFormArrayData(this.models, originalModels);
            this.setFormArrayData(this.shifts, originalShifts);
            this.setFormArrayData(this.periods, originalPeriods);
            this.patchBonusRules(originalBonusRules);
            this.patchCommissionSettings(originalCommissionSettings);
        }
        this.setConditionalValidators(); 
    }
  }
}
