import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust path if needed
import { Observable, map, take } from 'rxjs';

/**
 * Functional Route Guard: AdminGuard
 *
 * Protects routes that require administrator privileges.
 * Checks if the logged-in user has the 'admin' role.
 * Redirects non-admin users to a default route (e.g., dashboard).
 */
export const adminGuard: CanActivateFn = (route, state):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  // Inject AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // First, check if the user is authenticated at all using the observable
  return authService.isAuthenticated$.pipe(
    take(1), // Take the latest value
    map(isAuthenticated => {
      if (!isAuthenticated) {
        // If not even authenticated, redirect to login
        console.log('AdminGuard: User not authenticated, redirecting to /login');
        return router.createUrlTree(['/login']);
      }

      // If authenticated, check the role (synchronously, as the role is available from the decoded token)
      const userRole = authService.getUserRole();
      // console.log(`AdminGuard: Checking role. User Role: ${userRole}`);

      if (userRole === 'admin') {
        // console.log('AdminGuard: Admin access granted.');
        return true; // Allow access if user is admin
      } else {
        console.warn(`AdminGuard: Access denied. User role '${userRole}' is not 'admin'. Redirecting.`);
        // If authenticated but not admin, redirect to dashboard or an unauthorized page
        return router.createUrlTree(['/dashboard']); // Or perhaps a dedicated /unauthorized route
      }
    })
  );
};
