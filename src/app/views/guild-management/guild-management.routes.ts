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

/*
LOG:
---
Date: 2023-10-27
Change: Added route for Guild Configuration Detail view with a guildId parameter.
File: src/app/views/guild-management/guild-management.routes.ts
Reason: To enable navigation to a specific guild's configuration page.
---*/