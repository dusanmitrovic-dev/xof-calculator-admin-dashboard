import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators'; // For observable approach

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Use the signal directly for simpler check
  if (authService.isLoggedIn()) {
    return true;
  }

  // If not logged in, redirect to login page
  console.log('AuthGuard: User not logged in, redirecting to login.');
  // Pass the attempted URL as a query parameter for potential redirect after login
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;

  // --- Alternative using Observable (if AuthService used isAuthenticated$) ---
  // return authService.isAuthenticated$.pipe(
  //   map(isAuthenticated => {
  //     if (isAuthenticated) {
  //       return true;
  //     }
  //     console.log('AuthGuard: User not logged in, redirecting to login.');
  //     router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  //     return false;
  //   })
  // );
};
