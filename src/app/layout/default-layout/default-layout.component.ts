import { Component, OnInit } from '@angular/core'; // Added OnInit
import { RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';

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
  SidebarTogglerDirective,
} from '@coreui/angular';

import { DefaultHeaderComponent } from './';
import { navItems as originalNavItems, INavData } from './_nav'; // Renamed navItems import
import { AuthService } from '../../../app/auth/auth.service'; // Import AuthService

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
    // IconDirective,
    NgScrollbar,
    RouterOutlet,
    ShadowOnScrollDirective,
    CommonModule,
  ],
})
export class DefaultLayoutComponent implements OnInit {
  // Implemented OnInit
  // Initialize with the original nav items
  public navItems: INavData[] = [];
  private userRole: string | null = null;
  static currentGuildConfig: {
    logo_image_base64?: string;
    logo_text?: string;
  } = {
    // Example default values for testing
    logo_image_base64: '',
    logo_text: '',
  };

  constructor(private authService: AuthService) {} // Injected AuthService

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get user role
    console.log('DefaultLayoutComponent: User role:', this.userRole); // Log user role
    this.navItems = this.filterNavItems(originalNavItems);
    console.log('DefaultLayoutComponent: Filtered nav items:', this.navItems); // Log filtered nav items
  }

  get currentGuildConfig() {
    return DefaultLayoutComponent.currentGuildConfig;
  }

  public static setCurrentGuildConfig(config: {
    logo_image_base64?: string;
    logo_text?: string;
  }) {
    DefaultLayoutComponent.currentGuildConfig = {
      logo_image_base64: config.logo_image_base64 || '',
      logo_text: config.logo_text || '',
    };
  }

  // Recursive function to filter nav items and their children
  filterNavItems(items: INavData[]): INavData[] {
    if (!this.userRole) {
      // If no role, return only items without explicit roles defined
      return items.filter((item) => !item.attributes?.['roles']);
    }

    return items
      .map((item) => {
        const requiredRoles = item.attributes?.['roles'] as
          | string[]
          | undefined;
        const hasRequiredRole = requiredRoles?.includes(this.userRole!);
        const noRoleRestriction = !requiredRoles || requiredRoles.length === 0;

        // If the item has children, filter them recursively
        if (item.children && item.children.length > 0) {
          const filteredChildren = this.filterNavItems(item.children);
          // Only include the group if user can see the group AND there are visible children
          if (
            (noRoleRestriction || hasRequiredRole) &&
            filteredChildren.length > 0
          ) {
            return { ...item, children: filteredChildren };
          }
          // Otherwise, exclude the group
          return null;
        }

        // For leaf items, include if no restriction or user has required role
        return noRoleRestriction || hasRequiredRole ? item : null;
      })
      .filter(Boolean) as INavData[];
  }
}
