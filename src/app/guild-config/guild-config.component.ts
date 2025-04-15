import { Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { GuildSelectorComponent } from '../core/components/guild-selector/guild-selector.component'; 
import { ConfigService, GuildConfig } from '../core/services/config.service'; 

// Import necessary Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion'; // For better layout
import { MatTooltipModule } from '@angular/material/tooltip';
// Add other modules as needed: 

@Component({
  selector: 'app-guild-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    GuildSelectorComponent, 
    // JsonPipe, // Keep JsonPipe for debugging temporarily
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTooltipModule
    // Add other Material Modules here
  ],
  templateUrl: './guild-config.component.html',
  styleUrls: ['./guild-config.component.scss']
})
export class GuildConfigComponent {
  private configService = inject(ConfigService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  selectedGuildId = signal<string | null>(null);
  guildConfig = signal<GuildConfig | null>(null);
  isLoading = signal(false);
  isSaving = signal(false);
  error = signal<string | null>(null);
  saveSuccess = signal<boolean | null>(null);

  configForm!: FormGroup; // Initialize the form group

  onGuildSelected(guildId: string | null): void {
    this.selectedGuildId.set(guildId);
    this.guildConfig.set(null); 
    this.error.set(null); 
    this.saveSuccess.set(null);
    if (guildId) {
      this.fetchConfig(guildId);
    } else {
       // Clear the form if no guild is selected
       this.configForm = this.fb.group({}); // Reset form
    }
  }

  fetchConfig(guildId: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.saveSuccess.set(null);
    this.configService.getGuildConfig(guildId).subscribe({
      next: (config) => {
        if (config) {
          this.guildConfig.set(config);
          this.initConfigForm(config);
          console.log('Fetched config:', config);
        } else {
           // If no config exists, create a default structure for the form
           const defaultConfig: GuildConfig = { guild_id: guildId };
           this.guildConfig.set(defaultConfig); 
           this.initConfigForm(defaultConfig);
           console.log('No existing config found, initializing default form structure.');
          // Keep error null, maybe add an info message? 
          // this.error.set('No configuration found for this guild. Defaults shown.');
        }
        this.isLoading.set(false);
        this.cdr.detectChanges(); // Trigger change detection after form init
      },
      error: (err) => {
        console.error('Error fetching config:', err);
        this.error.set('An error occurred while loading the configuration.');
        this.guildConfig.set(null);
        this.configForm = this.fb.group({}); // Reset form on error
        this.isLoading.set(false);
      }
    });
  }

  // Initialize the main configuration form
  initConfigForm(config: GuildConfig): void {
    this.configForm = this.fb.group({
      // Simple arrays (string)
      models: this.fb.array(config.models?.map(m => this.fb.control(m, Validators.required)) ?? []),
      shifts: this.fb.array(config.shifts?.map(s => this.fb.control(s, Validators.required)) ?? []),
      periods: this.fb.array(config.periods?.map(p => this.fb.control(p, Validators.required)) ?? []),
      
      // Array of objects (bonus rules)
      bonus_rules: this.fb.array(config.bonus_rules?.map(rule => this.createBonusRuleGroup(rule)) ?? []),
      
      // Nested objects (display settings)
      display_settings: this.createDisplaySettingsGroup(config.display_settings ?? {}),

      // Complex nested objects/maps (commission settings)
      // Note: Handling dynamic keys (roleId, userId) in reactive forms can be complex.
      // We might simplify or adjust the structure/approach if needed.
      // For now, treating roles as FormArray for simplicity, assuming role IDs aren't directly edited here.
      commission_settings: this.createCommissionSettingsGroup(config.commission_settings ?? { roles: {}, users: {} }),

       // Simple map (roles) - Needs careful handling in template
       roles: this.fb.group(this.createRolesGroup(config.roles ?? {})),

    });
    console.log("Form Initialized:", this.configForm.value);
  }

  // --- FormArray Getters --- 
  get models(): FormArray { return this.configForm.get('models') as FormArray; }
  get shifts(): FormArray { return this.configForm.get('shifts') as FormArray; }
  get periods(): FormArray { return this.configForm.get('periods') as FormArray; }
  get bonus_rules(): FormArray { return this.configForm.get('bonus_rules') as FormArray; }
  // Commission settings roles/users need specific handling in template or dedicated components

  // --- Helper methods to create FormGroups/FormArrays --- 

  createBonusRuleGroup(rule: { from?: number; to?: number; amount?: number } = {}): FormGroup {
    return this.fb.group({
      from: [rule.from ?? 0, [Validators.required, Validators.min(0)]],
      to: [rule.to ?? 0, [Validators.required, Validators.min(0)]],
      amount: [rule.amount ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  addBonusRule(): void {
    this.bonus_rules.push(this.createBonusRuleGroup());
  }

  removeBonusRule(index: number): void {
    this.bonus_rules.removeAt(index);
  }

  createDisplaySettingsGroup(settings: any = {}): FormGroup {
     return this.fb.group({
      ephemeral_responses: [settings.ephemeral_responses ?? false],
      show_average: [settings.show_average ?? true],
      agency_name: [settings.agency_name ?? 'Agency'],
      show_ids: [settings.show_ids ?? true],
      bot_name: [settings.bot_name ?? 'Shift Calculator']
    });
  }

  createCommissionSettingsGroup(settings: any = { roles: {}, users: {} }): FormGroup {
     return this.fb.group({
      // Roles: We might need a different approach for dynamic keys
      // For now, maybe handle this part outside the main reactive form or simplify?
      // Users: Similar challenge with dynamic keys
      // Simplified - just store the raw object for now, edit via dedicated modal/component?
      // roles: this.fb.control(settings.roles ?? {}), 
      // users: this.fb.control(settings.users ?? {})
      // OR represent as arrays if manageable?
    });
  }

   createRolesGroup(roles: { [key: string]: number } = {}): { [key: string]: any } {
    const group: { [key: string]: any } = {};
    Object.keys(roles).forEach(key => {
      group[key] = [roles[key], [Validators.required, Validators.min(0), Validators.max(100)]];
    });
    return group;
    // Note: Adding/removing roles dynamically to this FormGroup is complex.
  }

  // --- Methods for simple string arrays (models, shifts, periods) ---
  addItem(array: FormArray, input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      array.push(this.fb.control(value, Validators.required));
      input.value = ''; // Clear input
    }
  }
  removeItem(array: FormArray, index: number): void {
    array.removeAt(index);
  }

  // --- Save Logic --- 
  saveConfig(): void {
    if (this.configForm.invalid) {
      this.configForm.markAllAsTouched(); // Show validation errors
      this.error.set('Please correct the errors in the form.');
      this.saveSuccess.set(false);
      return;
    }
    if (!this.selectedGuildId()) {
      this.error.set('No guild selected.');
      this.saveSuccess.set(false);
      return;
    }

    this.isSaving.set(true);
    this.error.set(null);
    this.saveSuccess.set(null);

    const formValue = this.configForm.value;
    
    // Reconstruct complex objects if they were simplified in the form
    const configToSave: GuildConfig = {
      guild_id: this.selectedGuildId()!,
      ...formValue,
      // // Example: Reconstruct commission settings if handled differently
      // commission_settings: {
      //    roles: this.configForm.get('commission_settings.roles')?.value, ??
      //    users: this.configForm.get('commission_settings.users')?.value, ??
      // },
       // Reconstruct simple roles map if needed (might be directly from form value)
       // roles: ... 
    };

    console.log('Saving config:', configToSave);

    this.configService.saveGuildConfig(this.selectedGuildId()!, configToSave).subscribe({
      next: (savedConfig) => {
        if (savedConfig) {
          this.guildConfig.set(savedConfig); // Update local signal with saved data
          this.initConfigForm(savedConfig); // Re-initialize form to prevent dirty state issues
          this.saveSuccess.set(true);
           // Optionally clear success message after a delay
          setTimeout(() => this.saveSuccess.set(null), 3000); 
        } else {
          this.error.set('Failed to save configuration.');
          this.saveSuccess.set(false);
        }
        this.isSaving.set(false);
      },
      error: (err) => {
        console.error('Error saving config:', err);
        this.error.set('An error occurred while saving the configuration.');
        this.saveSuccess.set(false);
        this.isSaving.set(false);
      }
    });
  }
}
