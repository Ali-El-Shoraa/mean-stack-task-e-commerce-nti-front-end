// src/app/features/reviews/reviews.component.ts

import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import {
  Review,
  ReviewFilters,
  ReviewStats,
  ReviewStatus,
} from '../../../../../core/models/review.model';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';

@Component({
  selector: 'app-reviews-component',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  // بيانات الإحصائيات
  stats = signal<ReviewStats>({
    totalReviews: 1248,
    averageRating: 4.6,
    pendingReviews: 32,
    negativeReviews: 45,
  });

  // الفلاتر
  filters = signal<ReviewFilters>({
    rating: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    product: '',
    search: '',
  });

  // عرض الجدول أو الشبكة
  viewMode = signal<'table' | 'grid'>('table');

  // البيانات الأصلية
  reviews = signal<Review[]>([]);

  // البيانات المفلترة
  filteredReviews = computed(() => {
    let data = this.reviews();
    const f = this.filters();

    if (f.search) {
      const searchLower = f.search.toLowerCase();
      data = data.filter(
        (r) =>
          r.customerName.toLowerCase().includes(searchLower) ||
          r.reviewText.toLowerCase().includes(searchLower) ||
          r.product.name.toLowerCase().includes(searchLower),
      );
    }

    if (f.rating) {
      data = data.filter((r) => r.rating === Number(f.rating));
    }

    if (f.status) {
      data = data.filter((r) => r.status === f.status);
    }

    if (f.dateFrom) {
      data = data.filter((r) => new Date(r.date) >= new Date(f.dateFrom));
    }

    if (f.dateTo) {
      data = data.filter((r) => new Date(r.date) <= new Date(f.dateTo));
    }

    return data;
  });

  // إعدادات الأعمدة
  columns: TableColumn[] = [
    { key: 'id', header: '#', sortable: true },
    { key: 'customerName', header: 'المراجعة', type: 'custom' },
    { key: 'product.name', header: 'المنتج', type: 'custom' },
    { key: 'rating', header: 'التقييم', type: 'custom' },
    { key: 'date', header: 'التاريخ', type: 'date', dateFormat: 'dd MMMM yyyy' },
    { key: 'status', header: 'الحالة', type: 'badge', badgeConfig: this.getStatusBadgeConfig() },
  ];

  // إعدادات الإجراءات
  actions: TableAction[] = [
    {
      label: 'عرض',
      icon: 'bi-eye',
      class: 'action-btn view',
      callback: (item) => this.viewReview(item),
    },
    {
      label: 'رد',
      icon: 'bi-reply',
      class: 'action-btn reply',
      callback: (item) => this.openReplyModal(item),
    },
    {
      label: 'قبول',
      icon: 'bi-check',
      class: 'action-btn approve',
      callback: (item) => this.approveReview(item),
      visible: (item) => item.status === 'pending',
    },
    {
      label: 'رفض',
      icon: 'bi-x',
      class: 'action-btn reject',
      callback: (item) => this.rejectReview(item),
      visible: (item) => item.status === 'pending',
    },
    {
      label: 'نشر',
      icon: 'bi-check',
      class: 'action-btn approve',
      callback: (item) => this.publishReview(item),
      visible: (item) => item.status === 'hidden',
    },
    {
      label: 'حذف',
      icon: 'bi-trash',
      class: 'action-btn delete',
      callback: (item) => this.deleteReview(item),
      visible: (item) => item.status !== 'pending',
    },
  ];

  // إعدادات الجدول
  tableConfig: TableConfig = {
    showHeader: true,
    showActions: true,
    title: 'قائمة المراجعات',
    emptyMessage: 'لا توجد مراجعات للعرض',
    loading: false,
    pageSize: 10,
    showPagination: true,
    headerActions: [
      {
        label: 'تصدير',
        icon: 'bi-download',
        class: 'btn btn-outline-primary',
        callback: () => this.exportReviews(),
      },
      {
        label: 'إجراء جماعي',
        icon: 'bi-check-square',
        class: 'btn btn-primary',
        callback: () => this.bulkAction(),
      },
    ],
  };

  // المراجعة المحددة للرد
  selectedReview = signal<Review | null>(null);
  showReplyModal = signal(false);
  replyText = '';
  replySignature = 'فريق FashionHub';
  publishImmediately = true;

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    // بيانات تجريبية
    this.reviews.set([
      {
        id: 1,
        customerName: 'أحمد محمد',
        customerInitial: 'أ',
        rating: 5,
        reviewText: 'منتج رائع وجودة ممتازة. الشحن كان سريعاً والتغليف أنيق.',
        date: '2023-12-15',
        status: 'published',
        product: {
          name: 'قميص رجالي كلاسيك',
          code: 'PRD-001',
          category: 'رجالي',
          image: 'https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=قميص',
        },
        reply: {
          text: 'شكراً لك أحمد على تقييمك الإيجابي!',
          author: 'فريق FashionHub',
          date: '2023-12-16',
        },
        images: [],
      },
      {
        id: 2,
        customerName: 'سارة علي',
        customerInitial: 'س',
        rating: 4,
        reviewText: 'جودة جيدة ولكن الحجم أصغر مما توقعت. أنصح باختيار حجم أكبر.',
        date: '2023-12-12',
        status: 'published',
        product: {
          name: 'فستان سهرة أنيق',
          code: 'PRD-002',
          category: 'نسائي',
          image: 'https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=فستان',
        },
        images: [],
      },
      {
        id: 3,
        customerName: 'خالد حسن',
        customerInitial: 'خ',
        rating: 1,
        reviewText: 'المنتج سيء جداً، الألوان تختلف عن الصورة والجودة متدنية.',
        date: '2023-12-10',
        status: 'pending',
        product: {
          name: 'حذاء رياضي مميز',
          code: 'PRD-003',
          category: 'رجالي',
          image: 'https://via.placeholder.com/60x60/FFD166/000000?text=حذاء',
        },
        images: [],
      },
      {
        id: 4,
        customerName: 'فاطمة عبدالله',
        customerInitial: 'ف',
        rating: 3,
        reviewText: 'تجربة جيدة بشكل عام، لكن الشحن تأخر ثلاثة أيام عن الموعد المحدد.',
        date: '2023-12-08',
        status: 'published',
        product: {
          name: 'ساعة يد فاخرة',
          code: 'PRD-004',
          category: 'إكسسوارات',
          image: 'https://via.placeholder.com/60x60/06D6A0/FFFFFF?text=ساعة',
        },
        images: [],
      },
      {
        id: 5,
        customerName: 'عمر كمال',
        customerInitial: 'ع',
        rating: 4,
        reviewText: 'المنتج جيد ولكن السعر مرتفع مقارنة بجودته.',
        date: '2023-12-05',
        status: 'hidden',
        product: {
          name: 'حقيبة يد نسائية',
          code: 'PRD-005',
          category: 'إكسسوارات',
          image: 'https://via.placeholder.com/60x60/118AB2/FFFFFF?text=حقيبة',
        },
        images: [],
      },
      {
        id: 6,
        customerName: 'نورة سالم',
        customerInitial: 'ن',
        rating: 5,
        reviewText: 'رائع! التصميم جميل والجودة ممتازة. سأطلب منه مرة أخرى بالتأكيد.',
        date: '2023-12-01',
        status: 'published',
        product: {
          name: 'نظارة شمس فاخرة',
          code: 'PRD-006',
          category: 'إكسسوارات',
          image: 'https://via.placeholder.com/60x60/EF476F/FFFFFF?text=نظارة',
        },
        images: [],
      },
    ]);
  }

  private getStatusBadgeConfig(): Record<string, { label: string; class: string }> {
    return {
      published: { label: 'منشور', class: 'status-badge published' },
      pending: { label: 'قيد المراجعة', class: 'status-badge pending' },
      hidden: { label: 'مخفي', class: 'status-badge hidden' },
      rejected: { label: 'مرفوض', class: 'status-badge rejected' },
    };
  }

  // تبديل العرض
  setViewMode(mode: 'table' | 'grid'): void {
    this.viewMode.set(mode);
  }

  // تحديث الفلاتر
  updateFilter(key: keyof ReviewFilters, value: string): void {
    this.filters.update((f) => ({ ...f, [key]: value }));
  }

  // تطبيق الفلاتر
  applyFilters(): void {
    this.showNotification('تم تطبيق التصفية بنجاح', 'success');
  }

  // إعادة تعيين الفلاتر
  resetFilters(): void {
    this.filters.set({
      rating: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      product: '',
      search: '',
    });
    this.showNotification('تم إعادة تعيين الفلاتر', 'info');
  }

  // إجراءات المراجعات
  viewReview(review: Review): void {
    console.log('عرض المراجعة:', review);
  }

  openReplyModal(review: Review): void {
    this.selectedReview.set(review);
    this.showReplyModal.set(true);
    this.replyText = '';
  }

  closeReplyModal(): void {
    this.showReplyModal.set(false);
    this.selectedReview.set(null);
  }

  sendReply(): void {
    if (!this.replyText.trim()) return;

    const review = this.selectedReview();
    if (review) {
      this.reviews.update((reviews) =>
        reviews.map((r) =>
          r.id === review.id
            ? {
                ...r,
                reply: {
                  text: this.replyText,
                  author: this.replySignature,
                  date: new Date().toISOString().split('T')[0],
                },
              }
            : r,
        ),
      );
      this.showNotification('تم إرسال الرد بنجاح', 'success');
      this.closeReplyModal();
    }
  }

  approveReview(review: Review): void {
    this.updateReviewStatus(review.id, 'published');
    this.showNotification('تم قبول المراجعة بنجاح', 'success');
  }

  rejectReview(review: Review): void {
    this.updateReviewStatus(review.id, 'rejected');
    this.showNotification('تم رفض المراجعة', 'warning');
  }

  publishReview(review: Review): void {
    this.updateReviewStatus(review.id, 'published');
    this.showNotification('تم نشر المراجعة بنجاح', 'success');
  }

  deleteReview(review: Review): void {
    if (confirm('هل أنت متأكد من حذف هذه المراجعة؟')) {
      this.reviews.update((reviews) => reviews.filter((r) => r.id !== review.id));
      this.showNotification('تم حذف المراجعة بنجاح', 'success');
    }
  }

  private updateReviewStatus(id: number, status: ReviewStatus): void {
    this.reviews.update((reviews) => reviews.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  exportReviews(): void {
    this.showNotification('جارٍ تحميل ملف Excel...', 'info');
    setTimeout(() => {
      this.showNotification('تم تحميل ملف Excel بنجاح', 'success');
    }, 1000);
  }

  bulkAction(): void {
    this.showNotification('جارٍ تطبيق الإجراء الجماعي...', 'info');
  }

  onSortChange(event: { column: string; direction: 'asc' | 'desc' }): void {
    const { column, direction } = event;
    this.reviews.update((reviews) =>
      [...reviews].sort((a, b) => {
        const aVal = this.getNestedValue(a, column);
        const bVal = this.getNestedValue(b, column);
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return direction === 'asc' ? comparison : -comparison;
      }),
    );
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => o?.[key], obj);
  }

  // مساعد لإنشاء النجوم
  getStars(rating: number): { filled: boolean }[] {
    return Array.from({ length: 5 }, (_, i) => ({ filled: i < rating }));
  }

  // الحصول على فئة التقييم
  getRatingClass(rating: number): string {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 3.5) return 'good';
    if (rating >= 2.5) return 'average';
    if (rating >= 1.5) return 'poor';
    return 'terrible';
  }

  private showNotification(message: string, type: 'success' | 'warning' | 'info'): void {
    // يمكن استخدام خدمة إشعارات مشتركة هنا
    console.log(`[${type}] ${message}`);
  }
}
