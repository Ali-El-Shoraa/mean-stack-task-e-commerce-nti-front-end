// src/app/features/products/components/product-filters/product-filters.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CATEGORY_CONFIG,
  ProductCategory,
  ProductFilters,
  ProductStatus,
  STATUS_CONFIG,
  STOCK_LEVELS,
  StockLevel,
} from '../../../../../core/models/product.model';
import { ProductsService } from '../../../../../core/services/products.service';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent {
  private productsService = inject(ProductsService);

  filters: ProductFilters = {
    category: '',
    status: '',
    stockLevel: '',
    priceFrom: null,
    priceTo: null,
    searchTerm: '',
  };

  categoryOptions = Object.entries(CATEGORY_CONFIG).map(([key, value]) => ({
    value: key as ProductCategory,
    label: value.label,
  }));

  statusOptions = Object.entries(STATUS_CONFIG).map(([key, value]) => ({
    value: key as ProductStatus,
    label: value.label,
  }));

  stockOptions = Object.entries(STOCK_LEVELS).map(([key, value]) => ({
    value: key as StockLevel,
    label: value.label,
  }));

  applyFilters(): void {
    this.productsService.updateFilters(this.filters);
  }

  resetFilters(): void {
    this.filters = {
      category: '',
      status: '',
      stockLevel: '',
      priceFrom: null,
      priceTo: null,
      searchTerm: '',
    };
    this.productsService.resetFilters();
  }
}
