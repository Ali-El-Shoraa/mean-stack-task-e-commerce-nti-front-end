// src/app/features/orders/models/order.model.ts

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped';
export type PaymentMethod = 'cash' | 'credit' | 'bank';

export interface OrderCustomer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  date: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  items?: OrderItem[];
  address?: string;
  trackingNumber?: string;
  notes?: string;
  totalAmount: number;
  customerName: string;
  createdAt: string;
  orderNumber: string;
}

export interface OrderStats {
  pending: number;
  processing: number;
  completed: number;
  cancelled: number;
  shipped: number;
}

export interface OrderFilters {
  status: OrderStatus | '';
  paymentMethod: PaymentMethod | '';
  dateFrom: string;
  dateTo: string;
  searchTerm: string;
}

export interface StatusConfig {
  label: string;
  class: string;
  icon: string;
  color: string;
}

export const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: 'معلق',
    class: 'pending',
    icon: 'bi-clock-history',
    color: '#ffc107',
  },
  processing: {
    label: 'قيد المعالجة',
    class: 'processing',
    icon: 'bi-gear',
    color: '#0d6efd',
  },
  completed: {
    label: 'مكتمل',
    class: 'completed',
    icon: 'bi-check-circle',
    color: '#28a745',
  },
  cancelled: {
    label: 'ملغي',
    class: 'cancelled',
    icon: 'bi-x-circle',
    color: '#dc3545',
  },
  shipped: {
    label: 'تم الشحن',
    class: 'shipped',
    icon: 'bi-truck',
    color: '#6f42c1',
  },
};

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  cash: 'الدفع عند الاستلام',
  credit: 'بطاقة ائتمان',
  bank: 'تحويل بنكي',
};
