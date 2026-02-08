import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      // إذا كنت تريد استخدام الـ Interceptor الذي شرحناه سابقاً أضفه هنا
      withInterceptors([authInterceptor]),
      // provideHttpClient(withInterceptors([authInterceptor])), // ✅ تسجيل الـ Interceptor
    ),
  ],
};
