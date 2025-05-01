import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Observable } from 'rxjs'; // Import Observable
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
import { GuildConfigService } from '../../../services/guild-config.service';

@Component({
  selector: 'app-earning-edit-modal',
  templateUrl: './earning-edit-modal.component.html',
  styleUrls: ['./earning-edit-modal.component.scss'],
  standalone: true, // Make component standalone
  imports: [ // Add imports array
    CommonModule, // For *ngIf
    ReactiveFormsModule, // For formGroup, formControlName etc.
    ModalModule, // For c-modal, c-modal-header, etc.
    ButtonModule, // For cButton
    FormModule, // For cFormControl, cFormLabel, cFormSelect etc.
    SpinnerModule, // For c-spinner
    AlertModule, // For c-alert
    GridModule, // If using c-row, c-col inside the modal body/form
    UtilitiesModule // For spacing/text utilities if needed
  ]
})
export class EarningEditModalComponent implements OnInit, OnChanges {

  @Input() visible: boolean = false;
  @Input() guildId: string | null = null;
  @Input() earningToEdit: Earning | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() earningSaved = new EventEmitter<Earning>();

  earningForm!: FormGroup;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  errorMessage: string | null = null;

  availableModels: string[] = [];
  availableShifts: string[] = [];
  availablePeriods: string[] = [];
  loadingConfigOptions: boolean = false;

  constructor(
    private fb: FormBuilder,
    private earningsService: EarningsService,
    private guildConfigService: GuildConfigService
  ) { }

  ngOnInit(): void {
    this.earningForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.isEditMode = !!this.earningToEdit;
      console.log(`Earning modal opening. Mode: ${this.isEditMode ? 'Edit' : 'Add'}`);
      if (this.guildId) {
        this.loadConfigOptions(this.guildId);
      } else {
        this.errorMessage = "Guild ID is missing. Cannot load form options.";
      }

      if (this.isEditMode && this.earningToEdit) {
        this.patchForm(this.earningToEdit);
      } else {
        this.earningForm.reset();
        // Pre-fill guild_id when adding. Ensure it's enabled temporarily or use setValue with enabled state.
        this.earningForm.patchValue({ guild_id: this.guildId });
        if (this.guildId) { // Keep guild_id disabled visually but ensure it's set
            this.earningForm.get('guild_id')?.setValue(this.guildId);
            this.earningForm.get('guild_id')?.disable();
        }
      }
    }

