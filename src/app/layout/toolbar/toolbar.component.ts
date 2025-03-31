import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class ToolbarComponent {
  @Input() isMobile: boolean = false;
  @Input() isDark: boolean = false;
  @Input() appName: string | null | undefined = 'Agency';
  @Input() botName: string | null | undefined = 'Bot';
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onToggleTheme() {
    this.themeToggle.emit();
  }
}