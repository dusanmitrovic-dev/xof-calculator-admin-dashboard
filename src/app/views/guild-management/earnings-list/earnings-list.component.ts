import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

// CoreUI Modules
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

// Services and Interfaces
import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service'; // To get selected guild and its config
import { EarningsService, Earning } from '../../../services/earnings.service';
import { AuthService } from '../../../auth/auth.service';

// Modal Component
import { EarningEditModalComponent } from '../earning-edit-modal/earning-edit-modal.component';

@Component({
  selector: 'app-earnings-list',
  templateUrl: './earnings-list.component.html',
  // styleUrls: ['./earnings-list.component.scss'], // Add if you create a SCSS file
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
    EarningEditModalComponent
  ]
})
export class EarningsListComponent implements OnInit, OnDestroy {

  selectedGuildId$: Observable<string | null>;
  currentGuildId: string | null = null;
  guildConfig: GuildConfig | null = null; // Store guild config to check if earnings can be added/loaded
  private destroy$ = new Subject<void>();

  earnings: Earning[] = [];
  loadingEarnings: boolean = false;
  earningsError: string | null = null;
  loadingConfig: boolean = false; // For fetching the related guild config

  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  isArray = Array.isArray; // Helper for template
  objectKeys = Object.keys; // Helper for template, if needed

  constructor(
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
    private authService: AuthService // Keep if user permissions affect earnings view/actions
  ) {
    this.selectedGuildId$ = this.guildConfigService.selectedGuildId$;
  }

  ngOnInit(): void {
    this.selectedGuildId$.pipe(
      takeUntil(this.destroy$),
      tap(guildId => {
        this.currentGuildId = guildId;
        this.resetState();
        if (guildId) {
          this.loadInitialData(guildId);
        } else {
          this.loadingEarnings = false;
          this.loadingConfig = false;
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetState(): void {
    this.earnings = [];
    this.guildConfig = null;
    this.loadingEarnings = true;
    this.loadingConfig = true;
    this.earningsError = null;
    this.isEarningModalVisible = false;
    this.selectedEarningForEdit = null;
  }

  loadInitialData(guildId: string): void {
    this.loadingConfig = true;
    this.guildConfigService.getGuildConfig(guildId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (config) => {
        this.guildConfig = config;
        this.loadingConfig = false;
        if (config) { // Only load earnings if config exists
          this.loadEarnings(guildId);
        } else {
          this.loadingEarnings = false; // No config, so no earnings to load
          this.earningsError = 'Guild configuration must exist to manage earnings.';
        }
      },
      error: (err) => {
        this.guildConfig = null;
        this.loadingConfig = false;
        this.loadingEarnings = false;
        this.earningsError = 'Failed to load guild configuration. Earnings cannot be managed.';
        console.error(`EarningsListComponent: Error loading config for guild ${guildId}:`, err);
      }
    });
  }

  loadEarnings(guildId: string): void {
    this.loadingEarnings = true;
    this.earningsError = null;
    this.earningsService.getGuildEarnings(guildId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (earningsData: Earning[]) => {
        // --- ADDED CONSOLE LOG ---
        console.log('[EarningsListComponent] Received earnings data:', earningsData);
        // --- END CONSOLE LOG ---
        this.earnings = earningsData;
        this.loadingEarnings = false;
      },
      error: (err: any) => {
        // Log the raw error as well
        console.error('[EarningsListComponent] Error loading earnings:', err);
        if (err.status === 404 || err?.message?.includes('not found')) {
          this.earningsError = null; // Don't show error for 404
          this.earnings = [];
        } else {
          this.earningsError = err.message || `Failed to load earnings for guild ${guildId}.`;
        }
        this.loadingEarnings = false;
      }
    });
  }

  openAddEarningModal(): void {
    if (!this.currentGuildId || !this.guildConfig) { // Ensure config exists before adding earning
        this.earningsError = "A guild configuration must exist before adding earnings.";
        return;
    }
    this.selectedEarningForEdit = null;
    this.isEarningModalVisible = true;
  }

  openEditEarningModal(earning: Earning): void {
    if (!this.currentGuildId) return;
    this.selectedEarningForEdit = { ...earning };
    this.isEarningModalVisible = true;
  }

  deleteEarning(earning: Earning): void {
    if (!this.currentGuildId || !earning.id) {
      this.earningsError = "Cannot delete earning: Missing required ID.";
      return;
    }
    if (confirm(`Are you sure you want to delete the earning record from ${earning.date} for user ${earning.user_mention}?`)) {
      this.loadingEarnings = true;
      this.earningsService.deleteEarning(this.currentGuildId, earning.id).subscribe({
        next: () => {
          if (this.currentGuildId) {
            this.loadEarnings(this.currentGuildId);
          } else {
            this.loadingEarnings = false;
          }
        },
        error: (err: any) => {
          this.earningsError = err.message || 'Failed to delete earning record.';
          this.loadingEarnings = false;
        }
      });
    }
  }

  onEarningSaved(savedEarning: Earning | null): void {
    this.isEarningModalVisible = false;
    if (savedEarning && this.currentGuildId) {
      this.loadEarnings(this.currentGuildId);
    }
  }
}
