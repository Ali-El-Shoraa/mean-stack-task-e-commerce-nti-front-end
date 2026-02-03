import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + environment.endpoints.products;

  // 1. إدارة الحالة (State Management) باستخدام Signals
  products = signal<any[]>([]);
  totalProducts = signal(0);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // 2. دالة جلب البيانات مع إدارة الأخطاء والحالة
  getProducts(filters: any): Observable<any> {
    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params = params.append(key, filters[key]);
    });

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      tap((res) => {
        // تحديث الـ Signals عند النجاح
        this.products.set(res.data);
        this.totalProducts.set(res.total);
      }),
      catchError((err) => {
        const errorMessage = err.error?.message || 'حدث خطأ أثناء تحميل المنتجات';
        this.error.set(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        // تعمل دائماً سواء نجح الطلب أو فشل (مثل إغلاق الـ Spinner)
        this.isLoading.set(false);
      }),
    );
  }
}
