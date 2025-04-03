import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core'; // Added ChangeDetectionStrategy
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // Added Tooltip Module
import { MatMenuModule } from '@angular/material/menu'; // Added Menu Module

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'], // Link SCSS file
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule, // Import Tooltip
    MatMenuModule, // Import Menu
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush for simple presentational component
})
export class ToolbarComponent {
  // Inputs from parent (MainLayoutComponent)
  @Input() isMobile: boolean = false;
  @Input() isDark: boolean = false; // Theme state from ThemeService via MainLayout
  @Input() appName: string | null | undefined = 'App'; // Default App Name
  @Input() botName: string | null | undefined;

  // Outputs to parent (MainLayoutComponent)
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();
  // @Output() sidebarToggle = new EventEmitter<void>(); // Removed - wasn't used by layout

  constructor() {
    // No theme logic needed here anymore - parent handles it
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onToggleTheme(): void {
    // Just emit the event, let the parent component call the service
    this.themeToggle.emit();
  }

  // Removed toggleSidebar() as it wasn't connected
}
