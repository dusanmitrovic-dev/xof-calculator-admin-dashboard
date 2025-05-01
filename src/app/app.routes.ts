import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

// Import the *functional* guards
import { authGuard } from './auth/auth.guard';
import { publicGuard } from './auth/public.guard'; // Assuming public.guard.ts exports a functional guard
import { adminGuard } from './auth/admin.guard';   // Assuming admin.guard.ts exports a functional guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // Redirect root path to dashboard
    pathMatch: 'full'
  },
  {
    // Authenticated routes within the main application layout
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard], // Use functional authGuard to protect this layout and its children
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'theme', // Example route
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'guild-management', // Guild config/earnings management
        loadChildren: () => import('./views/guild-management/guild-management.routes').then((m) => m.routes),
        // Further role-based activation can be handled within guild-management.routes if needed
      },
      {
        path: 'user-management', // User management (requires admin privileges)
        loadChildren: () => import('./views/user-management/user-management.routes').then((m) => m.routes),
        canActivate: [adminGuard], // Add functional adminGuard for admin-only access
        data: {
          title: 'User Management'
        }
      },
      // Add other authenticated routes here (e.g., charts, widgets, base UI elements)
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
    ]
  },
  {
    // Public routes (Login, Register)
    // These should only be accessible when the user is *not* logged in
    path: '',
    canActivate: [publicGuard], // Use functional publicGuard
    children: [
      {
        path: 'login',
        loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
        data: {
          title: 'Register Page'
        }
      }
    ]
  },
  {
    // Standalone error pages (accessible regardless of login status)
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
  // Wildcard route: Matches any path not defined above.
  // Redirects to the 404 page.
  { path: '**', redirectTo: '404' }
];
