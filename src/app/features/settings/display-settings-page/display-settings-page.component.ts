import {
  Component,
  OnInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service'; // Adjust path
import { DisplaySettings } from '../../../core/models/display-settings.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import Module
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import Module
import { MatButtonModule } from '@angular/material/button'; // Import Module
import { MatIconModule } from '@angular/material/icon'; // Import Module
import { MatTooltipModule } from '@angular/material/tooltip'; // Import Module
import { SharedModule } from '../../../shared/shared.module'; // Import SharedModule

@Component({
  selector: 'app-display-settings-page',
  templateUrl: './display-settings-page.component.html',
  styleUrls: ['./display-settings-page.component.scss'], // Link SCSS file
  standalone: true, // Correctly marked as standalone
  imports: [
    CommonModule,
    ReactiveFormsModule, // Needed for forms
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule, // Add Input Module
    MatButtonModule, // Add Button Module
    MatIconModule, // Add Icon Module
    MatSnackBarModule, // Add SnackBar Module
    MatTooltipModule, // Add Tooltip Module
    SharedModule, // Import SharedModule to include ConfigCardComponent
  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA // Usually not needed if ConfigCardComponent is imported directly
  ],
})
export class DisplaySettingsPageComponent implements OnInit, OnDestroy {
  displayForm!: FormGroup;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {
    // Initialize form structure immediately in constructor
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Initialize form structure with defaults (null/empty/false)
  buildForm(settings?: DisplaySettings): void {
    this.displayForm = this.fb.group({
      ephemeral_responses: [
        settings?.ephemeral_responses ?? false,
        Validators.required,
      ], // Booleans are non-nullable
      show_average: [settings?.show_average ?? false, Validators.required],
      agency_name: [settings?.agency_name ?? '', Validators.required],
      show_ids: [settings?.show_ids ?? false, Validators.required],
      bot_name: [settings?.bot_name ?? '', Validators.required],
    });
  }

  loadSettings(): void {
    this.isLoading = true;
    this.settingsService
      .getDisplaySettings()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (settings) => {
          // Use patchValue to update the existing form instance safely
          this.displayForm.patchValue(settings || {}); // Handle null/undefined settings
          this.displayForm.markAsPristine();
        },
        error: (error) => {
          console.error('Error fetching display settings', error);
          this.snackBar.open(
            'Failed to load display settings. Using defaults.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
          // Form is already built with defaults, just mark pristine
          this.displayForm.markAsPristine();
        },
      });
  }

  onSubmit(): void {
    if (!this.displayForm) {
      this.snackBar.open('Form not initialized.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (this.displayForm.invalid) {
      this.snackBar.open(
        'Please correct the errors highlighted in the form.',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        }
      );
      this.displayForm.markAllAsTouched();
      return;
    }

    if (this.displayForm.pristine) {
      this.snackBar.open('No changes detected to save.', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-info'],
      });
      return;
    }

    this.isLoading = true;
    const settingsToSave: DisplaySettings = this.displayForm.value;

    this.settingsService
      .saveDisplaySettings(settingsToSave)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Display Settings Saved Successfully!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.displayForm.markAsPristine();
          // Optional: Reload or patchValue if backend response differs
          // this.loadSettings();
        },
        error: (error) => {
          console.error('Error saving display settings', error);
          this.snackBar.open(
            'Failed to save display settings. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
        },
      });
  }
}
