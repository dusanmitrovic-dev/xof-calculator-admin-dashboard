import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  private networkDelay = 300; // TODO: Set to 0 for production or remove
 
  // --- Bonus Rules ---
  getBonusRules(): Observable<BonusRule[]> {
    // The 'default' property is needed when importing JSON like this in ES modules
    const data: BonusRule[] = (bonusRulesData as any).default;
    console.log('Mock Service: Fetching Bonus Rules');
    return of(data).pipe(delay(this.networkDelay));
  }

  saveBonusRules(rules: BonusRule[]): Observable<BonusRule[]> {
    console.log('Mock Service: Saving Bonus Rules', rules);
    // TODO: Replace with actual HTTP POST/PUT request to backend API
    alert('Bonus Rules saved (logged to console). Implement API call.');
    return of(rules).pipe(delay(this.networkDelay)); // Simulate save
  }

  // --- Commission Settings ---
  getCommissionSettings(): Observable<CommissionSettings> {
    const data: CommissionSettings = (commissionSettingsData as any).default;
    console.log('Mock Service: Fetching Commission Settings');
    return of(data).pipe(delay(this.networkDelay));
  }

  saveCommissionSettings(settings: CommissionSettings): Observable<CommissionSettings> {
    console.log('Mock Service: Saving Commission Settings', settings);
    // TODO: Replace with actual HTTP POST/PUT request
    alert('Commission Settings saved (logged to console). Implement API call.');
    return of(settings).pipe(delay(this.networkDelay));
  }

   // --- Display Settings ---
  getDisplaySettings(): Observable<DisplaySettings> {
    const data: DisplaySettings = (displaySettingsData as any).default;
     console.log('Mock Service: Fetching Display Settings');
    return of(data).pipe(delay(this.networkDelay));
  }

  saveDisplaySettings(settings: DisplaySettings): Observable<DisplaySettings> {
    console.log('Mock Service: Saving Display Settings', settings);
     // TODO: Replace with actual HTTP POST/PUT request
     alert('Display Settings saved (logged to console). Implement API call.');
    return of(settings).pipe(delay(this.networkDelay));
  }

  // --- List Configs (Models, Periods, Shifts) ---
   getModelsConfig(): Observable<string[]> {
     const data: string[] = (modelsConfigData as any).default;
     console.log('Mock Service: Fetching Models Config');
     return of(data).pipe(delay(this.networkDelay));
   }
   saveModelsConfig(data: string[]): Observable<string[]> {
     console.log('Mock Service: Saving Models Config', data);
     // TODO: Replace with actual HTTP POST/PUT request
      alert('Models Config saved (logged to console). Implement API call.');
     return of(data).pipe(delay(this.networkDelay));
   }

   getPeriodConfig(): Observable<string[]> {
     const data: string[] = (periodConfigData as any).default;
     console.log('Mock Service: Fetching Period Config');
     return of(data).pipe(delay(this.networkDelay));
   }
   savePeriodConfig(data: string[]): Observable<string[]> {
     console.log('Mock Service: Saving Period Config', data);
     // TODO: Replace with actual HTTP POST/PUT request
     alert('Period Config saved (logged to console). Implement API call.');
     return of(data).pipe(delay(this.networkDelay));
   }

    getShiftConfig(): Observable<string[]> {
     const data: string[] = (shiftConfigData as any).default;
     console.log('Mock Service: Fetching Shift Config');
     return of(data).pipe(delay(this.networkDelay));
   }
   saveShiftConfig(data: string[]): Observable<string[]> {
     console.log('Mock Service: Saving Shift Config', data);
     // TODO: Replace with actual HTTP POST/PUT request
     alert('Shift Config saved (logged to console). Implement API call.');
     return of(data).pipe(delay(this.networkDelay));
   }

    // --- Role Percentages (Legacy/Redundant?) ---
   getRolePercentages(): Observable<RolePercentageMap> {
     const data: RolePercentageMap = (rolePercentagesData as any).default;
     console.log('Mock Service: Fetching Role Percentages');
     return of(data).pipe(delay(this.networkDelay));
   }
   saveRolePercentages(data: RolePercentageMap): Observable<RolePercentageMap> {
     console.log('Mock Service: Saving Role Percentages', data);
     // TODO: Replace with actual HTTP POST/PUT request
     alert('Role Percentages saved (logged to console). Implement API call.');
     return of(data).pipe(delay(this.networkDelay));
   }
}