// src/app/features/orders/components/order-stats/order-stats.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../../core/services/orders.service';

interface StatCard {
  key: string;
  title: string;
  icon: string;
  colorClass: string;
  change: number;
  isPositive: boolean;
}

@Component({
  selector: 'app-order-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-stats.component.html',
  styleUrls: ['./order-stats.component.scss'],
})
export class OrderStatsComponent {
  private ordersService = inject(OrderService);

  stats = this.ordersService.stats;

  statCards: StatCard[] = [
    {
      key: 'pending',
      title: 'طلبات معلقة',
      icon: 'bi-clock-history',
      colorClass: 'pending',
      change: 12,
      isPositive: true,
    },
    {
      key: 'processing',
      title: 'طلبات قيد المعالجة',
      icon: 'bi-gear',
      colorClass: 'processing',
      change: 8,
      isPositive: true,
    },
    {
      key: 'completed',
      title: 'طلبات مكتملة',
      icon: 'bi-check-circle',
      colorClass: 'completed',
      change: 15,
      isPositive: true,
    },
    {
      key: 'cancelled',
      title: 'طلبات ملغية',
      icon: 'bi-x-circle',
      colorClass: 'cancelled',
      change: 3,
      isPositive: false,
    },
  ];

  getStatValue(key: string): number {
    return this.stats()[key as unknown as keyof ReturnType<typeof this.stats>] || 0;
  }
}
