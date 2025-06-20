import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: {
      // Title is inherited from app.routes.ts or can be set here
      title: 'Manage Users' 
    }
  }
];
