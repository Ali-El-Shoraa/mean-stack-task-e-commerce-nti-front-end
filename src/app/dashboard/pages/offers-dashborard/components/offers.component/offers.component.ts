// src/app/features/offers/offers.component.ts

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';
import { AbsPipe } from '../../../../../core/pipes/abs.pipe-pipe';

interface OfferStats {
  activeOffers: number;
  scheduledOffers: number;
  expiredOffers: number;
  revenueFromOffers: string;
  activeChange: number;
  scheduledChange: number;
  expiredChange: number;
  revenueChange: number;
}

interface OfferFilter {
  status: string;
  discountType: string;
  dateFrom: string;
  dateTo: string;
  category: string;
}

interface Offer {
  id: number;
  name: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  discountText: string;
  minOrder: number;
  startDate: string;
  endDate: string | null;
  maxUses: number | null;
  used: number;
  status: 'active' | 'scheduled' | 'expired' | 'inactive';
  statusText: string;
  categories: string[];
  image: string;
  color: string;
  period: string;
  remaining: string;
  usageText: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, AbsPipe],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  @ViewChild('customCell') customCellTemplate!: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCellTemplate!: TemplateRef<any>;

  // إحصائيات العروض
  stats: OfferStats = {
    activeOffers: 6,
    scheduledOffers: 3,
    expiredOffers: 5,
    revenueFromOffers: '$12,450',
    activeChange: 20,
    scheduledChange: 50,
    expiredChange: -10,
    revenueChange: 25,
  };

  // فلاتر العروض
  filters: OfferFilter = {
    status: '',
    discountType: '',
    dateFrom: '',
    dateTo: '',
    category: '',
  };

  // خيارات الفلاتر
  statusOptions = [
    { value: '', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط' },
    { value: 'scheduled', label: 'مجدول' },
    { value: 'expired', label: 'منتهي' },
    { value: 'inactive', label: 'غير نشط' },
  ];

  discountTypes = [
    { value: '', label: 'جميع الأنواع' },
    { value: 'percentage', label: 'نسبة مئوية' },
    { value: 'fixed', label: 'مبلغ ثابت' },
    { value: 'buy-one-get-one', label: 'اشتري واحد واحصل على واحد' },
    { value: 'free-shipping', label: 'شحن مجاني' },
  ];

  categories = [
    { value: '', label: 'جميع التصنيفات' },
    { value: 'men', label: 'رجالي' },
    { value: 'women', label: 'نسائي' },
    { value: 'kids', label: 'أطفال' },
    { value: 'accessories', label: 'إكسسوارات' },
  ];

  // عرض الجدول أو البطاقات
  viewMode: 'table' | 'grid' = 'table';

  // بيانات العروض
  offers: Offer[] = [];

  // Modal
  showAddModal = false;
  newOffer: Partial<Offer> = {};

  // إعدادات الجدول
  tableColumns: TableColumn[] = [
    { key: 'id', header: '#', sortable: true },
    { key: 'name', header: 'العرض', type: 'custom' },
    { key: 'description', header: 'التفاصيل', type: 'custom' },
    { key: 'period', header: 'فترة العرض', type: 'custom' },
    { key: 'discountText', header: 'نوع الخصم', type: 'custom' },
    { key: 'usageText', header: 'الاستخدام', type: 'custom' },
    {
      key: 'statusText',
      header: 'الحالة',
      type: 'badge',
      badgeConfig: {
        نشط: { label: 'نشط', class: 'status-active' },
        مجدول: { label: 'مجدول', class: 'status-scheduled' },
        منتهي: { label: 'منتهي', class: 'status-expired' },
        'غير نشط': { label: 'غير نشط', class: 'status-inactive' },
      },
    },
  ];

  tableActions: TableAction[] = [];

  tableConfig: TableConfig = {
    showHeader: true,
    showActions: true,
    showPagination: true,
    pageSize: 6,
    title: 'قائمة العروض',
    emptyMessage: 'لا توجد عروض للعرض',
    headerActions: [
      {
        label: 'تصدير',
        icon: 'bi-download',
        class: 'btn btn-outline-primary',
        callback: () => this.exportOffers(),
      },
      {
        label: 'عرض جديد',
        icon: 'bi-plus-circle',
        class: 'btn btn-primary',
        callback: () => this.openAddModal(),
      },
    ],
  };

  ngOnInit(): void {
    this.initOffers();
    this.initTableActions();
  }

  private initOffers(): void {
    const rawOffers = [
      {
        id: 1,
        name: 'خصم الشتاء الكبير',
        code: 'WINTER30',
        description: 'خصم 30% على جميع المعاطف',
        discountType: 'percentage',
        discountValue: 30,
        minOrder: 100,
        startDate: '2023-12-01',
        endDate: '2023-12-31',
        maxUses: 500,
        used: 245,
        status: 'active' as const,
        categories: ['men', 'women'],
        image: 'https://via.placeholder.com/70x70/FF6B6B/FFFFFF?text=30%25',
        color: '#FF6B6B',
      },
      {
        id: 2,
        name: 'عرض الشحن المجاني',
        code: 'FREESHIP',
        description: 'شحن مجاني على جميع الطلبات',
        discountType: 'free-shipping',
        discountValue: 0,
        minOrder: 0,
        startDate: '2023-01-01',
        endDate: null,
        maxUses: null,
        used: 1245,
        status: 'active' as const,
        categories: ['all'],
        image: 'https://via.placeholder.com/70x70/4ECDC4/FFFFFF?text=Free',
        color: '#4ECDC4',
      },
      {
        id: 3,
        name: 'عرض القمصان',
        code: 'BUY1GET1',
        description: 'اشتري قميص واحصل على آخر مجاناً',
        discountType: 'buy-one-get-one',
        discountValue: 100,
        minOrder: 0,
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        maxUses: 200,
        used: 0,
        status: 'scheduled' as const,
        categories: ['men'],
        image: 'https://via.placeholder.com/70x70/FFD166/000000?text=1+1',
        color: '#FFD166',
      },
      {
        id: 4,
        name: 'تخفيضات نهاية الموسم',
        code: 'SEASON25',
        description: 'خصم 25% على المنتجات القديمة',
        discountType: 'percentage',
        discountValue: 25,
        minOrder: 0,
        startDate: '2023-11-01',
        endDate: '2023-11-30',
        maxUses: 500,
        used: 420,
        status: 'expired' as const,
        categories: ['men', 'women', 'kids'],
        image: 'https://via.placeholder.com/70x70/06D6A0/FFFFFF?text=25%25',
        color: '#06D6A0',
      },
      {
        id: 5,
        name: 'عرض العيد',
        code: 'EID20',
        description: 'خصم $20 على الطلبات فوق $150',
        discountType: 'fixed',
        discountValue: 20,
        minOrder: 150,
        startDate: '2023-12-01',
        endDate: '2023-12-10',
        maxUses: 300,
        used: 189,
        status: 'expired' as const,
        categories: ['all'],
        image: 'https://via.placeholder.com/70x70/118AB2/FFFFFF?text=$20',
        color: '#118AB2',
      },
      {
        id: 6,
        name: 'عرض الأعضاء الجدد',
        code: 'WELCOME15',
        description: 'خصم 15% للعملاء الجدد',
        discountType: 'percentage',
        discountValue: 15,
        minOrder: 0,
        startDate: '2023-01-01',
        endDate: null,
        maxUses: null,
        used: 87,
        status: 'active' as const,
        categories: ['all'],
        image: 'https://via.placeholder.com/70x70/EF476F/FFFFFF?text=15%25',
        color: '#EF476F',
      },
    ];

    this.offers = rawOffers.map((offer) => ({
      ...offer,
      discountText: this.getDiscountText(offer),
      statusText: this.getStatusText(offer.status),
      period: this.getPeriodText(offer.startDate, offer.endDate),
      remaining: this.getDaysRemaining(offer.endDate),
      usageText: this.getUsageText(offer.used, offer.maxUses),
    }));
  }

  private initTableActions(): void {
    this.tableActions = [
      {
        label: 'تعديل',
        icon: 'bi-pencil',
        class: 'action-btn edit',
        callback: (item: Offer) => this.editOffer(item),
      },
      {
        label: 'نسخ',
        icon: 'bi-copy',
        class: 'action-btn copy',
        callback: (item: Offer) => this.copyOffer(item),
      },
      {
        label: 'حذف',
        icon: 'bi-trash',
        class: 'action-btn delete',
        callback: (item: Offer) => this.deleteOffer(item),
        visible: (item: Offer) => item.status !== 'active',
      },
      {
        label: 'عرض',
        icon: 'bi-eye',
        class: 'action-btn view',
        callback: (item: Offer) => this.viewOffer(item),
        visible: (item: Offer) => item.status === 'active',
      },
    ];
  }

  // Helper Functions
  private getDiscountText(offer: { discountType: string; discountValue: number }): string {
    switch (offer.discountType) {
      case 'percentage':
        return `${offer.discountValue}% خصم`;
      case 'fixed':
        return `$${offer.discountValue} خصم`;
      case 'buy-one-get-one':
        return '1+1 مجاناً';
      case 'free-shipping':
        return 'شحن مجاني';
      default:
        return 'خصم';
    }
  }

  private getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: 'نشط',
      scheduled: 'مجدول',
      expired: 'منتهي',
      inactive: 'غير نشط',
    };
    return statusMap[status] || 'غير نشط';
  }

  private getPeriodText(startDate: string, endDate: string | null): string {
    if (!endDate) return 'مستمر';
    const start = new Date(startDate).toLocaleDateString('ar-SA', {
      day: 'numeric',
      month: 'long',
    });
    const end = new Date(endDate).toLocaleDateString('ar-SA', { day: 'numeric', month: 'long' });
    return `${start} - ${end}`;
  }

  private getDaysRemaining(endDate: string | null): string {
    if (!endDate) return 'دائم';
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `متبقي: ${diffDays} يوم`;
    return 'منتهي';
  }

  private getUsageText(used: number, maxUses: number | null): string {
    return maxUses ? `${used} / ${maxUses}` : `${used} / ∞`;
  }

  // View Toggle
  setViewMode(mode: 'table' | 'grid'): void {
    this.viewMode = mode;
  }

  // Filter Actions
  applyFilters(): void {
    console.log('تطبيق التصفية:', this.filters);
    // يمكنك إضافة منطق التصفية هنا
    this.showNotification('تم تطبيق التصفية بنجاح', 'success');
  }

  resetFilters(): void {
    this.filters = {
      status: '',
      discountType: '',
      dateFrom: '',
      dateTo: '',
      category: '',
    };
    this.showNotification('تم إعادة تعيين الفلاتر', 'info');
  }

  // Offer Actions
  editOffer(offer: Offer): void {
    console.log('تعديل العرض:', offer);
    this.showNotification(`تعديل العرض: ${offer.name}`, 'info');
  }

  copyOffer(offer: Offer): void {
    console.log('نسخ العرض:', offer);
    this.showNotification(`تم نسخ كود العرض: ${offer.code}`, 'success');
  }

  deleteOffer(offer: Offer): void {
    if (confirm(`هل أنت متأكد من حذف العرض "${offer.name}"؟`)) {
      this.offers = this.offers.filter((o) => o.id !== offer.id);
      this.showNotification('تم حذف العرض بنجاح', 'success');
    }
  }

  viewOffer(offer: Offer): void {
    console.log('عرض تفاصيل:', offer);
    this.showNotification(`عرض تفاصيل: ${offer.name}`, 'info');
  }

  exportOffers(): void {
    this.showNotification('جارٍ تحميل ملف Excel...', 'info');
    setTimeout(() => {
      this.showNotification('تم تحميل ملف Excel بنجاح', 'success');
    }, 1000);
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.newOffer = {};
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  saveOffer(): void {
    this.showNotification('تم حفظ العرض بنجاح', 'success');
    this.closeAddModal();
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort changed:', sort);
  }

  private showNotification(message: string, type: 'success' | 'info' | 'warning'): void {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} alert-dismissible fade show alert-notification`;
    notification.innerHTML = `${message}<button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>`;
    notification.style.cssText =
      'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; min-width: 300px;';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}
