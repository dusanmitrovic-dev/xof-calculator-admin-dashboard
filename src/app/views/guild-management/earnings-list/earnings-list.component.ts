import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
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
import { GuildService } from '../../../services/guild.service'; // Import GuildService

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

  // Guild Members and Roles State
  guildMembersMap: { [id: string]: { displayName: string, username: string } } = {};
  guildRolesMap: { [id: string]: string } = {};
  loadingGuildData: boolean = false;
  guildDataError: string | null = null;

  isEarningModalVisible: boolean = false;
  selectedEarningForEdit: Earning | null = null;

  isDeleteModalVisible: boolean = false;
  earningToDelete: Earning | null = null;

  isArray = Array.isArray;
  objectKeys = Object.keys;

  // Pagination state
  currentPage: number = 1;
  pageSize: number = 10;

  // Filtering state
  filterText: string = '';

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Hours filter state
  hoursMin: number | null = null;
  hoursMax: number | null = null;
  grossMin: number | null = null;
  grossMax: number | null = null;
  cutMin: number | null = null;
  cutMax: number | null = null;

  constructor(
    private guildConfigService: GuildConfigService,
    private earningsService: EarningsService,
    private authService: AuthService,
    private guildService: GuildService // Inject GuildService
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
          this.loadingGuildData = false; // Reset guild data loading
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Computed filtered and paginated earnings
  get filteredEarnings(): Earning[] {
    let filtered = this.earnings;

    // Text filter
    // Text filter
    if (this.filterText) {
      const filter = this.filterText.toLowerCase();
      filtered = filtered.filter(e => {
        const allValues = [
          e.date,
          this.getMemberDisplayName(e.user_mention),
          this.getRoleName(e.role),
          ...(e.models || []),
          e.shift,
          e.period,
          e.hours_worked != null ? e.hours_worked.toString() : '',
          e.gross_revenue != null ? `$${e.gross_revenue}` : '',
          e.total_cut != null ? `$${e.total_cut}` : ''
        ].map(val => (val ?? '').toString()).join(' ').toLowerCase();
        return allValues.includes(filter);
      });
    }

    // Hours filter
    if (this.hoursMin !== null) {
      filtered = filtered.filter(e => e.hours_worked != null && e.hours_worked >= this.hoursMin!);
    }
    if (this.hoursMax !== null) {
      filtered = filtered.filter(e => e.hours_worked != null && e.hours_worked <= this.hoursMax!);
    }

    // Gross Revenue filter
    if (this.grossMin !== null) {
      filtered = filtered.filter(e => e.gross_revenue != null && e.gross_revenue >= this.grossMin!);
    }
    if (this.grossMax !== null) {
      filtered = filtered.filter(e => e.gross_revenue != null && e.gross_revenue <= this.grossMax!);
    }

    // Total Cut filter
    if (this.cutMin !== null) {
      filtered = filtered.filter(e => e.total_cut != null && e.total_cut >= this.cutMin!);
    }
    if (this.cutMax !== null) {
      filtered = filtered.filter(e => e.total_cut != null && e.total_cut <= this.cutMax!);
    }

    // Sorting
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = (a as any)[this.sortColumn];
        let bValue = (b as any)[this.sortColumn];

        // Special handling for display name and role name
        if (this.sortColumn === 'user_mention') {
          aValue = this.getMemberDisplayName(a.user_mention);
          bValue = this.getMemberDisplayName(b.user_mention);
        }
        if (this.sortColumn === 'role') {
          aValue = this.getRoleName(a.role);
          bValue = this.getRoleName(b.role);
        }

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return this.sortDirection === 'asc'
          ? aValue.toString().localeCompare(bValue.toString())
          : bValue.toString().localeCompare(aValue.toString());
      });
    }

    return filtered;
  }

  get paginatedEarnings(): Earning[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredEarnings.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEarnings.length / this.pageSize) || 1;
  }

  onPageSizeChange(newSize: number) {
    this.currentPage = 1;
    this.pageSize = Number(newSize);
  }

  onGrossFilterChange(): void {
    this.currentPage = 1;
  }

  onCutFilterChange(): void {
    this.currentPage = 1;
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onFilterChange(): void {
    this.currentPage = 1; // Reset to first page on filter change
  }

  setSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  onHoursFilterChange(): void {
    this.currentPage = 1;
  }

  resetState(): void {
    this.earnings = [];
    this.guildConfig = null;
    this.loadingEarnings = true;
    this.loadingConfig = true;
    this.earningsError = null;
    this.guildMembersMap = {}; // Reset members map
    this.guildRolesMap = {}; // Reset roles map
    this.loadingGuildData = true; // Reset guild data loading
    this.guildDataError = null; // Reset guild data error
    this.isEarningModalVisible = false;
    this.selectedEarningForEdit = null;
    this.isDeleteModalVisible = false;
    this.earningToDelete = null;
  }

  loadInitialData(guildId: string): void {
    this.loadingConfig = true;
    this.guildConfigService.getGuildConfig(guildId).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.error(`EarningsListComponent: Error loading config for guild ${guildId}:`, err);
        // If config is not found, we still want to try loading earnings and guild data
        if (err.status !== 404 && !err?.message?.includes('not found')) {
          this.earningsError = err.message || `Failed to load configuration for guild ${guildId}.`;
        }
        this.guildConfig = null;
        this.loadingConfig = false;
        return of(null); // Return an observable of null to continue the stream
      })
    ).subscribe(config => {
      this.guildConfig = config; // config might be null if 404
      this.loadingConfig = false;
      // Always try to load earnings and guild data if a guildId is selected,
      // even if config loading failed or returned null.
      if (guildId) {
        this.loadEarnings(guildId);
        this.loadGuildMembersAndRoles(guildId); // Load guild members and roles
      }
    });
  }

  loadEarnings(guildId: string): void {
    this.loadingEarnings = true;
    // Preserve existing earningsError if config failed, but clear earnings-specific errors
    const initialEarningsError = this.earningsError;
    this.earningsError = null;

    this.earningsService.getEarningsForGuild(guildId).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.error('[EarningsListComponent] Error loading earnings:', err);
        if (err.status === 404 || err?.message?.includes('not found')) {
          this.earningsError = null; // No earnings found is not an error state here
          this.earnings = [];
        } else {
          // Keep initial config error if present, otherwise show earnings error
          this.earningsError = initialEarningsError || err.message || `Failed to load earnings for guild ${guildId}.`;
        }
        this.loadingEarnings = false;
        return of([]); // Return empty array on error
      })
    ).subscribe((earningsData: Earning[]) => {
      // Sort by timestamp part of id descending (newest first)
      this.earnings = earningsData.sort((a, b) => {
        const [aTs] = a.id.split('-');
        const [bTs] = b.id.split('-');
        // Compare as numbers
        return Number(bTs) - Number(aTs);
      });
      this.loadingEarnings = false;
      if (initialEarningsError && !this.earningsError) {
        this.earningsError = initialEarningsError;
      }
    });
  }

  private idObjectToSnowflake(id: any): string {
    if (typeof id === 'string') return id;
    if (typeof id === 'object' && id !== null && 'low' in id && 'high' in id) {
      // Discord snowflake: (BigInt(high) << 32n) + BigInt(low)
      // Handle negative low values (two's complement)
      let low = id.low >>> 0; // force unsigned
      let high = id.high >>> 0;
      return ((BigInt(high) << 32n) + BigInt(low)).toString();
    }
    return String(id);
  }

  loadGuildMembersAndRoles(guildId: string): void {
    console.log(`EarningsListComponent: Loading members and roles for guild ${guildId}...`);
    console.log(`EarningsListComponent: Calling getGuildMembers and getGuildRoles with guildId: ${guildId}`);
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
        console.log('EarningsListComponent: Raw members data received:', members);
        console.log('EarningsListComponent: Raw roles data received:', roles);
        this.guildMembersMap = members.reduce((map, member) => {
          const key = this.idObjectToSnowflake(member.id);
          // Store both display_name and name
          map[key] = {
            displayName: member.display_name || member.name,
            username: member.name
          };
          return map;
        }, {} as { [id: string]: { displayName: string, username: string } })

        this.guildRolesMap = roles.reduce((map, role) => {
          const key = this.idObjectToSnowflake(role.id);
          map[key] = role.name;
          return map;
        }, {} as { [id: string]: string });
        this.loadingGuildData = false;
        console.log('EarningsListComponent: Guild members and roles loaded.', this.guildMembersMap, this.guildRolesMap);
      });
  }

  getMemberDisplayName(memberId: string): string {
    // Check if memberId is a mention string (e.g., <@1234567890>)
    const mentionMatch = memberId.match(/^<@!?(\d+)>$/);
    let key = memberId;
    if (mentionMatch && mentionMatch[1]) {
      key = mentionMatch[1];
    }
    const member = this.guildMembersMap[key];
    if (member) {
      // Show "Display Name (username)" if displayName and username differ, else just one
      if (member.displayName && member.username && member.displayName !== member.username) {
        return `${member.displayName} (${member.username})`;
      }
      return member.displayName || member.username;
    }
    return 'unknown';
  }

  getRoleName(roleId: string): string {
    // Check if roleId is a mention string (e.g., <@&1234567890>)
    const mentionMatch = roleId.match(/^<@&(\d+)>$/);
    let cleanId = roleId;
    let key = roleId; // Default key is the original roleId

    if (mentionMatch && mentionMatch[1]) {
      cleanId = mentionMatch[1];
      key = cleanId; // Use the extracted ID as the key
    }
    return this.guildRolesMap[key] || roleId; // Return original ID or mention if name not found
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