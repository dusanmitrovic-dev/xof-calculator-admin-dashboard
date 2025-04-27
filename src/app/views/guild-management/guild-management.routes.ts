import { Routes } from '@angular/router';
import { GuildConfigListComponent } from './guild-config-list/guild-config-list.component';
import { GuildConfigDetailComponent } from './guild-config-detail/guild-config-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: GuildConfigListComponent,
    data: {
      title: 'Guild Configurations'
    }
  },
  {
    path: ':guildId',
    component: GuildConfigDetailComponent, // Placeholder component
    data: {
      title: 'Guild Configuration Detail'
    }
  }
];
