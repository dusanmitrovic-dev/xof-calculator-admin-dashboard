import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarningsRoutingModule } from './earnings-routing.module';
import { EarningsComponent } from './earnings.component';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';


@NgModule({
  declarations: [
    EarningsComponent,
    EarningsPageComponent
  ],
  imports: [
    CommonModule,
    EarningsRoutingModule
  ]
})
export class EarningsModule { }
