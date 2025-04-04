import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  // --- Inputs ---
  @Input() isMobile: boolean = false;
  // This Input receives the TRUE theme state from the parent (MainLayoutComponent -> ThemeService)
  @Input() isDark: boolean = false;
  @Input() appName: string | null | undefined = 'App';
  @Input() botName: string | null | undefined;

  // --- Outputs ---
  @Output() sidenavToggle = new EventEmitter<void>();
  // This Output just signals the parent to toggle the theme via the service
  @Output() themeToggle = new EventEmitter<void>();

  // NO internal theme state (`isDarkTheme`) needed here!
  // NO constructor logic needed for theme!

  constructor() {} // Constructor can be empty or removed if not needed

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onToggleTheme(): void {
    // ONLY emit the event. The parent component handles calling the ThemeService.
    this.themeToggle.emit();
  }

  // NO local toggleTheme() method needed here!
}
