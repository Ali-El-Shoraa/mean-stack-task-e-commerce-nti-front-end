// src/app/features/products/components/products-grid/products-grid.component.ts

import { Component, inject, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  CATEGORY_CONFIG,
  Product,
  ProductCategory,
  ProductStatus,
  STATUS_CONFIG,
} from '../../../../../core/models/product.model';
import { ProductsService } from '../../../../../core/services/products.service';

@Component({
  selector: 'app-products-grid',
  imports: [CommonModule],
  // styleUrl: './products-grid.component.scss',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent {
  private productsService = inject(ProductsService);

  products = this.productsService.paginatedProducts;

  viewProduct = output<Product>();
  editProduct = output<Product>();
  manageStock = output<Product>();

  getCategoryConfig = (category: ProductCategory) => CATEGORY_CONFIG[category];
  getStatusConfig = (status: ProductStatus) => STATUS_CONFIG[status];
  getStockLevel = (stock: number) => this.productsService.getStockLevel(stock);
}
