import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// CoreUI Modules for UI consistency
import {
  ButtonModule,
  FormModule,
  GridModule,
  CardModule,
  ModalModule as CoreUIModalModule
} from '@coreui/angular';
// import { IconDirective } from '@coreui/icons-angular'; // Removed unused import

export interface DisplaySettings {
  ephemeral_responses: boolean;
  show_average: boolean;
  agency_name: string;
  show_ids: boolean;
  bot_name: string;
}

@Component({
  selector: 'app-display-settings-edit-modal',
  templateUrl: './display-settings-edit-modal.component.html',
  // styleUrls: ['./display-settings-edit-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    ButtonModule,
    FormModule,
    GridModule,
    CardModule,
    CoreUIModalModule
    // IconDirective removed from imports array
  ]
})
export class DisplaySettingsEditModalComponent implements OnInit {
  @Input() currentDisplaySettings!: DisplaySettings;
  @Output() displaySettingsSaved = new EventEmitter<DisplaySettings>();

  displaySettingsForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.displaySettingsForm = this.fb.group({
      ephemeral_responses: [this.currentDisplaySettings?.ephemeral_responses ?? false, Validators.required],
      show_average: [this.currentDisplaySettings?.show_average ?? true, Validators.required],
      agency_name: [this.currentDisplaySettings?.agency_name || 'Agency', Validators.required],
      show_ids: [this.currentDisplaySettings?.show_ids ?? true, Validators.required],
      bot_name: [this.currentDisplaySettings?.bot_name || 'Shift Calculator', Validators.required]
    });
  }

  save(): void {
    if (this.displaySettingsForm.valid) {
      this.displaySettingsSaved.emit(this.displaySettingsForm.value);
      this.activeModal.close(this.displaySettingsForm.value);
    } else {
      this.displaySettingsForm.markAllAsTouched();
    }
  }

  dismiss(): void {
    this.activeModal.dismiss('Cross click');
  }
}
