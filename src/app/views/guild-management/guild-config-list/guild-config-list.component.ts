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
  styleUrls: ['./guild-config-list.component.scss'],
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
  isAdmin: boolean = false;

  // Component State
  selectedGuildId$: Observable<string | null>;
  currentGuildId: string | null = null;
  private destroy$ = new Subject<void>();

  // Guild Config State
  guildConfig: GuildConfig | null = null;
  loadingConfig: boolean = false;
  configError: string | null = null;

  // Guild Members and Roles State
  guildMembersMap: { [id: string]: { displayName: string, username: string } } = {};
  guildRolesMap: { [id: string]: string } = {};
  loadingGuildData: boolean = false;
  guildDataError: string | null = null;
  availableRoles: { id: string, name: string }[] = [];
  availableUsers: { id: string, displayName: string, username: string }[] = [];

  // Modal State
  isConfigEditModalVisible: boolean = false;
  currentEditSection: string = 'full'; // Default to 'full' for creating or general edit

  // Copy to clipboard state
  guildIdCopied: boolean = false;
  copyTimeout: any = null;

  constructor(
    private router: Router,
    private guildConfigService: GuildConfigService,
    private authService: AuthService,
    private guildService: GuildService // Inject GuildService
  ) {
    this.selectedGuildId$ = this.guildConfigService.selectedGuildId$;
    this.isAdmin = this.authService.getUserRole() === 'admin';
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

  private idObjectToSnowflake(id: any): string {
    if (typeof id === 'string') return id;
    if (typeof id === 'object' && id !== null && 'low' in id && 'high' in id) {
      let low = id.low >>> 0;
      let high = id.high >>> 0;
      return ((BigInt(high) << 32n) + BigInt(low)).toString();
    }
    return String(id);
  }

  loadGuildMembersAndRoles(guildId: string): void {
    console.log(`GuildConfigListComponent: Loading members and roles for guild ${guildId}...`);
    console.log(`GuildConfigListComponent: Calling getGuildMembers and getGuildRoles with guildId: ${guildId}`);
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
        console.log('GuildConfigListComponent: Raw members data received:', members);
        console.log('GuildConfigListComponent: Raw roles data received:', roles);
        this.guildMembersMap = members.reduce((map, member) => {
          const key = this.idObjectToSnowflake(member.id);
          map[key] = {
            displayName: member.display_name || member.name,
            username: member.name
          };
          return map;
        }, {} as { [id: string]: { displayName: string, username: string } });
        this.availableUsers = Object.entries(this.guildMembersMap).map(([id, user]) => ({
          id,
          displayName: user.displayName,
          username: user.username
        }));
        this.guildRolesMap = roles.reduce((map, role) => {
          const key = this.idObjectToSnowflake(role.id);
          map[key] = role.name;
          return map;
        }, {} as { [id: string]: string });
        this.availableRoles = Object.entries(this.guildRolesMap).map(([id, name]) => ({ id, name }));
        this.loadingGuildData = false;
        console.log('GuildConfigListComponent: Guild members and roles loaded.', this.guildMembersMap, this.guildRolesMap);
      });
  }

  getMemberDisplayName(memberId: string): string {
    // Handle mention string (e.g., <@1234567890>)
    const mentionMatch = memberId.match(/^<@!?(\d+)>$/);
    let key = memberId;
    if (mentionMatch && mentionMatch[1]) {
      key = mentionMatch[1];
    }
    const member = this.guildMembersMap[key];
    if (member) {
      if (member.displayName && member.username && member.displayName !== member.username) {
        return `${member.displayName} (${member.username})`;
      }
      return member.displayName || member.username;
    }
    return memberId;
  }

  getRoleName(roleId: string): string {
    // Handle mention string (e.g., <@&1234567890>)
    const mentionMatch = roleId.match(/^<@&(\d+)>$/);
    let key = roleId;
    if (mentionMatch && mentionMatch[1]) {
      key = mentionMatch[1];
    }
    return this.guildRolesMap[key] || roleId;
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

  copyGuildId(guildId: string): void {
    if (!guildId) return;
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(guildId).then(() => {
        this.guildIdCopied = true;
        if (this.copyTimeout) clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.guildIdCopied = false;
        }, 1500);
      });
    } else {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = guildId;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.guildIdCopied = true;
        if (this.copyTimeout) clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.guildIdCopied = false;
        }, 1500);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}
