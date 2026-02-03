// src/app/features/orders/components/order-details-modal/order-details-modal.component.ts

import { Component, Input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Order, PAYMENT_METHODS, STATUS_CONFIG } from '../../../../../core/models/order.model';

@Component({
  selector: 'app-order-details-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
})
export class OrderDetailsModalComponent {
  @Input() order: Order | null = null;

  close = output<void>();

  statusConfig = STATUS_CONFIG;
  paymentMethods = PAYMENT_METHODS;

  getStatusLabel(status: string): string {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label || status;
  }

  getStatusClass(status: string): string {
    return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.class || '';
  }

  getPaymentLabel(method: string): string {
    return PAYMENT_METHODS[method as keyof typeof PAYMENT_METHODS] || method;
  }

  get subtotal(): number {
    return this.order?.items?.reduce((sum, item) => sum + item.total, 0) || 0;
  }

  get tax(): number {
    return this.subtotal * 0.15;
  }

  get shipping(): number {
    return 10;
  }

  get total(): number {
    return this.subtotal + this.tax + this.shipping;
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  printInvoice(): void {
    window.print();
  }
}
