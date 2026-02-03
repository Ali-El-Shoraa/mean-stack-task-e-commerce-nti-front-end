import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // إذا كان مسجل دخول، امنعه ووجهه للرئيسية أو الـ Dashboard
    router.navigate(['/']);
    return false;
  }

  // إذا كان زائر، اسمح له بالدخول لصفحة اللوجن
  return true;
};

// جارد آخر لحماية الصفحات الخاصة (مثل البروفايل أو السلة)
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // إذا لم يكن مسجل دخول، وجهه لصفحة اللوجن
  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // إذا كان مسجل دخول وَ هو مسؤول
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // إذا لم يكن مسؤولاً، وجهه لصفحة غير مصرح له بها أو للرئيسية
  router.navigate(['/home']);
  return false;
};
