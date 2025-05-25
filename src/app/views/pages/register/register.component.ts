import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,
  AlertComponent
  // SpinnerComponent REMOVED - Unused
} from '@coreui/angular';
import { AuthService } from '../../../auth/auth.service'; // Verify path

// Custom validator for password match
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Avoid validation if controls aren't present or untouched
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
    ReactiveFormsModule, // For FormGroup, formControlName
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
    AlertComponent     // For displaying messages
    // SpinnerComponent REMOVED - Unused
  ]
})
export class RegisterComponent {

  // Reactive Form definition
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]), // Example: Enforce min length
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator });

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Handles the registration form submission. Renamed to match template.
   */
  onSubmit() { // Renamed from handleRegistration to match template (ngSubmit)="onSubmit()"
    this.registerForm.markAllAsTouched();
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordMismatch'] && this.confirmPassword?.touched) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        this.errorMessage = 'Please correct the errors in the form.';
      }
      console.log('Register Component: Form is invalid.', this.registerForm.errors);
      return;
    }

    this.isLoading = true;
    const { email, password } = this.registerForm.value;

    if (!email || !password) {
        this.isLoading = false;
        this.errorMessage = 'Email or password missing unexpectedly.';
        console.error('Register Component: Email or password missing after form validation passed.');
        return;
    }

    this.authService.register({ email, password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Register Component: Registration successful:', response);
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = null;
        this.registerForm.reset();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'An unexpected error occurred during registration.';
        this.successMessage = null;
        console.error('Register Component: Registration error:', error);
      }
    });
  }

  // Helper getters for easier access in the template
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}
