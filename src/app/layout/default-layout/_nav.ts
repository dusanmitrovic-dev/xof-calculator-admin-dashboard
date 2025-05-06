import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    title: true,
    name: 'Manage Data'
  },
  {
    name: 'Guild Configurations',
    url: '/guild-management',
    iconComponent: { name: 'cil-settings' } // Includes Guild Config & Earnings
  },
  {
    name: 'User Management',
    url: '/user-management',
    iconComponent: { name: 'cil-user' },
    attributes: { roles: ['admin'] } // Added roles attribute
  },
  // ... (rest of the commented out items remain unchanged) ...
];
