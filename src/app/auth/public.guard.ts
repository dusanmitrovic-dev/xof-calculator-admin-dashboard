import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Use the isLoggedIn() method for a synchronous check
    // If the user IS logged in, redirect them away from public pages (like login/register) to the dashboard
    if (this.authService.isLoggedIn()) {
      console.log('PublicGuard: User already logged in, redirecting to /dashboard');
      return this.router.createUrlTree(['/dashboard']);
    }

    // If the user is NOT logged in, allow access to the public route
    return true;

    /* 
    // Alternative: Use the observable for asynchronous checks
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuth => {
        if (isAuth) {
          // If authenticated, redirect away from public pages (like login) to the dashboard
          console.log('PublicGuard: User is authenticated, redirecting to /dashboard');
          return this.router.createUrlTree(['/dashboard']);
        }
        // If not authenticated, allow access to the public route
        return true;
      })
    );
    */
  }
}
