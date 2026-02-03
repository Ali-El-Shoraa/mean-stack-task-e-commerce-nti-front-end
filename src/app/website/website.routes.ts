import { Routes } from '@angular/router';
import { RootLayout } from './layouts/root-layout/root-layout';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/auth/login-page/login-page';
import { RegisterPage } from './pages/auth/register-page/register-page';
import { AboutUsPage } from './pages/about-us-page/about-us-page';
import { authGuard, guestGuard } from '../core/gurds/auth-guard';
import { SearchPage } from './pages/search-page/search-page';

export const routesWebsite: Routes = [
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
        component: HomePage,
      },
      {
        path: 'about-us',
        component: AboutUsPage,
      },
      {
        path: 'search',
        component: SearchPage,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [guestGuard],
  },
];
