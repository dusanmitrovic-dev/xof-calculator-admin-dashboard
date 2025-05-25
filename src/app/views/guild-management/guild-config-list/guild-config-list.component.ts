import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

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
import { GuildService } from '../../../services/guild.service'; // Import GuildService

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

  // Guild Members and Roles State
  guildMembersMap: { [id: string]: string } = {};
  guildRolesMap: { [id: string]: string } = {};
  loadingGuildData: boolean = false;
  guildDataError: string | null = null;

  // Modal State
  isConfigEditModalVisible: boolean = false;
  currentEditSection: string = 'full'; // Default to 'full' for creating or general edit

  constructor(
    private router: Router,
    private guildConfigService: GuildConfigService,
    private authService: AuthService,
    private guildService: GuildService // Inject GuildService
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
           this.loadingGuildData = false; // Also reset guild data loading
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
    this.loadGuildMembersAndRoles(guildId); // Load guild members and roles
  }

  resetState(): void {
      console.log('GuildConfigListComponent: Resetting state.');
      this.guildConfig = null;
      this.loadingConfig = true;
      this.configError = null;
      this.guildMembersMap = {}; // Reset members map
      this.guildRolesMap = {}; // Reset roles map
      this.loadingGuildData = true; // Reset guild data loading
      this.guildDataError = null; // Reset guild data error
      this.isConfigEditModalVisible = false;
      this.currentEditSection = 'full'; // Reset edit section
  }

  loadGuildConfig(id: string): void {
    console.log(`GuildConfigListComponent: Loading config for guild ${id}...`);
    this.loadingConfig = true;
    this.configError = null;
    this.guildConfigService.getGuildConfig(id).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
         console.error(`GuildConfigListComponent: Error loading config for guild ${id}:`, err);
         if (err.status === 404 || err?.message?.includes('not found')) {
              this.configError = null;
              this.guildConfig = null;
              console.log(`GuildConfigListComponent: No config found for guild ${id}.`);
         } else {
             this.configError = err.message || `Failed to load configuration for guild ${id}.`;
         }
         this.loadingConfig = false;
         return of(null); // Return an observable of null to continue the stream
      })
    ).subscribe((config) => {
       if (config) {
         this.guildConfig = config;
         console.log(`GuildConfigListComponent: Config loaded for guild ${id}:`, config);
       }
       this.loadingConfig = false;
    });
  }

  loadGuildMembersAndRoles(guildId: string): void {
      console.log(`GuildConfigListComponent: Loading members and roles for guild ${guildId}...`);
      this.loadingGuildData = true;
      this.guildDataError = null;
      forkJoin([
          this.guildService.getGuildMembers(guildId).pipe(catchError(err => {
              console.error('Error loading guild members:', err);
              this.guildDataError = 'Failed to load guild members.';
              return of([]); // Return empty array on error
          })),
          this.guildService.getGuildRoles(guildId).pipe(catchError(err => {
              console.error('Error loading guild roles:', err);
              this.guildDataError = 'Failed to load guild roles.';
              return of([]); // Return empty array on error
          }))
      ]).pipe(takeUntil(this.destroy$))
      .subscribe(([members, roles]) => {
          this.guildMembersMap = members.reduce((map, member) => {
              map[member.id] = member.display_name || member.name; // Prefer display name
              return map;
          }, {} as { [id: string]: string });
          this.guildRolesMap = roles.reduce((map, role) => {
              map[role.id] = role.name;
              return map;
          }, {} as { [id: string]: string });
          this.loadingGuildData = false;
          console.log('GuildConfigListComponent: Guild members and roles loaded.', this.guildMembersMap, this.guildRolesMap);
      });
  }

  getMemberDisplayName(memberId: string): string {
      return this.guildMembersMap[memberId] || memberId; // Return ID if name not found
  }

  getRoleName(roleId: string): string {
      return this.guildRolesMap[roleId] || roleId; // Return ID if name not found
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
      this.loadDataForGuild(this.currentGuildId); // Reload all data including members/roles
    } else {
      console.log('GuildConfigListComponent: Config modal closed without saving.');
    }
  }

  getCommissionRoles(): { [roleId: string]: any } | null {
      return this.guildConfig?.commission_settings?.roles ?? null;
  }
}