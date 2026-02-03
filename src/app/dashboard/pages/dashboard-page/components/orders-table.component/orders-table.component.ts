// src/app/components/orders-table/orders-table.component.ts

import { Component, OnInit, output } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';
import { DashboardService } from '../../../../../core/services/dashboard.service';
import { Order } from '../../../../../core/models/order.model'; // ✅ استورد Order

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent implements OnInit {
  orders: any[] = [];

  // ✅ أضف output
  viewOrder = output<Order>();

  columns: TableColumn[] = [
    {
      key: 'id',
      header: 'رقم الطلب',
      type: 'link',
      linkRoute: '/orders',
      linkParam: 'id',
      sortable: true,
    },
    { key: 'customer', header: 'العميل', sortable: true },
    { key: 'date', header: 'التاريخ', type: 'date', sortable: true },
    { key: 'amount', header: 'المبلغ', type: 'currency' },
    {
      key: 'status',
      header: 'الحالة',
      type: 'badge',
      badgeConfig: {
        completed: { label: 'مكتمل', class: 'completed' },
        pending: { label: 'معلق', class: 'pending' },
        processing: { label: 'قيد المعالجة', class: 'processing' },
        cancelled: { label: 'ملغي', class: 'cancelled' },
      },
    },
  ];

  actions: TableAction[] = [
    {
      label: 'عرض',
      icon: 'bi-eye',
      // ✅ غيّر من route إلى callback
      callback: (order) => this.onViewOrder(order),
    },
    {
      label: 'تعديل',
      icon: 'bi-pencil',
      route: '/orders/edit',
      routeParam: 'id',
      visible: (order) => order.status !== 'cancelled',
    },
  ];

  tableConfig: TableConfig = {
    title: 'الطلبات الأخيرة',
    headerActions: [
      {
        label: 'عرض الكل',
        icon: 'bi-list',
        route: '/orders',
      },
      {
        label: 'إضافة طلب',
        icon: 'bi-plus',
        route: '/orders/new',
        class: 'btn btn-success btn-sm',
      },
    ],
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.orders = this.dashboardService.getRecentOrders();
  }

  // ✅ أضف هذه الدالة
  onViewOrder(order: any): void {
    this.viewOrder.emit(order as Order);
  }

  getRecentOrders(): any[] {
    return [
      // ... البيانات
    ];
  }
}
