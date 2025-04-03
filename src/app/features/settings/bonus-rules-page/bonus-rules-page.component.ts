import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service'; // Adjust path
import { BonusRule } from '../../../core/models/bonus-rule.model';
import { MatSnackBar } from '@angular/material/snack-bar';

// Custom Validator Function
export function toGreaterThanOrEqualFromValidator(
  control: AbstractControl
): ValidationErrors | null {
  const fromValue = control.get('from')?.value;
  const toValue = control.get('to')?.value;

  // Check if both values are present and valid numbers before comparing
  if (
    fromValue !== null &&
    fromValue !== undefined &&
    !isNaN(fromValue) &&
    toValue !== null &&
    toValue !== undefined &&
    !isNaN(toValue)
  ) {
    if (parseFloat(toValue) < parseFloat(fromValue)) {
      // Set error on the 'to' control itself if preferred, or on the group
      // control.get('to')?.setErrors({ 'toLessThanFrom': true }); // Set on 'to' control
      return { toLessThanFrom: true }; // Set on group
    }
  }
  // Clear the specific error if condition is met or values are invalid/missing
  // if (control.get('to')?.hasError('toLessThanFrom')) {
  //     // Manually remove the error if condition passes to avoid conflicts with other validators
  //     const errors = control.get('to')?.errors;
  //     if(errors) {
  //         delete errors['toLessThanFrom'];
  //         if (Object.keys(errors).length === 0) {
  //             control.get('to')?.setErrors(null);
  //         } else {
  //             control.get('to')?.setErrors(errors);
  //         }
  //     }
  // }
  return null; // No error
}

@Component({
  selector: 'app-bonus-rules-page',
  templateUrl: './bonus-rules-page.component.html',
  styleUrls: ['./bonus-rules-page.component.scss'], // Link SCSS file
  standalone: false,
})
export class BonusRulesPageComponent implements OnInit, OnDestroy {
  bonusForm: FormGroup;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {
    this.bonusForm = this.fb.group({
      rules: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadRules();
  }

  loadRules(): void {
    this.isLoading = true;
    this.settingsService
      .getBonusRules()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)) // Ensure loading stops
      )
      .subscribe({
        // Use observer object for clarity
        next: (rules) => {
          this.setRules(rules);
          this.bonusForm.markAsPristine(); // Mark as pristine after loading
        },
        error: (error) => {
          console.error('Error fetching bonus rules', error);
          this.snackBar.open(
            'Failed to load bonus rules. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'], // Optional: Add class for styling errors
            }
          );
          // Optionally clear the form or leave potentially stale data
          // this.rulesFormArray.clear();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get rulesFormArray(): FormArray {
    return this.bonusForm.get('rules') as FormArray;
  }

  setRules(rules: BonusRule[]): void {
    const ruleFGs = rules.map((rule) => this.createRuleGroup(rule));
    this.bonusForm.setControl('rules', this.fb.array(ruleFGs));
  }

  createRuleGroup(rule?: BonusRule): FormGroup {
    // Use nullish coalescing for defaults
    const fromValue = rule?.from ?? null; // Use null to avoid treating 0 as missing
    const toValue = rule?.to ?? null;
    const amountValue = rule?.amount ?? null;

    return this.fb.group(
      {
        from: [fromValue, [Validators.required, Validators.min(0)]],
        to: [toValue, [Validators.required, Validators.min(0)]],
        amount: [amountValue, [Validators.required, Validators.min(0)]],
      },
      { validators: toGreaterThanOrEqualFromValidator } // Add cross-field validator here
    );
  }

  addRule(): void {
    // Add a new rule with default/null values
    const newRuleGroup = this.createRuleGroup();
    this.rulesFormArray.push(newRuleGroup);
    this.bonusForm.markAsDirty(); // Mark form as dirty when adding a rule
  }

  removeRule(index: number): void {
    this.rulesFormArray.removeAt(index);
    this.bonusForm.markAsDirty(); // Mark form as dirty when removing a rule
  }

  onSubmit(): void {
    if (this.bonusForm.invalid) {
      this.snackBar.open(
        'Please correct the errors highlighted in the form.',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        }
      );
      this.bonusForm.markAllAsTouched(); // Ensure all errors are shown
      return;
    }

    if (this.bonusForm.pristine) {
      this.snackBar.open('No changes detected to save.', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-info'],
      });
      return;
    }

    this.isLoading = true;
    // Sort rules by 'from' amount before saving (good practice)
    const rulesToSave: BonusRule[] = [...this.rulesFormArray.value].sort(
      (a, b) => (a.from ?? 0) - (b.from ?? 0) // Handle potential nulls just in case
    );

    this.settingsService
      .saveBonusRules(rulesToSave)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (savedRules) => {
          this.snackBar.open('Bonus Rules Saved Successfully!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.setRules(savedRules); // Update form with data from backend (could be identical or validated/cleaned)
          this.bonusForm.markAsPristine(); // Mark as pristine after successful save
        },
        error: (error) => {
          console.error('Error saving bonus rules', error);
          this.snackBar.open(
            'Failed to save bonus rules. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
        },
      });
  }

  // trackBy function for ngFor performance
  trackByRule(index: number, item: AbstractControl): number {
    // Use index if rules don't have stable IDs, otherwise use a unique property
    return index;
  }
}
