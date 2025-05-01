import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userRole = this.authService.getUserRole();

    // Check if authenticated (using isLoggedIn) and has admin role
    // Use isLoggedIn() for synchronous check
    if (this.authService.isLoggedIn() && userRole === 'admin') { 
      return true; // Allow access
    } else {
      // Redirect to dashboard or an unauthorized page if not admin
      console.warn('AdminGuard: Access denied. User not admin or not logged in.');
      return this.router.createUrlTree(['/dashboard']);
    }
  }
}
