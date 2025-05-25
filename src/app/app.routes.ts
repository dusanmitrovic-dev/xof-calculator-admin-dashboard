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
        path: 'guild-configurations', // Updated path
        loadComponent: () =>
          import('./views/guild-management/guild-config-list/guild-config-list.component').then(m => m.GuildConfigListComponent),
        data: { title: 'Guild Configurations' }
      },
      {
        path: 'earnings-records', // New path for earnings
        loadComponent: () =>
          import('./views/guild-management/earnings-list/earnings-list.component').then(m => m.EarningsListComponent),
        data: { title: 'Earnings Records' }
      },
      {
        path: 'user-management',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./views/user-management/user-list/user-list.component').then(m => m.UserListComponent),
        data: { title: 'User Management' }
      },
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
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      }
      // Remove or comment out the old '/guild-management' route if it existed as a separate entry
      // For example:
      // {
      //   path: 'guild-management',
      //   loadChildren: () => import('./views/guild-management/guild-management.module').then(m => m.GuildManagementModule)
      // },
    ]
  },
  {
    path: 'login',
    canActivate: [publicGuard], // Protect login page if user is already authenticated
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' } // Wildcard route for a 404 page or redirect
];
