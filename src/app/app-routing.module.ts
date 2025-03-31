import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// Import AuthGuard if implemented
// import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Redirect root path to dashboard inside the main layout
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Routes requiring the main layout (sidenav, toolbar)
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard], // Uncomment when AuthGuard is ready
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'earnings',
        loadChildren: () =>
          import('./features/earnings/earnings.module').then(
            (m) => m.EarningsModule
          ),
      },
      // Add other main routes here
    ],
  },

  // Standalone routes (e.g., Login Page) - Add later if needed
  // { path: 'login', component: LoginComponent },

  // Wildcard route for 404
  { path: '**', redirectTo: '/dashboard' }, // Or a dedicated 404 component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
