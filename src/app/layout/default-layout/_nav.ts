import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Manage Data', // Changed from a title to a collapsible group
    url: '/manage-data', // Base URL for the group, can be non-navigable if needed
    iconComponent: { name: 'cil-layers' }, // Added an icon for the group
    children: [
      {
        name: 'Guild Configurations',
        url: '/guild-configurations',
        iconComponent: { name: 'cil-settings' }
      },
      {
        name: 'Earnings Records',
        url: '/earnings-records',
        iconComponent: { name: 'cil-dollar' }
      },
      {
        name: 'User Management',
        url: '/user-management',
        iconComponent: { name: 'cil-user' },
        attributes: { roles: ['admin'] } // Add this line to restrict visibility
      }
    ]
  }
  // ... (rest of the commented out items remain unchanged) ...
];
