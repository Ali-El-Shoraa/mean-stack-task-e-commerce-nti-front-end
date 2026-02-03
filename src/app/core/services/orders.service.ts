// src/app/features/orders/services/orders.service.ts

import { Injectable, signal, computed } from '@angular/core';
import { Order, OrderStats, OrderFilters, OrderStatus, STATUS_CONFIG } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // Signals
  private ordersSignal = signal<Order[]>(this.getMockOrders());
  private filtersSignal = signal<OrderFilters>({
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: '',
    searchTerm: '',
  });
  private loadingSignal = signal<boolean>(false);
  private currentPageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(8);

  // Public signals
  orders = this.ordersSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  currentPage = this.currentPageSignal.asReadonly();
  pageSize = this.pageSizeSignal.asReadonly();

  // Computed values
  filteredOrders = computed(() => {
    const orders = this.ordersSignal();
    const filters = this.filtersSignal();

    return orders.filter((order) => {
      // Status filter
      if (filters.status && order.status !== filters.status) return false;

      // Payment method filter
      if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) return false;

      // Date filters
      if (filters.dateFrom && new Date(order.date) < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && new Date(order.date) > new Date(filters.dateTo)) return false;

      // Search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          order.id.toLowerCase().includes(searchLower) ||
          order.customer.name.toLowerCase().includes(searchLower) ||
          order.customer.email.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  });

  paginatedOrders = computed(() => {
    const filtered = this.filteredOrders();
    const page = this.currentPageSignal();
    const size = this.pageSizeSignal();
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredOrders().length / this.pageSizeSignal());
  });

  stats = computed<OrderStats>(() => {
    const orders = this.ordersSignal();
    return {
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
    };
  });

  // Methods
  updateFilters(filters: Partial<OrderFilters>): void {
    this.filtersSignal.update((current) => ({ ...current, ...filters }));
    this.currentPageSignal.set(1);
  }

  resetFilters(): void {
    this.filtersSignal.set({
      status: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: '',
      searchTerm: '',
    });
    this.currentPageSignal.set(1);
  }

  setPage(page: number): void {
    this.currentPageSignal.set(page);
  }

  changeOrderStatus(orderId: string, newStatus: OrderStatus): void {
    this.ordersSignal.update((orders) =>
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    );
  }

  deleteOrder(orderId: string): void {
    this.ordersSignal.update((orders) => orders.filter((o) => o.id !== orderId));
  }

  getOrderById(orderId: string): Order | undefined {
    return this.ordersSignal().find((o) => o.id === orderId);
  }

  getStatusConfig(status: OrderStatus): (typeof STATUS_CONFIG)[OrderStatus] {
    return STATUS_CONFIG[status];
  }

  // Mock data
  private getMockOrders(): Order[] {
    return [
      {
        id: 'ORD-7842',
        customer: {
          id: 1,
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+966 50 123 4567',
        },
        date: '2023-12-15',
        amount: 245.99,
        paymentMethod: 'credit',
        status: 'completed',
        address: 'شارع الملك فهد، الرياض، السعودية',
        trackingNumber: 'TRK-789456123',
        items: [
          { id: 1, productName: 'تيشيرت قطني مميز', quantity: 2, price: 29.99, total: 59.98 },
          { id: 2, productName: 'جينز ضيق أزرق', quantity: 1, price: 49.99, total: 49.99 },
          { id: 3, productName: 'هودي رجالي شتوي', quantity: 1, price: 44.99, total: 44.99 },
        ],
      },
      {
        id: 'ORD-7841',
        customer: { id: 2, name: 'سارة علي', email: 'sara@example.com' },
        date: '2023-12-14',
        amount: 189.5,
        paymentMethod: 'cash',
        status: 'processing',
      },
      {
        id: 'ORD-7840',
        customer: { id: 3, name: 'خالد حسن', email: 'khalid@example.com' },
        date: '2023-12-14',
        amount: 320.75,
        paymentMethod: 'bank',
        status: 'shipped',
      },
      {
        id: 'ORD-7839',
        customer: { id: 4, name: 'فاطمة عبدالله', email: 'fatima@example.com' },
        date: '2023-12-13',
        amount: 150.0,
        paymentMethod: 'credit',
        status: 'pending',
      },
      {
        id: 'ORD-7838',
        customer: { id: 5, name: 'عمر كمال', email: 'omar@example.com' },
        date: '2023-12-12',
        amount: 425.3,
        paymentMethod: 'cash',
        status: 'cancelled',
      },
      {
        id: 'ORD-7837',
        customer: { id: 6, name: 'نورة سالم', email: 'nora@example.com' },
        date: '2023-12-11',
        amount: 89.99,
        paymentMethod: 'credit',
        status: 'completed',
      },
      {
        id: 'ORD-7836',
        customer: { id: 7, name: 'مريم خالد', email: 'mariam@example.com' },
        date: '2023-12-10',
        amount: 275.5,
        paymentMethod: 'bank',
        status: 'shipped',
      },
      {
        id: 'ORD-7835',
        customer: { id: 8, name: 'يوسف أحمد', email: 'yousef@example.com' },
        date: '2023-12-09',
        amount: 199.99,
        paymentMethod: 'cash',
        status: 'pending',
      },
    ];
  }
}
