import { Routes } from '@angular/router';
import { RootLayout } from './layouts/root-layout/root-layout';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { OrdersDashborard } from './pages/orders-dashborard/orders-dashborard';
import { ProductsDashborard } from './pages/products-dashborard/products-dashborard';

export const routesDashboard: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: RootLayout,
    children: [
      {
        path: 'home',
        component: DashboardPage,
      },
      {
        path: 'orders',
        component: OrdersDashborard,
      },
      {
        path: 'products',
        component: ProductsDashborard,
      },
    ],
  },
  // {
  //   path: 'login',
  //   component: LoginPage,
  //   canActivate: [guestGuard],
  // },
  // {
  //   path: 'register',
  //   component: RegisterPage,
  //   canActivate: [guestGuard],
  // },
];
