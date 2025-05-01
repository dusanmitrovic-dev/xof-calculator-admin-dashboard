import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service'; // Verify path
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,
  SpinnerComponent // Added SpinnerComponent back for loading indication
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink, // For the register link
    AlertComponent,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    IconDirective,
    ButtonDirective,
    SpinnerComponent // Added SpinnerComponent import
  ]
})
export class LoginComponent {

  // Use ngModel for two-way data binding in the template
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Handles the login form submission.
   */
  handleLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    console.log('Login Component: Attempting login for', this.loginData.email);
    this.isLoading = true;
    this.errorMessage = null;

    // Call the AuthService login method
    this.authService.login(this.loginData).subscribe({
      next: (isLoggedIn) => {
        this.isLoading = false;
        if (isLoggedIn) {
          console.log('Login Component: Login successful, navigating to dashboard...');
          // Navigate to the main dashboard or a default route upon success
          this.router.navigate(['/dashboard']);
        } else {
          console.warn('Login Component: Login failed (AuthService returned false).');
          // The AuthService already logs detailed errors, provide a user-friendly message
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      },
      error: (error) => {
        // Although AuthService returns false on API error now, catch potential network/unexpected errors
        this.isLoading = false;
        console.error('Login Component: Unexpected error during login:', error);
        this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      }
    });
  }
}
