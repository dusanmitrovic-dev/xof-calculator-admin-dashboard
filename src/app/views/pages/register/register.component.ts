import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, AlertComponent } from '@coreui/angular';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';

// Custom validator for password match (remains the same)
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
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
      FormControlDirective,
      ButtonDirective,
      ReactiveFormsModule,
      AlertComponent
    ]
})
export class RegisterComponent {

  registerForm = new FormGroup({
    // Removed username FormControl
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator });

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false; // Add loading state

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      this.isLoading = true;
      // Destructure only email and password
      const { email, password } = this.registerForm.value;

      if (email && password) { // Check if values are defined (should be if valid)
        this.authService.register(email, password).subscribe({
          next: (response) => { // Expecting AuthResponse now
            this.isLoading = false;
            // Check if registration itself was successful based on response presence
            // The service already handled the token storage if successful
            if (response && response.token) {
                this.successMessage = 'Registration successful! Redirecting to login...'; // Updated message
                this.errorMessage = null;
                this.registerForm.reset();
                 // Navigate immediately as login is handled by service
                 setTimeout(() => {
                     this.router.navigate(['/login']);
                 }, 1500); // Short delay for message visibility
            } else {
                // This case might occur if the API responds 200/201 but without a token
                this.errorMessage = 'Registration completed, but failed to log in automatically. Please try logging in manually.';
                this.successMessage = null;
                setTimeout(() => {
                     this.router.navigate(['/login']);
                 }, 2500);
            }
          },
          error: (error) => {
            this.isLoading = false;
            // Use the error message provided by the AuthService's handleError
            this.errorMessage = error.message || 'An error occurred during registration.';
            this.successMessage = null;
            console.error('Registration error:', error);
          }
        });
      } else {
        this.isLoading = false;
        this.errorMessage = 'Form data is incomplete.';
      }
    } else {
      this.isLoading = false;
      // Specific check for password mismatch
      if (this.registerForm.errors?.['passwordMismatch']) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        this.errorMessage = 'Please fix the errors in the form.';
      }
      this.successMessage = null;
    }
  }

  // Helper getters for easy access in template validation
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}
