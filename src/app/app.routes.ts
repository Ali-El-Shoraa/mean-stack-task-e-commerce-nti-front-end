import { Routes } from '@angular/router';
import { routesWebsite } from './website/website.routes';
import { routesDashboard } from './dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    children: routesWebsite,
  },
  {
    path: 'dashboard',
    children: routesDashboard,
  },
];
