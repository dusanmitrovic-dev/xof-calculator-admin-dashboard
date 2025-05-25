import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { UserListComponent } from './user-list/user-list.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { routes } from './user-management.routes';

// Import CoreUI Modules needed for User Management components
import { 
  AlertComponent, 
  BadgeComponent, // For displaying role
  ButtonDirective, 
  ButtonGroupComponent,
  CardBodyComponent, 
  CardComponent, 
  CardHeaderComponent, 
  FormCheckComponent,
  FormControlDirective,
  FormDirective, 
  FormLabelDirective,
  FormSelectDirective,
  ModalBodyComponent, 
  ModalComponent, 
  ModalFooterComponent, 
  ModalHeaderComponent, 
  ModalTitleDirective, 
  SpinnerComponent, 
  TableDirective, 
  TextColorDirective 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@NgModule({
  declarations: [
    UserListComponent,
    UserEditModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule
    RouterModule.forChild(routes),
    // CoreUI Modules
    AlertComponent,
    BadgeComponent,
    ButtonDirective,
    ButtonGroupComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    FormCheckComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    IconDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    SpinnerComponent,
    TableDirective,
    TextColorDirective
  ]
})
export class UserManagementModule { }
