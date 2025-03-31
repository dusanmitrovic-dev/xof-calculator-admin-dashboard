import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CommissionSettingsPageComponent } from './commission-settings-page/commission-settings-page.component';
import { BonusRulesPageComponent } from './bonus-rules-page/bonus-rules-page.component';
import { DisplaySettingsPageComponent } from './display-settings-page/display-settings-page.component';
import { OtherConfigsPageComponent } from './other-configs-page/other-configs-page.component';


@NgModule({
  declarations: [
    CommissionSettingsPageComponent,
    BonusRulesPageComponent,
    DisplaySettingsPageComponent,
    OtherConfigsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
