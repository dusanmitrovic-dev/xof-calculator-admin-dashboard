import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CommissionSettingsPageComponent } from './commission-settings-page/commission-settings-page.component';


@NgModule({
  declarations: [
    CommissionSettingsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
