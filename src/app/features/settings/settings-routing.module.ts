import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { CommissionSettingsPageComponent } from './commission-settings-page/commission-settings-page.component';
import { BonusRulesPageComponent } from './bonus-rules-page/bonus-rules-page.component';
import { DisplaySettingsPageComponent } from './display-settings-page/display-settings-page.component'; // Route to standalone component
import { OtherConfigsPageComponent } from './other-configs-page/other-configs-page.component';

const routes: Routes = [
  // Redirect base settings path to a default page (e.g., commission)
  { path: '', redirectTo: 'commission', pathMatch: 'full' },
  {
    path: 'commission',
    component: CommissionSettingsPageComponent,
    title: 'Commission Settings',
  }, // Add titles
  {
    path: 'bonus-rules',
    component: BonusRulesPageComponent,
    title: 'Bonus Rules',
  },
  {
    path: 'display',
    component: DisplaySettingsPageComponent,
    title: 'Display Settings',
  }, // Route to standalone component
  {
    path: 'other',
    component: OtherConfigsPageComponent,
    title: 'Other Configurations',
  },

  // Optional: Wildcard route within settings? Probably not needed.
  // { path: '**', redirectTo: 'commission' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
