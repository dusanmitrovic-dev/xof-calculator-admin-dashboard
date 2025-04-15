import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // First, check if the user is logged in at all (using authGuard logic is redundant here)
  // because Admin routes should always be protected by authGuard *first*.
  // We primarily need to check the role.

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // If logged in but not admin, or not logged in at all
  console.warn('AdminGuard: Access denied. User is not an admin or not logged in.');
  
  // Redirect to a general dashboard or access denied page (or login if not logged in)
  if (!authService.isLoggedIn()) {
     router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  } else {
     // Logged in, but not an admin - maybe redirect to their default dashboard?
     router.navigate(['/dashboard']); // Or maybe an '/access-denied' page
  }
 
  return false;
};
