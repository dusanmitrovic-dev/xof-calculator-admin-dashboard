import { Routes } from '@angular/router';
import { GuildConfigListComponent } from './guild-config-list/guild-config-list.component';

export const routes: Routes = [
  {
    path: '',
    component: GuildConfigListComponent,
    data: {
      title: 'Guild Configurations'
    }
  }
];
