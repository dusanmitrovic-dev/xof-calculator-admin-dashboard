import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

// Import CoreUI modules
import {
  AlertModule,
  ButtonModule,
  CardModule,
  GridModule,
  SpinnerModule,
  TableModule,
  ModalModule,
  UtilitiesModule,
  BadgeModule // Import BadgeModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

// Import services and interfaces
import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';
import { AuthService } from '../../../auth/auth.service';

// Import the modal components
import { GuildConfigEditModalComponent } from '../guild-config-edit-modal/guild-config-edit-modal.component';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-guild-config-list',
  templateUrl: './guild-config-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    AlertModule,
    CardModule,
    SpinnerModule,
    ButtonModule,
    TableModule,
    ModalModule,
    IconDirective,
    UtilitiesModule,
    CurrencyPipe,
    GuildConfigEditModalComponent,
    BadgeModule // Add BadgeModule here
  ]
})
export class GuildConfigListComponent implements OnInit, OnDestroy {

  // Component State
  selectedGuildId$: Observable<string | null>;
  currentGuildId: string | null = null;
  private destroy$ = new Subject<void>();

  // Guild Config State
  guildConfig: GuildConfig | null = null;
  loadingConfig: boolean = false;
  configError: string | null = null;

  // Modal State
  isConfigEditModalVisible: boolean = false;
  currentEditSection: string = 'full'; // Default to 'full' for creating or general edit

  constructor(
    private router: Router,
    private guildConfigService: GuildConfigService,
    private authService: AuthService
  ) {
    this.selectedGuildId$ = this.guildConfigService.selectedGuildId$;
  }

  objectKeys = Object.keys;

  ngOnInit(): void {
    console.log('GuildConfigListComponent: Initializing...');
    this.selectedGuildId$.pipe(
      takeUntil(this.destroy$),
      tap(guildId => {
        console.log('GuildConfigListComponent: Selected Guild ID changed:', guildId);
        this.currentGuildId = guildId;
        this.resetState();
        if (guildId) {
          this.loadDataForGuild(guildId);
        } else {
           this.loadingConfig = false;
           console.log('GuildConfigListComponent: No guild selected.');
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    console.log('GuildConfigListComponent: Destroying...');
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDataForGuild(guildId: string): void {
    console.log(`GuildConfigListComponent: Loading data for guild ${guildId}`);
    this.loadGuildConfig(guildId);
  }

  resetState(): void {
      console.log('GuildConfigListComponent: Resetting state.');
      this.guildConfig = null;
      this.loadingConfig = true;
      this.configError = null;
      this.isConfigEditModalVisible = false;
      this.currentEditSection = 'full'; // Reset edit section
  }

  loadGuildConfig(id: string): void {
    console.log(`GuildConfigListComponent: Loading config for guild ${id}...`);
    this.loadingConfig = true;
    this.configError = null;
    this.guildConfigService.getGuildConfig(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (config) => {
        this.guildConfig = config;
        this.loadingConfig = false;
        console.log(`GuildConfigListComponent: Config loaded for guild ${id}:`, config);
      },
      error: (err: any) => {
        console.error(`GuildConfigListComponent: Error loading config for guild ${id}:`, err);
        if (err.status === 404 || err?.message?.includes('not found')) {
             this.configError = null;
             this.guildConfig = null;
             console.log(`GuildConfigListComponent: No config found for guild ${id}.`);
        } else {
            this.configError = err.message || `Failed to load configuration for guild ${id}.`;
        }
        this.loadingConfig = false;
      }
    });
  }

  openEditConfigModal(section: string = 'full'): void {
    if (!this.currentGuildId) {
      console.error("Cannot open config edit modal - Guild ID missing.");
      this.configError = "Cannot edit config: Select a guild first.";
      return;
    }

    // Ensure guildConfig is loaded before attempting to open modal for a specific section
    if (!this.guildConfig && section !== 'full') {
       console.warn(`Attempted to open section '${section}' without loaded guild config.`);
       // Optionally show a loading state or error, or load the config first
       // For now, we'll rely on prepareFormForMode handling null config
    }

    this.currentEditSection = section;
    // Pass the currently loaded guildConfig to the modal component
    // This ensures the modal component receives existing data when opened for a specific section
    this.isConfigEditModalVisible = true; // This triggers the modal's ngOnChanges

    console.log(`GuildConfigListComponent: Opening config edit modal for guild ${this.currentGuildId}, section: ${section}`);
  }


  deleteGuildConfig(): void {
    if (!this.currentGuildId) {
        console.error("Cannot delete config - Guild ID missing.");
        this.configError = "Cannot delete config: Select a guild first.";
        return;
    }
    if (confirm(`Are you sure you want to delete the entire configuration for Guild ${this.currentGuildId}? This is irreversible!`)) {
      this.loadingConfig = true;
      this.guildConfigService.deleteGuildConfig(this.currentGuildId).subscribe({
        next: () => {
          this.loadingConfig = false;
          console.log(`GuildConfigListComponent: Configuration for guild ${this.currentGuildId} deleted successfully.`);
          this.guildConfig = null;
          this.configError = "Configuration deleted successfully.";
        },
        error: (err: any) => {
          this.loadingConfig = false;
          console.error(`GuildConfigListComponent: Error deleting config for guild ${this.currentGuildId}:`, err);
          this.configError = err.message || 'Failed to delete configuration.';
        }
      });
    }
  }

  onConfigSaved(savedConfig: GuildConfig | null): void {
    this.isConfigEditModalVisible = false;
    if (savedConfig && this.currentGuildId) {
      console.log('GuildConfigListComponent: Config saved event received. Reloading config.');
      // Reload the full config after saving any section
      this.loadGuildConfig(this.currentGuildId);
    } else {
      console.log('GuildConfigListComponent: Config modal closed without saving.');
    }
  }

  getCommissionRoles(): { [roleId: string]: any } | null {
      return this.guildConfig?.commission_settings?.roles ?? null;
  }
}