import { Routes } from '@angular/router';
import { RootLayout } from './layouts/root-layout/root-layout';
import { OrdersDashborard } from './pages/orders-dashborard/orders-dashborard';
import { ProductsDashborard } from './pages/products-dashborard/products-dashborard';
import { ClientsDashborard } from './pages/clients-dashborard/clients-dashborard';
import { RepoertsDashborard } from './pages/repoerts-dashborard/repoerts-dashborard';
import { OffersDashborard } from './pages/offers-dashborard/offers-dashborard';
import { ReviewsDashborard } from './pages/reviews-dashborard/reviews-dashborard';
import { SettingsDashborard } from './pages/settings-dashborard/settings-dashborard';
import { DashboardComponent } from './pages/dashboard-page/dashboard-page';

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
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: OrdersDashborard,
      },
      {
        path: 'products',
        component: ProductsDashborard,
      },
      {
        path: 'customers',
        component: ClientsDashborard,
      },
      {
        path: 'reports',
        component: RepoertsDashborard,
      },
      {
        path: 'offers',
        component: OffersDashborard,
      },
      {
        path: 'reviews',
        component: ReviewsDashborard,
      },
      {
        path: 'settings',
        component: SettingsDashborard,
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
