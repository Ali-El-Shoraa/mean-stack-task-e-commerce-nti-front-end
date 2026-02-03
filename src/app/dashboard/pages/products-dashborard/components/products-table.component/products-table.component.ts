// src/app/features/products/components/products-table/products-table.component.ts

import { Component, inject, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../../../../core/services/products.service';
import {
  CATEGORY_CONFIG,
  Product,
  ProductCategory,
  ProductStatus,
  STATUS_CONFIG,
} from '../../../../../core/models/product.model';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  private productsService = inject(ProductsService);

  products = this.productsService.paginatedProducts;
  totalProducts = this.productsService.filteredProducts;
  currentPage = this.productsService.currentPage;
  totalPages = this.productsService.totalPages;
  pageSize = this.productsService.pageSize;

  viewProduct = output<Product>();
  editProduct = output<Product>();
  manageStock = output<Product>();

  getCategoryConfig(category: ProductCategory) {
    return CATEGORY_CONFIG[category];
  }

  getStatusConfig(status: ProductStatus) {
    return STATUS_CONFIG[status];
  }

  getStockLevel(stock: number): string {
    return this.productsService.getStockLevel(stock);
  }

  getStockLabel(stock: number): string {
    if (stock === 0) return 'نفذ';
    return `${stock} قطعة`;
  }

  onView(product: Product): void {
    this.viewProduct.emit(product);
  }

  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }

  onManageStock(product: Product): void {
    this.manageStock.emit(product);
  }

  onDelete(product: Product): void {
    if (confirm(`هل أنت متأكد من حذف "${product.name}"؟`)) {
      this.productsService.deleteProduct(product.id);
    }
  }

  exportProducts(): void {
    console.log('تصدير المنتجات');
  }

  get pageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.productsService.setPage(page);
    }
  }

  get paginationInfo(): string {
    const current = this.currentPage();
    const size = this.pageSize();
    const total = this.totalProducts().length;
    const start = (current - 1) * size + 1;
    const end = Math.min(current * size, total);
    return `عرض ${start} إلى ${end} من ${total} منتج`;
  }
}
