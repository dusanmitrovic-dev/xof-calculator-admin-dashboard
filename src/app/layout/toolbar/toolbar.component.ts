import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
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