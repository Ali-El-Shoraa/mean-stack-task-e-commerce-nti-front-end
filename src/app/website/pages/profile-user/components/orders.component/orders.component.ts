// src/app/pages/profile/components/orders/orders.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders = [
    {
      id: '#ORD-2023-001',
      date: '15 مارس 2023',
      total: '$149.99',
      statusClass: 'delivered',
      statusText: 'تم التوصيل',
    },
    {
      id: '#ORD-2023-002',
      date: '10 فبراير 2023',
      total: '$89.99',
      statusClass: 'delivered',
      statusText: 'تم التوصيل',
    },
    {
      id: '#ORD-2023-003',
      date: '5 يناير 2023',
      total: '$199.99',
      statusClass: 'processing',
      statusText: 'قيد التجهيز',
    },
    {
      id: '#ORD-2022-015',
      date: '20 ديسمبر 2022',
      total: '$74.99',
      statusClass: 'pending',
      statusText: 'معلق',
    },
    {
      id: '#ORD-2022-012',
      date: '10 نوفمبر 2022',
      total: '$129.99',
      statusClass: 'cancelled',
      statusText: 'ملغي',
    },
  ];
}
