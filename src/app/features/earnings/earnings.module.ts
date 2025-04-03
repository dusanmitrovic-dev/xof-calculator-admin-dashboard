import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'; // Includes common modules & base Material

import { EarningsRoutingModule } from './earnings-routing.module';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';

// Required Material Modules specifically for Earnings Page (beyond SharedModule)
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Likely needed for Edit Dialog
import { MatNativeDateModule } from '@angular/material/core'; // Required for datepicker
import { MatSelectModule } from '@angular/material/select'; // Likely needed for Edit Dialog (role, period, shift)

// TODO: Import Dialog Components when created
// import { EditEarningDialogComponent } from './dialogs/edit-earning-dialog/edit-earning-dialog.component';
// import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'; // Assuming shared location

@NgModule({
  declarations: [
    EarningsPageComponent,
    // EditEarningDialogComponent, // Declare dialog components here
    // ConfirmDialogComponent, // Or declare in SharedModule if truly shared
  ],
  imports: [
    SharedModule, // Includes CommonModule, ReactiveFormsModule
    EarningsRoutingModule,
    // Material Modules needed specifically for this feature
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule, // Add modules needed for dialogs too
    MatNativeDateModule,
    MatSelectModule,
  ],
  // entryComponents: [ // No longer needed with Ivy
  //   EditEarningDialogComponent,
  //   ConfirmDialogComponent
  // ]
})
export class EarningsModule {}
