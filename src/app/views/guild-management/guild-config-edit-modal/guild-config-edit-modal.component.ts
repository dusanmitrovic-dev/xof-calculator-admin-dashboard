import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  GuildConfigService,
  GuildConfig,
  BonusRule,
  CommissionSettings,
  DisplaySettings,
} from '../../../services/guild-config.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DisplaySettingsEditModalComponent,
  DisplaySettings as DisplaySettingsModalData,
} from '../display-settings-edit-modal/display-settings-edit-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';

import {
  AlertModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule as CoreUIModalModule,
  SpinnerModule,
  UtilitiesModule,
} from '@coreui/angular';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DefaultLayoutComponent } from '../../../layout/default-layout';

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
    DragDropModule,
    // IconModule,
  ],
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class GuildConfigEditModalComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() guildConfig: GuildConfig | null = null;
  @Input() guildId: string | null = null;
  @Input() editSection: string = 'full';
  @Input() availableRoles: { id: string; name: string }[] = [];
  @Input() availableUsers: {
    id: string;
    displayName: string;
    username: string;
  }[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() configSaved = new EventEmitter<GuildConfig | null>();

  configForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Create Guild Configuration';
  submitAttempted: boolean = false;
  originalConfig: GuildConfig | null = null;
  isEditingDisplaySettingsSubFlow: boolean = false;
  // This holds the LATEST state of display settings, whether from init or sub-modal result.
  currentDisplaySettings!: DisplaySettingsModalData;
  topLevelRoleIds: string[] = [];
  commissionRoleIds: string[] = [];
  userOverrideIds: string[] = [];

  get isEditMode(): boolean {
    return !!this.guildConfig; // Based on the initial @Input
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
    // Initial value for currentDisplaySettings. prepareFormForMode will refine this.
    this.currentDisplaySettings = {
      ...this.getDefaultDisplaySettings(),
      ...(this.guildConfig?.display_settings || {}),
    };
    this.updateTopLevelRoleIds();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.isEditingDisplaySettingsSubFlow = false;
      this.prepareFormForMode();
      // Check isEditMode (based on initial guildConfig) before attempting sub-flow
      if (this.isEditMode && this.editSection === 'display_settings') {
        this.handleDisplaySettingsSubFlow();
      }
    } else if (
      this.visible &&
      (changes['guildConfig'] || changes['guildId'] || changes['editSection'])
    ) {
      if (!this.isEditingDisplaySettingsSubFlow) {
        this.prepareFormForMode();
      }
    } else if (changes['visible'] && !this.visible) {
      this.resetModalState();
    }
    this.updateTopLevelRoleIds();
  }

  private updateUserOverrideIds() {
    if (this.commissionUsers) {
      this.userOverrideIds = Object.keys(this.commissionUsers.controls).filter(
        (id) => !!this.commissionUsers.get(id)
      );
    }
  }

  updateTopLevelRoleIds() {
    if (this.topLevelRoles) {
      this.topLevelRoleIds = Object.keys(this.topLevelRoles.controls).filter(
        (id) => !!this.topLevelRoles.get(id)
      );
    }
  }

  onTopLevelRoleDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.topLevelRoleIds,
      event.previousIndex,
      event.currentIndex
    );
  }

  onArrayDrop(array: FormArray, event: CdkDragDrop<any[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(array.controls, event.previousIndex, event.currentIndex);
      array.updateValueAndValidity();
      array.markAsDirty();
    }
  }

  onUserDropdownChange(event: Event, input: HTMLInputElement) {
    const value = (event.target as HTMLSelectElement).value;
    input.value = value;
    if (value) {
      this.addUserOverride(input);
    }
  }

  onRoleDropdownChange(event: Event, input: HTMLInputElement) {
    const value = (event.target as HTMLSelectElement).value;
    input.value = value;
    if (value) {
      this.addTopLevelRole(value);
    }
  }

  getUserDisplayName(userId: string): string {
    const found = this.availableUsers.find((u) => u.id === userId);
    return found
      ? `${found.displayName || found.username} (${found.username})`
      : userId;
  }

  // Helper to get the definitive initial settings for the sub-modal, based on DB state if available.
  private getInitialDisplaySettingsForSubModal(): DisplaySettingsModalData {
    if (this.isEditMode && this.originalConfig) {
      // If editing, merge defaults with the original (DB snapshot) display settings
      return {
        ...this.getDefaultDisplaySettings(),
        ...(this.originalConfig?.display_settings || {}),
      };
    } else {
      // If creating new, or originalConfig isn't set (shouldn't happen if isEditMode is true), use defaults.
      return this.getDefaultDisplaySettings();
    }
  }

  private handleDisplaySettingsSubFlow(): void {
    // Ensure originalConfig is available if in edit mode, as effectiveGuildId depends on it.
    if (this.isEditMode && !this.originalConfig) {
      this.errorMessage =
        'Original configuration data is missing. Cannot edit display settings.';
      this.closeModal();
      return;
    }
    const effectiveGuildId = this.originalConfig?.guild_id;
    if (!effectiveGuildId) {
      this.errorMessage = 'Guild ID is missing. Cannot edit display settings.';
      this.closeModal();
      return;
    }

    this.isEditingDisplaySettingsSubFlow = true;
    this.title = `Editing Display Settings for ${effectiveGuildId}`;
    this.changeDetectorRef.detectChanges();

    const modalRef = this.modalService.open(DisplaySettingsEditModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    const settingsForSubModal = this.getInitialDisplaySettingsForSubModal();
    console.log(
      '[Parent] Passing to DisplaySettingsEditModalComponent (handleDisplaySettingsSubFlow):',
      JSON.stringify(settingsForSubModal)
    );
    modalRef.componentInstance.currentDisplaySettings = JSON.parse(
      JSON.stringify(settingsForSubModal)
    );

    modalRef.result
      .then(
        (result: DisplaySettingsModalData) => {
          this.currentDisplaySettings = result; // Update parent's currentDisplaySettings with the result
          this.saveDisplaySettingsOnly(result, effectiveGuildId);
        },
        (reason) => {
          console.log(`Display settings modal dismissed: ${reason}`);
          this.closeModal();
        }
      )
      .finally(() => {
        this.isEditingDisplaySettingsSubFlow = false;
      });
  }

  openDisplaySettingsModal(): void {
    // Called when editSection is 'full'
    if (this.isEditMode && !this.originalConfig) {
      this.errorMessage =
        'Original configuration data is missing. Cannot edit display settings.';
      // Potentially close or show an error, but don't proceed to open sub-modal without originalConfig if editing.
      return;
    }
    const modalRef = this.modalService.open(DisplaySettingsEditModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    const settingsForSubModal = this.getInitialDisplaySettingsForSubModal();
    console.log(
      '[Parent] Passing to DisplaySettingsEditModalComponent (openDisplaySettingsModal from full edit):',
      JSON.stringify(settingsForSubModal)
    );
    modalRef.componentInstance.currentDisplaySettings = JSON.parse(
      JSON.stringify(settingsForSubModal)
    );

    modalRef.result.then(
      (result: DisplaySettingsModalData) => {
        this.currentDisplaySettings = result; // Update parent's currentDisplaySettings with the result
        this.configForm.markAsDirty();
        console.log(
          'Display settings (from full edit) updated locally in parent:',
          result
        );
      },
      (reason) => {
        console.log(
          `Display settings modal (from full edit) dismissed: ${reason}`
        );
      }
    );
  }

  private saveDisplaySettingsOnly(
    displaySettings: any,
    guildIdToSave: string
  ): void {
    this.isLoading = true;
    // Send all fields (including logo_text and logo_image_base64) in one call
    this.guildConfigService.updateDisplaySettings(guildIdToSave, displaySettings)
      .toPromise()
      .then((displaySettingsResult) => {
        this.isLoading = false;
        this.configSaved.emit(displaySettingsResult);
        this.isEditingDisplaySettingsSubFlow = false;
        DefaultLayoutComponent.setCurrentGuildConfig({
          logo_image_base64: displaySettingsResult?.display_settings?.logo_image_base64 || '',
          logo_text: displaySettingsResult?.display_settings?.logo_text || '',
        });
        this.changeDetectorRef.detectChanges();
      })
      .catch((err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.message || 'Failed to save display settings.';
        this.isEditingDisplaySettingsSubFlow = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  private getDefaultDisplaySettings(): DisplaySettingsModalData {
    return {
      ephemeral_responses: false,
      show_average: true,
      agency_name: 'Agency',
      show_ids: true,
      bot_name: 'Shift Calculator',
    };
  }

  private setConditionalValidators(): void {
    const guildIdCtrl = this.configForm.get('guild_id');
    if (guildIdCtrl) {
      guildIdCtrl.clearValidators();
      guildIdCtrl.setValidators([Validators.pattern('^[0-9]+$')]);
      if (!this.isEditMode && this.editSection === 'full') {
        guildIdCtrl.addValidators(Validators.required);
      }
      guildIdCtrl.updateValueAndValidity();
    }
  }

  private prepareFormForMode(): void {
    this.errorMessage = null;
    this.isLoading = false;
    this.submitAttempted = false;

    if (!this.configForm) {
      this.configForm = this.buildForm();
    }
    this.configForm.reset();
    this.clearAllFormArraysAndGroups();

    if (this.isEditMode && this.guildConfig) {
      // Check this.guildConfig for initial mode detection
      this.originalConfig = JSON.parse(JSON.stringify(this.guildConfig));
      // Set currentDisplaySettings based on originalConfig, which is the snapshot from DB for this session
      this.currentDisplaySettings = {
        ...this.getDefaultDisplaySettings(),
        ...(this.originalConfig?.display_settings || {}),
      };

      // Add a small delay before patching the form for sections that might require the view to be ready
      if (
        this.editSection === 'models' ||
        this.editSection === 'shifts' ||
        this.editSection === 'periods' ||
        this.editSection === 'bonus_rules' ||
        this.editSection === 'top_level_roles'
      ) {
        console.log(
          `GuildConfigEditModalComponent: Delaying patchForm for ${this.editSection} section.`
        );
        setTimeout(() => {
          this.patchForm(this.originalConfig);
          this.configForm
            .get('guild_id')
            ?.setValue(this.originalConfig?.guild_id, { emitEvent: false });
          this.configForm.get('guild_id')?.disable();
          this.updateTitle();
          this.setConditionalValidators();
          this.changeDetectorRef.detectChanges();
        }, 50); // Short delay
      } else {
        this.patchForm(this.originalConfig);
        this.configForm
          .get('guild_id')
          ?.setValue(this.originalConfig?.guild_id, { emitEvent: false });
        this.configForm.get('guild_id')?.disable();
        this.updateTitle();
        this.setConditionalValidators();
        this.changeDetectorRef.detectChanges();
      }
    } else {
      this.originalConfig = null;
      this.currentDisplaySettings = this.getDefaultDisplaySettings();
      this.patchForm(null);
      this.configForm.get('guild_id')?.enable();
      this.configForm.get('guild_id')?.setValue(this.guildId || '');
      this.updateTitle();
      this.setConditionalValidators();
      this.changeDetectorRef.detectChanges();
    }
  }

  private updateTitle(): void {
    const guildIdentifier = this.originalConfig?.guild_id || this.guildId;
    const baseTitle =
      this.isEditMode && guildIdentifier
        ? `Guild ${guildIdentifier}`
        : 'New Guild Configuration';

    switch (this.editSection) {
      case 'full':
        this.title =
          this.isEditMode && guildIdentifier
            ? `Edit Guild Configuration (${guildIdentifier})`
            : 'Create New Guild Configuration';
        break;
      case 'models':
        this.title = `Manage Models`;
        break;
      case 'shifts':
        this.title = `Manage Shifts`;
        break;
      case 'periods':
        this.title = `Manage Periods`;
        break;
      case 'bonus_rules':
        this.title = `Manage Bonus Rules`;
        break;
      case 'commission_settings_roles':
        this.title = `Manage Role Commissions`;
        break;
      case 'commission_settings_users':
        this.title = `Manage User Overrides`;
        break;
      case 'top_level_roles':
        this.title = `Manage General Role Settings`;
        break;
      case 'display_settings':
        this.title = `Manage Display Settings`;
        break;
      default:
        this.title =
          this.isEditMode && guildIdentifier
            ? `Edit Guild Configuration (${guildIdentifier})`
            : 'Create New Guild Configuration';
    }
  }

  onCommissionRoleDropdownChange(event: Event, input: HTMLInputElement) {
    const value = (event.target as HTMLSelectElement).value;
    input.value = value;
    if (value) {
      this.addRoleCommission(value);
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      guild_id: [
        { value: '', disabled: false },
        [Validators.pattern('^[0-9]+$')],
      ],
      models: this.fb.array([]),
      shifts: this.fb.array([]),
      periods: this.fb.array([]),
      bonus_rules: this.fb.array([]),
      commission_settings: this.buildCommissionSettingsForm(),
      roles: this.fb.group({}),
    });
  }

  private buildCommissionSettingsForm(): FormGroup {
    return this.fb.group({
      roles: this.fb.group({}),
      users: this.fb.group({}),
    });
  }

  private patchForm(config: GuildConfig | null): void {
    if (!config) {
      this.configForm.reset();
      this.clearAllFormArraysAndGroups();
      this.patchTopLevelRoles(undefined);
      this.patchCommissionSettings(undefined);
      const guildIdCtrl = this.configForm.get('guild_id');
      if (guildIdCtrl) {
        guildIdCtrl.enable();
        guildIdCtrl.setValue(this.guildId || '');
      }
      return;
    }

    // Guild ID is set and disabled in prepareFormForMode for existing configs
    this.setStringArrayData(this.models, config.models);
    this.setStringArrayData(this.shifts, config.shifts);
    this.setStringArrayData(this.periods, config.periods);
    this.patchBonusRules(config.bonus_rules);

    // Add a small delay before patching commission settings
    setTimeout(() => {
      console.log(
        'GuildConfigEditModalComponent: Delaying patchCommissionSettings.'
      );
      this.patchCommissionSettings(config.commission_settings);
      this.changeDetectorRef.detectChanges(); // Trigger change detection after patching
    }, 50); // Short delay

    this.patchTopLevelRoles(config.roles);
  }

  // Method to add a user override
  addUserOverride(newUserOverrideInput: HTMLInputElement): void {
    const userId = newUserOverrideInput.value.trim();
    if (userId) {
      const usersGroup = this.commissionUsers;
      if (usersGroup.get(userId)) {
        console.warn(`User ID ${userId} already exists.`);
      } else {
        usersGroup.addControl(
          userId,
          this.fb.group({
            hourly_rate: [null, [Validators.min(0)]],
            commission_percentage: [
              null,
              [Validators.min(0), Validators.max(100)],
            ],
            override_role: [false],
          })
        );
        usersGroup.markAsDirty();
        this.errorMessage = null;
        this.updateUserOverrideIds();
      }
    }
  }

  // Method to remove a user override
  removeUserOverride(userId: string): void {
    const usersGroup = this.commissionUsers;
    if (usersGroup.get(userId)) {
      usersGroup.removeControl(userId);
      usersGroup.markAsDirty();
      this.updateUserOverrideIds();
    }
  }

  // Method to add a top-level role
  addTopLevelRole(roleId: string): void {
    const rolesGroup = this.topLevelRoles;
    if (roleId) {
      if (rolesGroup.get(roleId)) {
        console.warn(`Role ID ${roleId} already exists.`);
      } else {
        rolesGroup.addControl(
          roleId,
          this.fb.group({
            value: [
              '',
              [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
            ],
          })
        );
        rolesGroup.markAsDirty();
        this.errorMessage = null;
        this.updateTopLevelRoleIds(); // <-- Add this line
      }
    }
  }

  removeTopLevelRole(roleId: string): void {
    const rolesGroup = this.topLevelRoles;
    if (rolesGroup.get(roleId)) {
      rolesGroup.removeControl(roleId);
      rolesGroup.markAsDirty();
      this.updateTopLevelRoleIds(); // <-- Add this line
    }
  }

  private patchTopLevelRoles(
    rolesData: { [roleId: string]: number } | undefined
  ): void {
    const rolesFormGroup = this.topLevelRoles;
    Object.keys(rolesFormGroup.controls).forEach((key) =>
      rolesFormGroup.removeControl(key)
    );
    if (rolesData) {
      Object.entries(rolesData).forEach(([roleId, value]) => {
        if (roleId) {
          rolesFormGroup.addControl(
            roleId,
            this.fb.group({
              value: [
                value,
                [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
              ],
            })
          );
        }
      });
    }
    this.updateTopLevelRoleIds(); // <-- Add this line
  }

  private setStringArrayData(
    formArray: FormArray,
    data: string[] | undefined
  ): void {
    console.log(
      'GuildConfigEditModalComponent: setStringArrayData called with data:',
      data
    );
    formArray.clear();
    (data || []).forEach((item_name) => {
      // Removed the typeof check to ensure all items are attempted to be added
      formArray.push(this.fb.control(item_name, Validators.required));
    });
    console.log(
      'GuildConfigEditModalComponent: setStringArrayData - FormArray after patching:',
      formArray.controls
    );
  }

  private patchBonusRules(rules: BonusRule[] | undefined): void {
    this.bonus_rules.clear();
    (rules || []).forEach((rule) =>
      this.bonus_rules.push(
        this.fb.group(
          {
            from: [rule.from, [Validators.required, Validators.min(0)]],
            to: [rule.to, [Validators.required, Validators.min(0)]],
            amount: [rule.amount, [Validators.required, Validators.min(0)]],
          },
          { validators: this.bonusRuleValidator }
        )
      )
    );
  }

  private bonusRuleValidator(
    group: AbstractControl
  ): { [key: string]: boolean } | null {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;
    if (from !== null && to !== null && parseFloat(to) < parseFloat(from)) {
      return { toLessThanFrom: true };
    }
    return null;
  }

  private updateCommissionRoleIds() {
    if (this.commissionRoles) {
      this.commissionRoleIds = Object.keys(
        this.commissionRoles.controls
      ).filter((id) => !!this.commissionRoles.get(id));
    }
  }

  private patchCommissionSettings(
    settings: CommissionSettings | undefined
  ): void {
    const rolesGroup = this.commissionRoles;
    const usersGroup = this.commissionUsers;
    this.clearCommissionControls();
    if (settings?.roles) {
      Object.entries(settings.roles).forEach(([roleId, roleSetting]) => {
        rolesGroup.addControl(
          roleId,
          this.fb.group({
            commission_percentage: [
              roleSetting.commission_percentage !== undefined
                ? roleSetting.commission_percentage
                : null,
              [Validators.min(0), Validators.max(100)],
            ],
            hourly_rate: [
              roleSetting.hourly_rate !== undefined
                ? roleSetting.hourly_rate
                : null,
              [Validators.min(0)],
            ],
          })
        );
      });
    }
    if (settings?.users) {
      Object.entries(settings.users).forEach(([userId, userSetting]) => {
        usersGroup.addControl(
          userId,
          this.fb.group({
            hourly_rate: [
              userSetting.hourly_rate !== undefined
                ? userSetting.hourly_rate
                : null,
              [Validators.min(0)],
            ],
            commission_percentage: [
              userSetting.commission_percentage !== undefined
                ? userSetting.commission_percentage
                : null,
              [Validators.min(0), Validators.max(100)],
            ],
            // Always set to false if undefined
            override_role: [
              userSetting.override_role === true
                ? true
                : userSetting.override_role === false
                  ? false
                  : false,
            ],
          })
        );
      });
    }
    this.updateCommissionRoleIds();
    this.updateUserOverrideIds();
  }

  onUserOverrideDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.userOverrideIds,
      event.previousIndex,
      event.currentIndex
    );
  }

  private clearAllFormArraysAndGroups(): void {
    this.models.clear();
    this.shifts.clear();
    this.periods.clear();
    this.bonus_rules.clear();
    this.clearCommissionControls();
    this.clearTopLevelRolesControls();
  }

  private clearCommissionControls(): void {
    const rolesGroup = this.commissionRoles;
    const usersGroup = this.commissionUsers;
    if (rolesGroup)
      Object.keys(rolesGroup.controls).forEach((key) =>
        rolesGroup.removeControl(key)
      );
    if (usersGroup)
      Object.keys(usersGroup.controls).forEach((key) =>
        usersGroup.removeControl(key)
      );
  }

  private clearTopLevelRolesControls(): void {
    const rolesGroup = this.topLevelRoles;
    if (rolesGroup)
      Object.keys(rolesGroup.controls).forEach((key) =>
        rolesGroup.removeControl(key)
      );
  }

  get guild_id_control(): FormControl {
    return this.configForm.get('guild_id') as FormControl;
  }
  get models(): FormArray {
    return this.configForm.get('models') as FormArray;
  }
  get shifts(): FormArray {
    return this.configForm.get('shifts') as FormArray;
  }
  get periods(): FormArray {
    return this.configForm.get('periods') as FormArray;
  }
  get bonus_rules(): FormArray {
    return this.configForm.get('bonus_rules') as FormArray;
  }
  get commissionRoles(): FormGroup {
    return this.configForm.get('commission_settings.roles') as FormGroup;
  }
  get commissionUsers(): FormGroup {
    return this.configForm.get('commission_settings.users') as FormGroup;
  }
  get topLevelRoles(): FormGroup {
    return this.configForm.get('roles') as FormGroup;
  }

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
    this.bonus_rules.push(
      this.fb.group(
        {
          from: [0, [Validators.required, Validators.min(0)]],
          to: [0, [Validators.required, Validators.min(0)]],
          amount: [0, [Validators.required, Validators.min(0)]],
        },
        { validators: this.bonusRuleValidator }
      )
    );
    this.bonus_rules.markAsDirty();
  }
  removeBonusRule(index: number): void {
    this.bonus_rules.removeAt(index);
    this.bonus_rules.markAsDirty();
  }

  removeRoleCommission(roleId: string): void {
    const rolesGroup = this.commissionRoles;
    if (rolesGroup.get(roleId)) {
      rolesGroup.removeControl(roleId);
      rolesGroup.markAsDirty();
    }
    this.updateCommissionRoleIds();
  }

  onCommissionRoleDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.commissionRoleIds,
      event.previousIndex,
      event.currentIndex
    );
  }

  addRoleCommission(roleId: string): void {
    const trimmedRoleId = roleId.trim();
    if (trimmedRoleId) {
      const rolesGroup = this.commissionRoles;
      if (rolesGroup.get(trimmedRoleId)) {
        console.warn(`Role ID ${trimmedRoleId} already exists.`);
      } else {
        rolesGroup.addControl(
          trimmedRoleId,
          this.fb.group({
            commission_percentage: [
              null,
              [Validators.min(0), Validators.max(100)],
            ],
            hourly_rate: [null, [Validators.min(0)]],
          })
        );
        rolesGroup.markAsDirty();
        this.errorMessage = null;
        this.updateCommissionRoleIds();
      }
    }
  }

  getRoleName(roleId: string): string {
    const found = this.availableRoles.find((r) => r.id === roleId);
    return found ? found.name : roleId;
  }

  onBonusRuleDrop(event: CdkDragDrop<any[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(
        this.bonus_rules.controls,
        event.previousIndex,
        event.currentIndex
      );
      this.bonus_rules.updateValueAndValidity();
      this.bonus_rules.markAsDirty();
    }
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
    const effectiveGuildId =
      this.isEditMode && this.originalConfig
        ? this.originalConfig.guild_id
        : formValue.guild_id;

    if (!effectiveGuildId) {
      this.isLoading = false;
      this.errorMessage = 'Guild ID is missing.';
      return;
    }

    let saveObservable: Observable<GuildConfig> | null = null;

    switch (this.editSection) {
      case 'full': {
        const createOrUpdatePayload: GuildConfig = {
          guild_id: effectiveGuildId,
          models: (formValue.models || []).map((name: string) => name),
          shifts: (formValue.shifts || []).map((name: string) => name),
          periods: (formValue.periods || []).map((name: string) => name),
          bonus_rules: (formValue.bonus_rules || []).map((rule: any) => ({
            from: Number(rule.from),
            to: Number(rule.to),
            amount: Number(rule.amount),
          })),
          // currentDisplaySettings holds the definitive, merged state of display settings
          display_settings: {
            ...this.currentDisplaySettings,
          } as DisplaySettings,
          commission_settings: this.prepareCommissionSettingsPayload(
            formValue.commission_settings
          ),
          roles: this.prepareTopLevelRolesPayload(formValue.roles),
        };
        if (this.isEditMode && this.originalConfig?._id)
          createOrUpdatePayload._id = this.originalConfig._id;

        if (!this.isEditMode || !this.originalConfig) {
          saveObservable = this.guildConfigService.createGuildConfig(
            createOrUpdatePayload
          );
        } else {
          saveObservable = this.guildConfigService.updateGuildConfig(
            effectiveGuildId,
            createOrUpdatePayload
          );
        }
        break;
      }
      case 'models': {
        const models: string[] = formValue.models || [];
        saveObservable = this.guildConfigService.updateModels(
          effectiveGuildId,
          models
        );
        break;
      }
      case 'shifts': {
        const shifts: string[] = formValue.shifts || [];
        saveObservable = this.guildConfigService.updateShifts(
          effectiveGuildId,
          shifts
        );
        break;
      }
      case 'periods': {
        const periods: string[] = formValue.periods || [];
        saveObservable = this.guildConfigService.updatePeriods(
          effectiveGuildId,
          periods
        );
        break;
      }
      case 'bonus_rules': {
        const bonus_rules = (formValue.bonus_rules || []).map((rule: any) => ({
          from: Number(rule.from),
          to: Number(rule.to),
          amount: Number(rule.amount),
        }));
        saveObservable = this.guildConfigService.updateBonusRules(
          effectiveGuildId,
          bonus_rules
        );
        break;
      }
      case 'commission_settings_roles': {
        const newCommissionRoles = this.prepareCommissionRolesPayload(
          formValue.commission_settings.roles
        );
        const fullCommissionSettingsPayload: CommissionSettings = {
          roles: newCommissionRoles,
          users: this.originalConfig?.commission_settings?.users || {},
        };
        saveObservable = this.guildConfigService.updateCommissionSettings(
          effectiveGuildId,
          fullCommissionSettingsPayload
        );
        break;
      }
      case 'commission_settings_users': {
        const newCommissionUsers = this.prepareCommissionUsersPayload(
          formValue.commission_settings.users
        );
        // Do NOT merge with originalConfig; send only current users to allow deletions
        const fullCommissionSettingsPayload: CommissionSettings = {
          roles: this.originalConfig?.commission_settings?.roles || {},
          users: newCommissionUsers,
        };
        saveObservable = this.guildConfigService.updateCommissionSettings(
          effectiveGuildId,
          fullCommissionSettingsPayload
        );
        break;
      }
      case 'top_level_roles': {
        const rolesPayload = this.prepareTopLevelRolesPayload(formValue.roles);
        saveObservable = this.guildConfigService.updateRoles(
          effectiveGuildId,
          rolesPayload
        );
        break;
      }
    }

    if (saveObservable) {
      this.isLoading = true;
      this.errorMessage = null;
      saveObservable.subscribe({
        next: (savedConfig: GuildConfig) => {
          this.isLoading = false;
          this.configSaved.emit(savedConfig);
          this.closeModal(false);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMessage =
            err?.error?.message ||
            err?.message ||
            'Failed to save configuration.';
        },
      });
    } else {
      this.isLoading = false;
      if (this.editSection !== 'display_settings') {
        this.errorMessage =
          'No save action defined for this section or section not implemented for individual save.';
      }
    }
  }

  private prepareCommissionRolesPayload(formRoles: any): {
    [roleId: string]: { commission_percentage?: number; hourly_rate?: number };
  } {
    const roles: {
      [roleId: string]: {
        commission_percentage?: number;
        hourly_rate?: number;
      };
    } = {};
    if (formRoles) {
      Object.keys(formRoles).forEach((roleId) => {
        const roleFormValue = formRoles[roleId];
        roles[roleId] = {};
        // Only assign if not null/undefined/empty string
        if (
          roleFormValue.commission_percentage !== null &&
          roleFormValue.commission_percentage !== undefined &&
          roleFormValue.commission_percentage !== ''
        ) {
          roles[roleId].commission_percentage = Number(
            roleFormValue.commission_percentage
          );
        }
        if (
          roleFormValue.hourly_rate !== null &&
          roleFormValue.hourly_rate !== undefined &&
          roleFormValue.hourly_rate !== ''
        ) {
          roles[roleId].hourly_rate = Number(roleFormValue.hourly_rate);
        }
      });
    }
    return roles;
  }

  private prepareCommissionUsersPayload(formUsers: any): {
    [userId: string]: {
      hourly_rate?: number;
      override_role?: boolean;
      commission_percentage?: number;
    };
  } {
    const users: {
      [userId: string]: {
        hourly_rate?: number;
        override_role?: boolean;
        commission_percentage?: number;
      };
    } = {};
    if (formUsers) {
      Object.keys(formUsers).forEach((userId) => {
        const userFormValue = formUsers[userId];
        const hourlyRateValue = userFormValue.hourly_rate;
        users[userId] = {
          override_role: userFormValue.override_role ?? false,
        };
        if (
          hourlyRateValue !== null &&
          hourlyRateValue !== undefined &&
          hourlyRateValue !== ''
        ) {
          users[userId].hourly_rate = Number(hourlyRateValue);
        }
        // Add this block to save commission_percentage
        if (
          userFormValue.commission_percentage !== null &&
          userFormValue.commission_percentage !== undefined &&
          userFormValue.commission_percentage !== ''
        ) {
          users[userId].commission_percentage = Number(
            userFormValue.commission_percentage
          );
        }
      });
    }
    return users;
  }

  private prepareCommissionSettingsPayload(
    formCommissionSettings: any
  ): CommissionSettings {
    return {
      roles: this.prepareCommissionRolesPayload(formCommissionSettings.roles),
      users: this.prepareCommissionUsersPayload(formCommissionSettings.users),
    };
  }

  private prepareTopLevelRolesPayload(formRoles: any): {
    [roleId: string]: number;
  } {
    const roles: { [roleId: string]: number } = {};
    if (formRoles) {
      Object.keys(formRoles).forEach((roleId) => {
        const val = Number(formRoles[roleId]?.value); // Access the 'value' property
        if (!isNaN(val)) {
          roles[roleId] = val;
        }
      });
    }
    return roles;
  }

  private displayFormErrors(): void {
    let errorMessages: string[] = [];
    const findErrorsRecursive = (
      control: AbstractControl | null,
      path: string
    ) => {
      if (!control) return;
      if (control.errors) {
        for (const keyError of Object.keys(control.errors)) {
          errorMessages.push(
            `Error at '${path || 'Form'}.${keyError}': ${JSON.stringify(
              control.errors[keyError]
            )}`
          );
        }
      }
      if (control instanceof FormGroup || control instanceof FormArray) {
        Object.keys(control.controls).forEach((key) => {
          const nestedControl = control.get(key);
          const currentPath = path ? `${path}.${key}` : key;
          if (
            nestedControl &&
            (nestedControl.invalid ||
              nestedControl instanceof FormGroup ||
              nestedControl instanceof FormArray)
          ) {
            findErrorsRecursive(nestedControl, currentPath);
          }
        });
      }
    };
    findErrorsRecursive(this.configForm, '');
    this.errorMessage = `Please correct the errors in the form. Details: ${errorMessages.join(
      '; '
    )}`;
    console.warn(
      'Form validation failed. Errors:',
      errorMessages,
      'Form Values:',
      this.configForm.getRawValue()
    );
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
    this.currentDisplaySettings = this.getDefaultDisplaySettings();

    if (this.configForm) {
      this.configForm.reset();
      this.clearAllFormArraysAndGroups();
      this.patchForm(null);
      this.configForm.get('guild_id')?.setValue(this.guildId || '');
      this.setConditionalValidators();
    }
  }
}
