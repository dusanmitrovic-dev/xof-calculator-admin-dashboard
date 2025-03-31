import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class ToolbarComponent {
  @Input() isMobile: boolean = false;
  @Input() isDark: boolean = false;
  @Input() appName: string | null | undefined = 'Agency';
  @Input() botName: string | null | undefined = 'Bot';
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  isDarkTheme = true; // Start with dark theme by default

  constructor(private themeService: ThemeService) {
    // Apply the initial theme
    this.themeService.enableDarkTheme();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onToggleTheme() {
    this.themeToggle.emit();
    this.toggleTheme();
  }

  toggleTheme(): void {
    if (this.isDarkTheme) {
      this.themeService.enableLightTheme();
    } else {
      this.themeService.enableDarkTheme();
    }
    this.isDarkTheme = !this.isDarkTheme; // Toggle the state after applying the theme
  }
}
