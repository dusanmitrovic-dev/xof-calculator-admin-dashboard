import { CommonModule } from '@angular/common';
// Import ChangeDetectorRef
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core'; 
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

// Import CoreUI Modules for standalone components
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
    UtilitiesModule,
    CardModule, 
    IconDirective 
  ]
})
export class GuildConfigEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() guildConfig: GuildConfig | null = null;
  @Input() guildId: string | null = null; // This is the reliable ID for updates
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
    private changeDetectorRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.configForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[LOG_MODAL_ONCHANGES] ngOnChanges triggered. Visible:', this.visible, 'Changes:', changes);
    if (changes['guildId']) {
      console.log(`[LOG_MODAL_ONCHANGES_GUILDID] @Input guildId changed to: "${this.guildId}"`);
    }
    if (changes['guildConfig']) {
      console.log(`[LOG_MODAL_ONCHANGES_CONFIG] @Input guildConfig changed. Has _id: ${!!this.guildConfig?._id}, Has guild_id: "${this.guildConfig?.guild_id}"`);
    }

    if (changes['visible'] && this.visible) {
      console.log('[LOG_MODAL_ONCHANGES] Modal became visible, preparing form...');
      this.prepareFormForMode();
    } else if (this.visible && (changes['guildConfig'] || changes['guildId'] || changes['editSection'])) {
      console.log('[LOG_MODAL_ONCHANGES] Modal already visible but relevant inputs changed, preparing form...');
      this.prepareFormForMode();
    }
    else if (changes['visible'] && !this.visible) {
      console.log('[LOG_MODAL_ONCHANGES] Modal became hidden, resetting state...');
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

    if (!this.isEditMode) { // Create Mode - all relevant fields required
      guildIdCtrl?.addValidators(Validators.required);
      modelsCtrl?.setValidators(Validators.required);
      shiftsCtrl?.setValidators(Validators.required);
      periodsCtrl?.setValidators(Validators.required);
      // Note: display_settings.agency_name and bot_name have built-in Validators.required
    } else { // Edit Mode - only require fields relevant to the current editSection
      if (this.editSection === 'full' || this.editSection === 'general_info') {
        modelsCtrl?.setValidators(Validators.required);
        shiftsCtrl?.setValidators(Validators.required);
        periodsCtrl?.setValidators(Validators.required);
      }
      // agency_name and bot_name in display_settings group already have Validators.required
      // No need to conditionally add/remove them here as they are always part of that subgroup's validation
    }
    
    guildIdCtrl?.updateValueAndValidity();
    modelsCtrl?.updateValueAndValidity();
    shiftsCtrl?.updateValueAndValidity();
    periodsCtrl?.updateValueAndValidity();
    this.configForm.get('display_settings.agency_name')?.updateValueAndValidity();
    this.configForm.get('display_settings.bot_name')?.updateValueAndValidity();
  }

  private prepareFormForMode(): void {
    console.log(`[LOG_MODAL_PREPARE_FORM] Preparing form. isEditMode: ${this.isEditMode}, current @Input guildId: "${this.guildId}", guildConfig?.guild_id: "${this.guildConfig?.guild_id}"`);
    this.errorMessage = null;
    this.isLoading = false;
    this.submitAttempted = false;
    
    if (!this.configForm) { 
        this.configForm = this.buildForm();
    }
    // Reset form but preserve guild_id if it's already set for an existing config
    const existingGuildId = this.isEditMode ? this.configForm.get('guild_id')?.value : null;
    this.configForm.reset(); 
    if (this.isEditMode && existingGuildId) {
      this.configForm.get('guild_id')?.setValue(existingGuildId);
    }

    if (this.isEditMode && this.guildConfig) {
      let sectionTitlePart = 'Guild Configuration';
      switch(this.editSection) {
        case 'general_info': sectionTitlePart = 'General Info'; break;
        case 'display_settings': sectionTitlePart = 'Display Settings'; break;
        case 'bonus_rules': sectionTitlePart = 'Bonus Rules'; break;
        case 'commission_settings_roles': sectionTitlePart = 'Role Commissions'; break;
        case 'commission_settings_users': sectionTitlePart = 'User Overrides'; break;
        default: sectionTitlePart = 'Guild Configuration';
      }
      this.title = `Edit ${sectionTitlePart} (${this.guildConfig.guild_id || this.guildId})`; 
      console.log(`[LOG_MODAL_PREPARE_FORM_EDIT] Patching form with guildConfig.guild_id: "${this.guildConfig.guild_id}"`);
      this.patchForm(this.guildConfig); // This will populate all fields from guildConfig
      this.configForm.get('guild_id')?.disable();

    } else { // Create mode or if guildConfig is somehow null in edit mode (fallback)
      this.title = 'Create New Guild Configuration';
      this.editSection = 'full'; // Default to full for creation
      this.models.clear();
      this.shifts.clear();
      this.periods.clear();
      this.bonus_rules.clear();
      this.clearCommissionControls();
      
      console.log(`[LOG_MODAL_PREPARE_FORM_CREATE] Setting guild_id for new config to @Input guildId: "${this.guildId}"`);
      this.configForm.get('guild_id')?.setValue(this.guildId || ''); 
      this.configForm.get('guild_id')?.enable();
      // Set default values for display_settings in create mode
      this.configForm.get('display_settings')?.patchValue({
        ephemeral_responses: false,
        show_average: true,
        agency_name: 'Agency',
        show_ids: true,
        bot_name: 'Shift Calculator'
      });
    }
    this.setConditionalValidators(); // Apply validators AFTER form is patched or defaults set
    this.changeDetectorRef.detectChanges(); 
    console.log('[LOG_MODAL_PREPARE_FORM] Form prepared. Current value:', this.configForm.getRawValue());
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      guild_id: [{ value: '', disabled: false }, [Validators.pattern('^[0-9]+$')]], // Disabled state managed in prepareFormForMode
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
    console.log(`[LOG_MODAL_PATCH_FORM_START] Patching form. Received config.guild_id: "${config?.guild_id}", config.display_settings.agency_name: "${config?.display_settings?.agency_name}"`);
    if (!config || !this.configForm) return;
    
    // Patch the entire form. Form controls not present in 'config' will be ignored or use defaults from buildForm.
    this.configForm.patchValue({
      guild_id: config.guild_id, 
      // models, shifts, periods will be handled by setFormArrayData if present in config
      display_settings: config.display_settings || {},
      // bonus_rules and commission_settings will be handled by their specific patch methods
    });

    // Ensure guild_id is disabled after patching in edit mode
    this.configForm.get('guild_id')?.disable(); 

    this.setFormArrayData(this.models, config.models);
    this.setFormArrayData(this.shifts, config.shifts);
    this.setFormArrayData(this.periods, config.periods);
    this.patchBonusRules(config.bonus_rules);
    this.patchCommissionSettings(config.commission_settings);
    console.log(`[LOG_MODAL_PATCH_FORM_END] Form value after patch. guild_id: "${this.configForm.get('guild_id')?.value}", agency_name: "${this.configForm.get('display_settings.agency_name')?.value}"`);
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
    this.configForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    
    this.setConditionalValidators(); // Re-apply conditional validators based on current section

    if (this.configForm.invalid) {
      this.displayFormErrors();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const formValue = this.configForm.getRawValue(); 

    let saveData: Partial<GuildConfig> = {}; // Use Partial to build the save object

    // Always include guild_id
    saveData.guild_id = formValue.guild_id;

    if (this.isEditMode && this.guildConfig?._id) {
        saveData._id = this.guildConfig._id; // Include MongoDB _id for updates if present
    }

    // Conditionally include fields based on the editSection or if in full create/edit mode
    if (this.editSection === 'full' || this.editSection === 'general_info') {
      saveData.models = formValue.models || [];
      saveData.shifts = formValue.shifts || [];
      saveData.periods = formValue.periods || [];
    }

    if (this.editSection === 'full' || this.editSection === 'display_settings') {
      saveData.display_settings = formValue.display_settings || {};
    }

    if (this.editSection === 'full' || this.editSection === 'bonus_rules') {
      saveData.bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({
          from: Number(rule.from),
          to: Number(rule.to),
          amount: Number(rule.amount)
      }));
    }

    if (this.editSection === 'full' || this.editSection === 'commission_settings_roles' || this.editSection === 'commission_settings_users') {
        // Prepare commission settings carefully, ensuring we only send what's relevant if section-editing
        const commissionPayload: CommissionSettings = { roles: {}, users: {} };
        const formCommissionSettings = formValue.commission_settings;

        if (formCommissionSettings?.roles && (this.editSection === 'full' || this.editSection === 'commission_settings_roles')) {
            Object.keys(formCommissionSettings.roles).forEach(roleId => {
                commissionPayload.roles[roleId] = {
                    commission_percentage: Number(formCommissionSettings.roles[roleId].commission_percentage)
                };
            });
        }
        if (formCommissionSettings?.users && (this.editSection === 'full' || this.editSection === 'commission_settings_users')) {
            Object.keys(formCommissionSettings.users).forEach(userId => {
                const userFormValue = formCommissionSettings.users[userId];
                const hourlyRateValue = userFormValue.hourly_rate;
                commissionPayload.users[userId] = {
                    hourly_rate: (hourlyRateValue !== null && hourlyRateValue !== undefined && hourlyRateValue !== '') ? Number(hourlyRateValue) : undefined,
                    override_role: userFormValue.override_role ?? false
                };
                if (commissionPayload.users[userId].hourly_rate === undefined) {
                  delete commissionPayload.users[userId].hourly_rate; 
                }
            });
        }
        saveData.commission_settings = commissionPayload;
    }

    let saveObservable: Observable<GuildConfig>;

    if (!this.isEditMode) { // Create new config
      // For creation, all parts of saveData should be included as it's a new document.
      // The backend expects a full GuildConfig object here.
      // Ensure all required fields for a new GuildConfig are present or have defaults.
      const fullSaveDataForCreate: GuildConfig = {
        guild_id: saveData.guild_id!,
        models: saveData.models || (this.guildConfig?.models ?? []),
        shifts: saveData.shifts || (this.guildConfig?.shifts ?? []),
        periods: saveData.periods || (this.guildConfig?.periods ?? []),
        bonus_rules: saveData.bonus_rules || (this.guildConfig?.bonus_rules ?? []),
        display_settings: saveData.display_settings || (this.guildConfig?.display_settings ?? { agency_name: 'Agency', bot_name: 'Bot', ephemeral_responses: false, show_average: true, show_ids: true}),
        commission_settings: saveData.commission_settings || (this.guildConfig?.commission_settings ?? {roles: {}, users: {}})
      };
      saveObservable = this.guildConfigService.createGuildConfig(fullSaveDataForCreate);
    } else { // Update existing config (potentially partial update)
      console.log(`[LOG_MODAL_SAVE_CHANGES] Attempting to update. @Input this.guildId for service call: "${this.guildId}" (length: ${this.guildId?.length})`);
      if (!this.guildId) {
        this.isLoading = false;
        this.errorMessage = 'Guild ID is missing. Cannot update configuration.';
        console.error('[LOG_MODAL_SAVE_CHANGES_ERROR] Modal: Save config error - this.guildId is null for update.');
        return;
      }
      // The guildConfigService.updateGuildConfig expects a GuildConfig object.
      // If we send a Partial<GuildConfig>, the backend must be able to handle it or
      // we must merge 'saveData' with existing 'this.guildConfig' for fields not in 'editSection'.
      // Current service implementation expects a full GuildConfig payload for POST update.
      // So, we need to merge if we only intend to save a section.
      const fullSaveDataForUpdate: GuildConfig = {
        ...(this.guildConfig as GuildConfig), // Start with the existing full config
        ...saveData, // Override with the changes from the current section
        guild_id: this.guildId // Ensure the guild_id is the authoritative one
      };
      if(saveData._id) fullSaveDataForUpdate._id = saveData._id;

      saveObservable = this.guildConfigService.updateGuildConfig(this.guildId, fullSaveDataForUpdate);
    }

    saveObservable.subscribe({
      next: (savedConfig: GuildConfig) => {
        this.isLoading = false;
        this.configSaved.emit(savedConfig);
        this.closeModal(false);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.message || 'Failed to save configuration. Check server logs for details.';
        console.error('Modal: Save config error:', err);
      }
    });
  }

  private prepareCommissionSettingsPayload(formCommissionSettings: any): CommissionSettings { // This method might become redundant if handled directly in saveChanges
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
                  // Only descend if the control itself is invalid or if it's a group/array that might contain invalid controls
                  if (nestedControl && (nestedControl.invalid || nestedControl instanceof FormGroup || nestedControl instanceof FormArray)) { 
                    findErrors(nestedControl, currentPath);
                  }
              });
          }
      }
      findErrors(this.configForm, '');
      this.errorMessage = `Please correct the errors in the form. Details: ${errorMessages.join('; ')}`;
      console.warn('Form validation failed. Full error list:', errorMessages, 'Form Values:', this.configForm.value);
  }

  closeModal(emitNull: boolean = true): void {
    this.visible = false;
    this.visibleChange.emit(false);
    if (emitNull) {
      this.configSaved.emit(null);
    }
    // Do not call resetModalState here if we want the form to retain its state upon temporary hide, 
    // but for a full close, reset is usually desired.
    // If called, it will clear the form which might be an issue if reopening for the same edit session.
    this.resetModalState(); // Assuming full close means reset.
  }

  handleVisibleChange(isVisible: boolean): void {
     if (this.visible !== isVisible) {
         this.visible = isVisible;
         this.visibleChange.emit(isVisible);
         if (!isVisible) {
             this.resetModalState(); // Reset when modal is hidden via backdrop or header close
         }
     }
   }

  private resetModalState(): void {
    this.isLoading = false;
    this.errorMessage = null;
    this.submitAttempted = false; 
    // Don't reset editSection here, it's an @Input controlled by parent
    // this.editSection = 'full'; 

    if (this.configForm) {
        const currentGuildId = this.configForm.get('guild_id')?.value;
        const currentDisplaySettings = this.configForm.get('display_settings')?.value;

        this.configForm.reset();
        // Restore potentially important values if needed, or set defaults for create mode
        if(this.isEditMode && currentGuildId) {
            this.configForm.get('guild_id')?.setValue(currentGuildId);
            this.configForm.get('guild_id')?.disable();
        } else {
            this.configForm.get('guild_id')?.enable();
        }
        // Reset display_settings to their defaults for create mode if form is fully reset
        if (!this.isEditMode) {
            this.configForm.get('display_settings')?.patchValue({
                ephemeral_responses: false,
                show_average: true,
                agency_name: 'Agency',
                show_ids: true,
                bot_name: 'Shift Calculator'
            });
        } else {
            // If editing, restore display_settings from the original guildConfig if available
            // This ensures that if a section edit didn't touch display_settings, they don't get wiped.
            if (this.guildConfig?.display_settings) {
                this.configForm.get('display_settings')?.patchValue(this.guildConfig.display_settings);
            }
        }
        
        // Clear validators that were conditionally set for specific sections
        this.configForm.get('models')?.clearValidators();
        this.configForm.get('shifts')?.clearValidators();
        this.configForm.get('periods')?.clearValidators();
        // Re-apply base validators
        this.configForm.get('guild_id')?.setValidators([Validators.pattern('^[0-9]+$')]);
        
        // Update validity for all controls
        this.configForm.get('guild_id')?.updateValueAndValidity();
        this.configForm.get('models')?.updateValueAndValidity();
        this.configForm.get('shifts')?.updateValueAndValidity();
        this.configForm.get('periods')?.updateValueAndValidity();
        this.configForm.get('display_settings.agency_name')?.updateValueAndValidity();
        this.configForm.get('display_settings.bot_name')?.updateValueAndValidity();

        // Clear form arrays
        this.models?.clear();
        this.shifts?.clear();
        this.periods?.clear();
        this.bonus_rules?.clear();
        this.clearCommissionControls();
    }
  }
}
