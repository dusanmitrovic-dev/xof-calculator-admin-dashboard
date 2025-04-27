import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      ContainerComponent,
      RowComponent,
      ColComponent,
      CardGroupComponent,
      TextColorDirective,
      CardComponent,
      CardBodyComponent,
      FormDirective,
      InputGroupComponent,
      InputGroupTextDirective,
      IconDirective,
      FormControlDirective,
      ButtonDirective,
      NgStyle,
      ReactiveFormsModule // Add ReactiveFormsModule here
    ]
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          // Assuming your backend returns a token like { token: '...' }
          localStorage.setItem('token', response.token); // Store the token
          this.router.navigate(['/dashboard']); // Navigate to dashboard on success
        },
        (error) => {
          this.errorMessage = error.error.msg || 'Login failed';
          console.error('Login error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please enter valid email and password.';
    }
  }

}
