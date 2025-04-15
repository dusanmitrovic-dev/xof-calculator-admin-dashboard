import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Import Angular Material Modules needed
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
// import { NgxToastrService } from 'ngx-toastr'; // Import if using Toastr

// Custom Validator for password match
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Don't validate if controls aren't present or haven't been interacted with yet
  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordsMismatch: true };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Updated extension
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  // private toastr = inject(NgxToastrService); // Inject if using

  registerForm!: FormGroup;
  isLoading = signal(false);
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  registerError = signal<string | null>(null);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator // Apply custom validator at the group level
    });
  }

  // Form getters for easier template access
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.registerError.set(null);
    // Only send email and password to the backend
    const { email, password } = this.registerForm.value;

    this.authService.register({ email, password }).subscribe({
      next: (success) => {
        this.isLoading.set(false);
        if (success) {
          console.log('Registration successful, navigating...');
          // Navigate to dashboard after successful registration and login
          this.router.navigate(['/dashboard']); // Adjust target route as needed
          // this.toastr.success('Registration Successful! Logged In.');
        } else {
          // Handle case where registration returns false but no HTTP error
          this.registerError.set('Registration failed. Please try again.');
          // this.toastr.error('Registration failed. Please try again.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Registration error:', err);
        const message = err?.error?.msg || 'An unexpected error occurred during registration.';
        this.registerError.set(message);
        // this.toastr.error(message);
      }
    });
  }
}
