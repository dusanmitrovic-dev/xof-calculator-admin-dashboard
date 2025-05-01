import { CommonModule, JsonPipe } from '@angular/common'; // Import CommonModule & JsonPipe
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink for navigation links
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

// Import CoreUI modules needed for the list view
import {
  AlertModule,
  ButtonModule,
  CardModule,
  GridModule,
  SpinnerModule,
  TableModule, // For displaying the list in a table
  ModalModule, // For the edit/create modal
  UtilitiesModule // For text utilities etc.
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular'; // Import IconDirective

import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';
import { AuthService } from '../../../auth/auth.service'; // Keep AuthService if needed for permissions

// Import the modal component
import { GuildConfigEditModalComponent } from '../guild-config-edit-modal/guild-config-edit-modal.component';

@Component({
  selector: 'app-guild-config-list', // Changed selector to reflect list nature
  templateUrl: './guild-config-list.component.html',
  standalone: true,
  imports: [
    CommonModule, // Includes ngIf, ngFor, etc.
    RouterLink,
    GridModule,
    AlertModule,
    CardModule,
    SpinnerModule,
    ButtonModule,
    TableModule,   // For <c-table>
    ModalModule,
    IconDirective, // For <c-icon>
    UtilitiesModule,
    JsonPipe,      // For potentially displaying complex fields like commission_settings
    GuildConfigEditModalComponent // Import the modal component
  ]
  // styleUrls: ['./guild-config-list.component.scss'], // Uncomment if you have styles
})
export class GuildConfigListComponent implements OnInit, OnDestroy {

  // Data for the list
  guildConfigs: GuildConfig[] = [];

  // State
  isLoading: boolean = true;
  errorMessage: string | null = null;

  // Modal State
  isConfigEditModalVisible: boolean = false;
  selectedConfigForEdit: GuildConfig | null = null; // Holds data for modal
  modalMode: 'create' | 'edit' = 'create'; // To control modal behavior

  // Helpers
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router, // Keep router for potential navigation
    private guildConfigService: GuildConfigService,
    private authService: AuthService // Keep AuthService if needed for role checks etc.
  ) { }

  ngOnInit(): void {
    this.loadAllGuildConfigs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fetches all guild configurations from the service.
   */
  loadAllGuildConfigs(): void {
    console.log('GuildConfigListComponent: Loading all guild configs...');
    this.isLoading = true;
    this.errorMessage = null;
    this.guildConfigService.getAllGuildConfigs().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (configs) => {
        this.guildConfigs = configs;
        this.isLoading = false;
        console.log('GuildConfigListComponent: Guild configs loaded:', configs);
      },
      error: (err) => {
        console.error('GuildConfigListComponent: Error loading guild configs:', err);
        this.errorMessage = err.message || 'Failed to load configurations.';
        this.isLoading = false;
      }
    });
  }

  // --- Modal Handling ---

  /**
   * Opens the modal in 'create' mode.
   */
  openCreateConfigModal(): void {
    this.selectedConfigForEdit = null; // No existing data for create mode
    this.modalMode = 'create';
    this.isConfigEditModalVisible = true;
    console.log('GuildConfigListComponent: Opening modal in create mode');
  }

  /**
   * Opens the modal in 'edit' mode with the selected config data.
   * @param config The GuildConfig object to edit.
   */
  openEditConfigModal(config: GuildConfig): void {
    // Pass a deep copy to the modal to avoid modifying the list directly before saving
    this.selectedConfigForEdit = JSON.parse(JSON.stringify(config));
    this.modalMode = 'edit';
    this.isConfigEditModalVisible = true;
    console.log(`GuildConfigListComponent: Opening modal in edit mode for guild ${config.guild_id}`);
  }

  /**
   * Handles the save event emitted from the modal.
   * @param savedConfig The config data returned from the modal.
   */
  handleConfigSaved(savedConfig: GuildConfig | null): void {
    this.isConfigEditModalVisible = false;
    if (savedConfig) {
        console.log('GuildConfigListComponent: Config saved event received. Reloading list.');
        // TODO: Add success toast notification
        this.loadAllGuildConfigs(); // Reload the list to show changes/new item
    } else {
        console.log('GuildConfigListComponent: Modal closed without saving.');
    }
  }

  /**
   * Handles the close event emitted from the modal.
   */
  handleModalClosed(): void {
    this.isConfigEditModalVisible = false;
    this.selectedConfigForEdit = null; // Clear selected config when modal closes
    console.log('GuildConfigListComponent: Modal closed event received.');
  }

  // --- Delete Action ---

  /**
   * Deletes a guild configuration after confirmation.
   * @param config The GuildConfig object to delete.
   */
  deleteGuildConfig(config: GuildConfig): void {
    if (!config.guild_id) {
        console.error("GuildConfigListComponent: Cannot delete config - Guild ID missing.");
        this.errorMessage = "Cannot delete config: Guild ID missing.";
        return;
    }

    // Use a simple confirm for now, replace with a proper UI confirmation later
    if (confirm(`Are you sure you want to delete the configuration for Guild ${config.guild_id} (${config.display_settings?.agency_name || 'No Name'})? This is irreversible!`)) {
      this.isLoading = true; // Optionally show loading state during delete
      this.guildConfigService.deleteGuildConfig(config.guild_id).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(`GuildConfigListComponent: Configuration for guild ${config.guild_id} deleted successfully.`, response);
          // TODO: Add success toast notification
          this.loadAllGuildConfigs(); // Reload the list
        },
        error: (err) => {
          this.isLoading = false;
          console.error(`GuildConfigListComponent: Error deleting config for guild ${config.guild_id}:`, err);
          this.errorMessage = err.message || 'Failed to delete configuration.';
          // TODO: Add error toast notification
        }
      });
    }
  }
}
