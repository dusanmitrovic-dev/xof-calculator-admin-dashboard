import { CommonModule, CurrencyPipe } from '@angular/common'; // Removed JsonPipe
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators'; // Removed unused operators
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
// Assuming Earning interface has models as string[] | undefined
import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';
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
    CurrencyPipe, // JsonPipe removed
    GuildConfigEditModalComponent,
    EarningEditModalComponent
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

  // Earnings State
  earnings: Earning[] = [];
  loadingEarnings: boolean = false; 
  earningsError: string | null = null;

  // Modal State
  isConfigEditModalVisible: boolean = false;
  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  // Make Array.isArray available to the template
  isArray = Array.isArray;

  constructor(
    private router: Router,
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
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

  loadEarnings(id: string): void {
    console.log(`GuildConfigListComponent: Loading earnings for guild ${id}...`);
    this.loadingEarnings = true;
    this.earningsError = null;
    this.earningsService.getGuildEarnings(id).pipe(
        takeUntil(this.destroy$)
    ).subscribe({
        next: (earningsData: Earning[]) => {
            this.earnings = earningsData;
            this.loadingEarnings = false;
            console.log(`GuildConfigListComponent: Earnings loaded for guild ${id}:`, earningsData);
        },
        error: (err: any) => {
            console.error(`GuildConfigListComponent: Error loading earnings for guild ${id}:`, err);
            if (err.status === 404 || err?.message?.includes('not found')) {
                 this.earningsError = null; 
                 this.earnings = []; 
                 console.log(`GuildConfigListComponent: No earnings found for guild ${id}.`);
            } else {
                this.earningsError = err.message || `Failed to load earnings for guild ${id}.`;
            }
            this.loadingEarnings = false;
        }
    });
  }

  openEditConfigModal(): void {
    if (!this.currentGuildId) return;
    this.isConfigEditModalVisible = true;
    console.log(`GuildConfigListComponent: Opening config edit modal for guild ${this.currentGuildId}`);
  }

  deleteGuildConfig(): void {
    if (!this.currentGuildId) { 
        console.error("Cannot delete config - Guild ID missing.");
        this.configError = "Cannot delete config: Select a guild first.";
        return;
    }

    if (confirm(`Are you sure you want to delete the entire configuration for Guild ${this.currentGuildId}? This will also delete associated earnings records and is irreversible!`)) {
      this.loadingConfig = true;
      this.guildConfigService.deleteGuildConfig(this.currentGuildId).subscribe({
        next: () => {
          this.loadingConfig = false;
          console.log(`GuildConfigListComponent: Configuration for guild ${this.currentGuildId} deleted successfully.`);
          this.guildConfig = null;
          this.earnings = [];
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
      this.loadGuildConfig(this.currentGuildId); 
    } else {
      console.log('GuildConfigListComponent: Config modal closed without saving.');
    }
  }

  openAddEarningModal(): void {
      if (!this.currentGuildId) return;
      this.selectedEarningForEdit = null; 
      this.isEarningModalVisible = true;
      console.log(`GuildConfigListComponent: Opening earning modal in add mode for guild ${this.currentGuildId}`);
  }

  openEditEarningModal(earning: Earning): void {
      if (!this.currentGuildId) return;
      this.selectedEarningForEdit = { ...earning }; 
      this.isEarningModalVisible = true;
      console.log(`GuildConfigListComponent: Opening earning modal in edit mode for earning ID ${earning.id}`);
  }

  deleteEarning(earning: Earning): void {
      if (!this.currentGuildId || !earning.id) { 
          console.error("Cannot delete earning - Guild ID or Earning ID missing.");
          this.earningsError = "Cannot delete earning: Missing required ID.";
          return;
      }
      if (confirm(`Are you sure you want to delete the earning record from ${earning.date} for user ${earning.user_mention}?`)) {
          this.loadingEarnings = true; 
          this.earningsService.deleteEarning(this.currentGuildId, earning.id).subscribe({
              next: () => {
                  console.log(`GuildConfigListComponent: Earning record ${earning.id} deleted successfully.`);
                  if (this.currentGuildId) {
                      this.loadEarnings(this.currentGuildId); 
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
          this.loadEarnings(this.currentGuildId); 
      } else {
          console.log('GuildConfigListComponent: Earning modal closed without saving.');
      }
  }

  getCommissionRoles(): { [roleId: string]: any } | null {
      return this.guildConfig?.commission_settings?.roles ?? null;
  }
}
