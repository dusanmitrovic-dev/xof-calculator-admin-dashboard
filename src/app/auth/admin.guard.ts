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

    if (this.authService.isAuthenticated() && userRole === 'admin') {
      return true;
    } else {
      // Redirect to dashboard or an unauthorized page if not admin
      // We'll redirect to dashboard for now.
      return this.router.createUrlTree(['/dashboard']);
    }
  }
}

/*
LOG:
---
Date: 2023-10-27
Change: Created AdminGuard to protect admin-only routes.
File: src/app/auth/admin.guard.ts
Reason: To restrict access to administrative sections of the application.
---*/
