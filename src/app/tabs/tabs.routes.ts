import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.routes'),
      },
      {
        path: 'incomes',
        loadChildren: () => import('../incomes/incomes.routes'),
      },
      {
        path: 'expenses',
        loadChildren: () => import('../expenses/expenses.routes'),
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];

export default routes;
