import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service'; // Verify path
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
import { CommonModule } from '@angular/common';
import {
  AlertComponent,
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective
  // SpinnerComponent REMOVED - Unused
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Required for ngModel and ngForm
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
    ButtonDirective
    // SpinnerComponent REMOVED - Unused
  ]
})
export class LoginComponent {

  // Properties to bind with ngModel in the template
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Handles the login form submission, triggered by (ngSubmit).
   * Accepts the NgForm instance if needed for validation status, etc.
   */
  login(loginForm: NgForm): void { // Changed method name to match template
    if (loginForm.invalid) { // Optional: Basic form validity check
        this.errorMessage = 'Please fill in all required fields.';
        return;
    }

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    console.log('Login Component: Attempting login for', this.email);
    this.isLoading = true;
    this.errorMessage = null;

    // Create the credentials object from component properties
    const credentials = { email: this.email, password: this.password };

    // Call the AuthService login method
    this.authService.login(credentials).subscribe({
      next: (isLoggedIn) => {
        this.isLoading = false;
        if (isLoggedIn) {
          console.log('Login Component: Login successful, navigating to dashboard...');
          // Navigate to the main dashboard or a default route upon success
          this.router.navigate(['/dashboard']);
        } else {
          console.warn('Login Component: Login failed (AuthService returned false).');
          // The AuthService logs detailed errors, provide a user-friendly message
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      },
      error: (error) => {
        // Catch potential network/unexpected errors
        this.isLoading = false;
        console.error('Login Component: Unexpected error during login:', error);
        this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      }
    });
  }
}
