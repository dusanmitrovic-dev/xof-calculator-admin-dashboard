import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuildConfigListComponent } from './guild-config-list/guild-config-list.component';



@NgModule({
  declarations: [GuildConfigListComponent],
  imports: [
    CommonModule
  ],
  exports: [GuildConfigListComponent]
})
export class GuildManagementModule { }