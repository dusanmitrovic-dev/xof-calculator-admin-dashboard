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
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-earning-dialog',
  templateUrl: './add-earning-dialog.component.html',
  styleUrls: ['./add-earning-dialog.component.scss'],
  standalone: false
})
export class AddEarningDialogComponent implements OnInit {
  addForm: FormGroup;
  models$: Observable<string[]>;
  periods$: Observable<string[]>;
  shifts$: Observable<string[]>;
  roles$: Observable<{ id: string; name: string }[]>; // Example structure if you fetch roles

  // Basic regex for Discord ID mention format <@USER_ID> or <@!USER_ID>
  private discordIdRegex = /^<@!?(\d+)>$/;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject data if needed for defaults
    private settingsService: SettingsService
  ) {
    this.addForm = this.fb.group({
      // Use null initially for better handling of required validation on numbers
      userId: [
        '',
        [Validators.required, Validators.pattern(this.discordIdRegex)],
      ],
      date: [new Date(), Validators.required], // Default to today
      gross_revenue: [null, [Validators.required, Validators.min(0)]],
      total_cut: [null, [Validators.required, Validators.min(0)]],
      hours_worked: [null, [Validators.min(0)]],
      role: [null], // Role might be derived later or selected
      models: [null],
      period: [null, Validators.required], // Make period/shift required?
      shift: [null, Validators.required],
    });

    // Fetch dropdown options
    this.models$ = this.settingsService.getModelsConfig();
    this.periods$ = this.settingsService.getPeriodConfig();
    this.shifts$ = this.settingsService.getShiftConfig();

    // Example: Fetching roles (adjust based on your SettingsService)
    // Assuming commission settings has role IDs, you might need names too
    this.roles$ = this.settingsService.getCommissionSettings().pipe(
      map((settings: CommissionSettings) => {
        return Object.keys(settings?.roles || {}).map((id) => ({
          id: id,
          name: `Role: ${id}`,
        })); // Replace name logic
      })
    );
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(); // Close without returning data signifies cancellation
  }

  onSave(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched(); // Trigger display of validation errors
      return;
    }

    const formValue = this.addForm.getRawValue(); // Use getRawValue if some fields might be disabled

    // Prepare data to return - ensure date is formatted correctly
    const newEarningData = {
      ...formValue,
      // Convert date to YYYY-MM-DD ISO string format if it's a Date object
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

    // Omit fields that aren't part of the Omit<Earning, 'id'> type expected by the service if needed
    // delete newEarningData.someTemporaryField;

    this.dialogRef.close(newEarningData); // Return the validated and formatted data
  }

  // Helper to get form controls easily in the template if needed
  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }
}
