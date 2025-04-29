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
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          // Handle login failure (e.g., show error message)
          console.error('Login failed');
        }
      },
      error: (error) => {
        // Handle login error (e.g., show error message)
        console.error('Login error:', error);
      }
    });
  }
}
