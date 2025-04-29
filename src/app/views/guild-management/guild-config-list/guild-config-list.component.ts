import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, ButtonDirective, SpinnerComponent } from '@coreui/angular';
import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../services/user.service'; // Assuming user service is needed to get managed guilds
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

// TODO: Import a component for editing/viewing details, e.g., a modal

@Component({
  selector: 'app-guild-config-list',
  templateUrl: './guild-config-list.component.html',
  // styleUrls: ['./guild-config-list.component.scss'], // Assuming styles exist or remove
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    ButtonDirective,
    SpinnerComponent // For loading indicator
    // TODO: Import modal component if needed
  ]
})
export class GuildConfigListComponent implements OnInit {

  guildConfigs$: Observable<GuildConfig[]> = of([]); // Initialize with empty array observable
  loading: boolean = true;
  errorMessage: string | null = null;
  managedGuildIds: string[] = []; // Store IDs the user manages

  // Assuming a way to get the currently selected/managed Guild ID
  // This might come from a shared service, route param, or user selection
  // For now, let's assume we fetch configs for all managed guilds

  constructor(
    private guildConfigService: GuildConfigService,
    private authService: AuthService,
    private userService: UserService // Inject UserService
  ) { }

  ngOnInit(): void {
    this.loadGuildConfigs();
  }

  loadGuildConfigs(): void {
    this.loading = true;
    this.errorMessage = null;

    // Option 1: If UserService provides managed guild IDs
    this.guildConfigs$ = this.userService.getManagedGuildIds().pipe(
      switchMap(guildIds => {
        if (guildIds && guildIds.length > 0) {
          this.managedGuildIds = guildIds; // Store the IDs
          // Now fetch the config for each guild (This could be inefficient if many guilds)
          // Consider a backend endpoint to get configs for multiple guilds at once
          // For now, let's just fetch the first one as an example or handle multiple fetches
          // Example: Fetch config for the first managed guild
          if (guildIds[0]) {
             return this.guildConfigService.getGuildConfig(guildIds[0]).pipe(
               map(config => [config]), // Wrap single config in an array
               catchError(err => this.handleError(err))
             );
          } else {
             return of([]); // No guilds to fetch config for
          }
        } else {
          // No managed guilds found for the user
          return of([]);
        }
      }),
      catchError(err => this.handleError(err)),
      tap(() => this.loading = false) // Set loading to false after stream completes/errors
    );

    // Option 2: If the config service itself gets all accessible configs (e.g., for admin)
    // This depends on your backend API design for /api/config
    // this.guildConfigs$ = this.guildConfigService.getAllGuildConfigs().pipe(
    //    catchError(err => this.handleError(err)),
    //    tap(() => this.loading = false)
    // );
  }

  private handleError(error: any): Observable<never> {
      console.error('Error loading guild config:', error);
      this.errorMessage = error.message || 'Failed to load guild configurations.';
      this.loading = false;
      return EMPTY; // Return an empty observable to prevent breaking the stream
  }

  editConfig(config: GuildConfig): void {
    console.log('Edit config:', config); // Placeholder
    // TODO: Implement opening an edit modal/form
  }

  deleteConfig(guildId: string): void {
    if (confirm(`Are you sure you want to delete the configuration for guild ${guildId}?`)) {
      this.guildConfigService.deleteGuildConfig(guildId).subscribe({
        next: () => {
          console.log(`Config for guild ${guildId} deleted.`);
          this.loadGuildConfigs(); // Reload the list
          // TODO: Show success message
        },
        error: (err) => {
          console.error('Error deleting config:', err);
          this.errorMessage = err.message || 'Failed to delete configuration.';
          // TODO: Show error message to user
        }
      });
    }
  }
}
