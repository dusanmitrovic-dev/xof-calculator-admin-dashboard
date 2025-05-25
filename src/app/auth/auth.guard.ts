import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust path if needed
import { Observable, map, take } from 'rxjs';

/**
 * Functional Route Guard: AuthGuard
 *
 * Protects routes that require user authentication.
 * Redirects unauthenticated users to the login page.
 */
export const authGuard: CanActivateFn = (route, state): 
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  // Inject AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Option 1: Use the synchronous check (if AuthService maintains state reliably)
  /*
  if (authService.isLoggedIn()) {
    return true; // Allow access if user is logged in
  } else {
    console.log('AuthGuard: User not logged in, redirecting to /login');
    // Redirect to login page, preserving attempted URL in query params (optional)
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
  */

  // Option 2: Use the observable for potentially asynchronous state updates
  // This is generally safer as it waits for the current auth state
  return authService.isAuthenticated$.pipe(
    take(1), // Take the latest value and complete
    map(isAuthenticated => {
      if (isAuthenticated) {
        // console.log('AuthGuard: User is authenticated. Access granted.');
        return true; // Allow access
      } else {
        console.log('AuthGuard: User not authenticated, redirecting to /login');
        // Redirect to login page
        // Optional: Add queryParams to redirect back after login
        // return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        return router.createUrlTree(['/login']);
      }
    })
  );
};
