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

    // Check if authenticated and has admin role
    if (this.authService.isAuthenticated() && userRole === 'admin') {
      return true; // Allow access
    } else {
      // Redirect to dashboard or an unauthorized page if not admin
      // Redirecting to dashboard as a default unauthorized access page
      return this.router.createUrlTree(['/dashboard']);
    }
  }
}
