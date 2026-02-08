// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-products-dashborard',
//   imports: [],
//   templateUrl: './products-dashborard.html',
//   styleUrl: './products-dashborard.scss',
// })
// export class ProductsDashborard {

// }

// src/app/features/products/products.component.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductsTableComponent } from './components/products-table.component/products-table.component';
import { ProductsGridComponent } from './components/products-grid.component/products-grid.component';
import { ProductStatsComponent } from './components/product-stats.component/product-stats.component';
import { ProductFiltersComponent } from './components/product-filters.component/product-filters.component';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductsTableComponent,
    ProductsGridComponent,
    ProductStatsComponent,
    ProductFiltersComponent,
  ],
  templateUrl: './products-dashborard.html',
  styleUrl: './products-dashborard.scss',
})
export class ProductsDashborard {
  private productsService = inject(ProductsService);

  sidebarOpen = signal(false);
  viewMode = signal<'table' | 'grid'>('table');
  today = new Date();

  onSearch(term: string): void {
    this.productsService.updateFilters({ searchTerm: term });
  }

  onViewProduct(product: Product): void {
    console.log('عرض المنتج:', product);
  }

  onEditProduct(product: Product): void {
    console.log('تعديل المنتج:', product);
  }

  onManageStock(product: Product): void {
    console.log('إدارة المخزون:', product);
  }

  onAddProduct(): void {
    console.log('إضافة منتج جديد');
  }

  onExportProducts(): void {
    console.log('تصدير المنتجات');
  }
}
