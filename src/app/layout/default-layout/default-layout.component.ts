import { Component, OnInit } from '@angular/core'; // Added OnInit
import { RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { AuthService } from '../../../auth/auth.service'; // Import AuthService

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  // Note: DefaultLayoutComponent is not standalone in the provided original code.
  // If it were standalone, AuthService would need to be in its imports array.
  // Assuming it's part of a module that provides AuthService.
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent implements OnInit { // Implemented OnInit
  public navItems = [...navItems];
  private userRole: string | null = null;

  constructor(private authService: AuthService) {} // Injected AuthService

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get user role
    this.filterNavItems();
  }

  filterNavItems(): void {
    if (!this.userRole) { // If no role, or role couldn't be determined, show minimal items or handle as error
      this.navItems = this.navItems.filter(item => !item.attributes?.['roles']);
      return;
    }

    this.navItems = navItems.filter(item => {
      const requiredRoles = item.attributes?.['roles'] as string[];
      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // Item has no role restrictions
      }
      return requiredRoles.includes(this.userRole!);
    });
  }
}
