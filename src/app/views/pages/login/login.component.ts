import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent,
  FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective
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
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective, // Corrected import back to Directive
    FormControlDirective, // Corrected import for cFormControl
    IconDirective,
    ButtonDirective
  ]
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    console.log('Attempting login with:', this.username); // Log attempt
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        console.log('Login service call returned:', success); // Log success value
        if (success) {
          console.log('Login successful, navigating to dashboard...');
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Login failed (AuthService returned false)');
          // TODO: Show user-friendly error message here
          alert('Login failed. Please check your credentials.'); // Simple alert for now
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        // TODO: Show user-friendly error message here based on error content
        alert(`Login error: ${error.message || 'Unknown error'}`); // Simple alert
      }
    });
  }
}
