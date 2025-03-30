import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigCardComponent } from './components/config-card/config-card.component';



@NgModule({
  declarations: [
    ConfigCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConfigCardComponent
  ]
})
export class SharedModule { }
