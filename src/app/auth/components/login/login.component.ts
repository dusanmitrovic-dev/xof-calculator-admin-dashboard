import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Import Angular Material Modules needed
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; // Required for *ngIf, etc.
// import { NgxToastrService } from 'ngx-toastr'; // Import Toastr service if installed

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // For linking to register page
    ReactiveFormsModule, // For form handling
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Updated extension
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  // private toastr = inject(NgxToastrService); // Inject Toastr if using it

  loginForm!: FormGroup;
  isLoading = signal(false);
  hidePassword = signal(true);
  loginError = signal<string | null>(null);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation(); // Prevent click from affecting other elements if needed
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Show errors on all fields
      return;
    }

    this.isLoading.set(true);
    this.loginError.set(null);
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (success) => {
        this.isLoading.set(false);
        if (success) {
          console.log('Login successful, navigating...');
          // Navigate based on role or to a default dashboard
          const role = this.authService.getUserRole();
          // Example: Redirect admins to a specific admin area, others to general dashboard
          // const targetRoute = role === 'admin' ? '/admin' : '/dashboard';
          this.router.navigate(['/dashboard']); // Adjust target route as needed
          // this.toastr.success('Login Successful!'); // Example toastr message
        } else {
          // Handle case where login returns false but no HTTP error (e.g., backend logic)
          this.loginError.set('Login failed. Please check your credentials.');
          // this.toastr.error('Login failed. Please check your credentials.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Login error:', err);
        // More specific error message based on backend response if available
        const message = err?.error?.msg || 'An unexpected error occurred. Please try again.';
        this.loginError.set(message);
        // this.toastr.error(message);
      }
    });
  }
}
