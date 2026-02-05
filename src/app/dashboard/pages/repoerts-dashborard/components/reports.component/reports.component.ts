// src/app/features/reports/reports.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';

Chart.register(...registerables);

interface ReportStats {
  totalRevenue: string;
  totalOrders: string;
  newCustomers: string;
  avgOrder: string;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  avgOrderChange: number;
}

interface ReportFilter {
  reportType: string;
  timePeriod: string;
  dateFrom: string;
  dateTo: string;
  category: string;
}

interface Report {
  id: number;
  name: string;
  description: string;
  type: string;
  period: string;
  createdDate: string;
  user: string;
  status: string;
  statusValue: string;
}

@Component({
  selector: 'app-reports-components',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  // إحصائيات التقارير
  stats: ReportStats = {
    totalRevenue: '$45,820',
    totalOrders: '1,248',
    newCustomers: '87',
    avgOrder: '$36.70',
    revenueChange: 18,
    ordersChange: 12,
    customersChange: 15,
    avgOrderChange: 8,
  };

  // فلاتر التقارير
  filters: ReportFilter = {
    reportType: 'sales',
    timePeriod: 'weekly',
    dateFrom: '',
    dateTo: '',
    category: '',
  };

  // خيارات الفلاتر
  reportTypes = [
    { value: 'sales', label: 'مبيعات' },
    { value: 'orders', label: 'طلبات' },
    { value: 'customers', label: 'عملاء' },
    { value: 'products', label: 'منتجات' },
    { value: 'revenue', label: 'إيرادات' },
  ];

  timePeriods = [
    { value: 'daily', label: 'يومي' },
    { value: 'weekly', label: 'أسبوعي' },
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي' },
    { value: 'yearly', label: 'سنوي' },
  ];

  categories = [
    { value: '', label: 'جميع التصنيفات' },
    { value: 'men', label: 'رجالي' },
    { value: 'women', label: 'نسائي' },
    { value: 'kids', label: 'أطفال' },
    { value: 'accessories', label: 'إكسسوارات' },
  ];

  // بيانات الجدول
  reports: Report[] = [
    {
      id: 1,
      name: 'تقرير المبيعات الشهري',
      description: 'تحليل شامل للمبيعات لشهر ديسمبر',
      type: 'مبيعات',
      period: 'ديسمبر 2023',
      createdDate: '15 ديسمبر 2023',
      user: 'محمد أحمد',
      status: 'increase',
      statusValue: '+18%',
    },
    {
      id: 2,
      name: 'تقرير أداء المنتجات',
      description: 'أداء المنتجات للربع الأخير',
      type: 'منتجات',
      period: 'الربع الرابع 2023',
      createdDate: '10 ديسمبر 2023',
      user: 'سارة علي',
      status: 'stable',
      statusValue: 'مستقر',
    },
    {
      id: 3,
      name: 'تحليل العملاء',
      description: 'تحليل سلوك العملاء والولاء',
      type: 'عملاء',
      period: 'نوفمبر 2023',
      createdDate: '5 ديسمبر 2023',
      user: 'خالد حسن',
      status: 'increase',
      statusValue: '+15%',
    },
    {
      id: 4,
      name: 'تقرير المخزون',
      description: 'مستويات المخزون والطلب',
      type: 'مخزون',
      period: 'أسبوعي',
      createdDate: '1 ديسمبر 2023',
      user: 'فاطمة عبدالله',
      status: 'decrease',
      statusValue: '-5%',
    },
    {
      id: 5,
      name: 'تقرير الحملات التسويقية',
      description: 'تحليل فعالية الحملات',
      type: 'تسويق',
      period: 'أكتوبر - نوفمبر 2023',
      createdDate: '25 نوفمبر 2023',
      user: 'عمر كمال',
      status: 'increase',
      statusValue: '+22%',
    },
    {
      id: 6,
      name: 'تقرير العائدات',
      description: 'تحليل عمليات الإرجاع والاستبدال',
      type: 'عائدات',
      period: 'شهري',
      createdDate: '20 نوفمبر 2023',
      user: 'نورة سالم',
      status: 'stable',
      statusValue: 'مستقر',
    },
  ];

  // إعدادات الجدول
  tableColumns: TableColumn[] = [
    { key: 'id', header: '#', sortable: true },
    { key: 'name', header: 'اسم التقرير', type: 'custom' },
    {
      key: 'type',
      header: 'النوع',
      type: 'badge',
      badgeConfig: {
        مبيعات: { label: 'مبيعات', class: 'badge-increase' },
        منتجات: { label: 'منتجات', class: 'badge-stable' },
        عملاء: { label: 'عملاء', class: 'badge-increase' },
        مخزون: { label: 'مخزون', class: 'badge-decrease' },
        تسويق: { label: 'تسويق', class: 'badge-increase' },
        عائدات: { label: 'عائدات', class: 'badge-stable' },
      },
    },
    { key: 'period', header: 'الفترة', sortable: true },
    { key: 'createdDate', header: 'تاريخ الإنشاء', sortable: true },
    { key: 'user', header: 'المستخدم' },
    {
      key: 'statusValue',
      header: 'الحالة',
      type: 'badge',
      badgeConfig: {
        '+18%': { label: '+18%', class: 'badge-increase' },
        '+15%': { label: '+15%', class: 'badge-increase' },
        '+22%': { label: '+22%', class: 'badge-increase' },
        '-5%': { label: '-5%', class: 'badge-decrease' },
        مستقر: { label: 'مستقر', class: 'badge-stable' },
      },
    },
  ];

  tableActions: TableAction[] = [
    {
      label: 'تحميل',
      icon: 'bi-download',
      class: 'action-btn download',
      callback: (item: Report) => this.downloadReport(item),
    },
    {
      label: 'طباعة',
      icon: 'bi-printer',
      class: 'action-btn print',
      callback: (item: Report) => this.printReport(item),
    },
    {
      label: 'مشاركة',
      icon: 'bi-share',
      class: 'action-btn share',
      callback: (item: Report) => this.shareReport(item),
    },
  ];

  tableConfig: TableConfig = {
    showHeader: true,
    showActions: true,
    showPagination: true,
    pageSize: 6,
    title: 'التقارير التفصيلية',
    emptyMessage: 'لا توجد تقارير للعرض',
    headerActions: [
      {
        label: 'تصدير Excel',
        icon: 'bi-file-earmark-excel',
        class: 'btn btn-outline-primary',
        callback: () => this.exportReports(),
      },
      {
        label: 'تقرير جديد',
        icon: 'bi-plus-circle',
        class: 'btn btn-primary',
        callback: () => this.generateNewReport(),
      },
    ],
  };

  // الرسوم البيانية
  private revenueChart?: Chart;
  private ordersChart?: Chart;
  private productsChart?: Chart;
  private customersChart?: Chart;

  ngOnInit(): void {
    this.initCharts();
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  private initCharts(): void {
    setTimeout(() => {
      this.initRevenueChart();
      this.initOrdersChart();
      this.initProductsChart();
      this.initCustomersChart();
    }, 100);
  }

  private destroyCharts(): void {
    this.revenueChart?.destroy();
    this.ordersChart?.destroy();
    this.productsChart?.destroy();
    this.customersChart?.destroy();
  }

  private initRevenueChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'يناير',
          'فبراير',
          'مارس',
          'أبريل',
          'مايو',
          'يونيو',
          'يوليو',
          'أغسطس',
          'سبتمبر',
          'أكتوبر',
          'نوفمبر',
          'ديسمبر',
        ],
        datasets: [
          {
            label: 'الإيرادات ($)',
            data: [
              32000, 28000, 35000, 30000, 38000, 42000, 45000, 48000, 40000, 46000, 50000, 45820,
            ],
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: this.getChartOptions('$'),
    });
  }

  private initOrdersChart(): void {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.ordersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
        datasets: [
          {
            label: 'عدد الطلبات',
            data: [45, 52, 38, 65, 72, 48, 56],
            backgroundColor: 'rgba(13, 110, 253, 0.2)',
            borderColor: 'rgba(13, 110, 253, 1)',
            borderWidth: 3,
          },
        ],
      },
      options: this.getChartOptions(),
    });
  }

  private initProductsChart(): void {
    const ctx = document.getElementById('productsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.productsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'قميص رجالي',
          'فستان سهرة',
          'حذاء رياضي',
          'ساعة يد',
          'حقيبة يد',
          'نظارة شمس',
          'معطف شتوي',
        ],
        datasets: [
          {
            label: 'عدد المبيعات',
            data: [245, 198, 156, 132, 120, 98, 85],
            backgroundColor: [
              'rgba(230, 57, 70, 0.2)',
              'rgba(111, 66, 193, 0.2)',
              'rgba(13, 110, 253, 0.2)',
              'rgba(40, 167, 69, 0.2)',
              'rgba(255, 193, 7, 0.2)',
              'rgba(220, 53, 69, 0.2)',
              'rgba(108, 117, 125, 0.2)',
            ],
            borderColor: [
              'rgba(230, 57, 70, 1)',
              'rgba(111, 66, 193, 1)',
              'rgba(13, 110, 253, 1)',
              'rgba(40, 167, 69, 1)',
              'rgba(255, 193, 7, 1)',
              'rgba(220, 53, 69, 1)',
              'rgba(108, 117, 125, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        ...this.getChartOptions(),
        indexAxis: 'y',
      },
    });
  }

  private initCustomersChart(): void {
    const ctx = document.getElementById('customersChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.customersChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'عملاء جدد',
            data: [120, 180, 220, 280],
            backgroundColor: 'rgba(230, 57, 70, 0.2)',
            borderColor: 'rgba(230, 57, 70, 1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
          },
          {
            label: 'عملاء نشيطون',
            data: [850, 920, 980, 1042],
            backgroundColor: 'rgba(13, 110, 253, 0.2)',
            borderColor: 'rgba(13, 110, 253, 1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: this.getChartOptions(),
    });
  }

  private getChartOptions(currencyPrefix: string = ''): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Cairo', size: 14 },
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          rtl: true,
          bodyFont: { family: 'Cairo' },
          titleFont: { family: 'Cairo' },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: number) =>
              currencyPrefix ? `${currencyPrefix}${value.toLocaleString()}` : value,
            font: { family: 'Cairo' },
          },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
        },
        x: {
          ticks: { font: { family: 'Cairo' } },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
        },
      },
    };
  }

  // دوال الإجراءات
  applyFilters(): void {
    console.log('تطبيق التصفية:', this.filters);
    this.updateCharts();
    this.showNotification('تم تحديث التقارير بناءً على التصفية', 'success');
  }

  resetFilters(): void {
    this.filters = {
      reportType: 'sales',
      timePeriod: 'weekly',
      dateFrom: '',
      dateTo: '',
      category: '',
    };
    this.initCharts();
    this.showNotification('تم إعادة تعيين جميع الفلاتر', 'info');
  }

  private updateCharts(): void {
    if (this.filters.timePeriod === 'daily' && this.ordersChart) {
      this.ordersChart.data.labels = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
      this.ordersChart.data.datasets[0].data = [15, 25, 18, 32, 28, 35, 20];
      this.ordersChart.update();
    } else if (this.filters.timePeriod === 'weekly' && this.ordersChart) {
      this.ordersChart.data.labels = [
        'السبت',
        'الأحد',
        'الإثنين',
        'الثلاثاء',
        'الأربعاء',
        'الخميس',
        'الجمعة',
      ];
      this.ordersChart.data.datasets[0].data = [45, 52, 38, 65, 72, 48, 56];
      this.ordersChart.update();
    }
  }

  downloadChart(chartId: string): void {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${chartId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      this.showNotification('تم تحميل الرسم البياني', 'success');
    }
  }

  printChart(chartId: string): void {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    if (canvas) {
      const win = window.open('');
      win?.document.write(`<img src='${canvas.toDataURL('image/png')}'/>`);
      win?.print();
      this.showNotification('جارٍ الطباعة...', 'info');
    }
  }

  downloadReport(report: Report): void {
    this.showNotification(`جارٍ تحميل تقرير: ${report.name}`, 'info');
  }

  printReport(report: Report): void {
    this.showNotification(`جارٍ طباعة تقرير: ${report.name}`, 'info');
  }

  shareReport(report: Report): void {
    this.showNotification(`جارٍ مشاركة تقرير: ${report.name}`, 'info');
  }

  exportReports(): void {
    this.showNotification('جارٍ تحميل ملف Excel...', 'info');
    setTimeout(() => {
      this.showNotification('تم تصدير التقارير إلى Excel بنجاح', 'success');
    }, 1000);
  }

  generateNewReport(): void {
    this.showNotification('جارٍ إنشاء التقرير الجديد...', 'info');
    setTimeout(() => {
      this.showNotification('تم إنشاء التقرير بنجاح', 'success');
    }, 1500);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort changed:', sort);
    // تنفيذ منطق الفرز هنا
  }

  private showNotification(message: string, type: 'success' | 'info' | 'warning'): void {
    // يمكنك استخدام خدمة Toast أو Snackbar هنا
    console.log(`[${type}] ${message}`);
    // مثال بسيط للإشعار
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} alert-dismissible fade show alert-notification`;
    notification.innerHTML = `${message}<button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>`;
    notification.style.cssText =
      'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; min-width: 300px;';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}
