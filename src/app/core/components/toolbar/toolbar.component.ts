import { Component, inject, signal } from '@angular/core'; // Removed OnInit, OnDestroy
import { CommonModule } from '@angular/common';
// Removed Subscription import
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ThemeService } from '../../services/theme.service'; // Import ThemeService

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatMenuModule } from '@angular/material/menu'; 

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'] // Keep as CSS for now
})
export class ToolbarComponent { // Removed OnInit, OnDestroy
  private authService = inject(AuthService);
  private themeService = inject(ThemeService); // Inject ThemeService
  private router = inject(Router);

  isLoggedIn = this.authService.isAuthenticated;
  userRole = this.authService.currentUserRole;
  
  // Use the signal directly from the ThemeService
  isDarkMode = this.themeService.isDarkMode; 

  // Removed ngOnInit and ngOnDestroy
  // Removed theme state logic (toggleTheme, updateTheme)

  // Wrapper function to call service method
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}
