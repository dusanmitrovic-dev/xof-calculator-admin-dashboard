import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,
  AlertComponent, SpinnerComponent // Added SpinnerComponent
} from '@coreui/angular';
import { AuthService } from '../../../auth/auth.service'; // Verify path

// Custom validator for password match
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Avoid validation if controls aren't present
  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule, // For FormGroup, FormControlName
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective, // Used with formControlName
    ButtonDirective,
    AlertComponent,     // For displaying messages
    SpinnerComponent    // For loading indicator
  ]
})
export class RegisterComponent {

  // Reactive Form definition
  registerForm = new FormGroup({
    // We only need email and password for registration based on AuthService
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator });

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Handles the registration form submission.
   */
  handleRegistration() {
    this.registerForm.markAllAsTouched(); // Mark fields to show validation errors
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) {
      // Check for specific password mismatch error
      if (this.registerForm.errors?.['passwordMismatch'] && this.confirmPassword?.touched) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        this.errorMessage = 'Please correct the errors in the form.';
      }
      return; // Stop submission if form is invalid
    }

    this.isLoading = true;
    const { email, password } = this.registerForm.value;

    // Ensure values are not null/undefined before proceeding (shouldn't happen if valid)
    if (!email || !password) {
        this.isLoading = false;
        this.errorMessage = 'Email or password missing unexpectedly.';
        return;
    }

    // Call the AuthService register method
    this.authService.register({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Register Component: Registration successful:', response);
        // Assuming backend responds successfully (e.g., 201 Created)
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = null;
        this.registerForm.reset(); // Clear the form

        // Redirect to login page after a short delay for message visibility
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // 2 seconds delay
      },
      error: (error) => {
        this.isLoading = false;
        // Display the error message provided by AuthService's error handler
        this.errorMessage = error.message || 'An unexpected error occurred during registration.';
        this.successMessage = null;
        console.error('Register Component: Registration error:', error);
      }
    });
  }

  // Helper getters for easier access in the template (for validation state)
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}
