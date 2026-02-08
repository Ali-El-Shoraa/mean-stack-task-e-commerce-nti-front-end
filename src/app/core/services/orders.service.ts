// src/app/core/services/orders.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order, OrderFilters } from '../models/order.model';
import { ApiResponse } from '../models/interfaces.model';
import { environment } from '../../../environments/environment.development';

const DEFAULT_FILTERS: OrderFilters = {
  status: '',
  paymentMethod: '',
  dateFrom: '',
  dateTo: '',
  searchTerm: '',
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiUrl}/order`;

  // ✅ Orders Subjects
  private allOrdersSubject = new BehaviorSubject<Order[]>([]);

  // ✅ Filters
  private filtersSubject = new BehaviorSubject<OrderFilters>(DEFAULT_FILTERS);
  public filters$ = this.filtersSubject.asObservable();

  // ✅ Orders after filters
  public orders$ = combineLatest([this.allOrdersSubject, this.filtersSubject]).pipe(
    map(([orders, filters]) => this.applyFilters(orders, filters)),
  );

  // ✅ STATS - إضافة جديدة باستخدام Signals (Angular 18+)
  private ordersSignal = signal<Order[]>([]);

  // حساب الإحصائيات تلقائياً عند تغيير الطلبات
  public stats = computed(() => {
    const orders = this.ordersSignal();
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
      totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    };
  });

  constructor(private http: HttpClient) {
    // تحديث Signal عند تغيير allOrders
    this.allOrdersSubject.subscribe((orders) => {
      this.ordersSignal.set(orders);
    });
  }

  // ========== API ==========
  loadOrders(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap((orders) => this.allOrdersSubject.next(orders)),
    );
  }

  checkout(): Observable<Order> {
    return this.http.post<ApiResponse<Order>>(this.apiUrl, {}).pipe(map((res) => res.data));
  }

  createCODPayment(orderId: string, addressId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/profile/payment/cod`, { orderId, addressId });
  }

  // ========== Filters ==========
  updateFilters(filters: OrderFilters): void {
    this.filtersSubject.next({ ...filters });
  }

  resetFilters(): void {
    this.filtersSubject.next({ ...DEFAULT_FILTERS });
  }

  // ========== Mock Data للتجربة ==========
  getMockRecentOrders(): Order[] {
    // استخدم الكود اللي عملناه قبل كده
    return [
      /* بيانات الطلبات الكاملة */
    ];
  }

  // ========== Private ==========
  private applyFilters(orders: Order[], filters: OrderFilters): Order[] {
    let result = [...orders];

    if (filters.status) {
      result = result.filter((o) => o.status === filters.status);
    }

    if (filters.paymentMethod) {
      result = result.filter((o) => o.paymentMethod === filters.paymentMethod);
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom).getTime();
      result = result.filter((o) => new Date(o.createdAt).getTime() >= from);
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo).getTime();
      result = result.filter((o) => new Date(o.createdAt).getTime() <= to);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(term) ||
          o.customer.name.toLowerCase().includes(term) ||
          o.customer.email.toLowerCase().includes(term),
      );
    }

    return result;
  }
}
