import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

// Import CoreUI modules
import {
  AlertModule,
  ButtonModule,
  CardModule,
  GridModule,
  SpinnerModule,
  TableModule,
  ModalModule
} from '@coreui/angular';

import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';
import { EarningsService, Earning } from '../../../services/earnings.service';
import { AuthService } from '../../../auth/auth.service';

// Import Custom Modal Components (Assuming paths relative to this file)
import { GuildConfigEditModalComponent } from '../guild-config-edit-modal/guild-config-edit-modal.component';
import { EarningEditModalComponent } from '../earning-edit-modal/earning-edit-modal.component';

@Component({
  selector: 'app-guild-config-view',
  templateUrl: './guild-config-list.component.html',
  standalone: true, // Make component standalone
  imports: [ // Add imports array
    CommonModule, // Include CommonModule for *ngIf, *ngFor, pipes (json, currency)
    GridModule, // For c-row, c-col
    AlertModule, // For c-alert
    CardModule, // For c-card, c-card-header, c-card-body
    SpinnerModule, // For c-spinner
    ButtonModule, // For c-button
    TableModule, // For c-table related elements if any are implicitly used or for consistency
    ModalModule, // Often needed if modals use CoreUI modal directives internally
    GuildConfigEditModalComponent, // Import the custom modal component
    EarningEditModalComponent, // Import the custom earning modal component
  ]
  // styleUrls: ['./guild-config-list.component.scss'], // Uncomment if you have styles
})
export class GuildConfigListComponent implements OnInit, OnDestroy {

  // Data
  guildConfig: GuildConfig | null = null;
  earnings: Earning[] = [];
  guildId: string | null = null;

  // State
  loadingConfig: boolean = true;
  loadingEarnings: boolean = true;
  configError: string | null = null;
  earningsError: string | null = null;

  // Modal States
  isConfigEditModalVisible: boolean = false;
  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  // Helpers
  objectKeys = Object.keys;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
    private authService: AuthService // Keep AuthService if needed for permissions etc.
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      tap(params => {
        const newGuildId = params.get('guildId');
        if (newGuildId !== this.guildId) { // Only reload if guildId changes
             this.guildId = newGuildId;
             console.log('Guild ID from route:', this.guildId);
             this.resetState();
             if (this.guildId) {
                 this.loadGuildConfig(this.guildId);
                 this.loadGuildEarnings(this.guildId);
             } else {
                 this.handleMissingGuildId();
             }
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetState(): void {
      console.log('Resetting component state for guild:', this.guildId);
      this.guildConfig = null;
      this.earnings = [];
      this.configError = null;
      this.earningsError = null;
      this.loadingConfig = true;
      this.loadingEarnings = true;
      this.isConfigEditModalVisible = false;
      this.isEarningModalVisible = false;
      this.selectedEarningForEdit = null;
  }

  handleMissingGuildId(): void {
      this.configError = 'No Guild ID provided in the route.';
      this.earningsError = 'No Guild ID provided in the route.';
      this.loadingConfig = false;
      this.loadingEarnings = false;
      // Consider navigating away or showing a clearer message
      // this.router.navigate(['/dashboard']);
  }

  // --- Data Loading ---
  loadGuildConfig(id: string): void {
    this.loadingConfig = true;
    this.configError = null;
    this.guildConfigService.getGuildConfig(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      // Make sure GuildConfig type definition matches the actual data structure
      next: (config) => { this.guildConfig = config; this.loadingConfig = false; },
      error: (err) => { console.error('Error loading guild config:', err); this.configError = err.message || 'Failed to load configuration.'; this.loadingConfig = false; }
    });
  }

  loadGuildEarnings(id: string): void {
    this.loadingEarnings = true;
    this.earningsError = null;
    this.earningsService.getGuildEarnings(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (earnings) => { this.earnings = earnings; this.loadingEarnings = false; },
      error: (err) => { console.error('Error loading earnings:', err); this.earningsError = err.message || 'Failed to load earnings.'; this.loadingEarnings = false; }
    });
  }

  // --- Config Modal ---
  openEditConfigModal(): void {
     if (!this.guildConfig) return; // Guard against null config
     this.isConfigEditModalVisible = true;
  }

  // Type the event if the modal component emits a specific type
  onConfigSaved(savedConfig: GuildConfig): void {
    this.guildConfig = savedConfig;
    this.isConfigEditModalVisible = false;
    // TODO: Show success toast
    console.log('Config saved:', savedConfig);
    // Optionally reload config if underlying data might have changed more than provided
    // if (this.guildId) this.loadGuildConfig(this.guildId);
  }

  // --- Earning Modal ---
  openAddEarningModal(): void {
     if (!this.guildId) return;
     this.selectedEarningForEdit = null;
     this.isEarningModalVisible = true;
  }

  openEditEarningModal(earning: Earning): void {
     this.selectedEarningForEdit = { ...earning }; // Pass a copy to avoid direct modification
     this.isEarningModalVisible = true;
  }

  // Type the event if the modal component emits a specific type
  onEarningSaved(savedEarning: Earning): void { // Use 'any' or the actual emitted type
     console.log('Earning saved event received:', savedEarning);
     if (this.guildId) {
         this.loadGuildEarnings(this.guildId); // Reload the list
     } else {
          console.error("Cannot reload earnings: Guild ID missing.");
     }
     this.isEarningModalVisible = false;
     // TODO: Show success toast
  }

  // --- Delete Actions ---
  deleteEarning(earning: Earning): void {
     if (!this.guildId || !earning.id) {
         console.error("Missing Guild ID or Earning ID for deletion.");
         return;
     }
     // TODO: Replace confirm with a UI component confirmation
     if (confirm(`Are you sure you want to delete the earning record from ${earning.date}?`)) {
        this.earningsService.deleteEarningByCustomId(earning.id).subscribe({
          next: () => {
             console.log(`Earning ${earning.id} deleted successfully.`);
             if (this.guildId) this.loadGuildEarnings(this.guildId); // Reload
             // TODO: Show success toast
          },
          error: (err) => {
             console.error('Error deleting earning:', err);
             this.earningsError = err.message || 'Failed to delete earning.';
             // TODO: Show error toast
          }
       });
     }
  }

  deleteGuildConfig(): void {
    if (!this.guildConfig || !this.guildConfig.guild_id) {
        console.error("Missing Guild Config or Guild ID for deletion.");
        return;
    }
    const guildId = this.guildConfig.guild_id;
    // TODO: Replace confirm with a UI component confirmation
    if (confirm(`Are you sure you want to delete the entire configuration for Guild ${guildId}? This is irreversible!`)) {
      this.guildConfigService.deleteGuildConfig(guildId).subscribe({
        next: () => {
          console.log(`Configuration for guild ${guildId} deleted successfully.`);
          this.router.navigate(['/dashboard']); // Navigate away after deletion
          // TODO: Show success toast (might need slight delay or different mechanism if navigating away)
        },
        error: (err) => {
          console.error('Error deleting guild configuration:', err);
          this.configError = err.message || 'Failed to delete configuration.';
           // TODO: Show error toast
        }
      });
    }
  }
}
