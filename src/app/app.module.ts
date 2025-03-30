import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import Animations
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Layout Components
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

// Import Angular Material Modules needed by Layout
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// SharedModule will be imported later if needed globally, but not required yet

@NgModule({
  declarations: [
    AppComponent,
    // Layout Components are automatically declared by CLI here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Add Animations module
    HttpClientModule, // Add HttpClientModule

    // Material Modules for Layout
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MainLayoutComponent, // Import standalone component
    ToolbarComponent,
    SidenavComponent,
  ],
  providers: [
    provideClientHydration(), // Included by default with SSR setup
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
