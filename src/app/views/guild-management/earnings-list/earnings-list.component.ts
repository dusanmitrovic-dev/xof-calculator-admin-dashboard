import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

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
import { IconDirective } from '@coreui/icons-angular'; // Import IconDirective

import { EarningsService, Earning } from '../../../services/earnings.service';
import { EarningEditModalComponent } from '../earning-edit-modal/earning-edit-modal.component';
import { GuildConfigService } from '../../../services/guild-config.service';

@Component({
  selector: 'app-earnings-list',
  templateUrl: './earnings-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    AlertModule,
    CardModule,
    SpinnerModule,
    ButtonModule,
    TableModule,
    ModalModule,
    IconDirective, // Ensure IconDirective is in the imports array
    UtilitiesModule,
    CurrencyPipe,
    DatePipe,
    EarningEditModalComponent
  ]
})
export class EarningsListComponent implements OnInit, OnDestroy {

  earnings: Earning[] = [];
  guildId: string | null = null;
  guildName: string | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;
  modalMode: 'create' | 'edit' = 'create';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private earningsService: EarningsService,
    private guildConfigService: GuildConfigService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      tap(params => {
        this.resetComponentState();
        this.guildId = params.get('guildId');
        console.log('EarningsListComponent: Guild ID from route:', this.guildId);
      }),
      switchMap(params => {
        const id = params.get('guildId');
        if (!id) {
          this.handleMissingGuildId();
          return [];
        }
        this.isLoading = true;
        this.fetchGuildName(id);
        return this.earningsService.getGuildEarnings(id);
      })
    ).subscribe({
      next: (earningsData) => {
        this.earnings = earningsData;
        this.isLoading = false;
        console.log('EarningsListComponent: Earnings loaded:', earningsData);
      },
      error: (err) => {
        console.error('EarningsListComponent: Error loading earnings:', err);
        this.errorMessage = err.message || 'Failed to load earnings data.';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetComponentState(): void {
    this.earnings = [];
    this.guildId = null;
    this.guildName = null;
    this.isLoading = true;
    this.errorMessage = null;
    this.isEarningModalVisible = false;
    this.selectedEarningForEdit = null;
  }

  handleMissingGuildId(): void {
    this.errorMessage = 'No Guild ID provided in the route.';
    this.isLoading = false;
  }

  fetchGuildName(id: string): void {
     this.guildConfigService.getGuildConfig(id).subscribe({
       next: (config) => {
           this.guildName = config?.display_settings?.agency_name || `Guild ${id}`;
       },
       error: (err) => {
           console.warn('Could not fetch guild config for name:', err);
           this.guildName = `Guild ${id}`;
       }
    });
  }

  loadEarnings(): void {
    if (!this.guildId) {
        this.errorMessage = "Cannot load earnings: Guild ID is missing.";
        return;
    }
    console.log('Reloading earnings for guild:', this.guildId);
    this.isLoading = true;
    this.errorMessage = null;
    this.earningsService.getGuildEarnings(this.guildId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: (data) => {
                this.earnings = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.errorMessage = err.message || 'Failed to reload earnings.';
                this.isLoading = false;
            }
        });
  }

  openCreateEarningModal(): void {
    if (!this.guildId) return;
    this.selectedEarningForEdit = null;
    this.modalMode = 'create';
    this.isEarningModalVisible = true;
    console.log('EarningsListComponent: Opening modal in create mode');
  }

  openEditEarningModal(earning: Earning): void {
    if (!this.guildId) return;
    this.selectedEarningForEdit = JSON.parse(JSON.stringify(earning));
    this.modalMode = 'edit';
    this.isEarningModalVisible = true;
    console.log(`EarningsListComponent: Opening modal in edit mode for earning ID ${earning.id}`);
  }

  handleEarningSaved(savedEarning: Earning | null): void {
    this.isEarningModalVisible = false;
    if (savedEarning) {
        console.log('EarningsListComponent: Earning saved event received. Reloading list.');
        this.loadEarnings();
    } else {
        console.log('EarningsListComponent: Modal closed without saving.');
    }
    this.selectedEarningForEdit = null;
  }

  handleVisibleChange(visible: boolean): void {
     if (!visible && this.isEarningModalVisible) {
        console.log('EarningsListComponent: Modal closed via visibleChange event.');
        this.isEarningModalVisible = false;
        this.selectedEarningForEdit = null;
    }
  }

  deleteEarning(earning: Earning): void {
    if (!earning.id || !this.guildId) {
        this.errorMessage = "Cannot delete: Earning ID or Guild ID is missing.";
        return;
    }

    if (confirm(`Are you sure you want to delete the earning record from ${earning.date} (ID: ${earning.id})?`)) {
        this.isLoading = true;
        this.earningsService.deleteEarning(this.guildId, earning.id).subscribe({
            next: (response) => {
                console.log(`Earning ${earning.id} deleted successfully.`, response);
                this.loadEarnings();
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.message || 'Failed to delete earning record.';
                console.error('Error deleting earning:', err);
            }
        });
    }
  }
}
