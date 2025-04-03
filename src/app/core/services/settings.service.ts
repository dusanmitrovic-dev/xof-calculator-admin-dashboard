import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators'; // To simulate network latency

// Import Models
import { BonusRule } from '../models/bonus-rule.model';
import { CommissionSettings } from '../models/commission-settings.model';
import { DisplaySettings } from '../models/display-settings.model';
import { RolePercentageMap } from '../models/role-percentage.model';

// Import Mock Data (adjust paths if needed)
import * as bonusRulesData from '../data/bonus_rules.json';
import * as commissionSettingsData from '../data/commission_settings.json';
import * as displaySettingsData from '../data/display_settings.json';
import * as modelsConfigData from '../data/models_config.json';
import * as periodConfigData from '../data/period_config.json';
import * as rolePercentagesData from '../data/role_percentages.json';
import * as shiftConfigData from '../data/shift_config.json';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Simulate some network delay
  private networkDelay = 300; // Simulate latency

  // In-memory store for mock data
  private _bonusRules: BonusRule[] = [];
  private _commissionSettings!: CommissionSettings; // Definite assignment in constructor
  private _displaySettings!: DisplaySettings; // Definite assignment in constructor
  private _modelsConfig: string[] = [];
  private _periodConfig: string[] = [];
  private _shiftConfig: string[] = [];
  private _rolePercentages: RolePercentageMap = {}; // Legacy?

  constructor() {
    // Load initial data into memory
    this._bonusRules = [...(bonusRulesData as any).default];
    this._commissionSettings = JSON.parse(
      JSON.stringify((commissionSettingsData as any).default)
    ); // Deep copy
    this._displaySettings = { ...(displaySettingsData as any).default };
    this._modelsConfig = [...(modelsConfigData as any).default];
    this._periodConfig = [...(periodConfigData as any).default];
    this._shiftConfig = [...(shiftConfigData as any).default];
    this._rolePercentages = { ...(rolePercentagesData as any).default }; // Shallow copy ok?
    console.log('Mock SettingsService: Initialized with data.');
  }

  // --- Bonus Rules ---
  getBonusRules(): Observable<BonusRule[]> {
    console.log('Mock Service: Fetching Bonus Rules');
    // Return a copy to prevent mutation
    return of([...this._bonusRules]).pipe(delay(this.networkDelay));
  }

  saveBonusRules(rules: BonusRule[]): Observable<BonusRule[]> {
    console.log('Mock Service: Saving Bonus Rules', rules);
    // Validate and update in-memory store
    // Example: Sort rules before saving (as done in component, but service could enforce)
    this._bonusRules = [...rules].sort((a, b) => a.from - b.from);
    console.log('Mock Service: Bonus Rules updated in memory.');
    // Return a copy of the saved data
    return of([...this._bonusRules]).pipe(delay(this.networkDelay));
  }

  // --- Commission Settings ---
  getCommissionSettings(): Observable<CommissionSettings> {
    console.log('Mock Service: Fetching Commission Settings');
    // Return a deep copy to prevent mutation
    return of(JSON.parse(JSON.stringify(this._commissionSettings))).pipe(
      delay(this.networkDelay)
    );
  }

  saveCommissionSettings(
    settings: CommissionSettings
  ): Observable<CommissionSettings> {
    console.log('Mock Service: Saving Commission Settings', settings);
    // Update in-memory store (deep copy payload)
    this._commissionSettings = JSON.parse(JSON.stringify(settings));
    console.log('Mock Service: Commission Settings updated in memory.');
    // Return a deep copy of the saved data
    return of(JSON.parse(JSON.stringify(this._commissionSettings))).pipe(
      delay(this.networkDelay)
    );
  }

  // --- Display Settings ---
  getDisplaySettings(): Observable<DisplaySettings> {
    console.log('Mock Service: Fetching Display Settings');
    // Return a copy
    return of({ ...this._displaySettings }).pipe(delay(this.networkDelay));
  }

  saveDisplaySettings(settings: DisplaySettings): Observable<DisplaySettings> {
    console.log('Mock Service: Saving Display Settings', settings);
    // Update in-memory store
    this._displaySettings = { ...settings };
    console.log('Mock Service: Display Settings updated in memory.');
    // Return a copy
    return of({ ...this._displaySettings }).pipe(delay(this.networkDelay));
  }

  // --- List Configs (Models, Periods, Shifts) ---
  getModelsConfig(): Observable<string[]> {
    console.log('Mock Service: Fetching Models Config');
    return of([...this._modelsConfig]).pipe(delay(this.networkDelay));
  }
  saveModelsConfig(data: string[]): Observable<string[]> {
    console.log('Mock Service: Saving Models Config', data);
    this._modelsConfig = [...data];
    console.log('Mock Service: Models Config updated in memory.');
    return of([...this._modelsConfig]).pipe(delay(this.networkDelay));
  }

  getPeriodConfig(): Observable<string[]> {
    console.log('Mock Service: Fetching Period Config');
    return of([...this._periodConfig]).pipe(delay(this.networkDelay));
  }
  savePeriodConfig(data: string[]): Observable<string[]> {
    console.log('Mock Service: Saving Period Config', data);
    this._periodConfig = [...data];
    console.log('Mock Service: Period Config updated in memory.');
    return of([...this._periodConfig]).pipe(delay(this.networkDelay));
  }

  getShiftConfig(): Observable<string[]> {
    console.log('Mock Service: Fetching Shift Config');
    return of([...this._shiftConfig]).pipe(delay(this.networkDelay));
  }
  saveShiftConfig(data: string[]): Observable<string[]> {
    console.log('Mock Service: Saving Shift Config', data);
    this._shiftConfig = [...data];
    console.log('Mock Service: Shift Config updated in memory.');
    return of([...this._shiftConfig]).pipe(delay(this.networkDelay));
  }

  // --- Role Percentages (Legacy/Redundant?) ---
  getRolePercentages(): Observable<RolePercentageMap> {
    console.log('Mock Service: Fetching Role Percentages');
    return of({ ...this._rolePercentages }).pipe(delay(this.networkDelay));
  }
  saveRolePercentages(data: RolePercentageMap): Observable<RolePercentageMap> {
    console.log('Mock Service: Saving Role Percentages', data);
    this._rolePercentages = { ...data };
    console.log('Mock Service: Role Percentages updated in memory.');
    return of({ ...this._rolePercentages }).pipe(delay(this.networkDelay));
  }
}
