import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { CommissionSettingsPageComponent } from './commission-settings-page/commission-settings-page.component';
import { BonusRulesPageComponent } from './bonus-rules-page/bonus-rules-page.component';
import { DisplaySettingsPageComponent } from './display-settings-page/display-settings-page.component';
import { OtherConfigsPageComponent } from './other-configs-page/other-configs-page.component';

const routes: Routes = [
  // Redirect base settings path or show an overview? Redirecting for now.
  { path: '', redirectTo: 'commission', pathMatch: 'full' },
  { path: 'commission', component: CommissionSettingsPageComponent },
  { path: 'bonus-rules', component: BonusRulesPageComponent },
  { path: 'display', component: DisplaySettingsPageComponent },
  { path: 'other', component: OtherConfigsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
