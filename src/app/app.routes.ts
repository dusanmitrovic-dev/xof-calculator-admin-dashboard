import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './auth/auth.guard';
import { PublicGuard } from './auth/public.guard';
import { AdminGuard } from './auth/admin.guard'; // Import AdminGuard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Redirect root path to dashboard (if logged in)
    pathMatch: 'full'
  },
  {
    // Routes accessible only when logged in (under the main layout)
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard], // Protect the whole layout and its children
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'guild-management', // Route for managing specific guild configs/earnings
        loadChildren: () => import('./views/guild-management/guild-management.routes').then((m) => m.routes)
        // AuthGuard is already applied by the parent, individual routes inside might need further checks if manager specific
      },
      {
        path: 'user-management', // Route for managing users (Admin only)
        // FIX: Uncomment loadChildren
        loadChildren: () => import('./views/user-management/user-management.routes').then((m) => m.routes),
        canActivate: [AdminGuard], // Protect this route specifically for Admins
        data: {
          title: 'User Management' // Add title for navigation
        }
      },
      // Add other authenticated routes here (e.g., profile settings)
    ]
  },
  {
    // Public routes (Login, Register, Forgot Password, etc.)
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [PublicGuard], // Prevent logged-in users from accessing login
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    canActivate: [PublicGuard], // Prevent logged-in users from accessing register
    data: {
      title: 'Register Page'
    }
  },
  {
    // Error Pages (should ideally be accessible without login)
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  // Wildcard route: Redirect any unmatched paths to the dashboard (if logged in) or login (if not)
  // The AuthGuard on the main layout handles the logged-in check implicitly.
  // If not logged in, AuthGuard redirects to login. If logged in, but path doesn't match child routes, 
  // this wildcard might catch it, but a specific 404 within the layout might be better.
  // Let's redirect to 404 for now, assuming 404 component is styled appropriately.
  { path: '**', redirectTo: '404' } 
];
