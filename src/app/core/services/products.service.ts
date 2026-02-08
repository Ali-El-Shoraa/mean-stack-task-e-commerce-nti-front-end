// src/app/features/products/services/products.service.ts

import { Injectable, signal, computed } from '@angular/core';
import {
  DashboardProduct,
  ProductStats,
  ProductFilters,
  ProductStatus,
  ProductCategory,
  StockLevel,
  STATUS_CONFIG,
  CATEGORY_CONFIG,
} from '../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // ✅ Private Signals
  private productsSignal = signal<DashboardProduct[]>(this.getMockProducts());
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

  // ✅ Public Readonly Signals
  products = this.productsSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  currentPage = this.currentPageSignal.asReadonly();
  pageSize = this.pageSizeSignal.asReadonly();
  viewMode = this.viewModeSignal.asReadonly();
  isLoading = this.loadingSignal.asReadonly();

  // ✅ Computed: إجمالي المنتجات
  totalProducts = computed(() => {
    return this.filteredProducts().length;
  });

  // ✅ Computed: المنتجات المفلترة
  filteredProducts = computed(() => {
    const products = this.productsSignal();
    const filters = this.filtersSignal();

    return products.filter((product) => {
      // فلتر الفئة
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // فلتر الحالة
      if (filters.status && product.status !== filters.status) {
        return false;
      }

      // فلتر مستوى المخزون
      if (filters.stockLevel && this.getStockLevel(product.stock) !== filters.stockLevel) {
        return false;
      }

      // فلتر السعر (من)
      if (filters.priceFrom !== null && product.price < filters.priceFrom) {
        return false;
      }

      // فلتر السعر (إلى)
      if (filters.priceTo !== null && product.price > filters.priceTo) {
        return false;
      }

      // فلتر البحث
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesCode = product.code.toLowerCase().includes(searchLower);
        const matchesDescription =
          product.description?.toLowerCase().includes(searchLower) || false;

        return matchesName || matchesCode || matchesDescription;
      }

      return true;
    });
  });

  // ✅ Computed: المنتجات مع الـ Pagination
  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.currentPageSignal();
    const size = this.pageSizeSignal();
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  });

  // ✅ Computed: إجمالي الصفحات
  totalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.pageSizeSignal());
  });

  // ✅ Computed: إحصائيات المنتجات
  stats = computed<ProductStats>(() => {
    const products = this.productsSignal();
    return {
      total: products.length,
      active: products.filter((p) => p.status === 'active').length,
      outOfStock: products.filter((p) => p.status === 'out-of-stock' || p.stock === 0).length,
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    };
  });

  // ============================================
  // ✅ Filter Methods
  // ============================================

  updateFilters(filters: Partial<ProductFilters>): void {
    this.filtersSignal.update((current) => ({ ...current, ...filters }));
    this.currentPageSignal.set(1); // Reset to first page
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

  // ============================================
  // ✅ Pagination Methods
  // ============================================

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPageSignal.set(page);
    }
  }

  nextPage(): void {
    if (this.currentPageSignal() < this.totalPages()) {
      this.currentPageSignal.update((p) => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPageSignal() > 1) {
      this.currentPageSignal.update((p) => p - 1);
    }
  }

  setPageSize(size: number): void {
    this.pageSizeSignal.set(size);
    this.currentPageSignal.set(1); // Reset to first page
  }

  // ============================================
  // ✅ View Mode Methods
  // ============================================

  setViewMode(mode: 'table' | 'grid'): void {
    this.viewModeSignal.set(mode);
  }

  toggleViewMode(): void {
    this.viewModeSignal.update((mode) => (mode === 'table' ? 'grid' : 'table'));
  }

  // ============================================
  // ✅ CRUD Methods
  // ============================================

  addProduct(product: Omit<DashboardProduct, '_id'>): void {
    const products = this.productsSignal();
    const newId = products.length > 0 ? Math.max(...products.map((p) => p._id)) + 1 : 1;

    this.productsSignal.update((products) => [
      ...products,
      { ...product, _id: newId } as DashboardProduct,
    ]);
  }

  updateProduct(id: number, updates: Partial<DashboardProduct>): void {
    this.productsSignal.update((products) =>
      products.map((p) => (p._id === id ? { ...p, ...updates } : p)),
    );
  }

  deleteProduct(id: number): void {
    this.productsSignal.update((products) => products.filter((p) => p._id !== id));
  }

  // ============================================
  // ✅ Stock Methods
  // ============================================

  updateStock(id: number, newStock: number): void {
    this.productsSignal.update((products) =>
      products.map((p) => {
        if (p._id === id) {
          // تحديث الحالة تلقائياً بناءً على المخزون
          let status: ProductStatus = p.status;
          if (newStock === 0) {
            status = 'out-of-stock';
          } else if (p.status === 'out-of-stock') {
            status = 'active';
          }
          return { ...p, stock: newStock, status };
        }
        return p;
      }),
    );
  }

  incrementStock(id: number, amount: number = 1): void {
    const product = this.getProductById(id);
    if (product) {
      this.updateStock(id, product.stock + amount);
    }
  }

  decrementStock(id: number, amount: number = 1): void {
    const product = this.getProductById(id);
    if (product && product.stock >= amount) {
      this.updateStock(id, product.stock - amount);
    }
  }

  // ============================================
  // ✅ Status Methods
  // ============================================

  updateStatus(id: number, status: ProductStatus): void {
    this.updateProduct(id, { status });
  }

  activateProduct(id: number): void {
    this.updateStatus(id, 'active');
  }

  deactivateProduct(id: number): void {
    this.updateStatus(id, 'inactive');
  }

  // ============================================
  // ✅ Get Methods
  // ============================================

  getProductById(id: number): DashboardProduct | undefined {
    return this.productsSignal().find((p) => p._id === id);
  }

  getProductsByCategory(category: ProductCategory): DashboardProduct[] {
    return this.productsSignal().filter((p) => p.category === category);
  }

  getProductsByStatus(status: ProductStatus): DashboardProduct[] {
    return this.productsSignal().filter((p) => p.status === status);
  }

  getLowStockProducts(threshold: number = 10): DashboardProduct[] {
    return this.productsSignal().filter((p) => p.stock > 0 && p.stock <= threshold);
  }

  getOutOfStockProducts(): DashboardProduct[] {
    return this.productsSignal().filter((p) => p.stock === 0 || p.status === 'out-of-stock');
  }

  // ============================================
  // ✅ Helper Methods
  // ============================================

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

  // ============================================
  // ✅ Loading State
  // ============================================

  setLoading(loading: boolean): void {
    this.loadingSignal.set(loading);
  }

  // ============================================
  // ✅ Mock Data
  // ============================================

  private getMockProducts(): DashboardProduct[] {
    return [
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
        description: 'تيشيرت قطني للأطفال',
      },
      {
        _id: 6,
        name: 'ساعة يدوية أنيقة',
        code: 'WCH-006',
        category: 'accessories',
        price: 89.99,
        stock: 8,
        status: 'inactive',
        description: 'ساعة يدوية كلاسيكية',
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
        description: 'نظارات شمسية',
      },
      {
        _id: 9,
        name: 'قميص رسمي أبيض',
        code: 'SHT-009',
        category: 'men',
        price: 54.99,
        stock: 28,
        status: 'active',
        description: 'قميص رسمي',
      },
      {
        _id: 10,
        name: 'بلوزة حريرية',
        code: 'BLZ-010',
        category: 'women',
        price: 69.99,
        stock: 15,
        status: 'active',
        description: 'بلوزة حريرية أنيقة',
      },
      {
        _id: 11,
        name: 'شورت رياضي',
        code: 'SHR-011',
        category: 'men',
        price: 24.99,
        stock: 42,
        status: 'active',
        description: 'شورت رياضي مريح',
      },
      {
        _id: 12,
        name: 'تنورة قصيرة',
        code: 'SKT-012',
        category: 'women',
        price: 34.99,
        stock: 0,
        status: 'out-of-stock',
        description: 'تنورة قصيرة عصرية',
      },
      {
        _id: 13,
        name: 'بيجامة أطفال',
        code: 'PJM-013',
        category: 'kids',
        price: 29.99,
        stock: 55,
        status: 'active',
        description: 'بيجامة مريحة للأطفال',
      },
      {
        _id: 14,
        name: 'حزام جلدي',
        code: 'BLT-014',
        category: 'accessories',
        price: 35.0,
        stock: 20,
        status: 'active',
        description: 'حزام جلدي فاخر',
      },
      {
        _id: 15,
        name: 'جاكيت جينز',
        code: 'JKT-015',
        category: 'men',
        price: 79.99,
        stock: 18,
        status: 'active',
        description: 'جاكيت جينز كلاسيكي',
      },
      {
        _id: 16,
        name: 'فستان سهرة',
        code: 'EVD-016',
        category: 'women',
        price: 149.99,
        stock: 7,
        status: 'active',
        description: 'فستان سهرة فاخر',
      },
      {
        _id: 17,
        name: 'بنطلون أطفال',
        code: 'KPT-017',
        category: 'kids',
        price: 22.99,
        stock: 38,
        status: 'active',
        description: 'بنطلون مريح للأطفال',
      },
      {
        _id: 18,
        name: 'قبعة صوفية',
        code: 'HAT-018',
        category: 'accessories',
        price: 18.99,
        stock: 50,
        status: 'active',
        description: 'قبعة صوفية دافئة',
      },
      {
        _id: 19,
        name: 'معطف شتوي',
        code: 'COT-019',
        category: 'men',
        price: 129.99,
        stock: 10,
        status: 'active',
        description: 'معطف شتوي فاخر',
      },
      {
        _id: 20,
        name: 'كارديجان نسائي',
        code: 'CRD-020',
        category: 'women',
        price: 44.99,
        stock: 25,
        status: 'active',
        description: 'كارديجان صوفي',
      },
      {
        _id: 21,
        name: 'جوارب أطفال (6 قطع)',
        code: 'SCK-021',
        category: 'kids',
        price: 14.99,
        stock: 80,
        status: 'active',
        description: 'طقم جوارب للأطفال',
      },
      {
        _id: 22,
        name: 'محفظة جلدية',
        code: 'WLT-022',
        category: 'accessories',
        price: 45.0,
        stock: 22,
        status: 'active',
        description: 'محفظة جلدية أنيقة',
      },
      {
        _id: 23,
        name: 'بولو رجالي',
        code: 'POL-023',
        category: 'men',
        price: 39.99,
        stock: 35,
        status: 'active',
        description: 'تيشيرت بولو كلاسيكي',
      },
      {
        _id: 24,
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

  // ============================================
  // ✅ Bulk Operations
  // ============================================

  deleteMultiple(ids: number[]): void {
    this.productsSignal.update((products) => products.filter((p) => !ids.includes(p._id)));
  }

  updateMultipleStatus(ids: number[], status: ProductStatus): void {
    this.productsSignal.update((products) =>
      products.map((p) => (ids.includes(p._id) ? { ...p, status } : p)),
    );
  }

  // ============================================
  // ✅ Search
  // ============================================

  search(term: string): void {
    this.updateFilters({ searchTerm: term });
  }

  clearSearch(): void {
    this.updateFilters({ searchTerm: '' });
  }
}
