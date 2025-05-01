import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives & pipes
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { GuildConfigListComponent } from './guild-config-list/guild-config-list.component';
import { GuildConfigEditModalComponent } from './guild-config-edit-modal/guild-config-edit-modal.component';
import { EarningEditModalComponent } from './earning-edit-modal/earning-edit-modal.component';
import { routes } from './guild-management.routes';

// Import ALL CoreUI Modules used in this module's components
import { 
  AlertComponent, 
  BadgeComponent,
  ButtonDirective, 
  CardBodyComponent, 
  CardComponent, 
  CardHeaderComponent, 
  ColComponent, 
  // Ensure Modal related components are here if needed by child components
  ModalBodyComponent, 
  ModalComponent, 
  ModalFooterComponent, 
  ModalHeaderComponent, 
  ModalTitleDirective, 
  // Form components used in modals
  FormCheckComponent, 
  FormControlDirective,
  FormDirective, 
  FormLabelDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  // Other layout/display components
  RowComponent, 
  SpinnerComponent, 
  TableDirective,
  TextColorDirective 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    GuildConfigListComponent, 
    GuildConfigEditModalComponent, 
    EarningEditModalComponent // Declare Earning Modal
  ],
  imports: [
    CommonModule, // Provides *ngIf, *ngFor, json pipe, currency pipe, etc.
    ReactiveFormsModule, // For modal forms
    RouterModule.forChild(routes),
    // CoreUI Modules needed by GuildConfigListComponent & its modals
    AlertComponent,
    BadgeComponent,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormCheckComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    IconDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    RowComponent,
    SpinnerComponent,
    TableDirective,
    TextColorDirective
  ]
})
export class GuildManagementModule { }
