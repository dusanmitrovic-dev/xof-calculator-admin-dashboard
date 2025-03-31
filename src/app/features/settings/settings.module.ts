import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'; // Use SharedModule for common imports

import { SettingsRoutingModule } from './settings-routing.module';
import { CommissionSettingsPageComponent } from './commission-settings-page/commission-settings-page.component';
import { BonusRulesPageComponent } from './bonus-rules-page/bonus-rules-page.component';
import { DisplaySettingsPageComponent } from './display-settings-page/display-settings-page.component';
import { OtherConfigsPageComponent } from './other-configs-page/other-configs-page.component';

// Import ALL Material modules used across ALL settings pages here
// (This is simpler than importing them individually in SharedModule and re-exporting)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CommissionSettingsPageComponent,
    BonusRulesPageComponent,
    DisplaySettingsPageComponent,
    OtherConfigsPageComponent,
  ],
  imports: [
    SharedModule, // Includes CommonModule, ReactiveFormsModule, and Base Material
    SettingsRoutingModule,
    // Feature Specific Material Modules (or import them in SharedModule and re-export)
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
  ],
})
export class SettingsModule {}
