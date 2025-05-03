import { Routes } from '@angular/router';

// Import the components used in these routes
import { GuildConfigListComponent } from './guild-config-list/guild-config-list.component';
import { EarningsListComponent } from './earnings-list/earnings-list.component'; // Import the new component

export const routes: Routes = [
  {
    // Path to list all available Guild Configurations (the refactored list view)
    path: 'configs',
    component: GuildConfigListComponent,
    data: {
      title: 'Guild Configurations'
    }
  },
  {
    // Path to view/manage earnings for a specific guild
    // Takes guildId as a route parameter
    path: 'earnings/:guildId',
    component: EarningsListComponent,
    data: {
      title: 'Guild Earnings' // Title can be updated dynamically in the component
    }
  },
  {
    // Default route for /guild-management
    // Redirects to the configurations list
    path: '',
    redirectTo: 'configs',
    pathMatch: 'full'
  }
];
