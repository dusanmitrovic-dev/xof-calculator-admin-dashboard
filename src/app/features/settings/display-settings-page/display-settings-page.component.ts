import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service'; // Adjust path
import { DisplaySettings } from '../../../core/models/display-settings.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-settings-page',
  templateUrl: './display-settings-page.component.html',
  styleUrls: ['./display-settings-page.component.scss'],
})
export class DisplaySettingsPageComponent implements OnInit, OnDestroy {
  displayForm!: FormGroup; // Use definite assignment assertion or initialize in constructor
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm(); // Initialize form structure immediately
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Initialize form structure
  buildForm(settings?: DisplaySettings): void {
    this.displayForm = this.fb.group({
      ephemeral_responses: [settings?.ephemeral_responses ?? false],
      show_average: [settings?.show_average ?? false],
      agency_name: [settings?.agency_name ?? '', Validators.required],
      show_ids: [settings?.show_ids ?? false],
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
      .subscribe(
        (settings) => {
          // Use patchValue to update the existing form instance
          this.displayForm.patchValue(settings);
          this.displayForm.markAsPristine(); // Mark as pristine after loading
        },
        (error) => {
          console.error('Error fetching display settings', error);
          this.snackBar.open('Failed to load display settings.', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  onSubmit(): void {
    if (this.displayForm.invalid) {
      this.snackBar.open('Please correct the errors in the form.', 'Close', {
        duration: 3000,
      });
      this.displayForm.markAllAsTouched(); // Show validation errors visually
      return;
    }

    if (this.displayForm.pristine) {
      this.snackBar.open('No changes detected.', 'Close', { duration: 2000 });
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
      .subscribe(
        () => {
          // Assuming save returns the saved object or confirmation
          this.snackBar.open('Display Settings Saved!', 'Close', {
            duration: 2000,
          });
          this.displayForm.markAsPristine(); // Mark as pristine after successful save
          // Optional: Reload or patchValue if backend response differs significantly
          // this.loadSettings();
        },
        (error) => {
          console.error('Error saving display settings', error);
          this.snackBar.open('Failed to save display settings.', 'Close', {
            duration: 3000,
          });
        }
      );
  }
}
