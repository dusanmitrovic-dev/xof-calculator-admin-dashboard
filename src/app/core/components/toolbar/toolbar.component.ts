import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; // For tooltips
import { MatMenuModule } from '@angular/material/menu'; // For potential user menu

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
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = this.authService.isAuthenticated; // Use the signal directly
  userRole = this.authService.currentUserRole; // Use the signal

  // Theme state (basic example - could be a dedicated service)
  isDarkMode = signal(false);

  ngOnInit() {
    // Initialize theme based on preference or default
    // This is a basic example; a more robust solution would use localStorage
    // and potentially a dedicated ThemeService
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark));
    this.updateTheme();
  }

  ngOnDestroy() {
    // Cleanup if needed (e.g., unsubscribing if signals weren't used)
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme(): void {
    if (this.isDarkMode()) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  logout(): void {
    this.authService.logout();
    // Navigation is handled within authService.logout()
  }
}
