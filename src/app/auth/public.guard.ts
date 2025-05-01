import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust path if needed
import { Observable, map, take } from 'rxjs';

/**
 * Functional Route Guard: PublicGuard
 *
 * Protects public routes (like login, register) that should *not* be accessible
 * when a user is already authenticated.
 * Redirects authenticated users to a default logged-in route (e.g., dashboard).
 */
export const publicGuard: CanActivateFn = (route, state): 
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  // Inject AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Option 1: Use the synchronous check
  /*
  if (authService.isLoggedIn()) {
    console.log('PublicGuard: User is already logged in, redirecting to /dashboard');
    // Redirect to the main dashboard or another default route
    return router.createUrlTree(['/dashboard']);
  } else {
    return true; // Allow access if user is not logged in
  }
  */

  // Option 2: Use the observable (safer)
  return authService.isAuthenticated$.pipe(
    take(1), // Take the latest value and complete
    map(isAuthenticated => {
      if (isAuthenticated) {
        console.log('PublicGuard: User is authenticated, redirecting away from public route to /dashboard');
        // If authenticated, redirect away from the public page (e.g., login)
        return router.createUrlTree(['/dashboard']); // Or your primary authenticated route
      } else {
        // console.log('PublicGuard: User is not authenticated. Access granted to public route.');
        return true; // Allow access if not authenticated
      }
    })
  );
};
