import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    title: true,
    name: 'Manage Data'
  },
  {
    name: 'Guild Configurations',
    url: '/guild-configurations', // Changed URL
    iconComponent: { name: 'cil-settings' }
  },
  {
    name: 'Earnings Records',
    url: '/earnings-records',    // New URL
    iconComponent: { name: 'cil-dollar' } // Example icon, change if needed
  },
  {
    name: 'User Management',
    url: '/user-management',
    iconComponent: { name: 'cil-user' },
    attributes: { roles: ['admin'] }
  }
  // ... (rest of the commented out items remain unchanged) ...
];
