import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard'; // Import auth guard
import { adminGuard } from './auth/guards/admin.guard'; // Import admin guard

export const routes: Routes = [
    {
        path: 'auth',
        // Prevent logged-in users from accessing login/register
        // canActivate: [() => !inject(AuthService).isLoggedIn()], // Add later if needed
        children: [
            {
                path: 'login',
                loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./auth/components/register/register.component').then(m => m.RegisterComponent)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },

    // Main Application Routes (Protected by AuthGuard)
    {
        path: '', // Routes within the main layout
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'guild-config', // Or maybe '/guild/:guildId/config' later?
                loadComponent: () => import('./guild-config/guild-config.component').then(m => m.GuildConfigComponent)
            },
            {
                path: 'earnings', // Or maybe '/guild/:guildId/earnings' later?
                loadComponent: () => import('./earnings/earnings.component').then(m => m.EarningsComponent)
            },
            {
                path: 'user-management',
                canActivate: [adminGuard], // Protect with admin guard as well
                loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent)
            },
            // Default route after login - redirect to dashboard
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // Wildcard route - Capture all other routes and redirect to dashboard (if logged in) or login
    // This relies on the authGuard logic
    { path: '**', redirectTo: 'dashboard' }
];
