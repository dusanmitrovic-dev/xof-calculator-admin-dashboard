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
// GuildConfig is now correctly typed with string[] for models, shifts, periods
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

  earningForm!: FormGroup; // Defined in OnInit
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
    // Initialize the form here
    this.earningForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if visible is true and the form has been initialized
    if (changes['visible'] && this.visible && this.earningForm) {
        this.prepareModal();
    } 
    // Handle other input changes only if visible and form exists
    else if (this.visible && this.earningForm && (changes['earningToEdit'] || changes['guildId'] || changes['guildConfig'])) {
        this.prepareModal();
    }
    // Handle closing the modal
    else if (changes['visible'] && !this.visible && this.earningForm) {
        this.resetModalState();
    }
  }

  private prepareModal(): void {
    // Guard clause: If form isn't initialized yet, exit.
    if (!this.earningForm) {
        console.warn('EarningModal: prepareModal called before form initialization.');
        return; 
    }

    console.log(`EarningModal: Preparing. Mode: ${this.isEditMode ? 'Edit' : 'Add'}, GuildID: ${this.guildId}`);
    this.errorMessage = null;
    this.isLoading = false;
    
    if (this.earningForm) { 
      this.earningForm.reset(); 
    } else { 
      this.earningForm = this.buildForm();
    }

    if (!this.guildId) {
      this.errorMessage = "Error: Guild ID is required.";
      return;
    }
    
    this.earningForm.get('guild_id')?.setValue(this.guildId);
    // --- ADDED CONSOLE LOG ---
    console.log('[EarningModal] guild_id control value after setValue:', this.earningForm.get('guild_id')?.value);
    console.log('[EarningModal] guild_id control status:', this.earningForm.get('guild_id')?.status);
    // --- END CONSOLE LOG ---
    this.earningForm.get('guild_id')?.disable();

    // Populate dropdown options from GuildConfig
    if (this.guildConfig) {
        console.log('EarningModal: Using provided guildConfig for options:', this.guildConfig);
        this.availableModels = this.guildConfig.models || [];
        this.availableShifts = this.guildConfig.shifts || [];
        this.availablePeriods = this.guildConfig.periods || [];
    } else {
        console.warn('EarningModal: guildConfig not provided. Form options might be limited.');
        this.availableModels = [];
        this.availableShifts = [];
        this.availablePeriods = [];
    }

    // Patch form based on mode (Add vs Edit)
    if (this.isEditMode && this.earningToEdit) {
      this.title = `Edit Earning Record (ID: ${this.earningToEdit.id})`;
      this.patchForm(this.earningToEdit); // Patch form *after* setting dropdown options
      this.earningForm.get('id')?.setValue(this.earningToEdit.id); // Set the ID for edit mode
      this.earningForm.get('id')?.disable(); 
    } else {
      this.title = 'Add New Earning Record';
      // Set default date for new records
      this.earningForm.patchValue({ date: this.getTodayDateString() });
      this.earningForm.get('id')?.disable(); // ID is disabled in add mode too
    }
  }

  private buildForm(): FormGroup {
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
    console.log('EarningModal: Patching form with:', earning);
    // Ensure the value for 'models' exists in availableModels, etc.
    // If not, reset it to prevent errors if config changed since earning was saved
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
      // Log specific errors
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

    const formValue = this.earningForm.getRawValue(); // Use getRawValue to include disabled fields like ID

    const earningPayload: Earning = {
      ...formValue,
      hours_worked: Number(formValue.hours_worked),
      gross_revenue: Number(formValue.gross_revenue),
      total_cut: Number(formValue.total_cut),
      guild_id: this.guildId // Make sure this is the string guildId
    };

    let saveObservable: Observable<Earning>;

    if (this.isEditMode && earningPayload.id) {
      console.log('EarningModal: Updating earning:', earningPayload);
      // Create update payload excluding non-editable fields
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
      // Generate ID only if creating a new record
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
        this.closeModal(false); // Close modal but don't emit null again
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
      // Only emit null if explicitly closing via Cancel or X button
      this.earningSaved.emit(null);
    }
    // Don't call resetModalState here, ngOnChanges handles it when visible becomes false
  }

  // This method might be redundant if the parent handles visibleChange correctly
  handleVisibleChange(isVisible: boolean): void {
     if (this.visible !== isVisible) {
         this.visible = isVisible;
         this.visibleChange.emit(isVisible);
         // Reset state should happen based on ngOnChanges when visible turns false
     }
   }

  private resetModalState(): void {
    console.log('EarningModal: Resetting state');
    this.isLoading = false;
    this.errorMessage = null;
    this.earningToEdit = null;
    // Reset form only if it exists
    if (this.earningForm) {
        this.earningForm.reset();
        // Re-patch defaults needed after reset
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
      // Adjust for timezone offset to get local date string correctly
      const offset = today.getTimezoneOffset();
      const localDate = new Date(today.getTime() - (offset*60*1000));
      return localDate.toISOString().split('T')[0];
  }

  private formatDateForInput(dateString: string | Date): string {
      try {
          // Try parsing directly, assuming it might be YYYY-MM-DD already
          let date = new Date(dateString);
          // If direct parsing fails or results in invalid date, try adjusting for timezone if needed
          if (isNaN(date.getTime()) && typeof dateString === 'string') { 
              // Handle potential MM/DD/YYYY or other formats if necessary, 
              // or assume it's UTC and needs adjustment
              // For simplicity, assume input string is intended as local date
               date = new Date(dateString + 'T00:00:00'); // Treat as local time
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
