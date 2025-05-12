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
    
    this.earningForm.reset(); // Reset first to clear previous state

    if (!this.guildId) {
      this.errorMessage = "Error: Guild ID is required for prepareModal.";
      console.error("[EarningModal] prepareModal: this.guildId is null or undefined.");
      return;
    }
    
    this.earningForm.get('guild_id')?.setValue(this.guildId); 
    this.earningForm.get('guild_id')?.markAsDirty(); 
    console.log('[EarningModal] guild_id control value after setValue:', this.earningForm.get('guild_id')?.value);
    console.log('[EarningModal] guild_id control status (before disable):', this.earningForm.get('guild_id')?.status);
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
      this.earningForm.patchValue({ date: this.getTodayDateString() });
      this.earningForm.get('id')?.disable(); 
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
      models: ['', Validators.required], 
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
    const patchedValues = {
      ...earning,
      date: earning.date ? this.formatDateForInput(earning.date) : this.getTodayDateString(),
      models: this.availableModels.includes(earning.models) ? earning.models : '', 
      shift: this.availableShifts.includes(earning.shift) ? earning.shift : '',
      period: this.availablePeriods.includes(earning.period) ? earning.period : ''
    };
    this.earningForm.patchValue(patchedValues);
  }

  saveChanges(): void {
    if (!this.earningForm) {
        this.errorMessage = 'Form not initialized.';
        return;
    }
    this.earningForm.markAllAsTouched();
    if (this.earningForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      console.warn('EarningModal: Form validation failed.', this.earningForm.controls);
      Object.keys(this.earningForm.controls).forEach(key => {
        const controlErrors = this.earningForm.get(key)?.errors;
        if (controlErrors != null) {
          console.error('Key:', key, 'Error:', controlErrors);
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
      guild_id: this.guildId 
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
        this.earningForm.reset();
        this.earningForm.patchValue({ date: this.getTodayDateString() });
        if (this.guildId) {
            this.earningForm.get('guild_id')?.setValue(this.guildId);
            this.earningForm.get('guild_id')?.disable();
        }
        this.earningForm.get('id')?.disable();
    }
  }

  private generateCustomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  private getTodayDateString(): string {
      const today = new Date();
      const offset = today.getTimezoneOffset();
      const localDate = new Date(today.getTime() - (offset*60*1000));
      return localDate.toISOString().split('T')[0];
  }

  private formatDateForInput(dateString: string | Date): string {
      try {
          let date = new Date(dateString);
          if (isNaN(date.getTime()) && typeof dateString === 'string') { 
               date = new Date(dateString + 'T00:00:00');
          }

          if (!isNaN(date.getTime())) {
              const offset = date.getTimezoneOffset();
              const localDate = new Date(date.getTime() - (offset*60*1000));
              return localDate.toISOString().split('T')[0];
          } else {
               console.warn(`EarningModal: Invalid date received: ${dateString}, using today.`);
               return this.getTodayDateString();
          }
      } catch (e) {
           console.error(`EarningModal: Error parsing date: ${dateString}`, e);
           return this.getTodayDateString();
      }
  }
}
