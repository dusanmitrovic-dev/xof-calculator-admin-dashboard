import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-other-configs-page',
  templateUrl: './other-configs-page.component.html',
  styleUrls: ['./other-configs-page.component.scss'],
  standalone: false, // Keep as declared in module for now
})
export class OtherConfigsPageComponent implements OnInit, OnDestroy {
  isLoadingModels = true;
  isLoadingPeriods = true;
  isLoadingShifts = true;

  models: string[] = [];
  periods: string[] = [];
  shifts: string[] = [];

  modelsChanged = false;
  periodsChanged = false;
  shiftsChanged = false;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;

  private destroy$ = new Subject<void>();

  constructor(
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadModels();
    this.loadPeriods();
    this.loadShifts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Models Logic ---
  loadModels(): void {
    this.isLoadingModels = true;
    this.modelsChanged = false;
    this.settingsService
      .getModelsConfig()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingModels = false))
      )
      .subscribe(
        (data) => (this.models = data),
        (error) => this.showError('load Models')
      );
  }

  addModel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.models.includes(value)) {
      this.models.push(value);
      this.modelsChanged = true;
    }
    event.chipInput!.clear(); // Clear the input
  }

  removeModel(model: string): void {
    const index = this.models.indexOf(model);
    if (index >= 0) {
      this.models.splice(index, 1);
      this.modelsChanged = true;
    }
  }

  saveModels(): void {
    this.isLoadingModels = true;
    this.settingsService
      .saveModelsConfig(this.models)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingModels = false))
      )
      .subscribe(
        (savedModels) => {
          this.models = savedModels; // Update with response from service (might be identical)
          this.modelsChanged = false;
          this.snackBar.open('Models configuration saved!', 'Close', {
            duration: 2000,
          });
        },
        (error) => this.showError('save Models')
      );
  }

  // --- Periods Logic ---
  loadPeriods(): void {
    this.isLoadingPeriods = true;
    this.periodsChanged = false;
    this.settingsService
      .getPeriodConfig()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingPeriods = false))
      )
      .subscribe(
        (data) => (this.periods = data),
        (error) => this.showError('load Periods')
      );
  }

  addPeriod(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.periods.includes(value)) {
      this.periods.push(value);
      this.periodsChanged = true;
    }
    event.chipInput!.clear();
  }

  removePeriod(period: string): void {
    const index = this.periods.indexOf(period);
    if (index >= 0) {
      this.periods.splice(index, 1);
      this.periodsChanged = true;
    }
  }

  savePeriods(): void {
    this.isLoadingPeriods = true;
    this.settingsService
      .savePeriodConfig(this.periods)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingPeriods = false))
      )
      .subscribe(
        (savedPeriods) => {
          this.periods = savedPeriods;
          this.periodsChanged = false;
          this.snackBar.open('Periods configuration saved!', 'Close', {
            duration: 2000,
          });
        },
        (error) => this.showError('save Periods')
      );
  }

  // --- Shifts Logic ---
  loadShifts(): void {
    this.isLoadingShifts = true;
    this.shiftsChanged = false;
    this.settingsService
      .getShiftConfig()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingShifts = false))
      )
      .subscribe(
        (data) => (this.shifts = data),
        (error) => this.showError('load Shifts')
      );
  }

  addShift(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.shifts.includes(value)) {
      this.shifts.push(value);
      this.shiftsChanged = true;
    }
    event.chipInput!.clear();
  }

  removeShift(shift: string): void {
    const index = this.shifts.indexOf(shift);
    if (index >= 0) {
      this.shifts.splice(index, 1);
      this.shiftsChanged = true;
    }
  }

  saveShifts(): void {
    this.isLoadingShifts = true;
    this.settingsService
      .saveShiftConfig(this.shifts)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingShifts = false))
      )
      .subscribe(
        (savedShifts) => {
          this.shifts = savedShifts;
          this.shiftsChanged = false;
          this.snackBar.open('Shifts configuration saved!', 'Close', {
            duration: 2000,
          });
        },
        (error) => this.showError('save Shifts')
      );
  }

  // --- Helper ---
  private showError(action: string): void {
    this.snackBar.open(`Failed to ${action}. Please try again.`, 'Close', {
      duration: 3000,
    });
    console.error(`Error during ${action}`);
  }
}
