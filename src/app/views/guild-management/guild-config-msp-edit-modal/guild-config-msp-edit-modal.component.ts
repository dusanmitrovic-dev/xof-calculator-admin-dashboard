import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { GuildConfig } from '../../../services/guild-config.service'; // Path might differ based on actual structure

// CoreUI Modules for UI consistency if needed, though ng-bootstrap is primary for modal itself
import {
  ButtonModule,
  FormModule,
  GridModule,
  ModalModule as CoreUIModalModule, // Alias to avoid conflict if NgbModal is also ModalModule
  CardModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-guild-config-msp-edit-modal',
  templateUrl: './guild-config-msp-edit-modal.component.html',
  styleUrls: ['./guild-config-msp-edit-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule, // For NgbActiveModal
    ButtonModule,   // CoreUI Button
    FormModule,     // CoreUI Form controls, if used directly in template
    GridModule,     // CoreUI Grid
    CoreUIModalModule, // CoreUI Modal for header/footer styling if applicable
    CardModule,
    IconDirective
  ]
})
export class GuildConfigMspEditModalComponent implements OnInit {
  @Input() guildId!: string;
  @Input() currentModels: any[] = [];
  @Input() currentShifts: any[] = [];
  @Input() currentPeriods: any[] = [];

  @Output() mspSaved = new EventEmitter<any>();

  mspForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, // Injected by NgbModal service
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.mspForm = this.fb.group({
      models: this.fb.array([]),
      shifts: this.fb.array([]),
      periods: this.fb.array([])
    });

    this.setFormArrayData(this.models, this.currentModels);
    this.setFormArrayData(this.shifts, this.currentShifts);
    this.setFormArrayData(this.periods, this.currentPeriods);
  }

  get models(): FormArray {
    return this.mspForm.get('models') as FormArray;
  }

  get shifts(): FormArray {
    return this.mspForm.get('shifts') as FormArray;
  }

  get periods(): FormArray {
    return this.mspForm.get('periods') as FormArray;
  }

  // --- Models ---
  addModel(): void {
    this.models.push(this.fb.group({
      name: ['', Validators.required],
      payout: [0, [Validators.required, Validators.min(0)]],
      commission: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeModel(index: number): void {
    this.models.removeAt(index);
  }

  // --- Shifts ---
  addShift(): void {
    this.shifts.push(this.fb.group({
      name: ['', Validators.required],
      multiplier: [1, [Validators.required, Validators.min(0)]]
    }));
  }

  removeShift(index: number): void {
    this.shifts.removeAt(index);
  }

  // --- Periods ---
  addPeriod(): void {
    this.periods.push(this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }));
  }

  removePeriod(index: number): void {
    this.periods.removeAt(index);
  }

  private setFormArrayData(formArray: FormArray, data: any[] | undefined): void {
    data = data || []; // Ensure data is an array
    // Clear out existing items
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
    // Add new items
    data.forEach(item => {
      if (formArray === this.models) {
        formArray.push(this.fb.group({
          name: [item.name || '', Validators.required],
          payout: [item.payout || 0, [Validators.required, Validators.min(0)]],
          commission: [item.commission || 0, [Validators.required, Validators.min(0)]]
        }));
      } else if (formArray === this.shifts) {
        formArray.push(this.fb.group({
          name: [item.name || '', Validators.required],
          multiplier: [item.multiplier || 1, [Validators.required, Validators.min(0)]]
        }));
      } else if (formArray === this.periods) {
        formArray.push(this.fb.group({
          name: [item.name || '', Validators.required],
          startDate: [item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '', Validators.required],
          endDate: [item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '', Validators.required]
        }));
      }
    });
  }

  save(): void {
    if (this.mspForm.valid) {
      this.mspSaved.emit(this.mspForm.value); // Emit event if someone is listening
      this.activeModal.close(this.mspForm.value); // Close modal and return data
    } else {
      console.error('MSP Form is invalid:', this.mspForm.value, this.mspForm.errors);
      this.mspForm.markAllAsTouched(); // Mark all fields to display validation errors
    }
  }

  dismiss(): void {
    this.activeModal.dismiss('Cross click');
  }
}
