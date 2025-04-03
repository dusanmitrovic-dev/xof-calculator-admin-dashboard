import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'; // Import Shared

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

// Required Material Modules for this Feature
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'; // Example if using grid
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Added for loading

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    SharedModule, // Use SharedModule for CommonModule, CurrencyPipe, etc.
    DashboardRoutingModule,
    // Import necessary Material modules here
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule, // Added
  ],
})
export class DashboardModule {}
