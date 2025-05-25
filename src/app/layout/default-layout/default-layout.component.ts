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
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent implements OnInit { // Implemented OnInit
  // Initialize with the original nav items
  public navItems: INavData[] = [];
  private userRole: string | null = null;

  constructor(private authService: AuthService) {} // Injected AuthService

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get user role
    console.log('DefaultLayoutComponent: User role:', this.userRole); // Log user role
    this.navItems = this.filterNavItems(originalNavItems);
    console.log('DefaultLayoutComponent: Filtered nav items:', this.navItems); // Log filtered nav items
  }

  // Recursive function to filter nav items and their children
  filterNavItems(items: INavData[]): INavData[] {
    if (!this.userRole) {
       // If no role, return only items without explicit roles defined
       return items.filter(item => !item.attributes?.['roles']);
    }

    return items.filter(item => {
      const requiredRoles = item.attributes?.['roles'] as string[];

      // Check if the item has required roles and if the user has one of them
      const hasRequiredRole = requiredRoles && this.userRole != null && requiredRoles.includes(this.userRole);

      // Check if the item has no role restrictions
      const noRoleRestriction = !requiredRoles || requiredRoles.length === 0;

      // If the item is a group with children, filter its children recursively
      if (item.children && item.children.length > 0) {
        const filteredChildren = this.filterNavItems(item.children);
        // Include the group if it has no role restrictions OR if the user has the required role for the group AND it has filtered children
        // Or if it has no role restrictions but has filtered children
         if ((noRoleRestriction || hasRequiredRole) && filteredChildren.length > 0) {
            // Create a new item object to ensure immutability and update children
            return { ...item, children: filteredChildren };
         }
         // Exclude the group if it has no allowed children after filtering
         return false;
      }

      // For items without children, include if there are no role restrictions or user has the required role
      return noRoleRestriction || hasRequiredRole;
    });
  }
}
