import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../../../core/services/settings.service';
import { CommissionSettings } from '../../../../core/models/commission-settings.model'; // For roles (optional)
import { Earning } from '../../../../core/models/earning.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-edit-earning-dialog',
  templateUrl: './edit-earning-dialog.component.html',
  styleUrls: ['./edit-earning-dialog.component.scss'], // Use same styles as add dialog
  standalone: false
})
export class EditEarningDialogComponent implements OnInit {
  editForm: FormGroup;
  earning: Earning; // Store the original earning record

  models$: Observable<string[]>;
  periods$: Observable<string[]>;
  shifts$: Observable<string[]>;
  roles$: Observable<{ id: string; name: string }[]>; // Example

  private discordIdRegex = /^<@!?(\d+)>$/;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Earning, // Inject the Earning object to edit
    private settingsService: SettingsService
  ) {
    this.earning = data; // Keep original data

    this.editForm = this.fb.group({
      userId: [
        '',
        [Validators.required, Validators.pattern(this.discordIdRegex)],
      ],
      // Parse the incoming date string if needed, ensure it's a Date object for datepicker
      date: [null, Validators.required],
      gross_revenue: [null, [Validators.required, Validators.min(0)]],
      total_cut: [null, [Validators.required, Validators.min(0)]],
      hours_worked: [null, [Validators.min(0)]],
      role: [null],
      models: [null],
      period: [null, Validators.required],
      shift: [null, Validators.required],
    });

    // Fetch dropdown options (same as Add Dialog)
    this.models$ = this.settingsService.getModelsConfig();
    this.periods$ = this.settingsService.getPeriodConfig();
    this.shifts$ = this.settingsService.getShiftConfig();
    this.roles$ = this.settingsService.getCommissionSettings().pipe(
      map((settings: CommissionSettings) => {
        return Object.keys(settings?.roles || {}).map((id) => ({
          id: id,
          name: `Role: ${id}`,
        }));
      })
    );
  }

  ngOnInit(): void {
    // Populate the form with the data of the earning record being edited
    this.populateForm();
  }

  populateForm(): void {
    // Convert date string to Date object for the datepicker
    let dateValue: Date | null = null;
    if (this.earning.date) {
      try {
        dateValue = new Date(this.earning.date);
        if (isNaN(dateValue.getTime())) {
          // Check if parsing failed
          console.warn('Invalid date string received:', this.earning.date);
          dateValue = null; // Set to null if invalid
        }
      } catch (e) {
        console.error('Error parsing date:', e);
        dateValue = null;
      }
    }

    this.editForm.patchValue({
      ...this.earning,
      date: dateValue, // Use the parsed Date object or null
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without returning changes
  }

  onSave(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formValue = this.editForm.getRawValue();

    // Prepare data to return, including the original ID
    const updatedEarningData: Earning = {
      ...this.earning, // Start with original to keep the ID and any unchanged fields
      ...formValue, // Overwrite with form values
      // Re-format date back to string
      date:
        formValue.date instanceof Date
          ? formValue.date.toISOString().split('T')[0]
          : formValue.date,
      // Ensure numeric fields are numbers or null
      gross_revenue:
        formValue.gross_revenue !== null ? +formValue.gross_revenue : null,
      total_cut: formValue.total_cut !== null ? +formValue.total_cut : null,
      hours_worked:
        formValue.hours_worked !== null ? +formValue.hours_worked : null,
    };

    this.dialogRef.close(updatedEarningData); // Return the complete, updated Earning object
  }

  // Helper to get form controls easily
  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }
}
