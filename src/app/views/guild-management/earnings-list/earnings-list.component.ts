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
  DropdownModule,
  GridModule,
  SpinnerModule,
  TableModule,
  ModalModule,
  UtilitiesModule
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

// Services and Interfaces
import { GuildConfigService, GuildConfig } from '../../../services/guild-config.service';
import { EarningsService, Earning } from '../../../services/earnings.service';
import { AuthService } from '../../../auth/auth.service';

// Modal Component
import { EarningEditModalComponent } from '../earning-edit-modal/earning-edit-modal.component';

@Component({
  selector: 'app-earnings-list',
  templateUrl: './earnings-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    AlertModule,
    CardModule,
    DropdownModule,
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
  guildConfig: GuildConfig | null = null;
  private destroy$ = new Subject<void>();

  earnings: Earning[] = [];
  loadingEarnings: boolean = false;
  earningsError: string | null = null;
  loadingConfig: boolean = false;

  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  isDeleteModalVisible: boolean = false;
  earningToDelete: Earning | null = null;

  isArray = Array.isArray;
  objectKeys = Object.keys;

  constructor(
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
    private authService: AuthService
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
    this.isDeleteModalVisible = false;
    this.earningToDelete = null;
  }

  loadInitialData(guildId: string): void {
    this.loadingConfig = true;
    this.guildConfigService.getGuildConfig(guildId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (config) => {
        this.guildConfig = config;
        this.loadingConfig = false;
        if (config) {
          this.loadEarnings(guildId);
        } else {
          this.loadingEarnings = false;
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
    this.earningsService.getEarningsForGuild(guildId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (earningsData: Earning[]) => {
        this.earnings = earningsData;
        this.loadingEarnings = false;
      },
      error: (err: any) => {
        console.error('[EarningsListComponent] Error loading earnings:', err);
        if (err.status === 404 || err?.message?.includes('not found')) {
          this.earningsError = null;
          this.earnings = [];
        } else {
          this.earningsError = err.message || `Failed to load earnings for guild ${guildId}.`;
        }
        this.loadingEarnings = false;
      }
    });
  }

  openAddEarningModal(): void {
    if (!this.currentGuildId || !this.guildConfig) {
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

  openDeleteConfirmModal(earning: Earning): void {
    this.earningToDelete = earning;
    this.isDeleteModalVisible = true;
  }

  handleDeleteModalVisibleChange(visible: boolean): void {
    this.isDeleteModalVisible = visible;
    if (!visible) {
      setTimeout(() => {
        this.earningToDelete = null;
      }, 150);
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalVisible = false;
  }
  
  cancelDelete(): void {
    this.closeDeleteModal();
  }

  confirmDelete(): void {
    if (!this.earningToDelete || !this.currentGuildId || !this.earningToDelete.id) {
      this.earningsError = "Cannot delete earning: Missing required information.";
      this.closeDeleteModal();
      return;
    }

    const guildId = this.currentGuildId;
    const earningId = this.earningToDelete.id;

    this.loadingEarnings = true;
    this.earningsError = null;

    this.earningsService.deleteEarning(guildId, earningId).subscribe({
      next: () => {
        this.loadEarnings(guildId);
        this.closeDeleteModal();
      },
      error: (err: any) => {
        this.earningsError = err.message || 'Failed to delete earning record.';
        this.loadingEarnings = false;
        this.closeDeleteModal();
      }
    });
  }

  onEarningSaved(savedEarning: Earning | null): void {
    this.isEarningModalVisible = false;
    // Corrected typo and added null check
    if (savedEarning && this.currentGuildId) {
      this.loadEarnings(this.currentGuildId);
    }
  }

  trackById(index: number, item: Earning): string {
    return item?.id ?? `index-${index}`;
  }
}
