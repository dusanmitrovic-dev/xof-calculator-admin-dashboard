import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

import { EarningsService, Earning } from '../../../services/earnings.service';
import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';

@Component({
  selector: 'app-earning-edit-modal',
  templateUrl: './earning-edit-modal.component.html',
  styleUrls: ['./earning-edit-modal.component.scss'],
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
export class EarningEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() guildId: string | null = null;
  @Input() earningToEdit: Earning | null = null;
  @Input() guildConfig: GuildConfig | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() earningSaved = new EventEmitter<Earning | null>();
  @Input() guildMembersMap: { [id: string]: { displayName: string, username: string } } = {};
  guildMembersList: { mention: string, display: string }[] = [];
  @Input() guildRolesMap: { [id: string]: string } = {};
  guildRolesList: string[] = [];

  earningForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Add Earning Record';
  loadingConfigOptions: boolean = false;

  get isEditMode(): boolean {
    return !!this.earningToEdit;
  }

  availableModels: string[] = [];
  availableShifts: string[] = [];
  availablePeriods: string[] = [];

  constructor(
    private fb: FormBuilder,
    private earningsService: EarningsService,
    private guildConfigService: GuildConfigService
  ) { }

  ngOnInit(): void {
    console.log('[EarningModal] ngOnInit: Initializing form.');
    this.earningForm = this.buildForm();
    // If modal is intended to be visible upon init (e.g. parent sets visible=true before this runs)
    // call prepareModal to set initial state if form is ready.
    if (this.visible) {
      console.log('[EarningModal] ngOnInit: Modal is visible, calling prepareModal.');
      this.prepareModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[EarningModal] ngOnChanges triggered. Changes:', JSON.stringify(changes));

    // Ensure form is initialized before proceeding with logic that depends on it.
    if (!this.earningForm) {
      console.log('[EarningModal] ngOnChanges: Form not yet initialized by ngOnInit, skipping actions.');
      return;
    }

    if (changes['visible']) {
      console.log('[EarningModal] ngOnChanges: "visible" property changed to', this.visible);
      if (this.visible) {
        console.log('[EarningModal] ngOnChanges: Calling prepareModal() because "visible" became true and form exists.');
        this.prepareModal();
      } else {
        console.log('[EarningModal] ngOnChanges: Calling resetModalState() because "visible" became false and form exists.');
        this.resetModalState();
      }
    } else if (this.visible) {
      // If modal is already visible and other inputs change (and form exists)
      if (changes['earningToEdit'] || changes['guildId'] || changes['guildConfig']) {
        console.log('[EarningModal] ngOnChanges: Other relevant inputs changed while visible. Calling prepareModal(). Changed inputs:', JSON.stringify(changes));
        this.prepareModal();
      }
    }

    if (changes['guildMembersMap']) {
      this.guildMembersList = Object.entries(this.guildMembersMap).map(([id, member]) => ({
        mention: `<@${id}>`,
        display: member.displayName && member.username && member.displayName !== member.username
          ? `${member.displayName} (${member.username})`
          : member.displayName || member.username
      }));
    }

    if (changes['guildRolesMap']) {
      this.guildRolesList = Object.values(this.guildRolesMap);
    }
  }

  private prepareModal(): void {
    // This function now assumes this.earningForm is already initialized by ngOnInit
    if (!this.earningForm) {
      console.error('[EarningModal] CRITICAL: prepareModal called but earningForm was not initialized by ngOnInit.');
      this.errorMessage = "CRITICAL: Form could not be initialized.";
      return;
    }

    console.log(`[EarningModal] prepareModal: Preparing. Mode: ${this.isEditMode ? 'Edit' : 'Add'}, Input GuildID: ${this.guildId}`);
    this.errorMessage = null;
    this.isLoading = false;

    // Reset form with default values (including empty models array)
    this.earningForm.reset({
      date: this.getTodayDateString(),
      models: [] // Explicitly reset models to an empty array
    });

    if (!this.guildId) {
      this.errorMessage = "Error: Guild ID is required for prepareModal.";
      console.error("[EarningModal] prepareModal: this.guildId is null or undefined.");
      return;
    }

    this.earningForm.get('guild_id')?.setValue(this.guildId);
    // No need to mark guild_id as dirty on init
    console.log('[EarningModal] guild_id control value after setValue:', this.earningForm.get('guild_id')?.value);
    this.earningForm.get('guild_id')?.disable();
    console.log('[EarningModal] guild_id control status (after disable):', this.earningForm.get('guild_id')?.status);

    if (this.guildConfig) {
      console.log('[EarningModal] Using provided guildConfig for options:', this.guildConfig);
      this.availableModels = this.guildConfig.models || [];
      this.availableShifts = this.guildConfig.shifts || [];
      this.availablePeriods = this.guildConfig.periods || [];
    } else {
      console.warn('[EarningModal] guildConfig not provided. Dropdown options might be limited.');
      this.availableModels = [];
      this.availableShifts = [];
      this.availablePeriods = [];
    }

    if (this.isEditMode && this.earningToEdit) {
      this.title = `Edit Earning Record (ID: ${this.earningToEdit.id})`;
      this.patchForm(this.earningToEdit);
      this.earningForm.get('id')?.setValue(this.earningToEdit.id);
      this.earningForm.get('id')?.disable();
    } else {
      this.title = 'Add New Earning Record';
      // Date and models already set during reset
      this.earningForm.get('id')?.disable();
    }
    // Ensure the models field validity is checked after potential patching
    this.earningForm.get('models')?.updateValueAndValidity();
  }

  // Converts DD/MM/YYYY to YYYY-MM-DD for the date picker
  formatDateForDatePicker(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  }

  onDatePickerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;
    const parts = input.value.split('-');
    if (parts.length === 3) {
      const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
      this.earningForm.get('date')?.setValue(formatted);
    }
  }

  public copyToClipboard(value: string): void {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }
  }

  private buildForm(): FormGroup {
    console.log('[EarningModal] buildForm: Creating new FormGroup instance.');
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      guild_id: [{ value: null, disabled: true }, Validators.required],
      date: [this.getTodayDateString(), Validators.required],
      user_mention: ['', Validators.required],
      role: ['', Validators.required],
      models: [[], [Validators.required, Validators.minLength(1)]],
      shift: ['', Validators.required],
      period: ['', Validators.required],
      hours_worked: [null, [Validators.required, Validators.min(0.1), Validators.pattern(/^\d*\.?\d+$/)]],
      gross_revenue: [null, [Validators.required, Validators.min(0), Validators.pattern(/^\d*\.?\d+$/)]],
      total_cut: [null, [Validators.required, Validators.min(0), Validators.pattern(/^\d*\.?\d+$/)]],
    });
  }

  private patchForm(earning: Earning): void {
    if (!earning || !this.earningForm) return;
    console.log('[EarningModal] Patching form with:', earning);

    // Ensure models is always an array when patching
    let modelsToPatch: string[] = [];
    if (Array.isArray(earning.models)) {
      modelsToPatch = earning.models.filter(m => this.availableModels.includes(m));
    } else if (typeof earning.models === 'string' && this.availableModels.includes(earning.models)) {
      modelsToPatch = [earning.models]; // Convert legacy string to array if valid
    } else {
      console.warn('[EarningModal] Invalid or empty models data in earning record:', earning.models);
    }

    const patchedValues = {
      ...earning, // Spread other earning properties
      date: earning.date ? this.formatDateForInput(earning.date) : this.getTodayDateString(),
      models: modelsToPatch, // Use the sanitized array
      shift: this.availableShifts.includes(earning.shift) ? earning.shift : '',
      period: this.availablePeriods.includes(earning.period) ? earning.period : ''
    };
    this.earningForm.patchValue(patchedValues);
  }

  /**
   * Checks if a model is currently selected in the form.
   * @param model The model name to check.
   * @returns True if the model is selected, false otherwise.
   */
  isModelSelected(model: string): boolean {
    const selectedModels = this.earningForm?.get('models')?.value as string[];
    return selectedModels?.includes(model) ?? false;
  }

  /**
   * Adds or removes a model from the form's selected models array.
   * @param model The model name to toggle.
   */
  toggleModelSelection(model: string): void {
    const modelsControl = this.earningForm?.get('models');
    if (!modelsControl) return;

    let selectedModels: string[] = modelsControl.value ? [...modelsControl.value] : [];
    const index = selectedModels.indexOf(model);

    if (index > -1) {
      // Model is currently selected, remove it
      selectedModels.splice(index, 1);
    } else {
      // Model is not selected, add it
      selectedModels.push(model);
    }

    // Update the form control value
    modelsControl.setValue(selectedModels);
    // Mark as dirty and touched to trigger validation and visual updates
    modelsControl.markAsDirty();
    modelsControl.markAsTouched();
    console.log('Toggled model:', model, 'New selection:', selectedModels);
    // Explicitly update validity after changing the value programmatically
    modelsControl.updateValueAndValidity();
  }

  saveChanges(): void {
    if (!this.earningForm) {
      this.errorMessage = 'Form not initialized.';
      return;
    }
    this.earningForm.markAllAsTouched();

    // Check validity after marking as touched
    if (this.earningForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      console.warn('EarningModal: Form validation failed.');
      Object.keys(this.earningForm.controls).forEach(key => {
        const control = this.earningForm.get(key);
        if (control && control.invalid) {
          console.error(`Key: ${key}, Status: ${control.status}, Errors:`, control.errors);
        }
      });
      return;
    }
    if (!this.guildId) {
      this.errorMessage = 'Error: Guild ID is missing. Cannot save.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.earningForm.getRawValue();

    const earningPayload: Earning = {
      ...formValue,
      hours_worked: Number(formValue.hours_worked),
      gross_revenue: Number(formValue.gross_revenue),
      total_cut: Number(formValue.total_cut),
      guild_id: this.guildId,
      date: this.formatDateForInput(formValue.date) // Ensure DD/MM/YYYY
    };

    let saveObservable: Observable<Earning>;

    if (this.isEditMode && earningPayload.id) {
      console.log('EarningModal: Updating earning:', earningPayload);
      const updateData: Partial<Earning> = {
        date: earningPayload.date,
        user_mention: earningPayload.user_mention,
        role: earningPayload.role,
        models: earningPayload.models,
        shift: earningPayload.shift,
        period: earningPayload.period,
        hours_worked: earningPayload.hours_worked,
        gross_revenue: earningPayload.gross_revenue,
        total_cut: earningPayload.total_cut
      };
      saveObservable = this.earningsService.updateEarningByCustomId(earningPayload.id, updateData);
    } else {
      earningPayload.id = this.generateCustomId();
      console.log('EarningModal: Creating earning:', earningPayload);
      saveObservable = this.earningsService.createEarning(this.guildId, earningPayload);
    }

    saveObservable.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (savedEarning: Earning) => {
        console.log('EarningModal: Save successful', savedEarning);
        this.earningSaved.emit(savedEarning);
        this.closeModal(false);
      },
      error: (err: any) => {
        this.errorMessage = err?.message || 'Failed to save earning record.';
        console.error('EarningModal: Save error:', err);
      }
    });
  }

  closeModal(emitNull: boolean = true): void {
    this.visible = false;
    this.visibleChange.emit(false);
    if (emitNull) {
      this.earningSaved.emit(null);
    }
  }

  handleVisibleChange(isVisible: boolean): void {
    if (this.visible !== isVisible) {
      this.visible = isVisible;
      this.visibleChange.emit(isVisible);
    }
  }

  private resetModalState(): void {
    console.log('[EarningModal] Resetting state');
    this.isLoading = false;
    this.errorMessage = null;
    this.earningToEdit = null;
    if (this.earningForm) {
      // Reset form with default values, including empty models array
      this.earningForm.reset({
        date: this.getTodayDateString(),
        models: []
      });
      if (this.guildId) {
        this.earningForm.get('guild_id')?.setValue(this.guildId);
        this.earningForm.get('guild_id')?.disable();
      }
      this.earningForm.get('id')?.disable();
    }
  }

  private generateCustomId(): string {
    const timestamp = Date.now();
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 digits, 1000-9999
    return `${timestamp}-${randomDigits}`;
  }

  private getTodayDateString(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatDateForInput(dateString: string | Date): string {
    try {
      if (!dateString) return this.getTodayDateString();
      if (typeof dateString === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        return dateString; // Already in DD/MM/YYYY
      }
      let date = new Date(dateString);
      if (isNaN(date.getTime()) && typeof dateString === 'string') {
        // Try parsing as YYYY-MM-DD
        const parts = dateString.split('-');
        if (parts.length === 3) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return this.getTodayDateString();
      }
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (e) {
      return this.getTodayDateString();
    }
  }
}
