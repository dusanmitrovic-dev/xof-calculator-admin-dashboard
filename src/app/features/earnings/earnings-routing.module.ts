import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';

const routes: Routes = [{ path: '', component: EarningsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EarningsRoutingModule {}
