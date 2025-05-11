import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GuildConfigService, GuildConfig, BonusRule, CommissionSettings, DisplaySettings, Model, Shift, Period } from '../../../services/guild-config.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DisplaySettingsEditModalComponent, DisplaySettings as DisplaySettingsModalData } from '../display-settings-edit-modal/display-settings-edit-modal.component';

import {
  AlertModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule as CoreUIModalModule,
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
    CoreUIModalModule,
    NgbModalModule,
    ButtonModule,
    FormModule,
    SpinnerModule,
    AlertModule,
    GridModule,
    UtilitiesModule,
    CardModule,
    IconDirective,
  ]
})
export class GuildConfigEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() guildConfig: GuildConfig | null = null;
  @Input() guildId: string | null = null;
  @Input() editSection: string = 'full'; // Can be 'full', 'models', 'shifts', 'periods', 'bonus_rules', etc.
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() configSaved = new EventEmitter<GuildConfig | null>();

  configForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Create Guild Configuration';
  submitAttempted: boolean = false;
  originalConfig: GuildConfig | null = null;
  isEditingDisplaySettingsSubFlow: boolean = false;
  currentMspData: { models: Model[], shifts: Shift[], periods: Period[] } = { models: [], shifts: [], periods: [] }; 
  currentDisplaySettings: DisplaySettingsModalData | null = null;

  get isEditMode(): boolean {
    return !!this.guildConfig;
  }

  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
    private guildConfigService: GuildConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.configForm = this.buildForm();
    this.currentDisplaySettings = this.guildConfig?.display_settings ? 
                                  { ...this.guildConfig.display_settings } : 
                                  this.getDefaultDisplaySettings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.isEditingDisplaySettingsSubFlow = false;
      this.prepareFormForMode();
      if (this.isEditMode && this.editSection === 'display_settings') { 
        this.handleDisplaySettingsSubFlow();
      }
    } else if (this.visible && (changes['guildConfig'] || changes['guildId'] || changes['editSection'])) {
      if (!this.isEditingDisplaySettingsSubFlow) {
          this.prepareFormForMode();
      }
    } else if (changes['visible'] && !this.visible) {
      this.resetModalState();
    }
  }

  private handleDisplaySettingsSubFlow(): void {
    const effectiveGuildId = this.guildId || this.guildConfig?.guild_id;
    if (!effectiveGuildId) {
        this.errorMessage = "Guild ID is missing. Cannot edit display settings.";
        this.closeModal();
        return;
    }
    if (!this.guildConfig && this.isEditMode) { 
        this.errorMessage = "Guild configuration data is missing. Cannot edit display settings.";
        this.closeModal();
        return;
    }

    this.isEditingDisplaySettingsSubFlow = true;
    this.title = `Editing Display Settings for ${effectiveGuildId}`;
    this.changeDetectorRef.detectChanges();

    const modalRef = this.modalService.open(DisplaySettingsEditModalComponent, { centered: true, backdrop: 'static' });
    const settingsToEdit = this.guildConfig?.display_settings || this.currentDisplaySettings || this.getDefaultDisplaySettings();
    modalRef.componentInstance.currentDisplaySettings = JSON.parse(JSON.stringify(settingsToEdit));

    modalRef.result.then(
      (result: DisplaySettingsModalData) => {
        this.currentDisplaySettings = result;
        this.saveDisplaySettingsOnly(result, effectiveGuildId);
      },
      (reason) => {
        console.log(`Display settings modal dismissed: ${reason}`);
        this.closeModal(); 
      }
    ).finally(() => {
        this.isEditingDisplaySettingsSubFlow = false;
    });
  }

  private saveDisplaySettingsOnly(displaySettings: DisplaySettingsModalData, guildIdToSave: string): void {
    this.isLoading = true;
    
    let baseConfigPayload: GuildConfig;

    if (this.originalConfig) {
      baseConfigPayload = JSON.parse(JSON.stringify(this.originalConfig));
    } else if (this.guildConfig) { 
      baseConfigPayload = JSON.parse(JSON.stringify(this.guildConfig));
    } else { 
      this.errorMessage = "Original configuration not found to update display settings.";
      this.isLoading = false;
      this.closeModal();
      return;
    }

    baseConfigPayload.guild_id = guildIdToSave; 
    baseConfigPayload.display_settings = displaySettings;
    if(this.guildConfig?._id) baseConfigPayload._id = this.guildConfig._id; 

    const saveObservable = this.guildConfigService.updateGuildConfig(guildIdToSave, baseConfigPayload);

    saveObservable.subscribe({
        next: (savedConfig) => {
            this.isLoading = false;
            this.configSaved.emit(savedConfig);
            this.closeModal(false);
        },
        error: (err) => {
            this.isLoading = false;
            this.errorMessage = err?.error?.message || err?.message || 'Failed to save display settings.';
            this.isEditingDisplaySettingsSubFlow = false; 
            this.changeDetectorRef.detectChanges();
        }
    });
  }

  private getDefaultDisplaySettings(): DisplaySettingsModalData {
    return {
      ephemeral_responses: false,
      show_average: true,
      agency_name: 'Agency',
      show_ids: true,
      bot_name: 'Shift Calculator'
    };
  }

  private setConditionalValidators(): void {
    const guildIdCtrl = this.configForm.get('guild_id');
    guildIdCtrl?.clearValidators();
    guildIdCtrl?.setValidators([Validators.pattern('^[0-9]+$')]);
    if (!this.isEditMode || this.editSection === 'full') {
      guildIdCtrl?.addValidators(Validators.required);
    }
    guildIdCtrl?.updateValueAndValidity();
  }

  private prepareFormForMode(): void {
    this.errorMessage = null;
    this.isLoading = false;
    this.submitAttempted = false;

    if (!this.configForm) {
        this.configForm = this.buildForm();
    }
    this.configForm.reset();

    if (this.isEditMode && this.guildConfig) {
      this.originalConfig = JSON.parse(JSON.stringify(this.guildConfig));
      this.currentDisplaySettings = { ...(this.guildConfig.display_settings || this.getDefaultDisplaySettings()) };
      this.patchForm(this.guildConfig);
      this.configForm.get('guild_id')?.disable();
    } else {
      this.originalConfig = null;
      this.currentDisplaySettings = this.getDefaultDisplaySettings();
      this.configForm.get('guild_id')?.enable();
      this.configForm.get('guild_id')?.setValue(this.guildId || '');
      this.models.clear();
      this.shifts.clear();
      this.periods.clear();
      this.bonus_rules.clear();
      this.clearCommissionControls();
    }
    this.updateTitle();
    this.setConditionalValidators();
    this.changeDetectorRef.detectChanges();
  }

  private updateTitle(): void {
    const baseTitle = this.isEditMode && this.guildConfig ? `Guild ${this.guildConfig.guild_id || this.guildId}` : 'New Guild Configuration';
    switch (this.editSection) {
      case 'full':
        this.title = this.isEditMode ? `Edit Guild Configuration (${this.guildConfig?.guild_id || this.guildId})` : 'Create New Guild Configuration';
        break;
      case 'models':
        this.title = `Manage Models for ${baseTitle}`;
        break;
      case 'shifts':
        this.title = `Manage Shifts for ${baseTitle}`;
        break;
      case 'periods':
        this.title = `Manage Periods for ${baseTitle}`;
        break;
      case 'bonus_rules':
        this.title = `Manage Bonus Rules for ${baseTitle}`;
        break;
      case 'commission_settings_roles':
        this.title = `Manage Role Commissions for ${baseTitle}`;
        break;
      case 'commission_settings_users':
        this.title = `Manage User Overrides for ${baseTitle}`;
        break;
      case 'general_info': 
      case 'display_settings': 
         this.title = `Manage Display Settings for ${baseTitle}`;
         break;
      default:
        this.title = this.isEditMode ? `Edit Guild Configuration (${this.guildConfig?.guild_id || this.guildId})` : 'Create New Guild Configuration';
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      guild_id: [{ value: this.guildConfig?.guild_id || '', disabled: !!this.guildConfig }, [Validators.pattern('^[0-9]+$')]],
      models: this.fb.array(this.guildConfig?.models?.map(m => this.fb.control(m.name, Validators.required)) || []),
      shifts: this.fb.array(this.guildConfig?.shifts?.map(s => this.fb.control(s.name, Validators.required)) || []),
      periods: this.fb.array(this.guildConfig?.periods?.map(p => this.fb.control(p.name, Validators.required)) || []),
      bonus_rules: this.fb.array(this.guildConfig?.bonus_rules?.map(rule =>
        this.fb.group({
          from: [rule.from, [Validators.required, Validators.min(0)]],
          to: [rule.to, [Validators.required, Validators.min(0)]],
          amount: [rule.amount, [Validators.required, Validators.min(0)]]
        }, { validators: this.bonusRuleValidator })
      ) || []),
      commission_settings: this.buildCommissionSettingsForm(),
    });
  }

  private buildCommissionSettingsForm(): FormGroup {
      return this.fb.group({
          roles: this.fb.group({}),
          users: this.fb.group({})
      });
  }

  private patchForm(config: GuildConfig): void {
    if (!this.configForm.get('guild_id')?.value) {
        this.configForm.get('guild_id')?.patchValue(config.guild_id);
    }
    if (this.isEditMode) {
        this.configForm.get('guild_id')?.disable();
    }
    this.currentDisplaySettings = { ...(config.display_settings || this.getDefaultDisplaySettings()) };
    this.setFormArrayData(this.models, config.models);
    this.setFormArrayData(this.shifts, config.shifts);
    this.setFormArrayData(this.periods, config.periods);
    this.patchBonusRules(config.bonus_rules);
    this.patchCommissionSettings(config.commission_settings);
  }

  openDisplaySettingsModal(): void {
    const modalRef = this.modalService.open(DisplaySettingsEditModalComponent, { centered: true, backdrop: 'static' });
    modalRef.componentInstance.currentDisplaySettings = JSON.parse(JSON.stringify(this.currentDisplaySettings || this.getDefaultDisplaySettings()));
    modalRef.result.then(
      (result: DisplaySettingsModalData) => {
        this.currentDisplaySettings = result;
        this.configForm.markAsDirty(); 
        console.log('Display settings updated locally:', result);
      },
      (reason) => { console.log(`Display settings modal dismissed: ${reason}`); }
    );
  }

  private setFormArrayData(formArray: FormArray, data: { name: string }[] | undefined): void {
      formArray.clear();
      (data || []).forEach(item => {
          if (item && typeof item.name === 'string') { 
            formArray.push(this.fb.control(item.name, Validators.required));
          }
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

    if (this.isEditMode && this.originalConfig) {
      saveData = JSON.parse(JSON.stringify(this.originalConfig)); 
    } else {
      saveData.display_settings = { ...this.getDefaultDisplaySettings() };
      saveData.models = [];
      saveData.shifts = [];
      saveData.periods = [];
      saveData.bonus_rules = [];
      saveData.commission_settings = { roles: {}, users: {} };
    }
    
    saveData.display_settings = { ...(this.currentDisplaySettings || this.originalConfig?.display_settings || this.getDefaultDisplaySettings()) };
    if (this.isEditMode && this.guildConfig?._id) saveData._id = this.guildConfig._id;

    switch (this.editSection) {
      case 'full':
        saveData.models = (formValue.models || []).map((name: string) => ({ name } as Model));
        saveData.shifts = (formValue.shifts || []).map((name: string) => ({ name } as Shift));
        saveData.periods = (formValue.periods || []).map((name: string) => ({ name } as Period));
        saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({ from: Number(rule.from), to: Number(rule.to), amount: Number(rule.amount) }));
        saveData.commission_settings = this.prepareCommissionSettingsPayload(formValue.commission_settings);
        break;
      case 'models':
        saveData.models = (formValue.models || []).map((name: string) => ({ name } as Model));
        break;
      case 'shifts':
        saveData.shifts = (formValue.shifts || []).map((name: string) => ({ name } as Shift));
        break;
      case 'periods':
        saveData.periods = (formValue.periods || []).map((name: string) => ({ name } as Period));
        break;
      case 'bonus_rules':
        saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({ from: Number(rule.from), to: Number(rule.to), amount: Number(rule.amount) }));
        break;
      case 'commission_settings_roles':
        if (!saveData.commission_settings) saveData.commission_settings = { roles: {}, users: {} };
        saveData.commission_settings.roles = this.prepareCommissionRolesPayload(formValue.commission_settings.roles);
        break;
      case 'commission_settings_users':
        if (!saveData.commission_settings) saveData.commission_settings = { roles: {}, users: {} };
        saveData.commission_settings.users = this.prepareCommissionUsersPayload(formValue.commission_settings.users);
        break;
    }

    let saveObservable: Observable<GuildConfig>;
    const effectiveGuildId = this.isEditMode ? (this.guildId || this.guildConfig!.guild_id!) : formValue.guild_id;
    if (!effectiveGuildId) {
        this.isLoading = false;
        this.errorMessage = "Guild ID is missing.";
        return;
    }

    if (!this.isEditMode || !this.originalConfig) {
      const createPayload: GuildConfig = {
        guild_id: effectiveGuildId,
        models: saveData.models || [],
        shifts: saveData.shifts || [],
        periods: saveData.periods || [],
        bonus_rules: saveData.bonus_rules || [],
        display_settings: saveData.display_settings || this.getDefaultDisplaySettings(),
        commission_settings: saveData.commission_settings || {roles: {}, users: {}},
      };
      if (saveData._id) createPayload._id = saveData._id; 
      saveObservable = this.guildConfigService.createGuildConfig(createPayload);
    } else { 
      const updatePayload: GuildConfig = {
        ...(this.originalConfig as GuildConfig), 
        guild_id: effectiveGuildId, 
        display_settings: saveData.display_settings!, // Assert as DisplaySettings is always set
        models: (this.editSection === 'models' || this.editSection === 'full') ? saveData.models! : this.originalConfig.models,
        shifts: (this.editSection === 'shifts' || this.editSection === 'full') ? saveData.shifts! : this.originalConfig.shifts,
        periods: (this.editSection === 'periods' || this.editSection === 'full') ? saveData.periods! : this.originalConfig.periods,
        bonus_rules: (this.editSection === 'bonus_rules' || this.editSection === 'full') ? saveData.bonus_rules! : this.originalConfig.bonus_rules,
        commission_settings: (this.editSection === 'commission_settings_roles' || this.editSection === 'commission_settings_users' || this.editSection === 'full') 
                           ? { ...this.originalConfig.commission_settings, ...saveData.commission_settings } 
                           : this.originalConfig.commission_settings,
      };
      if (saveData._id) updatePayload._id = saveData._id;
      saveObservable = this.guildConfigService.updateGuildConfig(effectiveGuildId, updatePayload);
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
      const findErrorsRecursive = (control: AbstractControl | null, path: string) => {
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
                    findErrorsRecursive(nestedControl, currentPath);
                  }
              });
          }
      }
      findErrorsRecursive(this.configForm, '');
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
    this.isEditingDisplaySettingsSubFlow = false;
    this.originalConfig = null;
    this.currentDisplaySettings = this.guildConfig?.display_settings ? 
                                  { ...this.guildConfig.display_settings } : 
                                  this.getDefaultDisplaySettings(); 

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
