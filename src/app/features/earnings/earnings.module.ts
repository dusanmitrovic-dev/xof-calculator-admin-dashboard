import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { EarningsRoutingModule } from './earnings-routing.module';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';

// Required Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip'; // Added Tooltip
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Added SnackBar
import { MatDialogModule } from '@angular/material/dialog'; // Added Dialog

@NgModule({
  declarations: [EarningsPageComponent],
  imports: [
    SharedModule, // Includes CommonModule, ReactiveFormsModule
    EarningsRoutingModule,
    // Material Modules for Earnings Page
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule, // Added
    MatSnackBarModule, // Added
    MatDialogModule, // Added
  ],
})
export class EarningsModule {}
