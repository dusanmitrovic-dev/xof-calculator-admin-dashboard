import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, AlertComponent } from '@coreui/angular'; // Added AlertComponent
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink

// Custom validator for password match
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null; // Don't validate if controls are not available
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true, // Add standalone: true
    imports: [
      CommonModule, // Add CommonModule
      RouterLink, // Add RouterLink for the [routerLink] directive
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
      ReactiveFormsModule, // Keep ReactiveFormsModule
      AlertComponent // Added AlertComponent here
    ]
})
export class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]), // Added username based on HTML
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator }); // Apply custom validator to the group

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    // Mark all controls as touched to show validation errors
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      // Destructure to get the required fields
      const { username, email, password } = this.registerForm.value;

      // Ensure values are not null/undefined before sending
      if (username && email && password) {
        this.authService.register(username, email, password).subscribe({
          next: (success) => {
            if (success) {
              this.successMessage = 'Registration successful! You can now log in.';
              this.errorMessage = null;
              this.registerForm.reset(); // Clear the form
              // Optionally navigate to login page after a short delay
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            } else {
              // Handle registration failure from backend (e.g., username/email taken)
              this.errorMessage = 'Registration failed. Please try again.'; // Generic message
              this.successMessage = null;
            }
          },
          error: (error) => {
            // Handle HTTP error
            this.errorMessage = error.error?.message || 'An error occurred during registration.';
            this.successMessage = null;
            console.error('Registration error:', error);
          }
        });
      } else {
        // Should not happen if form is valid, but good practice to check
        this.errorMessage = 'Form data is incomplete.';
        this.successMessage = null;
      }
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      this.successMessage = null;
      if (this.registerForm.errors?.['passwordMismatch']) {
        this.errorMessage = 'Passwords do not match.';
      }
    }
  }
}
