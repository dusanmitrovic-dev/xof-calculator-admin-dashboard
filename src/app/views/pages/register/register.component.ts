import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

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
    imports: [
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
      ReactiveFormsModule // Add ReactiveFormsModule here
    ]
})
export class RegisterComponent {

  registerForm = new FormGroup({
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
      // Destructure to exclude confirmPassword
      const { email, password } = this.registerForm.value;

      this.authService.register({ email, password }).subscribe(
        (response) => {
          // Assuming successful registration returns a token or success message
          // If it returns a token, you might want to log them in automatically
          // For now, let's assume success means they can now go to login
          this.successMessage = 'Registration successful! You can now log in.';
          this.errorMessage = null;
          this.registerForm.reset(); // Clear the form
          // Optionally navigate to login page after a short delay
          // setTimeout(() => {
          //   this.router.navigate(['/login']);
          // }, 2000);
        },
        (error) => {
          this.errorMessage = error.error.msg || 'Registration failed';
          this.successMessage = null;
          console.error('Registration error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      this.successMessage = null;
    }
  }

}
