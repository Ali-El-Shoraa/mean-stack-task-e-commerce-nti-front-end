// src/app/core/services/products.service.ts

import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductFilters, ProductStats, StockLevel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  // بيانات المنتجات
  private productsData: Product[] = [
    {
      _id: 1,
      name: 'تيشيرت قطني مميز',
      code: 'TSH-001',
      category: 'men',
      price: 29.99,
      stock: 45,
      status: 'active',
      description: 'تيشيرت قطني عالي الجودة',
    },
    {
      _id: 2,
      name: 'جينز ضيق أزرق',
      code: 'JNS-002',
      category: 'women',
      price: 49.99,
      stock: 3,
      status: 'active',
      description: 'جينز ضيق أزرق من الدنيم',
    },
    {
      _id: 3,
      name: 'هودي رجالي شتوي',
      code: 'HOD-003',
      category: 'men',
      price: 44.99,
      stock: 12,
      status: 'active',
      description: 'هودي شتوي دافئ',
    },
    {
      _id: 4,
      name: 'فستان صيفي مزهر',
      code: 'DRS-004',
      category: 'women',
      price: 59.99,
      stock: 0,
      status: 'out-of-stock',
      description: 'فستان صيفي خفيف',
    },
    {
      _id: 5,
      name: 'تيشيرت أطفال قطني',
      code: 'KTS-005',
      category: 'kids',
      price: 19.99,
      stock: 67,
      status: 'active',
      description: 'تيشيرت قطني مريح للأطفال',
    },
    {
      _id: 6,
      name: 'ساعة يدوية أنيقة',
      code: 'WCH-006',
      category: 'accessories',
      price: 89.99,
      stock: 8,
      status: 'inactive',
      description: 'ساعة يدوية أنيقة',
    },
    {
      _id: 7,
      name: 'حقيبة كتف جلدية',
      code: 'BAG-007',
      category: 'accessories',
      price: 75.5,
      stock: 5,
      status: 'active',
      description: 'حقيبة كتف جلدية',
    },
    {
      _id: 8,
      name: 'نظارات شمسية كلاسيكية',
      code: 'SNG-008',
      category: 'accessories',
      price: 39.99,
      stock: 32,
      status: 'active',
      description: 'نظارات شمسية كلاسيكية',
    },
  ];

  // Signals
  products = signal<Product[]>(this.productsData);
  filters = signal<ProductFilters>({
    category: '',
    status: '',
    stockLevel: '',
    priceFrom: null,
    priceTo: null,
    searchTerm: '',
  });

  currentPage = signal(1);
  pageSize = signal(8);

  // Computed
  filteredProducts = computed(() => {
    const f = this.filters();
    return this.products().filter((product) => {
      if (f.category && product.category !== f.category) return false;
      if (f.status && product.status !== f.status) return false;
      if (f.stockLevel && this.getStockLevel(product.stock) !== f.stockLevel) return false;
      if (f.priceFrom && product.price < f.priceFrom) return false;
      if (f.priceTo && product.price > f.priceTo) return false;
      if (f.searchTerm) {
        const term = f.searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(term) || product.code.toLowerCase().includes(term)
        );
      }
      return true;
    });
  });

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredProducts().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.pageSize()));

  stats = computed<ProductStats>(() => {
    const all = this.products();
    return {
      total: all.length,
      active: all.filter((p) => p.status === 'active').length,
      outOfStock: all.filter((p) => p.status === 'out-of-stock').length,
      lowStock: all.filter((p) => p.stock > 0 && p.stock <= 10).length,
    };
  });

  // Methods
  getStockLevel(stock: number): StockLevel {
    if (stock === 0) return 'out';
    if (stock <= 5) return 'low';
    if (stock <= 20) return 'medium';
    return 'high';
  }

  updateFilters(newFilters: Partial<ProductFilters>): void {
    this.filters.update((f) => ({ ...f, ...newFilters }));
    this.currentPage.set(1);
  }

  resetFilters(): void {
    this.filters.set({
      category: '',
      status: '',
      stockLevel: '',
      priceFrom: null,
      priceTo: null,
      searchTerm: '',
    });
    this.currentPage.set(1);
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newId = Math.max(...this.products().map((p) => p._id)) + 1;
    this.products.update((products) => [...products, { ...product, id: newId }]);
  }

  updateProduct(id: number, updates: Partial<Product>): void {
    this.products.update((products) =>
      products.map((p) => (p._id === id ? { ...p, ...updates } : p)),
    );
  }

  deleteProduct(id: number): void {
    this.products.update((products) => products.filter((p) => p._id !== id));
  }
}
