// core/services/auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap, EMPTY, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CartService } from './cart.service';

// ✅ Interfaces
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  // ✅ Signals للحالة
  currentUser = signal<User | null>(this.getStoredUser());
  isLoading = signal<boolean>(false);
  loginError = signal<string>('');
  registerError = signal<string>('');

  // ✅ Computed Signals
  isLoggedIn = computed(() => !!this.currentUser() && !!this.getToken());
  isAdmin = computed(() => this.currentUser()?.role === 'admin');
  userFullName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  });

  // ============================================
  // ✅ تسجيل الدخول
  // ============================================
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.loginError.set('');

    return this.http
      .post<AuthResponse>(`${this.apiUrl}${environment.endpoints.login}`, credentials)
      .pipe(
        tap((res) => {
          if (res.success) {
            this.handleAuthSuccess(res);
            // التوجيه حسب الـ Role
            const redirectUrl = res.user.role === 'admin' ? '/admin/dashboard' : '/home';
            this.router.navigate([redirectUrl]);
          }
        }),
        catchError((err) => {
          const msg = err.error?.message || 'بيانات تسجيل الدخول غير صحيحة';
          this.loginError.set(msg);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }

  // ============================================
  // ✅ تسجيل حساب جديد
  // ============================================
  register(data: RegisterData): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.registerError.set('');

    return this.http
      .post<AuthResponse>(`${this.apiUrl}${environment.endpoints.register}`, data)
      .pipe(
        tap((res) => {
          if (res.success) {
            this.handleAuthSuccess(res);
            this.router.navigate(['/home']);
          }
        }),
        catchError((err) => {
          const msg = err.error?.message || 'حدث خطأ أثناء إنشاء الحساب';
          this.registerError.set(msg);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }

  // ============================================
  // ✅ تسجيل الخروج
  // ============================================
  logout(): void {
    // إرسال طلب للـ Backend (اختياري)
    this.http.post(`${this.apiUrl}${environment.endpoints.logout}`, {}).subscribe({
      complete: () => this.clearAuth(),
      error: () => this.clearAuth(),
    });
  }

  // ============================================
  // ✅ نسيت كلمة المرور
  // ============================================
  forgotPassword(email: string): Observable<any> {
    this.isLoading.set(true);
    return this.http
      .post(`${this.apiUrl}/auth/forgot-password`, { email })
      .pipe(finalize(() => this.isLoading.set(false)));
  }

  // ============================================
  // ✅ إعادة تعيين كلمة المرور
  // ============================================
  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    this.isLoading.set(true);
    return this.http
      .post(`${this.apiUrl}/auth/reset-password`, { email, otp, newPassword })
      .pipe(finalize(() => this.isLoading.set(false)));
  }

  // ============================================
  // ✅ تحديث الملف الشخصي
  // ============================================
  updateProfile(data: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/update-profile`, data).pipe(
      tap((res: any) => {
        if (res.success && res.user) {
          this.currentUser.set(res.user);
          localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
        }
      }),
    );
  }

  // ============================================
  // ✅ Helper Methods
  // ============================================
  private injector = inject(Injector);

  private get cartService(): CartService {
    return this.injector.get(CartService);
  }

  // أو يمكنك استخدام event-based approach:
  // أضف هذا في handleAuthSuccess
  private handleAuthSuccess(res: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // للتحقق من صلاحية الـ Token
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable, computed, inject, signal } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, finalize, tap, EMPTY } from 'rxjs';
// import { environment } from '../../../environments/environment.development';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private http = inject(HttpClient);
//   private router = inject(Router);

//   private apiUrl = environment.apiUrl;
//   nameTokenLocalStorage: string = 'token';
//   nameUserLocalStorage: string = 'user';

//   // إدارة الحالة عبر Signals
//   currentUser = signal<any>(JSON.parse(localStorage.getItem(this.nameUserLocalStorage) || 'null'));
//   isLoading = signal<boolean>(false);
//   loginError = signal<string>('');

//   isLoggedIn = computed(() => !!this.currentUser());
//   // التحقق مما إذا كان المستخدم admin
//   isAdmin = computed(() => this.currentUser()?.role === 'admin');

//   login(credentials: any) {
//     this.isLoading.set(true);
//     this.loginError.set('');

//     return this.http.post(`${this.apiUrl}${environment.endpoints.login}`, credentials).pipe(
//       tap((res: any) => {
//         if (res.success) {
//           localStorage.setItem(this.nameTokenLocalStorage, res.token);
//           localStorage.setItem(this.nameUserLocalStorage, JSON.stringify(res.user));
//           this.currentUser.set(res.user);

//           // التوجيه التلقائي بعد النجاح
//           this.router.navigate(['/home']);
//         }
//       }),
//       catchError((err) => {
//         // التعامل مع الخطأ
//         const msg = err.error?.message || 'حدث خطأ غير متوقع';
//         this.loginError.set(msg);
//         return EMPTY; // لإغلاق التدفق بسلام
//       }),
//       finalize(() => {
//         // يتم تنفيذها دائماً سواء نجح الطلب أو فشل
//         this.isLoading.set(false);
//       }),
//     );
//   }

//   logout() {
//     localStorage.clear();
//     this.currentUser.set(null);
//     this.router.navigate(['/login']);
//   }
// }
// // import { HttpClient } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { Router } from '@angular/router';
// // import { Observable, tap } from 'rxjs';
// // import { environment } from '../../../environments/environment.development';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AuthService {
// //   private apiUrl = environment.apiUrl; // Use environment variable for API URL
// //   nameTokenLocalStorage: string = 'token';
// //   nameUserLocalStorage: string = 'user';

// //   constructor(
// //     private http: HttpClient,
// //     private router: Router,
// //   ) {}

// //   login(credentials: any): Observable<any> {
// //     return this.http.post(`${this.apiUrl}${environment.endpoints.login}`, credentials).pipe(
// //       tap((res: any) => {
// //         if (res.success) {
// //           localStorage.setItem(this.nameTokenLocalStorage, res.token); // حفظ التوكن
// //           localStorage.setItem(this.nameUserLocalStorage, JSON.stringify(res.user));
// //         }
// //       }),
// //     );
// //   }

// //   forgotPassword(email: string): Observable<any> {
// //     return this.http.post(`${this.apiUrl}/forgot-password`, { email });
// //   }

// //   logout() {
// //     localStorage.removeItem(this.nameTokenLocalStorage);
// //     localStorage.removeItem(this.nameUserLocalStorage);
// //     this.router.navigate(['/login']);
// //   }

// //   getToken() {
// //     return localStorage.getItem(this.nameTokenLocalStorage);
// //   }

// //   isLoggedIn(): boolean {
// //     return !!this.getToken();
// //   }
// // }
