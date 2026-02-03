// src/app/features/products/services/products.service.ts

import { Injectable, signal, computed } from '@angular/core';
import {
  Product,
  ProductStats,
  ProductFilters,
  ProductStatus,
  ProductCategory,
  StockLevel,
  STATUS_CONFIG,
  CATEGORY_CONFIG,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSignal = signal<Product[]>(this.getMockProducts());
  private filtersSignal = signal<ProductFilters>({
    category: '',
    status: '',
    stockLevel: '',
    priceFrom: null,
    priceTo: null,
    searchTerm: '',
  });
  private loadingSignal = signal<boolean>(false);
  private currentPageSignal = signal<number>(1);
  private pageSizeSignal = signal<number>(8);
  private viewModeSignal = signal<'table' | 'grid'>('table');

  // Public signals
  products = this.productsSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  currentPage = this.currentPageSignal.asReadonly();
  pageSize = this.pageSizeSignal.asReadonly();
  viewMode = this.viewModeSignal.asReadonly();

  // Computed values
  filteredProducts = computed(() => {
    const products = this.productsSignal();
    const filters = this.filtersSignal();

    return products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.status && product.status !== filters.status) return false;
      if (filters.stockLevel && this.getStockLevel(product.stock) !== filters.stockLevel)
        return false;
      if (filters.priceFrom !== null && product.price < filters.priceFrom) return false;
      if (filters.priceTo !== null && product.price > filters.priceTo) return false;

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.code.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  });

  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.currentPageSignal();
    const size = this.pageSizeSignal();
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.pageSizeSignal());
  });

  stats = computed<ProductStats>(() => {
    const products = this.productsSignal();
    return {
      total: products.length,
      active: products.filter((p) => p.status === 'active').length,
      outOfStock: products.filter((p) => p.status === 'out-of-stock' || p.stock === 0).length,
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    };
  });

  // Methods
  updateFilters(filters: Partial<ProductFilters>): void {
    this.filtersSignal.update((current) => ({ ...current, ...filters }));
    this.currentPageSignal.set(1);
  }

  resetFilters(): void {
    this.filtersSignal.set({
      category: '',
      status: '',
      stockLevel: '',
      priceFrom: null,
      priceTo: null,
      searchTerm: '',
    });
    this.currentPageSignal.set(1);
  }

  setPage(page: number): void {
    this.currentPageSignal.set(page);
  }

  setViewMode(mode: 'table' | 'grid'): void {
    this.viewModeSignal.set(mode);
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newId = Math.max(...this.productsSignal().map((p) => p.id)) + 1;
    this.productsSignal.update((products) => [...products, { ...product, id: newId }]);
  }

  updateProduct(id: number, updates: Partial<Product>): void {
    this.productsSignal.update((products) =>
      products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  }

  deleteProduct(id: number): void {
    this.productsSignal.update((products) => products.filter((p) => p.id !== id));
  }

  updateStock(id: number, newStock: number): void {
    this.productsSignal.update((products) =>
      products.map((p) => {
        if (p.id === id) {
          const status: ProductStatus =
            newStock === 0 ? 'out-of-stock' : p.status === 'out-of-stock' ? 'active' : p.status;
          return { ...p, stock: newStock, status };
        }
        return p;
      }),
    );
  }

  getProductById(id: number): Product | undefined {
    return this.productsSignal().find((p) => p.id === id);
  }

  getStockLevel(stock: number): StockLevel {
    if (stock === 0) return 'out';
    if (stock <= 5) return 'low';
    if (stock <= 20) return 'medium';
    return 'high';
  }

  getStatusConfig(status: ProductStatus) {
    return STATUS_CONFIG[status];
  }

  getCategoryConfig(category: ProductCategory) {
    return CATEGORY_CONFIG[category];
  }

  // Mock data
  private getMockProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'تيشيرت قطني مميز',
        code: 'TSH-001',
        category: 'men',
        price: 29.99,
        stock: 45,
        status: 'active',
        description: 'تيشيرت قطني عالي الجودة',
      },
      {
        id: 2,
        name: 'جينز ضيق أزرق',
        code: 'JNS-002',
        category: 'women',
        price: 49.99,
        stock: 3,
        status: 'active',
        description: 'جينز ضيق أزرق من الدنيم',
      },
      {
        id: 3,
        name: 'هودي رجالي شتوي',
        code: 'HOD-003',
        category: 'men',
        price: 44.99,
        stock: 12,
        status: 'active',
        description: 'هودي شتوي دافئ',
      },
      {
        id: 4,
        name: 'فستان صيفي مزهر',
        code: 'DRS-004',
        category: 'women',
        price: 59.99,
        stock: 0,
        status: 'out-of-stock',
        description: 'فستان صيفي خفيف',
      },
      {
        id: 5,
        name: 'تيشيرت أطفال قطني',
        code: 'KTS-005',
        category: 'kids',
        price: 19.99,
        stock: 67,
        status: 'active',
        description: 'تيشيرت قطني للأطفال',
      },
      {
        id: 6,
        name: 'ساعة يدوية أنيقة',
        code: 'WCH-006',
        category: 'accessories',
        price: 89.99,
        stock: 8,
        status: 'inactive',
        description: 'ساعة يدوية كلاسيكية',
      },
      {
        id: 7,
        name: 'حقيبة كتف جلدية',
        code: 'BAG-007',
        category: 'accessories',
        price: 75.5,
        stock: 5,
        status: 'active',
        description: 'حقيبة كتف جلدية',
      },
      {
        id: 8,
        name: 'نظارات شمسية كلاسيكية',
        code: 'SNG-008',
        category: 'accessories',
        price: 39.99,
        stock: 32,
        status: 'active',
        description: 'نظارات شمسية',
      },
      {
        id: 9,
        name: 'قميص رسمي أبيض',
        code: 'SHT-009',
        category: 'men',
        price: 54.99,
        stock: 28,
        status: 'active',
        description: 'قميص رسمي',
      },
      {
        id: 10,
        name: 'بلوزة حريرية',
        code: 'BLZ-010',
        category: 'women',
        price: 69.99,
        stock: 15,
        status: 'active',
        description: 'بلوزة حريرية أنيقة',
      },
      {
        id: 11,
        name: 'شورت رياضي',
        code: 'SHR-011',
        category: 'men',
        price: 24.99,
        stock: 42,
        status: 'active',
        description: 'شورت رياضي مريح',
      },
      {
        id: 12,
        name: 'تنورة قصيرة',
        code: 'SKT-012',
        category: 'women',
        price: 34.99,
        stock: 0,
        status: 'out-of-stock',
        description: 'تنورة قصيرة عصرية',
      },
      {
        id: 13,
        name: 'بيجامة أطفال',
        code: 'PJM-013',
        category: 'kids',
        price: 29.99,
        stock: 55,
        status: 'active',
        description: 'بيجامة مريحة للأطفال',
      },
      {
        id: 14,
        name: 'حزام جلدي',
        code: 'BLT-014',
        category: 'accessories',
        price: 35.0,
        stock: 20,
        status: 'active',
        description: 'حزام جلدي فاخر',
      },
      {
        id: 15,
        name: 'جاكيت جينز',
        code: 'JKT-015',
        category: 'men',
        price: 79.99,
        stock: 18,
        status: 'active',
        description: 'جاكيت جينز كلاسيكي',
      },
      {
        id: 16,
        name: 'فستان سهرة',
        code: 'EVD-016',
        category: 'women',
        price: 149.99,
        stock: 7,
        status: 'active',
        description: 'فستان سهرة فاخر',
      },
      {
        id: 17,
        name: 'بنطلون أطفال',
        code: 'KPT-017',
        category: 'kids',
        price: 22.99,
        stock: 38,
        status: 'active',
        description: 'بنطلون مريح للأطفال',
      },
      {
        id: 18,
        name: 'قبعة صوفية',
        code: 'HAT-018',
        category: 'accessories',
        price: 18.99,
        stock: 50,
        status: 'active',
        description: 'قبعة صوفية دافئة',
      },
      {
        id: 19,
        name: 'معطف شتوي',
        code: 'COT-019',
        category: 'men',
        price: 129.99,
        stock: 10,
        status: 'active',
        description: 'معطف شتوي فاخر',
      },
      {
        id: 20,
        name: 'كارديجان نسائي',
        code: 'CRD-020',
        category: 'women',
        price: 44.99,
        stock: 25,
        status: 'active',
        description: 'كارديجان صوفي',
      },
      {
        id: 21,
        name: 'جوارب أطفال (6 قطع)',
        code: 'SCK-021',
        category: 'kids',
        price: 14.99,
        stock: 80,
        status: 'active',
        description: 'طقم جوارب للأطفال',
      },
      {
        id: 22,
        name: 'محفظة جلدية',
        code: 'WLT-022',
        category: 'accessories',
        price: 45.0,
        stock: 22,
        status: 'active',
        description: 'محفظة جلدية أنيقة',
      },
      {
        id: 23,
        name: 'بولو رجالي',
        code: 'POL-023',
        category: 'men',
        price: 39.99,
        stock: 35,
        status: 'active',
        description: 'تيشيرت بولو كلاسيكي',
      },
      {
        id: 24,
        name: 'بنطلون واسع',
        code: 'WPT-024',
        category: 'women',
        price: 54.99,
        stock: 2,
        status: 'active',
        description: 'بنطلون واسع عصري',
      },
    ];
  }
}
