import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, tap, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = environment.apiUrl;
  nameTokenLocalStorage: string = 'token';
  nameUserLocalStorage: string = 'user';

  // إدارة الحالة عبر Signals
  currentUser = signal<any>(JSON.parse(localStorage.getItem(this.nameUserLocalStorage) || 'null'));
  isLoading = signal<boolean>(false);
  loginError = signal<string>('');

  isLoggedIn = computed(() => !!this.currentUser());
  // التحقق مما إذا كان المستخدم admin
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  login(credentials: any) {
    this.isLoading.set(true);
    this.loginError.set('');

    return this.http.post(`${this.apiUrl}${environment.endpoints.login}`, credentials).pipe(
      tap((res: any) => {
        if (res.success) {
          localStorage.setItem(this.nameTokenLocalStorage, res.token);
          localStorage.setItem(this.nameUserLocalStorage, JSON.stringify(res.user));
          this.currentUser.set(res.user);

          // التوجيه التلقائي بعد النجاح
          this.router.navigate(['/home']);
        }
      }),
      catchError((err) => {
        // التعامل مع الخطأ
        const msg = err.error?.message || 'حدث خطأ غير متوقع';
        this.loginError.set(msg);
        return EMPTY; // لإغلاق التدفق بسلام
      }),
      finalize(() => {
        // يتم تنفيذها دائماً سواء نجح الطلب أو فشل
        this.isLoading.set(false);
      }),
    );
  }

  logout() {
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, tap } from 'rxjs';
// import { environment } from '../../../environments/environment.development';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = environment.apiUrl; // Use environment variable for API URL
//   nameTokenLocalStorage: string = 'token';
//   nameUserLocalStorage: string = 'user';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//   ) {}

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}${environment.endpoints.login}`, credentials).pipe(
//       tap((res: any) => {
//         if (res.success) {
//           localStorage.setItem(this.nameTokenLocalStorage, res.token); // حفظ التوكن
//           localStorage.setItem(this.nameUserLocalStorage, JSON.stringify(res.user));
//         }
//       }),
//     );
//   }

//   forgotPassword(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/forgot-password`, { email });
//   }

//   logout() {
//     localStorage.removeItem(this.nameTokenLocalStorage);
//     localStorage.removeItem(this.nameUserLocalStorage);
//     this.router.navigate(['/login']);
//   }

//   getToken() {
//     return localStorage.getItem(this.nameTokenLocalStorage);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
// }
