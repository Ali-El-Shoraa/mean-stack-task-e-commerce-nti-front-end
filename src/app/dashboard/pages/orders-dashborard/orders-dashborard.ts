// ✅ استخدم Order من order.model.ts فقط
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/order.model';
import { OrderStatsComponent } from './components/order-stats.component/order-stats.component';
import { OrderDetailsModalComponent } from './components/order-details-modal.component/order-details-modal.component';
import { Component, inject, signal } from '@angular/core';
import { OrdersDashboardTableComponent } from './components/orders-dashboard-table.component/orders-dashboard-table.component';
import { OrderService } from '../../../core/services/orders.service';
import { OrderFiltersComponent } from './components/order-filters.component/order-filters.component';

@Component({
  selector: 'app-orders-dashborard',
  imports: [
    CommonModule,
    OrderStatsComponent,
    OrderFiltersComponent,
    OrderDetailsModalComponent,
    OrdersDashboardTableComponent,
  ],
  templateUrl: './orders-dashborard.html',
  styleUrl: './orders-dashborard.scss',
})
export class OrdersDashborard {
  private ordersService = inject(OrderService);

  selectedOrder = signal<Order | null>(null);
  showModal = signal<boolean>(false);

  onViewOrder(order: Order): void {
    this.selectedOrder.set(order);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.selectedOrder.set(null);
  }
}
