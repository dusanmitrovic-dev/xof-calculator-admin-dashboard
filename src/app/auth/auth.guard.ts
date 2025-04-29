import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Use the isLoggedIn() method for a synchronous check
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If not logged in, redirect to login page
    console.log('AuthGuard: User not logged in, redirecting to /login');
    return this.router.createUrlTree(['/login']);

    /* 
    // Alternative: Use the observable for asynchronous checks (more complex)
    return this.authService.isAuthenticated$.pipe(
      take(1), // Take the current value and complete
      map(isAuth => {
        if (isAuth) {
          return true;
        }
        // If not authenticated, redirect to the login page
        console.log('AuthGuard: User not authenticated, redirecting to /login');
        return this.router.createUrlTree(['/login']);
      })
    );
    */
  }
}
