import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink
import { AuthService } from '../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AlertComponent, 
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective
  // Removed SpinnerComponent as it's reported unused in the template
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
    RouterLink, // Add RouterLink here
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
    // Removed SpinnerComponent from imports
  ]
})
export class LoginComponent {

  email!: string; 
  password!: string;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    console.log('Attempting login with email:', this.email); 
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        console.log('Login service call returned:', success);
        if (success) {
          console.log('Login successful, navigating to dashboard...');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Login failed (AuthService returned false)');
          this.errorMessage = 'Login failed. Please check your email and password.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage = error.message || 'An unexpected error occurred during login.';
      }
    });
  }
}
