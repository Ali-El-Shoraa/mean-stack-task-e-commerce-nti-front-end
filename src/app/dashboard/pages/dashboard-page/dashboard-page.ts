// src/app/features/dashboard/components/dashboard/dashboard.component.ts

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
// ✅ استيراد كل شيء من ملف واحد فقط
import {
  Order,
  OrderStatus,
  PaymentMethod,
  STATUS_CONFIG,
  PAYMENT_METHODS,
} from '../../../core/models/order.model';
import { OrderService } from '../../../core/services/orders.service';
import { StatsCardsComponent } from './components/stats-cards.component/stats-cards.component';
import { ChartsComponent } from './components/charts.component/charts.component';
import { OrdersTableComponent } from './components/orders-table.component/orders-table.component';
import { ActivityFeedComponent } from './components/activity-feed.component/activity-feed.component';
import { QuickActionsComponent } from './components/quick-actions.component/quick-actions.component';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByPayment: Record<string, number>;
  recentOrders: Order[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardsComponent,
    ChartsComponent,
    OrdersTableComponent,
    ActivityFeedComponent,
    QuickActionsComponent,
  ],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private ordersService = inject(OrderService);
  private destroy$ = new Subject<void>();

  stats: DashboardStats = {
    totalOrders: 0,
    totalRevenue: 0,
    ordersByStatus: {},
    ordersByPayment: {},
    recentOrders: [],
  };

  statusConfig = STATUS_CONFIG;
  paymentMethods = PAYMENT_METHODS;

  ngOnInit(): void {
    this.ordersService.loadOrders().subscribe();

    // ✅ بدون type annotation — TypeScript يعرف النوع تلقائياً
    this.ordersService.orders$.pipe(takeUntil(this.destroy$)).subscribe((orders) => {
      this.calculateStats(orders);
    });
  }

  private calculateStats(orders: Order[]): void {
    if (!orders.length) return;

    this.stats.totalOrders = orders.length;

    // ✅ totalAmount موجود في Order interface
    this.stats.totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // ✅ order.status نوعه OrderStatus — يعمل مباشرة مع STATUS_CONFIG
    this.stats.ordersByStatus = orders.reduce(
      (acc, order) => {
        const label = STATUS_CONFIG[order.status]?.label || order.status;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // ✅ order.paymentMethod نوعه PaymentMethod — يعمل مباشرة مع PAYMENT_METHODS
    this.stats.ordersByPayment = orders.reduce(
      (acc, order) => {
        const label = PAYMENT_METHODS[order.paymentMethod] || order.paymentMethod;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // ✅ createdAt موجود في Order interface
    this.stats.recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
