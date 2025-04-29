import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service'; // Assuming AuthService is in ../../auth
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, ButtonDirective } from '@coreui/angular'; // Assuming CoreUI components for table

@Component({
  selector: 'app-guild-config-list',
  templateUrl: './guild-config-list.component.html',
  styleUrls: ['./guild-config-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, ButtonDirective] // Add necessary imports
})
export class GuildConfigListComponent implements OnInit {

  guildIds: string[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchGuilds();
  }

  fetchGuilds(): void {
    this.loading = true;
    this.errorMessage = null;
    // Check if the user is an admin before fetching the list of all guilds
    if (this.authService.getUserRole() === 'admin') {
      this.userService.getAvailableGuildIds().subscribe(
        (ids: any) => {
          this.guildIds = ids;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to load guild IDs.';
          this.loading = false;
          console.error('Error fetching guild IDs:', error);
        }
      );
    } else {
      // For non-admin users (managers), you would typically fetch managed guilds from their user object
      // For now, we'll just show an empty list or a message for non-admins trying to access this (though AdminGuard should prevent this route).
      // If this route is accessible to managers, the backend endpoint should return only their managed guilds.
      // Assuming for now this list is primarily for admin or the endpoint handles filtering.
       this.errorMessage = 'Access denied. Admins only.'; // Or handle based on actual backend response/guard
       this.loading = false;
       console.warn('Attempted to fetch all guild IDs as non-admin.');
    }
  }

}

/*
LOG:
---
Date: 2023-10-27
Change: Modified GuildConfigListComponent to fetch and store available guild IDs using UserService.
File: src/app/views/guild-management/guild-config-list/guild-config-list.component.ts
Reason: To display a list of guilds that the authenticated user can manage.
---*/