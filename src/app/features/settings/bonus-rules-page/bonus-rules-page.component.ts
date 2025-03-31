import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '../../../core/services/settings.service'; // Adjust path
import { BonusRule } from '../../../core/models/bonus-rule.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bonus-rules-page',
  templateUrl: './bonus-rules-page.component.html',
  styleUrls: ['./bonus-rules-page.component.scss'],
  standalone: false
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
    this.settingsService
      .getBonusRules()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (rules) => {
          this.setRules(rules);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching bonus rules', error);
          this.snackBar.open('Failed to load bonus rules.', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      );
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
    return this.fb.group(
      {
        from: [rule?.from ?? 0, [Validators.required, Validators.min(0)]],
        to: [rule?.to ?? 0, [Validators.required, Validators.min(0)]], // Add validator: must be >= from
        amount: [rule?.amount ?? 0, [Validators.required, Validators.min(0)]],
      }
      // Add cross-field validator here if needed (e.g., 'to' >= 'from')
    );
  }

  addRule(): void {
    this.rulesFormArray.push(this.createRuleGroup());
  }

  removeRule(index: number): void {
    this.rulesFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.bonusForm.invalid) {
      this.snackBar.open('Please correct the errors in the form.', 'Close', {
        duration: 3000,
      });
      this.bonusForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // Sort rules by 'from' before saving
    const rulesToSave: BonusRule[] = [...this.rulesFormArray.value].sort(
      (a, b) => a.from - b.from
    );

    this.settingsService
      .saveBonusRules(rulesToSave)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (savedRules) => {
          this.snackBar.open('Bonus Rules Saved!', 'Close', { duration: 2000 });
          this.setRules(savedRules); // Update form with potentially re-ordered or validated data from backend
          this.isLoading = false;
          this.bonusForm.markAsPristine();
        },
        (error) => {
          console.error('Error saving bonus rules', error);
          this.snackBar.open('Failed to save bonus rules.', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      );
  }
}
