import { CommonModule, JsonPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, catchError, tap } from 'rxjs/operators';
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
import { AuthService } from '../../../auth/auth.service';

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
  guildId: string | null = null;
  private destroy$ = new Subject<void>();

  // Guild Config State
  guildConfig: GuildConfig | null = null;
  loadingConfig: boolean = true;
  configError: string | null = null;

  // Earnings State
  earnings: Earning[] = [];
  loadingEarnings: boolean = true;
  earningsError: string | null = null;

  // Modal State
  isConfigEditModalVisible: boolean = false;
  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
    private authService: AuthService
  ) {}

  // Helper for template to iterate over object keys
  objectKeys = Object.keys;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      tap(params => {
        this.guildId = params.get('guildId');
        console.log('GuildConfigListComponent: Guild ID from route:', this.guildId);
        this.resetState();
      }),
      switchMap(params => {
        const id = params.get('guildId');
        if (id) {
          this.loadGuildConfig(id);
          this.loadEarnings(id);
          return [];
        } else {
          this.loadingConfig = false;
          this.loadingEarnings = false;
          this.configError = 'No Guild ID provided in the route.';
          console.error('GuildConfigListComponent: No Guild ID found.');
          return [];
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetState(): void {
      this.guildConfig = null;
      this.loadingConfig = true;
      this.configError = null;
      this.earnings = [];
      this.loadingEarnings = true;
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
      takeUntil(this.destroy$)
    ).subscribe({
      next: (config) => {
        this.guildConfig = config;
        this.loadingConfig = false;
        console.log(`GuildConfigListComponent: Config loaded for guild ${id}:`, config);
      },
      error: (err: any) => { // Added type :any for now
        console.error(`GuildConfigListComponent: Error loading config for guild ${id}:`, err);
        if (err.status === 404) {
            this.configError = null;
            this.guildConfig = null;
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
    // Updated method name based on typical service structure
    this.earningsService.getGuildEarnings(id).pipe(
        takeUntil(this.destroy$)
    ).subscribe({
        // Add explicit type for earningsData
        next: (earningsData: Earning[]) => {
            this.earnings = earningsData;
            this.loadingEarnings = false;
            console.log(`GuildConfigListComponent: Earnings loaded for guild ${id}:`, earningsData);
        },
        // Add explicit type for err
        error: (err: any) => {
            console.error(`GuildConfigListComponent: Error loading earnings for guild ${id}:`, err);
            this.earningsError = err.message || `Failed to load earnings for guild ${id}.`;
            this.loadingEarnings = false;
        }
    });
}

  // --- Config Modal Methods ---
  openEditConfigModal(): void {
    if (!this.guildConfig) return;
    this.isConfigEditModalVisible = true;
    console.log(`GuildConfigListComponent: Opening config edit modal for guild ${this.guildId}`);
  }

  deleteGuildConfig(): void {
    if (!this.guildConfig || !this.guildId) {
        console.error("Cannot delete config - Guild ID or config data missing.");
        this.configError = "Cannot delete config: Guild ID or config data missing.";
        return;
    }

    if (confirm(`Are you sure you want to delete the entire configuration for Guild ${this.guildId}? This will also delete associated earnings records and is irreversible!`)) {
      this.loadingConfig = true;
      this.guildConfigService.deleteGuildConfig(this.guildId).subscribe({
        next: () => {
          this.loadingConfig = false;
          console.log(`GuildConfigListComponent: Configuration for guild ${this.guildId} deleted successfully.`);
          this.guildConfig = null;
          this.earnings = [];
          this.configError = "Configuration deleted successfully.";
        },
        // Add explicit type for err
        error: (err: any) => {
          this.loadingConfig = false;
          console.error(`GuildConfigListComponent: Error deleting config for guild ${this.guildId}:`, err);
          this.configError = err.message || 'Failed to delete configuration.';
        }
      });
    }
  }

  onConfigSaved(savedConfig: GuildConfig | null): void {
    this.isConfigEditModalVisible = false;
    if (savedConfig && this.guildId) {
      console.log('GuildConfigListComponent: Config saved event received. Reloading config.');
      this.loadGuildConfig(this.guildId);
    } else {
      console.log('GuildConfigListComponent: Config modal closed without saving.');
    }
  }

  // --- Earning Modal Methods ---
  openAddEarningModal(): void {
      if (!this.guildId) return;
      this.selectedEarningForEdit = null;
      this.isEarningModalVisible = true;
      console.log(`GuildConfigListComponent: Opening earning modal in add mode for guild ${this.guildId}`);
  }

  openEditEarningModal(earning: Earning): void {
      if (!this.guildId) return;
      this.selectedEarningForEdit = { ...earning };
      this.isEarningModalVisible = true;
      console.log(`GuildConfigListComponent: Opening earning modal in edit mode for earning ID ${earning.id}`);
  }

  deleteEarning(earning: Earning): void {
      if (!this.guildId || !earning.id) {
          console.error("Cannot delete earning - Guild ID or Earning ID missing.");
          this.earningsError = "Cannot delete earning: Missing required ID.";
          return;
      }
      if (confirm(`Are you sure you want to delete the earning record from ${earning.date} for user ${earning.user_mention}?`)) {
          this.loadingEarnings = true;
          // Updated method name based on typical service structure
          this.earningsService.deleteEarning(this.guildId, earning.id).subscribe({
              next: () => {
                  console.log(`GuildConfigListComponent: Earning record ${earning.id} deleted successfully.`);
                  if (this.guildId) {
                      this.loadEarnings(this.guildId);
                  } else {
                      this.loadingEarnings = false;
                  }
              },
              // Add explicit type for err
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
      if (savedEarning && this.guildId) {
          console.log('GuildConfigListComponent: Earning saved event received. Reloading earnings.');
          this.loadEarnings(this.guildId);
      } else {
          console.log('GuildConfigListComponent: Earning modal closed without saving.');
      }
  }

  // Helper to access commission settings roles safely
  getCommissionRoles(): { [roleId: string]: any } | null {
      return this.guildConfig?.commission_settings?.roles ?? null;
  }
}
