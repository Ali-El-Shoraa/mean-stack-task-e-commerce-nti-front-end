// src/app/pages/customers/customers.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';
import { AbsPipe } from '../../../../../core/pipes/abs.pipe-pipe';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'pending';
  city: string;
  country: string;
  address: string;
}

interface CustomerStats {
  total: number;
  active: number;
  new: number;
  inactive: number;
  totalChange: number;
  activeChange: number;
  newChange: number;
  inactiveChange: number;
}

interface CustomerFilters {
  status: string;
  orders: string;
  dateFrom: string;
  dateTo: string;
  purchasesFrom: number | null;
  purchasesTo: number | null;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, AbsPipe],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  // البيانات
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  // الإحصائيات
  stats: CustomerStats = {
    total: 1248,
    active: 1042,
    new: 87,
    inactive: 119,
    totalChange: 12,
    activeChange: 8,
    newChange: 15,
    inactiveChange: -5,
  };

  // الفلاتر
  filters: CustomerFilters = {
    status: '',
    orders: '',
    dateFrom: '',
    dateTo: '',
    purchasesFrom: null,
    purchasesTo: null,
  };

  // عرض الجدول أو الشبكة
  viewMode: 'table' | 'grid' = 'table';

  // إعدادات الجدول
  tableConfig: TableConfig = {
    title: 'قائمة العملاء',
    showHeader: true,
    showActions: true,
    showPagination: true,
    pageSize: 8,
    emptyMessage: 'لا يوجد عملاء للعرض',
    loading: false,
    headerActions: [
      {
        label: 'تصدير',
        icon: 'bi-download',
        class: 'btn btn-outline-primary',
        callback: () => this.exportCustomers(),
      },
      {
        label: 'عميل جديد',
        icon: 'bi-plus-circle',
        class: 'btn btn-primary',
        callback: () => this.openAddCustomerModal(),
      },
    ],
  };

  // أعمدة الجدول
  columns: TableColumn[] = [
    { key: 'id', header: '#', sortable: true },
    { key: 'customerInfo', header: 'العميل', type: 'custom' },
    { key: 'contactInfo', header: 'معلومات التواصل', type: 'custom' },
    {
      key: 'joinDate',
      header: 'تاريخ التسجيل',
      type: 'date',
      dateFormat: 'dd MMMM yyyy',
      sortable: true,
    },
    {
      key: 'orders',
      header: 'عدد الطلبات',
      type: 'custom',
      sortable: true,
    },
    {
      key: 'totalSpent',
      header: 'إجمالي المشتريات',
      type: 'currency',
      currencySymbol: 'USD',
      sortable: true,
    },
    {
      key: 'status',
      header: 'الحالة',
      type: 'badge',
      badgeConfig: {
        active: { label: 'نشط', class: 'active' },
        inactive: { label: 'غير نشط', class: 'inactive' },
        pending: { label: 'معلق', class: 'pending' },
      },
    },
  ];

  // إجراءات الجدول
  actions: TableAction[] = [
    {
      label: 'عرض',
      icon: 'bi-eye',
      class: 'action-btn view',
      callback: (item) => this.viewCustomer(item),
    },
    {
      label: 'رسالة',
      icon: 'bi-envelope',
      class: 'action-btn message',
      callback: (item) => this.messageCustomer(item),
    },
    {
      label: 'سجل',
      icon: 'bi-clock-history',
      class: 'action-btn history',
      callback: (item) => this.viewHistory(item),
      visible: (item) => item.orders >= 5,
    },
    {
      label: 'تعديل',
      icon: 'bi-pencil',
      class: 'action-btn edit',
      callback: (item) => this.editCustomer(item),
      visible: (item) => item.orders < 5 && item.status !== 'pending',
    },
    {
      label: 'حذف',
      icon: 'bi-trash',
      class: 'action-btn delete',
      callback: (item) => this.deleteCustomer(item),
      visible: (item) => item.status === 'pending',
    },
  ];

  // Modal state
  showAddModal = false;
  newCustomer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: '',
    notes: '',
  };

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.tableConfig.loading = true;

    // محاكاة تحميل البيانات
    setTimeout(() => {
      this.customers = [
        {
          id: 1,
          firstName: 'أحمد',
          lastName: 'محمد',
          email: 'ahmed@example.com',
          phone: '+966 50 123 4567',
          joinDate: '2023-01-15',
          orders: 12,
          totalSpent: 2450.75,
          status: 'active',
          city: 'الرياض',
          country: 'السعودية',
          address: 'شارع الملك فهد، الرياض',
        },
        {
          id: 2,
          firstName: 'سارة',
          lastName: 'علي',
          email: 'sara@example.com',
          phone: '+966 55 987 6543',
          joinDate: '2023-02-10',
          orders: 4,
          totalSpent: 850.5,
          status: 'active',
          city: 'جدة',
          country: 'السعودية',
          address: 'حي السلامة، جدة',
        },
        {
          id: 3,
          firstName: 'خالد',
          lastName: 'حسن',
          email: 'khalid@example.com',
          phone: '+966 54 321 0987',
          joinDate: '2023-03-05',
          orders: 1,
          totalSpent: 189.99,
          status: 'active',
          city: 'الدمام',
          country: 'السعودية',
          address: 'حي النخيل، الدمام',
        },
        {
          id: 4,
          firstName: 'فاطمة',
          lastName: 'عبدالله',
          email: 'fatima@example.com',
          phone: '+966 53 456 7890',
          joinDate: '2023-04-20',
          orders: 0,
          totalSpent: 0,
          status: 'pending',
          city: 'الرياض',
          country: 'السعودية',
          address: 'حي العليا، الرياض',
        },
        {
          id: 5,
          firstName: 'عمر',
          lastName: 'كمال',
          email: 'omar@example.com',
          phone: '+966 56 789 0123',
          joinDate: '2023-05-12',
          orders: 8,
          totalSpent: 1750.25,
          status: 'active',
          city: 'الخرج',
          country: 'السعودية',
          address: 'حي النزهة، الخرج',
        },
        {
          id: 6,
          firstName: 'نورة',
          lastName: 'سالم',
          email: 'nora@example.com',
          phone: '+966 57 890 1234',
          joinDate: '2023-06-03',
          orders: 3,
          totalSpent: 450.0,
          status: 'inactive',
          city: 'أبها',
          country: 'السعودية',
          address: 'حي المفتاحة، أبها',
        },
        {
          id: 7,
          firstName: 'مريم',
          lastName: 'خالد',
          email: 'mariam@example.com',
          phone: '+966 58 901 2345',
          joinDate: '2023-07-25',
          orders: 15,
          totalSpent: 3200.5,
          status: 'active',
          city: 'الطائف',
          country: 'السعودية',
          address: 'حي الشفا، الطائف',
        },
        {
          id: 8,
          firstName: 'يوسف',
          lastName: 'أحمد',
          email: 'yousef@example.com',
          phone: '+966 59 012 3456',
          joinDate: '2023-08-08',
          orders: 1,
          totalSpent: 99.99,
          status: 'active',
          city: 'بريدة',
          country: 'السعودية',
          address: 'حي الروضة، بريدة',
        },
      ];

      this.filteredCustomers = [...this.customers];
      this.tableConfig.loading = false;
    }, 500);
  }

  // الحصول على مستوى الطلبات
  getOrdersLevel(orders: number): string {
    if (orders === 0) return 'none';
    if (orders === 1) return 'low';
    if (orders <= 5) return 'medium';
    return 'high';
  }

  // الحصول على نص الطلبات
  getOrdersText(orders: number): string {
    if (orders === 0) return 'لا يوجد';
    return `${orders} طلب${orders > 1 ? 'ات' : ''}`;
  }

  // تطبيق الفلاتر
  applyFilters(): void {
    this.filteredCustomers = this.customers.filter((customer) => {
      // فلتر الحالة
      if (this.filters.status && customer.status !== this.filters.status) {
        return false;
      }

      // فلتر الطلبات
      if (this.filters.orders) {
        const level = this.getOrdersLevel(customer.orders);
        if (this.filters.orders !== level) return false;
      }

      // فلتر التاريخ
      if (this.filters.dateFrom) {
        const fromDate = new Date(this.filters.dateFrom);
        const joinDate = new Date(customer.joinDate);
        if (joinDate < fromDate) return false;
      }

      if (this.filters.dateTo) {
        const toDate = new Date(this.filters.dateTo);
        const joinDate = new Date(customer.joinDate);
        if (joinDate > toDate) return false;
      }

      // فلتر المشتريات
      if (this.filters.purchasesFrom !== null && customer.totalSpent < this.filters.purchasesFrom) {
        return false;
      }

      if (this.filters.purchasesTo !== null && customer.totalSpent > this.filters.purchasesTo) {
        return false;
      }

      return true;
    });

    this.showNotification('تم تطبيق التصفية بنجاح', 'success');
  }

  // إعادة تعيين الفلاتر
  resetFilters(): void {
    this.filters = {
      status: '',
      orders: '',
      dateFrom: '',
      dateTo: '',
      purchasesFrom: null,
      purchasesTo: null,
    };
    this.filteredCustomers = [...this.customers];
    this.showNotification('تم إعادة تعيين الفلاتر', 'info');
  }

  // تبديل العرض
  setViewMode(mode: 'table' | 'grid'): void {
    this.viewMode = mode;
  }

  // تصدير العملاء
  exportCustomers(): void {
    this.showNotification('جارٍ تحميل ملف Excel...', 'info');
    setTimeout(() => {
      this.showNotification('تم تحميل ملف Excel بنجاح', 'success');
    }, 1000);
  }

  // فتح modal إضافة عميل
  openAddCustomerModal(): void {
    this.showAddModal = true;
  }

  // إغلاق modal إضافة عميل
  closeAddCustomerModal(): void {
    this.showAddModal = false;
    this.resetNewCustomerForm();
  }

  // إعادة تعيين النموذج
  resetNewCustomerForm(): void {
    this.newCustomer = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      password: '',
      confirmPassword: '',
      notes: '',
    };
  }

  // حفظ عميل جديد
  saveCustomer(): void {
    // التحقق من صحة البيانات
    if (
      !this.newCustomer.firstName ||
      !this.newCustomer.lastName ||
      !this.newCustomer.email ||
      !this.newCustomer.phone
    ) {
      this.showNotification('يرجى ملء جميع الحقول المطلوبة', 'warning');
      return;
    }

    if (this.newCustomer.password !== this.newCustomer.confirmPassword) {
      this.showNotification('كلمتا المرور غير متطابقتين', 'warning');
      return;
    }

    this.showNotification('تم حفظ العميل بنجاح', 'success');
    this.closeAddCustomerModal();
  }

  // عرض العميل
  viewCustomer(customer: Customer): void {
    console.log('عرض العميل:', customer);
    // يمكن التوجيه لصفحة تفاصيل العميل
  }

  // إرسال رسالة للعميل
  messageCustomer(customer: Customer): void {
    console.log('إرسال رسالة للعميل:', customer);
    this.showNotification(`جارٍ فتح نافذة الرسائل للعميل ${customer.firstName}`, 'info');
  }

  // عرض سجل العميل
  viewHistory(customer: Customer): void {
    console.log('عرض سجل العميل:', customer);
  }

  // تعديل العميل
  editCustomer(customer: Customer): void {
    console.log('تعديل العميل:', customer);
  }

  // حذف العميل
  deleteCustomer(customer: Customer): void {
    if (confirm(`هل أنت متأكد من حذف العميل ${customer.firstName} ${customer.lastName}؟`)) {
      this.customers = this.customers.filter((c) => c.id !== customer.id);
      this.filteredCustomers = this.filteredCustomers.filter((c) => c.id !== customer.id);
      this.showNotification('تم حذف العميل بنجاح', 'success');
    }
  }

  // معالجة الترتيب
  onSortChange(event: { column: string; direction: 'asc' | 'desc' }): void {
    const { column, direction } = event;

    this.filteredCustomers.sort((a: any, b: any) => {
      let valueA = a[column];
      let valueB = b[column];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // عرض الإشعارات
  showNotification(message: string, type: 'success' | 'warning' | 'info'): void {
    // يمكن استخدام service للإشعارات
    console.log(`[${type}] ${message}`);
    // TODO: إضافة toast notification service
  }
}
