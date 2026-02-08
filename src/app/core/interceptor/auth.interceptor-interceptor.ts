// core/interceptors/auth.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // ✅ إضافة Token للـ Header
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // ✅ إذا كان الـ Token منتهي أو غير صالح
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }

      // ✅ إذا لم يكن مصرح له
      if (error.status === 403) {
        router.navigate(['/unauthorized']);
      }

      return throwError(() => error);
    }),
  );
};
