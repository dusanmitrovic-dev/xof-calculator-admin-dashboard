import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

interface NavItem {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
})
export class SidenavComponent {
  navItems: NavItem[] = [
    { link: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { link: '/earnings', name: 'Earnings', icon: 'paid' },
    {
      link: '/settings/commission',
      name: 'Commission Settings',
      icon: 'settings',
    },
    { link: '/settings/bonus-rules', name: 'Bonus Rules', icon: 'rule' },
    {
      link: '/settings/display',
      name: 'Display Settings',
      icon: 'display_settings',
    },
    { link: '/settings/other', name: 'Other Configs', icon: 'category' },
  ];
}
