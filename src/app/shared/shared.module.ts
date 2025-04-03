import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule

// Material Modules needed by shared components OR commonly used across features
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar'; // Added
import { MatSidenavModule } from '@angular/material/sidenav'; // Added
import { MatListModule } from '@angular/material/list'; // Added
import { MatGridListModule } from '@angular/material/grid-list'; // Added
import { MatMenuModule } from '@angular/material/menu'; // Added (potentially useful)
import { MatSelectModule } from '@angular/material/select'; // Added (potentially useful)
import { MatDatepickerModule } from '@angular/material/datepicker'; // Added (potentially useful)
import { MatNativeDateModule } from '@angular/material/core'; // Added (datepicker dependency)

// CDK Modules
import { ClipboardModule } from '@angular/cdk/clipboard'; // Added
import { LayoutModule } from '@angular/cdk/layout'; // Added

// Shared Components
import { ConfigCardComponent } from './components/config-card/config-card.component';
// TODO: Add ConfirmDialogComponent, etc. here if they are truly shared
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Define Material & CDK modules to be exported
const materialModules = [
  MatCardModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatMenuModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

const cdkModules = [ClipboardModule, LayoutModule];

@NgModule({
  declarations: [
    ConfigCardComponent,
    // ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // Add RouterModule if shared components use routerLink
    ...materialModules,
    ...cdkModules,
  ],
  exports: [
    // Re-export common Angular modules needed by feature modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // Re-export RouterModule

    // Re-export Material & CDK modules
    ...materialModules,
    ...cdkModules,

    // Export shared components
    ConfigCardComponent,
    // ConfirmDialogComponent,
  ],
})
export class SharedModule {}
