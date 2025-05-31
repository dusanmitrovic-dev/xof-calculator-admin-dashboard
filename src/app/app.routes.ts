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
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        data: { animation: 'DashboardPage' }
      },
      {
        path: 'theme', // Example route
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes),
        data: { animation: 'ThemePage' }
      },
      {
        path: 'guild-configurations', // Updated path
        loadComponent: () =>
          import('./views/guild-management/guild-config-list/guild-config-list.component').then(m => m.GuildConfigListComponent),
        data: { title: 'Guild Configurations', animation: 'GuildConfigPage' }
      },
      {
        path: 'earnings-records', // New path for earnings
        loadComponent: () =>
          import('./views/guild-management/earnings-list/earnings-list.component').then(m => m.EarningsListComponent),
        data: { title: 'Earnings Records', animation: 'EarningsPage' }
      },
      {
        path: 'user-management',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./views/user-management/user-list/user-list.component').then(m => m.UserListComponent),
        data: { title: 'User Management', animation: 'UserManagementPage' }
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),
        data: { animation: 'BasePage' }
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes),
        data: { animation: 'ButtonsPage' }
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes),
        data: { animation: 'FormsPage' }
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes),
        data: { animation: 'IconsPage' }
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes),
        data: { animation: 'NotificationsPage' }
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes),
        data: { animation: 'WidgetsPage' }
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes),
        data: { animation: 'ChartsPage' }
      }
    ]
  },
  {
    path: 'login',
    canActivate: [publicGuard], // Protect login page if user is already authenticated
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page',
      animation: 'LoginPage'
    }
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page',
      animation: 'RegisterPage'
    }
  },
  { path: '**', redirectTo: 'dashboard' } // Wildcard route for a 404 page or redirect
];
