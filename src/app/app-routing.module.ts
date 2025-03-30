import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'; // Import layout

const routes: Routes = [
  // Redirect root path to dashboard inside the main layout
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Routes requiring the main layout
  {
    path: '',
    component: MainLayoutComponent, // Use MainLayoutComponent here
    // canActivate: [AuthGuard], // Add guard later if needed
    children: [
      // Placeholder routes - will be replaced by lazy-loaded modules
      // { path: 'dashboard', component: PlaceholderDashboardComponent }, // Replace later
      // { path: 'settings', component: PlaceholderSettingsComponent }, // Replace later
      // { path: 'earnings', component: PlaceholderEarningsComponent }  // Replace later
    ],
  },

  // Wildcard route for 404
  { path: '**', redirectTo: '/dashboard' }, // Or a dedicated 404 component
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking', // Recommended for SSR hydration
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
