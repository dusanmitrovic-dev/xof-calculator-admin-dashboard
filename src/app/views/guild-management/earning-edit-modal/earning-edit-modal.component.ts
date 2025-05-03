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
import { GuildConfigService } from '../../../services/guild-config.service';

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
  // Changed input name to match template error [earningToEdit]
  @Input() earningToEdit: Earning | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() earningSaved = new EventEmitter<Earning | null>();

  earningForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  title: string = 'Add Earning Record';

  // Property to determine if editing or adding
  get isEditMode(): boolean {
    return !!this.earningToEdit;
  }

  // Options fetched from GuildConfig
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
    // React when the modal becomes visible or inputs change while visible
    if (changes['visible'] && this.visible) {
        this.prepareModal();
    } else if (this.visible && (changes['earningToEdit'] || changes['guildId'])) {
        this.prepareModal();
    }
    // Handle closing via visible binding changing to false
    else if (changes['visible'] && !this.visible) {
        this.resetModalState();
    }
  }

  private prepareModal(): void {
    console.log(`EarningModal: Preparing. Mode: ${this.isEditMode ? 'Edit' : 'Add'}, GuildID: ${this.guildId}`);
    this.errorMessage = null;
    this.isLoading = false;
    this.earningForm.reset(); // Reset form state

    if (!this.guildId) {
      this.errorMessage = "Error: Guild ID is required.";
      return;
    }

    // Set Guild ID (always disabled)
    this.earningForm.get('guild_id')?.setValue(this.guildId);
    this.earningForm.get('guild_id')?.disable();

    // Fetch config options needed for dropdowns
    this.loadConfigOptions(this.guildId);

    if (this.isEditMode && this.earningToEdit) {
      this.title = `Edit Earning Record (ID: ${this.earningToEdit.id})`;
      this.patchForm(this.earningToEdit);
      this.earningForm.get('id')?.disable(); // Disable ID field in edit mode
    } else {
      this.title = 'Add New Earning Record';
      this.earningForm.patchValue({ date: this.getTodayDateString() });
      this.earningForm.get('id')?.disable(); // ID is generated on save for create mode
    }
  }

  private loadConfigOptions(guildId: string): void {
    this.loadingConfigOptions = true;
    this.errorMessage = null;
    this.guildConfigService.getGuildConfig(guildId)
      .pipe(finalize(() => this.loadingConfigOptions = false))
      .subscribe({
        next: (config) => {
          console.log('EarningModal: Fetched config for options:', config);
          this.availableModels = config?.models || [];
          this.availableShifts = config?.shifts || [];
          this.availablePeriods = config?.periods || [];
          // Re-patch form if edit mode data arrived before options were loaded
          if (this.isEditMode && this.earningToEdit) {
             this.patchForm(this.earningToEdit);
          }
        },
        error: (err: any) => {
          console.error('EarningModal: Error loading config options:', err);
          this.errorMessage = `Failed to load form options (Models, Shifts, Periods): ${err?.message || 'Unknown error'}`;
        }
      });
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
    this.earningForm.patchValue({
      ...earning,
      date: earning.date ? this.formatDateForInput(earning.date) : this.getTodayDateString()
    });
  }

  saveChanges(): void {
    this.earningForm.markAllAsTouched();
    if (this.earningForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      console.warn('EarningModal: Form validation failed.', this.earningForm.errors);
      return;
    }
    if (!this.guildId) { // Double-check
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
        this.earningSaved.emit(savedEarning); // Emit the saved data
        this.closeModal(false); // Close without emitting null
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
    this.resetModalState();
  }

  handleVisibleChange(isVisible: boolean): void {
     // Only react if the change originates from the modal itself (e.g., backdrop click)
     // and syncs with the parent component's [visible] binding.
     if (this.visible !== isVisible) {
         this.visible = isVisible;
         this.visibleChange.emit(isVisible);
         if (!isVisible) {
             // Modal is closing
             this.earningSaved.emit(null); // Signal close without save
             this.resetModalState();
         }
     }
   }

  private resetModalState(): void {
    console.log('EarningModal: Resetting state');
    this.isLoading = false;
    this.errorMessage = null;
    this.earningToEdit = null; // Clear reference to edited data
    if (this.earningForm) {
        this.earningForm.reset();
        // Re-apply defaults
        this.earningForm.patchValue({ date: this.getTodayDateString() });
        this.earningForm.get('guild_id')?.setValue(this.guildId);
        this.earningForm.get('guild_id')?.disable();
        this.earningForm.get('id')?.disable();
    }
  }

  private generateCustomId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  private getTodayDateString(): string {
      const today = new Date();
      return today.toISOString().split('T')[0];
  }

  private formatDateForInput(dateString: string | Date): string {
      try {
          const date = new Date(dateString);
          if (!isNaN(date.getTime())) {
              return date.toISOString().split('T')[0];
          } else {
               console.warn(`EarningModal: Invalid date received: ${dateString}`);
               return this.getTodayDateString();
          }
      } catch (e) {
           console.error(`EarningModal: Error parsing date: ${dateString}`, e);
           return this.getTodayDateString();
      }
  }
}
