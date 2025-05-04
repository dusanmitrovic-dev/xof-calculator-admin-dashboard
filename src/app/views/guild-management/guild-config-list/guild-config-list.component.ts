import { CommonModule, JsonPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; // Removed ActivatedRoute
import { Subject, Observable } from 'rxjs';
import { takeUntil, switchMap, catchError, tap, filter } from 'rxjs/operators';
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
  UtilitiesModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

// Import services and interfaces
import { GuildConfigService, GuildConfig, CommissionSettings } from '../../../services/guild-config.service';
import { EarningsService, Earning } from '../../../services/earnings.service';
import { AuthService } from '../../../auth/auth.service'; // Keep if needed for permissions

// Import the modal components
import { GuildConfigEditModalComponent } from '../guild-config-edit-modal/guild-config-edit-modal.component';
import { EarningEditModalComponent } from '../earning-edit-modal/earning-edit-modal.component';

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
    JsonPipe,
    CurrencyPipe,
    GuildConfigEditModalComponent,
    EarningEditModalComponent
  ]
})
export class GuildConfigListComponent implements OnInit, OnDestroy {

  // Component State
  selectedGuildId$: Observable<string | null>;
  currentGuildId: string | null = null; // Store current ID for actions
  private destroy$ = new Subject<void>();

  // Guild Config State
  guildConfig: GuildConfig | null = null;
  loadingConfig: boolean = false; // Initially false, true when loading
  configError: string | null = null;

  // Earnings State
  earnings: Earning[] = [];
  loadingEarnings: boolean = false; // Initially false, true when loading
  earningsError: string | null = null;

  // Modal State
  isConfigEditModalVisible: boolean = false;
  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  constructor(
    // Removed ActivatedRoute
    private router: Router,
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
    private authService: AuthService // Keep if needed for permissions
  ) {
    this.selectedGuildId$ = this.guildConfigService.selectedGuildId$;
  }

  // Helper for template to iterate over object keys
  objectKeys = Object.keys;

