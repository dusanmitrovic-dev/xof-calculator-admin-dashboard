import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EarningsService, Earning } from '../../../core/services/earnings.service';
import { ConfigService, GuildConfig } from '../../../core/services/config.service'; // To fetch models/shifts/periods/roles

// Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Needed for datepicker
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

// Interface for the data passed into the dialog
export interface EarningDialogData {
  guildId: string;
  earning: Earning | null; // Null if adding, existing earning if editing
}

@Component({
  selector: 'app-earning-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule, // Add MatNativeDateModule
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './earning-dialog.component.html',
  styleUrls: ['./earning-dialog.component.css'] // Keep CSS for now
})
export class EarningDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private earningsService = inject(EarningsService);
  private configService = inject(ConfigService);
  public dialogRef = inject(MatDialogRef<EarningDialogComponent>);
  public data: EarningDialogData = inject(MAT_DIALOG_DATA);

  earningForm!: FormGroup;
  isSaving = signal(false);
  error = signal<string | null>(null);
  isEditMode = signal(false);

  // Signals for dropdown options fetched from config
  shifts = signal<string[]>([]);
  periods = signal<string[]>([]);
  models = signal<string[]>([]);
  roles = signal<string[]>([]); // Role *names* or *IDs*? Depends on what's stored in earning.role

  ngOnInit(): void {
    this.isEditMode.set(!!this.data.earning);
    this.fetchDropdownOptions(this.data.guildId);
    this.initForm();
  }

  fetchDropdownOptions(guildId: string): void {
    // Fetch the necessary config data to populate dropdowns
    this.configService.getGuildConfig(guildId).subscribe(config => {
      if (config) {
        this.shifts.set(config.shifts ?? []);
        this.periods.set(config.periods ?? []);
        this.models.set(config.models ?? []);
        // Assuming earning.role stores the role NAME (not ID) which matches the keys in config.roles
        // If it stores ID, you need a way to map ID to name if the config uses IDs.
        this.roles.set(config.roles ? Object.keys(config.roles) : []); // Use keys from roles map
      }
    });
  }

  initForm(): void {
    const earning = this.data.earning;
    this.earningForm = this.fb.group({
      // Use custom ID only for editing, generate for new?
      // Backend requires custom id in body even for POST, so we need it.
      id: [earning?.id ?? this.generateCustomId(), Validators.required],
      date: [earning?.date ? new Date(this.parseDate(earning.date)) : new Date(), Validators.required], // Convert string to Date
      user_mention: [earning?.user_mention ?? '', Validators.required],
      gross_revenue: [earning?.gross_revenue ?? 0, [Validators.required, Validators.min(0)]],
      total_cut: [earning?.total_cut ?? 0, [Validators.required, Validators.min(0)]],
      role: [earning?.role ?? '', Validators.required],
      shift: [earning?.shift ?? '', Validators.required],
      period: [earning?.period ?? '', Validators.required],
      hours_worked: [earning?.hours_worked ?? 0, [Validators.required, Validators.min(0)]],
      models: [earning?.models ?? '', Validators.required] // Assuming single model name for now
    });

    // Disable custom ID field during edit mode
    if (this.isEditMode()) {
      this.earningForm.get('id')?.disable();
    }
  }

  // Helper to parse DD/MM/YYYY to a valid Date object
  parseDate(dateString: string): string | Date {
      if (!dateString || !/\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
        return new Date(); // Return current date if format is invalid
      }
      const [day, month, year] = dateString.split('/').map(Number);
      // Note: JavaScript month is 0-indexed (0=Jan, 1=Feb, etc.)
      return new Date(year, month - 1, day);
  }

   // Helper to format Date object back to DD/MM/YYYY string
  formatDate(date: Date): string {
    if (!(date instanceof Date)) {
        // If it's already a string or invalid, return as is or handle error
        return typeof date === 'string' ? date : ''; 
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Placeholder for custom ID generation (replace with actual logic if needed)
  generateCustomId(): string {
     const timestamp = Date.now();
     const randomPart = Math.floor(Math.random() * 10000);
     return `${timestamp}-${randomPart}`;
  }

  save(): void {
    if (this.earningForm.invalid) {
      this.earningForm.markAllAsTouched();
      this.error.set('Please fill in all required fields.');
      return;
    }

    this.isSaving.set(true);
    this.error.set(null);

    const formValue = this.earningForm.getRawValue(); // Use getRawValue to include disabled fields (like ID in edit mode)
    const earningData: Omit<Earning, '_id' | 'guild_id'> & { date: string } = {
        ...formValue,
        date: this.formatDate(formValue.date), // Format date back to string
    };

    let saveObservable: Observable<Earning | null>;

    if (this.isEditMode()) {
      // Update existing earning (using custom ID)
      saveObservable = this.earningsService.updateEarning(this.data.earning!.id, earningData);
    } else {
      // Create new earning
      saveObservable = this.earningsService.createEarning(this.data.guildId, earningData as Earning);
    }

    saveObservable.subscribe({
      next: (result) => {
        this.isSaving.set(false);
        if (result) {
          this.dialogRef.close('saved'); // Close dialog and signal success
        } else {
          this.error.set('Failed to save earning record.');
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        this.error.set('An error occurred while saving.');
        console.error('Save error:', err);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(); // Close without signaling save
  }
}
