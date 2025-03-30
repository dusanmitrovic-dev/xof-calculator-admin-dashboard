import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveForms

// Material Modules needed by shared components OR commonly used
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

// Components
import { ConfigCardComponent } from './components/config-card/config-card.component';

// Define Material modules to be exported
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
  // Add others as needed
];

@NgModule({
  declarations: [ConfigCardComponent],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [
    // Export components/modules needed by other modules
    ConfigCardComponent,
    // Also re-export common Angular modules & Material modules if used widely
    CommonModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
})
export class SharedModule {}
