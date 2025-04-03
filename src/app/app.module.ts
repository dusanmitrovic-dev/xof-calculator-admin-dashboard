import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration, // Keep if using SSR/Hydration
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Keep for potential future API use

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout Components are standalone, imported where needed (e.g., routing module or app component)
// Removed direct imports of MainLayoutComponent, ToolbarComponent, SidenavComponent here

// Import Feature Modules (which import SharedModule themselves)
import { SettingsModule } from './features/settings/settings.module';
// DashboardModule and EarningsModule are lazy-loaded via routing

// Core Services are provided in 'root'

@NgModule({
  declarations: [
    AppComponent,
    // Other non-standalone components declared here if any
  ],
  imports: [
    BrowserModule, // Should be imported only once in AppModule
    AppRoutingModule, // Handles routing, including lazy loading features
    BrowserAnimationsModule, // For Angular Material animations
    HttpClientModule, // Keep, might be used later or by libraries

    // Eagerly loaded modules (if any besides AppModule itself)
    // SettingsModule is currently eagerly loaded because it's imported here.
    // If you want Settings also lazy-loaded, remove this import and load it in app-routing.module
     SettingsModule, // This imports SharedModule internally

    // Standalone Components used directly by AppComponent template (if any)
    // MainLayoutComponent is used via routing, not directly here
  ],
  providers: [
     provideClientHydration(), // Keep if using Angular Universal / SSR Hydration
    // Global services could be provided here, but 'providedIn: root' is preferred
  ],
  bootstrap: [AppComponent], // The root component to bootstrap
})
export class AppModule {}
