// src/app/features/orders/components/order-filters/order-filters.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  OrderFilters,
  OrderStatus,
  PAYMENT_METHODS,
  PaymentMethod,
  STATUS_CONFIG,
} from '../../../../../core/models/order.model';
import { OrderService } from '../../../../../core/services/orders.service';

@Component({
  selector: 'app-order-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-filters.component.html',
  styleUrls: ['./order-filters.component.scss'],
})
export class OrderFiltersComponent {
  private ordersService = inject(OrderService);

  filters: OrderFilters = {
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: '',
    searchTerm: '',
  };

  statusOptions = Object.entries(STATUS_CONFIG).map(([key, value]) => ({
    value: key as OrderStatus,
    label: value.label,
  }));

  paymentOptions = Object.entries(PAYMENT_METHODS).map(([key, value]) => ({
    value: key as PaymentMethod,
    label: value,
  }));

  applyFilters(): void {
    this.ordersService.updateFilters(this.filters);
  }

  resetFilters(): void {
    this.filters = {
      status: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: '',
      searchTerm: '',
    };
    this.ordersService.resetFilters();
  }
}