    if (changes['visible'] && !this.visible) {
      this.resetModalState();
    }
  }

  private loadConfigOptions(guildId: string): void {
    this.loadingConfigOptions = true;
    this.errorMessage = null; // Clear previous errors
    this.guildConfigService.getGuildConfig(guildId)
      .pipe(finalize(() => this.loadingConfigOptions = false))
      .subscribe({
        next: (config) => {
          console.log('Fetched config for options:', config);
          this.availableModels = config.models || [];
          this.availableShifts = config.shifts || [];
          this.availablePeriods = config.periods || [];
          // Patch again if edit mode, AFTER options are available
          if (this.isEditMode && this.earningToEdit) {
            this.patchForm(this.earningToEdit);
          }
        },
        error: (err: any) => { // Add type for err
          console.error('Error loading config options:', err);
          this.errorMessage = `Failed to load form options (Models, Shifts, Periods): ${err?.message || 'Unknown error'}`;
          this.availableModels = [];
          this.availableShifts = [];
          this.availablePeriods = [];
        }
      });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      guild_id: [{ value: this.guildId, disabled: true }, Validators.required], // Initialize with guildId if available
      date: [this.getTodayDateString(), Validators.required], // Default to today
      user_mention: ['', Validators.required],
      role: ['', Validators.required],
      models: ['', Validators.required],
      shift: ['', Validators.required],
      period: ['', Validators.required],
      hours_worked: [null, [Validators.required, Validators.min(0.1)]],
      gross_revenue: [null, [Validators.required, Validators.min(0)]],
      total_cut: [null, [Validators.required, Validators.min(0)]],
    });
  }

  // Helper to get today's date in YYYY-MM-DD format
  private getTodayDateString(): string {
      const today = new Date();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${today.getFullYear()}-${month}-${day}`;
  }


  private patchForm(earning: Earning): void {
    if (!earning || !this.earningForm) return;
    console.log('Patching earning form:', earning);
    this.earningForm.patchValue({
      ...earning,
      // Ensure date is in 'YYYY-MM-DD' format for the input type="date"
      date: earning.date ? new Date(earning.date).toISOString().split('T')[0] : null
    });
    this.earningForm.get('id')?.disable();
    this.earningForm.get('guild_id')?.disable();
  }

  private generateCustomId(): string {
    // Consider a more robust UUID generation if needed
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  saveChanges(): void {
    if (!this.guildId) {
      this.errorMessage = 'Guild ID is missing. Cannot save.';
      return;
    }

    this.earningForm.markAllAsTouched();
    if (this.earningForm.invalid) {
      console.log("Form invalid:", this.earningForm.errors, this.earningForm.controls);
      // Find specific errors
      let errorMessages = [];
      for (const key in this.earningForm.controls) {
          if (this.earningForm.controls[key].errors) {
              errorMessages.push(`${key}: ${JSON.stringify(this.earningForm.controls[key].errors)}`);
          }
      }
      this.errorMessage = `Please correct the errors in the form. Details: ${errorMessages.join(', ')}`;
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.earningForm.getRawValue(); // Use getRawValue to include disabled fields like guild_id
    const earningData: Earning = {
      ...formValue,
      // Convert date back to desired format if necessary, e.g., ISO string or just date part
      date: formValue.date, // Assuming backend accepts 'YYYY-MM-DD' or handles it
      // Ensure numeric types are numbers
      hours_worked: Number(formValue.hours_worked),
      gross_revenue: Number(formValue.gross_revenue),
      total_cut: Number(formValue.total_cut),
    };


    let saveObservable: Observable<Earning>;

    if (this.isEditMode && this.earningToEdit?.id) {
      earningData.id = this.earningToEdit.id;
      delete (earningData as any)._id; // Remove internal DB id if present
      console.log('Updating earning:', earningData);
      saveObservable = this.earningsService.updateEarningByCustomId(earningData.id, earningData);
    } else {
      earningData.id = this.generateCustomId();
      // Ensure guild_id from the disabled control is correctly included
      earningData.guild_id = this.guildId;
      console.log('Creating earning:', earningData);
      saveObservable = this.earningsService.createEarning(this.guildId, earningData);
    }

    saveObservable.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (savedEarning: Earning) => { // Add explicit type
        this.earningSaved.emit(savedEarning);
        this.closeModal();
      },
      error: (err: any) => { // Add explicit type
        this.errorMessage = err?.error?.message || err?.message || 'Failed to save earning record.';
        console.error('Save earning error:', err);
      }
    });
  }

  closeModal(): void {
    // Trigger visibility change which handles state reset via ngOnChanges
    this.handleVisibleChange(false);
  }

  // Handle the boolean event from CoreUI modal
  handleVisibleChange(isVisible: boolean): void {
    // Don't re-emit if the change came from internal closeModal() call
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
    console.log('Resetting earning modal state');
    this.isLoading = false;
    this.errorMessage = null;
    this.earningToEdit = null;
    this.isEditMode = false;
    if (this.earningForm) {
        this.earningForm.reset({
            // Reset with default values if needed, e.g., today's date
            date: this.getTodayDateString()
        });
        // Re-apply guild_id and disable it
        if (this.guildId) {
            this.earningForm.get('guild_id')?.setValue(this.guildId);
            this.earningForm.get('guild_id')?.disable();
        }
    }
    // Decide whether to clear config options or not
    // this.availableModels = [];
    // this.availableShifts = [];
    // this.availablePeriods = [];
  }
}
