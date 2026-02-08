import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../../core/services/products.service';
import {
  CATEGORY_CONFIG,
  DashboardProduct, // ✅ استخدم DashboardProduct
  ProductCategory,
  ProductStatus,
  ProductTwo,
  STATUS_CONFIG,
} from '../../../../../core/models/product.model';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  private productsService = inject(ProductsService);

  products = this.productsService.paginatedProducts;

  // ✅ استخدم DashboardProduct
  viewProduct = output<DashboardProduct>();
  editProduct = output<DashboardProduct>();
  manageStock = output<DashboardProduct>();

  // تعريف الأعمدة
  columns: TableColumn[] = [
    { key: 'index', header: '#', type: 'text', width: '50px', align: 'center' },
    {
      key: 'name',
      header: 'المنتج',
      type: 'custom',
      customTemplate: 'productInfo',
      sortable: true,
    },
    { key: 'category', header: 'الفئة', type: 'custom', customTemplate: 'categoryBadge' },
    {
      key: 'price',
      header: 'السعر',
      type: 'currency',
      currencyCode: 'USD',
      sortable: true,
      align: 'end',
    },
    {
      key: 'stock',
      header: 'المخزون',
      type: 'custom',
      customTemplate: 'stockBadge',
      sortable: true,
    },
    { key: 'status', header: 'الحالة', type: 'custom', customTemplate: 'statusBadge' },
  ];

  // ✅ استخدم DashboardProduct في الـ actions
  actions: TableAction[] = [
    {
      label: 'عرض',
      icon: 'bi-eye',
      class: 'action-btn preview',
      callback: (p: DashboardProduct) => this.onView(p),
    },
    {
      label: 'تعديل',
      icon: 'bi-pencil',
      class: 'action-btn edit',
      callback: (p: DashboardProduct) => this.onEdit(p),
    },
    {
      label: 'مخزون',
      icon: 'bi-box-arrow-in-down',
      class: 'action-btn inventory',
      callback: (p: DashboardProduct) => this.onManageStock(p),
      visible: (p: DashboardProduct) => p.status !== 'inactive',
    },
    {
      label: 'حذف',
      icon: 'bi-trash',
      class: 'action-btn delete',
      callback: (p: DashboardProduct) => this.onDelete(p),
      visible: (p: DashboardProduct) => p.status === 'inactive',
    },
  ];

  tableConfig: TableConfig = {
    showHeader: true,
    showActions: true,
    emptyMessage: 'لا توجد منتجات',
    emptyIcon: 'bi-inbox',
    showPagination: true,
  };

  totalProducts = this.productsService.filteredProducts;
  currentPage = this.productsService.currentPage;
  totalPages = this.productsService.totalPages;
  pageSize = this.productsService.pageSize;

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

  // ✅ استخدم DashboardProduct
  onView(product: DashboardProduct): void {
    this.viewProduct.emit(product);
  }

  onEdit(product: DashboardProduct): void {
    this.editProduct.emit(product);
  }

  onManageStock(product: DashboardProduct): void {
    this.manageStock.emit(product);
  }

  onDelete(product: DashboardProduct): void {
    if (confirm(`هل أنت متأكد من حذف "${product.name}"؟`)) {
      // ✅ الآن _id مضمون أنه number
      this.productsService.deleteProduct(product._id);
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

  // src/core/data/mock-products.data.ts

  mockProducts: ProductTwo[] = [
    {
      _id: 'prod_001',
      name: 'آيفون 15 برو ماكس',
      code: 'IPH-15PM-256',
      category: 'electronics',
      price: 1199.99,
      stock: 45,
      status: 'active',
    },
    {
      _id: 'prod_002',
      name: 'سامسونج جالكسي S24',
      code: 'SAM-S24U-512',
      category: 'electronics',
      price: 1299.99,
      stock: 32,
      status: 'active',
    },
    {
      _id: 'prod_003',
      name: 'لابتوب ماك بوك برو 16',
      code: 'MBP-16-M3',
      category: 'electronics',
      price: 2499.99,
      stock: 12,
      status: 'active',
    },
    {
      _id: 'prod_004',
      name: 'سماعات AirPods Pro 2',
      code: 'APP-2-USB',
      category: 'accessories',
      price: 249.99,
      stock: 78,
      status: 'active',
    },
    {
      _id: 'prod_005',
      name: 'ساعة Apple Watch Ultra',
      code: 'AWU-2-49',
      category: 'accessories',
      price: 799.99,
      stock: 23,
      status: 'active',
    },
    {
      _id: 'prod_006',
      name: 'قميص قطني رجالي',
      code: 'SHT-CTN-M',
      category: 'clothing',
      price: 45.99,
      stock: 150,
      status: 'active',
    },
    {
      _id: 'prod_007',
      name: 'بنطلون جينز كلاسيك',
      code: 'JNS-CLS-32',
      category: 'clothing',
      price: 79.99,
      stock: 0,
      status: 'out_of_stock',
    },
    {
      _id: 'prod_008',
      name: 'حذاء رياضي نايكي',
      code: 'NKE-AIR-42',
      category: 'sports',
      price: 159.99,
      stock: 67,
      status: 'active',
    },
    {
      _id: 'prod_009',
      name: 'كرسي مكتب مريح',
      code: 'CHR-OFF-BLK',
      category: 'furniture',
      price: 299.99,
      stock: 18,
      status: 'active',
    },
    {
      _id: 'prod_010',
      name: 'مكتب خشبي حديث',
      code: 'DSK-WD-150',
      category: 'furniture',
      price: 449.99,
      stock: 8,
      status: 'active',
    },
    {
      _id: 'prod_011',
      name: 'قهوة عربية فاخرة',
      code: 'COF-ARB-500',
      category: 'food',
      price: 24.99,
      stock: 200,
      status: 'active',
    },
    {
      _id: 'prod_012',
      name: 'شوكولاتة بلجيكية',
      code: 'CHO-BEL-250',
      category: 'food',
      price: 18.99,
      stock: 0,
      status: 'out_of_stock',
    },
    {
      _id: 'prod_013',
      name: 'تلفزيون سامسونج 65 بوصة',
      code: 'TV-SAM-65Q',
      category: 'electronics',
      price: 1599.99,
      stock: 5,
      status: 'active',
    },
    {
      _id: 'prod_014',
      name: 'سوار ذهبي نسائي',
      code: 'BRC-GLD-18',
      category: 'accessories',
      price: 899.99,
      stock: 15,
      status: 'active',
    },
    {
      _id: 'prod_015',
      name: 'دراجة هوائية جبلية',
      code: 'BKE-MTN-27',
      category: 'sports',
      price: 699.99,
      stock: 0,
      status: 'inactive',
    },
    {
      _id: 'prod_016',
      name: 'طاولة طعام 6 أشخاص',
      code: 'TBL-DIN-6P',
      category: 'furniture',
      price: 799.99,
      stock: 3,
      status: 'active',
    },
    {
      _id: 'prod_017',
      name: 'جاكيت جلد أصلي',
      code: 'JKT-LTH-L',
      category: 'clothing',
      price: 349.99,
      stock: 22,
      status: 'active',
    },
    {
      _id: 'prod_018',
      name: 'سماعة بلوتوث JBL',
      code: 'SPK-JBL-CHG',
      category: 'electronics',
      price: 179.99,
      stock: 56,
      status: 'active',
    },
    {
      _id: 'prod_019',
      name: 'عسل سدر طبيعي',
      code: 'HNY-SDR-1KG',
      category: 'food',
      price: 89.99,
      stock: 40,
      status: 'active',
    },
    {
      _id: 'prod_020',
      name: 'حقيبة ظهر رياضية',
      code: 'BAG-SPT-BLU',
      category: 'sports',
      price: 69.99,
      stock: 85,
      status: 'active',
    },
  ];
}
