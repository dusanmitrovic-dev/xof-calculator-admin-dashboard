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
  logo_image_base64?: string; // Optional field for logo image in base64 format
  logo_text?: string; // Optional field for logo text
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

  @Input() logoText: string = '';
  @Input() logoImageBase64: string = '';

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

    // Initialize logo fields if provided
    if (this.currentDisplaySettings && this.currentDisplaySettings['logo_text']) {
      this.logoText = this.currentDisplaySettings['logo_text'];
    }
    if (this.currentDisplaySettings && this.currentDisplaySettings['logo_image_base64']) {
      this.logoImageBase64 = this.currentDisplaySettings['logo_image_base64'];
    }
  }

  onLogoTextInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.logoText = input.value;
  }

  onLogoImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.logoImageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    if (this.displaySettingsForm.valid) {
      this.displaySettingsSaved.emit({
        ...this.displaySettingsForm.value,
        logo_text: this.logoText,
        logo_image_base64: this.logoImageBase64
      });
      this.activeModal.close({
        ...this.displaySettingsForm.value,
        logo_text: this.logoText,
        logo_image_base64: this.logoImageBase64
      });
    } else {
      this.displaySettingsForm.markAllAsTouched();
    }
  }

  dismiss(): void {
    this.activeModal.dismiss('Cross click');
  }
}
