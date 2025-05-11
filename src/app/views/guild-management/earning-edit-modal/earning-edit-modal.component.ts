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
    this.earningForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
        this.prepareModal();
    } else if (this.visible && (changes['earningToEdit'] || changes['guildId'] || changes['guildConfig'])) {
        this.prepareModal();
    }
    else if (changes['visible'] && !this.visible) {
        this.resetModalState();
    }
  }

  private prepareModal(): void {
    console.log(`EarningModal: Preparing. Mode: ${this.isEditMode ? 'Edit' : 'Add'}, GuildID: ${this.guildId}`);
    this.errorMessage = null;
    this.isLoading = false;
    this.earningForm.reset(); 

    if (!this.guildId) {
      this.errorMessage = "Error: Guild ID is required.";
      return;
    }
    
    this.earningForm.get('guild_id')?.setValue(this.guildId);
    this.earningForm.get('guild_id')?.disable();

    if (this.guildConfig) {
        console.log('EarningModal: Using provided guildConfig for options:', this.guildConfig);
        // Directly use the string arrays from guildConfig
        this.availableModels = this.guildConfig.models || [];
        this.availableShifts = this.guildConfig.shifts || [];
        this.availablePeriods = this.guildConfig.periods || [];
        
        if (this.isEditMode && this.earningToEdit) {
            this.patchForm(this.earningToEdit);
        }
    } else {
        console.warn('EarningModal: guildConfig not provided. Form options might be limited.');
        this.availableModels = [];
        this.availableShifts = [];
        this.availablePeriods = [];
    }

    if (this.isEditMode && this.earningToEdit) {
      this.title = `Edit Earning Record (ID: ${this.earningToEdit.id})`;
      if (this.guildConfig) { 
          this.patchForm(this.earningToEdit);
      }
      this.earningForm.get('id')?.disable(); 
    } else {
      this.title = 'Add New Earning Record';
      this.earningForm.patchValue({ date: this.getTodayDateString() });
      this.earningForm.get('id')?.disable(); 
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
    this.resetModalState();
  }

  handleVisibleChange(isVisible: boolean): void {
     if (this.visible !== isVisible) {
         this.visible = isVisible;
         this.visibleChange.emit(isVisible);
         if (!isVisible) {
             this.earningSaved.emit(null);
             this.resetModalState();
         }
     }
   }

  private resetModalState(): void {
    console.log('EarningModal: Resetting state');
    this.isLoading = false;
    this.errorMessage = null;
    this.earningToEdit = null;
    if (this.earningForm) {
        this.earningForm.reset();
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