  ngOnInit(): void {
    console.log('GuildConfigListComponent: Initializing...');
    this.selectedGuildId$.pipe(
      takeUntil(this.destroy$),
      tap(guildId => {
        console.log('GuildConfigListComponent: Selected Guild ID changed:', guildId);
        this.currentGuildId = guildId; // Store the current ID
        this.resetState(); // Reset state whenever guild changes
        if (guildId) {
          this.loadDataForGuild(guildId);
        } else {
           // Handle case where no guild is selected
           this.loadingConfig = false;
           this.loadingEarnings = false;
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
    this.loadEarnings(guildId);
  }

  resetState(): void {
      console.log('GuildConfigListComponent: Resetting state.');
      // Keep currentGuildId as is
      this.guildConfig = null;
      this.loadingConfig = true; // Set to true when starting load
      this.configError = null;
      this.earnings = [];
      this.loadingEarnings = true; // Set to true when starting load
      this.earningsError = null;
      this.isConfigEditModalVisible = false;
      this.isEarningModalVisible = false;
      this.selectedEarningForEdit = null;
  }

  loadGuildConfig(id: string): void {
    console.log(`GuildConfigListComponent: Loading config for guild ${id}...`);
    this.loadingConfig = true;
    this.configError = null;
    this.guildConfigService.getGuildConfig(id).pipe(
      takeUntil(this.destroy$) // Ensure subscription is cleaned up if component destroyed during request
    ).subscribe({
      next: (config) => {
        this.guildConfig = config;
        this.loadingConfig = false;
        console.log(`GuildConfigListComponent: Config loaded for guild ${id}:`, config);
      },
      error: (err: any) => {
        console.error(`GuildConfigListComponent: Error loading config for guild ${id}:`, err);
        // Distinguish between 404 (no config) and other errors
        if (err.status === 404 || err?.message?.includes('not found')) {
             this.configError = null; // Not an error, just no config exists
             this.guildConfig = null; // Ensure config is null
             console.log(`GuildConfigListComponent: No config found for guild ${id}.`);
        } else {
            this.configError = err.message || `Failed to load configuration for guild ${id}.`;
        }
        this.loadingConfig = false;
      }
    });
  }

  loadEarnings(id: string): void {
    console.log(`GuildConfigListComponent: Loading earnings for guild ${id}...`);
    this.loadingEarnings = true;
    this.earningsError = null;
    this.earningsService.getGuildEarnings(id).pipe( // Assuming this method exists in EarningsService
        takeUntil(this.destroy$)
    ).subscribe({
        next: (earningsData: Earning[]) => {
            this.earnings = earningsData;
            this.loadingEarnings = false;
            console.log(`GuildConfigListComponent: Earnings loaded for guild ${id}:`, earningsData);
        },
        error: (err: any) => {
            console.error(`GuildConfigListComponent: Error loading earnings for guild ${id}:`, err);
             // Distinguish between 404 (no earnings) and other errors
            if (err.status === 404 || err?.message?.includes('not found')) {
                 this.earningsError = null; // Not an error, just no earnings found
                 this.earnings = []; // Ensure earnings is empty
                 console.log(`GuildConfigListComponent: No earnings found for guild ${id}.`);
            } else {
                this.earningsError = err.message || `Failed to load earnings for guild ${id}.`;
            }
            this.loadingEarnings = false;
        }
    });
  }

  // --- Config Modal Methods ---
  openEditConfigModal(): void {
    if (!this.currentGuildId) return; // Use stored currentGuildId
    // Config might be null if not yet created, handle this in modal or here
    // if (!this.guildConfig) {
    //    // Maybe initialize a default config structure to pass?
    //    console.log(`GuildConfigListComponent: No existing config for ${this.currentGuildId}, opening modal in create mode.`);
    // }
    this.isConfigEditModalVisible = true;
    console.log(`GuildConfigListComponent: Opening config edit modal for guild ${this.currentGuildId}`);
  }

  deleteGuildConfig(): void {
    if (!this.currentGuildId) { // Use stored currentGuildId
        console.error("Cannot delete config - Guild ID missing.");
        this.configError = "Cannot delete config: Select a guild first.";
        return;
    }

    if (confirm(`Are you sure you want to delete the entire configuration for Guild ${this.currentGuildId}? This will also delete associated earnings records and is irreversible!`)) {
      this.loadingConfig = true; // Show loading indicator during delete
      this.guildConfigService.deleteGuildConfig(this.currentGuildId).subscribe({
        next: () => {
          this.loadingConfig = false;
          console.log(`GuildConfigListComponent: Configuration for guild ${this.currentGuildId} deleted successfully.`);
          // Reset state after successful delete
          this.guildConfig = null;
          this.earnings = [];
          this.configError = "Configuration deleted successfully.";
          // Optionally trigger a refresh or notification
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
      this.loadGuildConfig(this.currentGuildId); // Reload config for the current guild
    } else {
      console.log('GuildConfigListComponent: Config modal closed without saving.');
    }
  }

  // --- Earning Modal Methods ---
  openAddEarningModal(): void {
      if (!this.currentGuildId) return; // Use stored currentGuildId
      this.selectedEarningForEdit = null; // Ensure it's in 'add' mode
      this.isEarningModalVisible = true;
      console.log(`GuildConfigListComponent: Opening earning modal in add mode for guild ${this.currentGuildId}`);
  }

  openEditEarningModal(earning: Earning): void {
      if (!this.currentGuildId) return; // Use stored currentGuildId
      this.selectedEarningForEdit = { ...earning }; // Clone earning to avoid modifying original object directly
      this.isEarningModalVisible = true;
      console.log(`GuildConfigListComponent: Opening earning modal in edit mode for earning ID ${earning.id}`);
  }

  deleteEarning(earning: Earning): void {
      if (!this.currentGuildId || !earning.id) { // Use stored currentGuildId
          console.error("Cannot delete earning - Guild ID or Earning ID missing.");
          this.earningsError = "Cannot delete earning: Missing required ID.";
          return;
      }
      if (confirm(`Are you sure you want to delete the earning record from ${earning.date} for user ${earning.user_mention}?`)) {
          this.loadingEarnings = true; // Show loading indicator
          this.earningsService.deleteEarning(this.currentGuildId, earning.id).subscribe({
              next: () => {
                  console.log(`GuildConfigListComponent: Earning record ${earning.id} deleted successfully.`);
                  if (this.currentGuildId) {
                      this.loadEarnings(this.currentGuildId); // Reload earnings on success
                  } else {
                      this.loadingEarnings = false;
                  }
              },
              error: (err: any) => {
                  console.error(`GuildConfigListComponent: Error deleting earning ${earning.id}:`, err);
                  this.earningsError = err.message || 'Failed to delete earning record.';
                  this.loadingEarnings = false;
              }
          });
      }
  }

  onEarningSaved(savedEarning: Earning | null): void {
      this.isEarningModalVisible = false;
      if (savedEarning && this.currentGuildId) {
          console.log('GuildConfigListComponent: Earning saved event received. Reloading earnings.');
          this.loadEarnings(this.currentGuildId); // Reload earnings for the current guild
      } else {
          console.log('GuildConfigListComponent: Earning modal closed without saving.');
      }
  }

  // Helper to access commission settings roles safely
  getCommissionRoles(): { [roleId: string]: any } | null {
      return this.guildConfig?.commission_settings?.roles ?? null;
  }
}
