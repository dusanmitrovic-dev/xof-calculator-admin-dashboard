import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs'; // Import timer
import { delay, map, catchError } from 'rxjs/operators';

// Import Models
import { BonusRule } from '../models/bonus-rule.model';
import { CommissionSettings } from '../models/commission-settings.model';
import { DisplaySettings } from '../models/display-settings.model';
import { RolePercentageMap } from '../models/role-percentage.model';

// Import Mock Data (using default import assuming esModuleInterop)
import * as bonusRulesData from '../data/bonus_rules.json';
import * as commissionSettingsData from '../data/commission_settings.json';
import * as displaySettingsData from '../data/display_settings.json';
import * as modelsConfigData from '../data/models_config.json';
import * as periodConfigData from '../data/period_config.json';
import * as rolePercentagesData from '../data/role_percentages.json'; // Legacy?
import * as shiftConfigData from '../data/shift_config.json';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private networkDelay = 300; // ms

  // In-memory store - initialize with deep copies where necessary
  private _bonusRules: BonusRule[] = JSON.parse(
    JSON.stringify((bonusRulesData as any).default || bonusRulesData || [])
  );
  private _commissionSettings: CommissionSettings = JSON.parse(
    JSON.stringify(
      (commissionSettingsData as any).default ||
        commissionSettingsData || { roles: {}, users: {} }
    )
  );
  private _displaySettings: DisplaySettings = JSON.parse(
    JSON.stringify(
      (displaySettingsData as any).default || displaySettingsData || {}
    )
  );
  private _modelsConfig: string[] = JSON.parse(
    JSON.stringify((modelsConfigData as any).default || modelsConfigData || [])
  );
  private _periodConfig: string[] = JSON.parse(
    JSON.stringify((periodConfigData as any).default || periodConfigData || [])
  );
  private _shiftConfig: string[] = JSON.parse(
    JSON.stringify((shiftConfigData as any).default || shiftConfigData || [])
  );
  private _rolePercentages: RolePercentageMap = JSON.parse(
    JSON.stringify(
      (rolePercentagesData as any).default || rolePercentagesData || {}
    )
  ); // Legacy?

  constructor() {
    console.log('Mock SettingsService: Initialized with data.');
  }

  // --- Bonus Rules ---
  getBonusRules(): Observable<BonusRule[]> {
    console.log('Mock Service: Fetching Bonus Rules');
    // Return deep copy
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._bonusRules)))
    );
  }

  saveBonusRules(rules: BonusRule[]): Observable<BonusRule[]> {
    console.log('Mock Service: Saving Bonus Rules', rules);
    // Validate and update in-memory store (deep copy payload)
    this._bonusRules = JSON.parse(JSON.stringify(rules || [])).sort(
      (a: BonusRule, b: BonusRule) => (a.from ?? 0) - (b.from ?? 0)
    );
    console.log('Mock Service: Bonus Rules updated in memory.');
    // Return deep copy of saved data
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._bonusRules)))
    );
  }

  // --- Commission Settings ---
  getCommissionSettings(): Observable<CommissionSettings> {
    console.log('Mock Service: Fetching Commission Settings');
    // Return deep copy
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._commissionSettings)))
    );
  }

  saveCommissionSettings(
    settings: CommissionSettings
  ): Observable<CommissionSettings> {
    console.log('Mock Service: Saving Commission Settings', settings);
    // Update in-memory store (deep copy payload)
    this._commissionSettings = JSON.parse(
      JSON.stringify(settings || { roles: {}, users: {} })
    );
    console.log('Mock Service: Commission Settings updated in memory.');
    // Return deep copy of the saved data
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._commissionSettings)))
    );
  }

  // --- Display Settings ---
  getDisplaySettings(): Observable<DisplaySettings> {
    console.log('Mock Service: Fetching Display Settings');
    // Return deep copy
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._displaySettings)))
    );
  }

  saveDisplaySettings(settings: DisplaySettings): Observable<DisplaySettings> {
    console.log('Mock Service: Saving Display Settings', settings);
    // Update in-memory store (deep copy payload)
    this._displaySettings = JSON.parse(JSON.stringify(settings || {}));
    console.log('Mock Service: Display Settings updated in memory.');
    // Return deep copy
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._displaySettings)))
    );
  }

  // --- List Configs (Models, Periods, Shifts) ---
  // Generic getter/setter for simple string arrays can reduce repetition

  private getConfigList(
    configType: 'models' | 'period' | 'shift'
  ): Observable<string[]> {
    const key = `_${configType}Config` as keyof this;
    console.log(`Mock Service: Fetching ${configType} Config`);
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this[key])))
    );
  }

  private saveConfigList(
    configType: 'models' | 'period' | 'shift',
    data: string[]
  ): Observable<string[]> {
    const key = `_${configType}Config` as keyof this;
    console.log(`Mock Service: Saving ${configType} Config`, data);
    (this[key] as string[]) = JSON.parse(JSON.stringify(data || []));
    console.log(`Mock Service: ${configType} Config updated in memory.`);
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this[key])))
    );
  }

  getModelsConfig(): Observable<string[]> {
    return this.getConfigList('models');
  }
  saveModelsConfig(data: string[]): Observable<string[]> {
    return this.saveConfigList('models', data);
  }

  getPeriodConfig(): Observable<string[]> {
    return this.getConfigList('period');
  }
  savePeriodConfig(data: string[]): Observable<string[]> {
    return this.saveConfigList('period', data);
  }

  getShiftConfig(): Observable<string[]> {
    return this.getConfigList('shift');
  }
  saveShiftConfig(data: string[]): Observable<string[]> {
    return this.saveConfigList('shift', data);
  }

  // --- Role Percentages (Legacy/Redundant?) ---
  getRolePercentages(): Observable<RolePercentageMap> {
    console.log('Mock Service: Fetching Role Percentages (Legacy?)');
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._rolePercentages)))
    );
  }
  saveRolePercentages(data: RolePercentageMap): Observable<RolePercentageMap> {
    console.log('Mock Service: Saving Role Percentages (Legacy?)', data);
    this._rolePercentages = JSON.parse(JSON.stringify(data || {}));
    console.log('Mock Service: Role Percentages updated in memory.');
    return timer(this.networkDelay).pipe(
      map(() => JSON.parse(JSON.stringify(this._rolePercentages)))
    );
  }
}
