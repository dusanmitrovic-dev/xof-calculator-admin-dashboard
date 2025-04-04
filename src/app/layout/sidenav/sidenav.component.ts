import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core'; // Added Output, EventEmitter

interface NavItem {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'], // Link SCSS file
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
})
export class SidenavComponent {
  // Event emitted when a navigation item is clicked
  @Output() navigated = new EventEmitter<void>();

  navItems: NavItem[] = [
    { link: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { link: '/earnings', name: 'Earnings Records', icon: 'receipt_long' }, // More specific icon
    {
      link: '/settings/commission',
      name: 'Compensation Setup', // More descriptive name
      icon: 'settings_applications', // More specific icon
    },
    {
      link: '/settings/bonus-rules',
      name: 'Bonus Rules',
      icon: 'emoji_events',
    }, // Alternative icon
    {
      link: '/settings/display',
      name: 'Bot Display', // More descriptive name
      icon: 'display_settings',
    },
    { link: '/settings/other', name: 'Lists Config', icon: 'category' }, // More descriptive name
  ];

  // Emit event when navigation occurs
  onNavigate(): void {
    this.navigated.emit();
  }

  // trackBy function for ngFor performance
  trackByLink(index: number, item: NavItem): string {
    return item.link;
  }
}
