import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthService } from './auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Needed for *ngIf
    RouterOutlet, 
    LayoutComponent // Import LayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard'; // Or your actual app title
  authService = inject(AuthService);

  // Use the signal from AuthService directly in the template
  isLoggedIn = this.authService.isAuthenticated;
}
