import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
    // No roles: visible to all
  },
  {
    name: 'Manage Data',
    url: '/manage-data',
    iconComponent: { name: 'cil-layers' },
    attributes: { roles: ['admin', 'manager'] }, // Only admin and manager
    children: [
      {
        name: 'Guild Configurations',
        url: '/guild-configurations',
        iconComponent: { name: 'cil-settings' },
        attributes: { roles: ['admin', 'manager'] }
      },
      {
        name: 'Earnings Records',
        url: '/earnings-records',
        iconComponent: { name: 'cil-dollar' },
        attributes: { roles: ['admin', 'manager'] }
      },
      {
        name: 'User Management',
        url: '/user-management',
        iconComponent: { name: 'cil-user' },
        attributes: { roles: ['admin'] } // Only admin
      }
    ]
  }
];
export { INavData };