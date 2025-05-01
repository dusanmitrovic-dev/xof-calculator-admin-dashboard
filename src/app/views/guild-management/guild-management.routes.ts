import { Routes } from '@angular/router';
import { GuildConfigListComponent } from './guild-config-list/guild-config-list.component'; // Rename this component later if needed

export const routes: Routes = [
  {
    // Route to display management options for a specific guild
    path: ':guildId',
    component: GuildConfigListComponent, // This component will handle displaying/editing for :guildId
    data: {
      title: 'Manage Guild' // Title can be updated dynamically in the component
    }
  },
  {
    // Optional: Add a default path or a selection component if no guildId is provided
    path: '',
    // component: GuildSelectionComponent, // Or redirect to dashboard/first available guild?
    redirectTo: '/dashboard', // Redirect to dashboard if no guild ID is specified
    pathMatch: 'full',
    data: {
      title: 'Select Guild' 
    }
  }
];
