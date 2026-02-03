// src/app/features/products/components/product-stats/product-stats.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../../core/services/products.service';

interface StatCard {
  key: string;
  title: string;
  icon: string;
  colorClass: string;
  change: number;
  isPositive: boolean;
}

@Component({
  selector: 'app-product-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-stats.component.html',
  styleUrls: ['./product-stats.component.scss'],
})
export class ProductStatsComponent {
  private productsService = inject(ProductsService);

  stats = this.productsService.stats;

  statCards: StatCard[] = [
    {
      key: 'total',
      title: 'إجمالي المنتجات',
      icon: 'bi-box-seam',
      colorClass: 'total',
      change: 8,
      isPositive: true,
    },
    {
      key: 'active',
      title: 'منتجات نشطة',
      icon: 'bi-check-circle',
      colorClass: 'active',
      change: 12,
      isPositive: true,
    },
    {
      key: 'outOfStock',
      title: 'منتجات غير متوفرة',
      icon: 'bi-x-circle',
      colorClass: 'out-of-stock',
      change: 2,
      isPositive: false,
    },
    {
      key: 'lowStock',
      title: 'منتجات قليلة المخزون',
      icon: 'bi-exclamation-triangle',
      colorClass: 'low-stock',
      change: 5,
      isPositive: true,
    },
  ];

  getStatValue(key: string): number {
    return this.stats()[key as unknown as keyof ReturnType<typeof this.stats>] || 0;
  }
}
