import { Routes } from '@angular/router';

export const routes: Routes = [
    // Authentication Routes
    {
        path: 'auth',
        children: [
            {
                path: 'login', 
                // Lazy load the LoginComponent
                loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                // Lazy load the RegisterComponent
                loadComponent: () => import('./auth/components/register/register.component').then(m => m.RegisterComponent)
            },
            // Redirect /auth to /auth/login by default
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    // Placeholder for Dashboard/Main App route (will add later)
    // {
    //     path: 'dashboard',
    //     loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    //     canActivate: [authGuard] // Secure this route later
    // },

    // Redirect base path to login or dashboard depending on auth status (handle in guard or main component later)
    // For now, redirecting to auth/login
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

    // Wildcard route for 404 Not Found (implement component later)
    // { path: '**', component: NotFoundComponent }
    { path: '**', redirectTo: '/auth/login' } // Temporary fallback
];
