import { Component, OnInit, inject, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-guild-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './guild-selector.component.html',
  styleUrls: ['./guild-selector.component.css']
})
export class GuildSelectorComponent implements OnInit {
  private userService = inject(UserService);
  // private authService = inject(AuthService); // May need later

  availableGuilds = signal<string[]>([]);
  isLoading = signal(false);
  selectedGuild = signal<string | null>(null);

  @Output() guildSelected = new EventEmitter<string | null>();

  ngOnInit(): void {
    this.loadGuilds();
  }

  loadGuilds(): void {
    this.isLoading.set(true);
    this.userService.getManagedGuilds().subscribe(guilds => {
      this.availableGuilds.set(guilds);
      // Optionally auto-select the first guild if only one exists?
      // if (guilds.length === 1) {
      //   this.selectedGuild.set(guilds[0]);
      //   this.onGuildSelectionChange(guilds[0]);
      // }
      this.isLoading.set(false);
    });
  }

  onGuildSelectionChange(guildId: string | null): void {
    this.selectedGuild.set(guildId);
    this.guildSelected.emit(guildId);
    console.log('Guild selected:', guildId);
  }
}
