import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'resume review',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
];
