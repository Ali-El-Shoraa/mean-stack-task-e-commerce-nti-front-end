import { Component, output } from '@angular/core';
import { Order } from '../../../../../core/models/order.model';
import { DataTableComponent } from '../../../../shared/components/data-table.component/data-table.component';
import { TableAction, TableColumn, TableConfig } from '../../../../../core/models/table.models';

@Component({
  selector: 'app-orders-dashboard-table-component',
  imports: [DataTableComponent],
  templateUrl: './orders-dashboard-table.component.html',
  styleUrl: './orders-dashboard-table.component.scss',
})
export class OrdersDashboardTableComponent {
  // src/app/components/orders-table/orders-table.component.ts
  // src/app/components/orders-table/orders-table.component.ts

  // ✅ أضف output
  viewOrder = output<Order>();

  columns: TableColumn[] = [
    {
      key: 'id',
      header: 'رقم الطلب',
      type: 'link',
      linkRoute: '/orders',
      linkParam: 'id',
      sortable: true,
    },
    { key: 'customer', header: 'العميل', sortable: true },
    { key: 'date', header: 'التاريخ', type: 'date', sortable: true },
    { key: 'amount', header: 'المبلغ', type: 'currency' },
    {
      key: 'status',
      header: 'الحالة',
      type: 'badge',
      badgeConfig: {
        completed: { label: 'مكتمل', class: 'completed' },
        pending: { label: 'معلق', class: 'pending' },
        processing: { label: 'قيد المعالجة', class: 'processing' },
        cancelled: { label: 'ملغي', class: 'cancelled' },
      },
    },
  ];

  actions: TableAction[] = [
    {
      label: 'عرض',
      icon: 'bi-eye',
      // ✅ غيّر من route إلى callback
      callback: (order) => this.onViewOrder(order),
    },
    {
      label: 'تعديل',
      icon: 'bi-pencil',
      route: '/orders/edit',
      routeParam: 'id',
      visible: (order) => order.status !== 'cancelled',
    },
  ];

  tableConfig: TableConfig = {
    title: 'الطلبات الأخيرة',
    headerActions: [
      {
        label: 'عرض الكل',
        icon: 'bi-list',
        route: '/orders',
      },
      {
        label: 'إضافة طلب',
        icon: 'bi-plus',
        route: '/orders/new',
        class: 'btn btn-success btn-sm',
      },
    ],
  };

  getRecentOrders(): Order[] {
    return [
      {
        id: 'ORD-7842',
        customer: {
          id: 1,
          name: 'أحمد محمد علي',
          email: 'ahmed@example.com',
          phone: '+966501234567',
        },
        date: '2026-02-03',
        amount: 245.99,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'تيشيرت قطني', quantity: 2, price: 49.99, total: 99.98 },
          { id: 2, productName: 'جينز أزرق', quantity: 1, price: 89.99, total: 89.99 },
          { id: 3, productName: 'حذاء رياضي', quantity: 1, price: 56.02, total: 56.02 },
        ],
        address: 'شارع الملك فهد، الرياض',
        trackingNumber: 'TRK-789456123',
      },
      {
        id: 'ORD-7841',
        customer: {
          id: 2,
          name: 'سارة علي حسن',
          email: 'sara@example.com',
          phone: '+966502345678',
        },
        date: '2026-02-03',
        amount: 189.5,
        paymentMethod: 'cash',
        status: 'processing',
        items: [
          { id: 1, productName: 'فستان صيفي', quantity: 1, price: 129.5, total: 129.5 },
          { id: 2, productName: 'حقيبة يد', quantity: 1, price: 60.0, total: 60.0 },
        ],
        address: 'حي النزهة، جدة',
      },
      {
        id: 'ORD-7840',
        customer: {
          id: 3,
          name: 'خالد حسن محمود',
          email: 'khalid@example.com',
          phone: '+966503456789',
        },
        date: '2026-02-02',
        amount: 320.75,
        paymentMethod: 'bank',
        status: 'pending',
        items: [
          { id: 1, productName: 'بدلة رسمية', quantity: 1, price: 250.0, total: 250.0 },
          { id: 2, productName: 'ربطة عنق', quantity: 2, price: 35.375, total: 70.75 },
        ],
        address: 'شارع التحلية، الدمام',
      },
      {
        id: 'ORD-7839',
        customer: {
          id: 4,
          name: 'فاطمة عبدالله',
          email: 'fatima@example.com',
          phone: '+966504567890',
        },
        date: '2026-02-02',
        amount: 150.0,
        paymentMethod: 'credit',
        status: 'completed',
        items: [{ id: 1, productName: 'عباية سوداء', quantity: 1, price: 150.0, total: 150.0 }],
        address: 'حي الروضة، الرياض',
        trackingNumber: 'TRK-456123789',
      },
      {
        id: 'ORD-7838',
        customer: {
          id: 5,
          name: 'عمر كمال الدين',
          email: 'omar@example.com',
          phone: '+966505678901',
        },
        date: '2026-02-02',
        amount: 425.3,
        paymentMethod: 'cash',
        status: 'cancelled',
        items: [
          { id: 1, productName: 'جاكيت جلد', quantity: 1, price: 350.0, total: 350.0 },
          { id: 2, productName: 'قميص كاجوال', quantity: 2, price: 37.65, total: 75.3 },
        ],
        address: 'حي السلامة، جدة',
        notes: 'تم الإلغاء بطلب العميل',
      },
      {
        id: 'ORD-7837',
        customer: {
          id: 6,
          name: 'نورا أحمد سعيد',
          email: 'nora@example.com',
          phone: '+966506789012',
        },
        date: '2026-02-01',
        amount: 89.99,
        paymentMethod: 'credit',
        status: 'completed',
        items: [{ id: 1, productName: 'بلوزة حريرية', quantity: 1, price: 89.99, total: 89.99 }],
        address: 'شارع الأمير سلطان، الرياض',
        trackingNumber: 'TRK-321654987',
      },
      {
        id: 'ORD-7836',
        customer: {
          id: 7,
          name: 'محمد إبراهيم',
          email: 'mohammed@example.com',
          phone: '+966507890123',
        },
        date: '2026-02-01',
        amount: 567.0,
        paymentMethod: 'bank',
        status: 'processing',
        items: [
          { id: 1, productName: 'ساعة يد فاخرة', quantity: 1, price: 450.0, total: 450.0 },
          { id: 2, productName: 'نظارة شمسية', quantity: 1, price: 117.0, total: 117.0 },
        ],
        address: 'حي العليا، الرياض',
      },
      {
        id: 'ORD-7835',
        customer: { id: 8, name: 'ليلى محمود', email: 'layla@example.com', phone: '+966508901234' },
        date: '2026-02-01',
        amount: 234.5,
        paymentMethod: 'credit',
        status: 'shipped',
        items: [
          { id: 1, productName: 'حذاء كعب عالي', quantity: 1, price: 159.5, total: 159.5 },
          { id: 2, productName: 'إكسسوارات', quantity: 1, price: 75.0, total: 75.0 },
        ],
        address: 'حي الزهراء، جدة',
        trackingNumber: 'TRK-654987321',
      },
      {
        id: 'ORD-7834',
        customer: {
          id: 9,
          name: 'يوسف عبدالرحمن',
          email: 'yousef@example.com',
          phone: '+966509012345',
        },
        date: '2026-01-31',
        amount: 178.25,
        paymentMethod: 'cash',
        status: 'pending',
        items: [
          { id: 1, productName: 'شورت رياضي', quantity: 2, price: 45.0, total: 90.0 },
          { id: 2, productName: 'تيشيرت رياضي', quantity: 2, price: 44.125, total: 88.25 },
        ],
        address: 'حي الفيصلية، الدمام',
      },
      {
        id: 'ORD-7833',
        customer: { id: 10, name: 'هدى سمير', email: 'huda@example.com', phone: '+966510123456' },
        date: '2026-01-31',
        amount: 445.0,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'معطف شتوي', quantity: 1, price: 320.0, total: 320.0 },
          { id: 2, productName: 'قفازات جلد', quantity: 1, price: 65.0, total: 65.0 },
          { id: 3, productName: 'وشاح صوف', quantity: 1, price: 60.0, total: 60.0 },
        ],
        address: 'شارع العروبة، الرياض',
        trackingNumber: 'TRK-147258369',
      },
      {
        id: 'ORD-7832',
        customer: { id: 11, name: 'كريم طارق', email: 'karim@example.com', phone: '+966511234567' },
        date: '2026-01-31',
        amount: 99.99,
        paymentMethod: 'bank',
        status: 'cancelled',
        items: [{ id: 1, productName: 'قميص كتان', quantity: 1, price: 99.99, total: 99.99 }],
        address: 'حي الشاطئ، جدة',
        notes: 'المنتج غير متوفر',
      },
      {
        id: 'ORD-7831',
        customer: { id: 12, name: 'منى عادل', email: 'mona@example.com', phone: '+966512345678' },
        date: '2026-01-30',
        amount: 678.5,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'طقم ملابس نوم', quantity: 2, price: 189.25, total: 378.5 },
          { id: 2, productName: 'روب حمام', quantity: 1, price: 300.0, total: 300.0 },
        ],
        address: 'حي الملقا، الرياض',
        trackingNumber: 'TRK-963852741',
      },
      {
        id: 'ORD-7830',
        customer: {
          id: 13,
          name: 'حسام الدين',
          email: 'hossam@example.com',
          phone: '+966513456789',
        },
        date: '2026-01-30',
        amount: 234.0,
        paymentMethod: 'cash',
        status: 'processing',
        items: [{ id: 1, productName: 'بنطلون قماش', quantity: 2, price: 117.0, total: 234.0 }],
        address: 'شارع الملك عبدالعزيز، الدمام',
      },
      {
        id: 'ORD-7829',
        customer: {
          id: 14,
          name: 'رانيا محمد',
          email: 'rania@example.com',
          phone: '+966514567890',
        },
        date: '2026-01-30',
        amount: 156.75,
        paymentMethod: 'credit',
        status: 'shipped',
        items: [{ id: 1, productName: 'سكارف حرير', quantity: 3, price: 52.25, total: 156.75 }],
        address: 'حي النهضة، جدة',
        trackingNumber: 'TRK-741852963',
      },
      {
        id: 'ORD-7828',
        customer: { id: 15, name: 'أمير سعيد', email: 'amir@example.com', phone: '+966515678901' },
        date: '2026-01-29',
        amount: 890.0,
        paymentMethod: 'bank',
        status: 'pending',
        items: [
          { id: 1, productName: 'بدلة سهرة', quantity: 1, price: 750.0, total: 750.0 },
          { id: 2, productName: 'حذاء رسمي', quantity: 1, price: 140.0, total: 140.0 },
        ],
        address: 'حي الياسمين، الرياض',
      },
      {
        id: 'ORD-7827',
        customer: { id: 16, name: 'سلمى أحمد', email: 'salma@example.com', phone: '+966516789012' },
        date: '2026-01-29',
        amount: 345.25,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'فستان سهرة', quantity: 1, price: 280.0, total: 280.0 },
          { id: 2, productName: 'كلتش يدوية', quantity: 1, price: 65.25, total: 65.25 },
        ],
        address: 'شارع فلسطين، جدة',
        trackingNumber: 'TRK-258369147',
      },
      {
        id: 'ORD-7826',
        customer: {
          id: 17,
          name: 'عبدالله حسين',
          email: 'abdullah@example.com',
          phone: '+966517890123',
        },
        date: '2026-01-29',
        amount: 123.5,
        paymentMethod: 'cash',
        status: 'cancelled',
        items: [{ id: 1, productName: 'تيشيرت بولو', quantity: 2, price: 61.75, total: 123.5 }],
        address: 'حي الخبر الشمالية',
        notes: 'عنوان التوصيل غير صحيح',
      },
      {
        id: 'ORD-7825',
        customer: { id: 18, name: 'دينا خالد', email: 'dina@example.com', phone: '+966518901234' },
        date: '2026-01-28',
        amount: 567.99,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'حقيبة سفر', quantity: 1, price: 420.0, total: 420.0 },
          { id: 2, productName: 'محفظة جلد', quantity: 1, price: 147.99, total: 147.99 },
        ],
        address: 'حي الورود، الرياض',
        trackingNumber: 'TRK-369147258',
      },
      {
        id: 'ORD-7824',
        customer: {
          id: 19,
          name: 'مصطفى عمر',
          email: 'mustafa@example.com',
          phone: '+966519012345',
        },
        date: '2026-01-28',
        amount: 234.0,
        paymentMethod: 'bank',
        status: 'processing',
        items: [{ id: 1, productName: 'سويتر صوف', quantity: 2, price: 117.0, total: 234.0 }],
        address: 'شارع الأمير ماجد، جدة',
      },
      {
        id: 'ORD-7823',
        customer: { id: 20, name: 'إيمان سيد', email: 'eman@example.com', phone: '+966520123456' },
        date: '2026-01-28',
        amount: 445.5,
        paymentMethod: 'credit',
        status: 'shipped',
        items: [
          { id: 1, productName: 'جاكيت دنيم', quantity: 1, price: 245.5, total: 245.5 },
          { id: 2, productName: 'بنطلون جينز', quantity: 2, price: 100.0, total: 200.0 },
        ],
        address: 'حي الصفا، الرياض',
        trackingNumber: 'TRK-852741963',
      },
      {
        id: 'ORD-7822',
        customer: { id: 21, name: 'طارق حسن', email: 'tarek@example.com', phone: '+966521234567' },
        date: '2026-01-27',
        amount: 178.0,
        paymentMethod: 'cash',
        status: 'pending',
        items: [{ id: 1, productName: 'شماغ فاخر', quantity: 2, price: 89.0, total: 178.0 }],
        address: 'حي المحمدية، الدمام',
      },
      {
        id: 'ORD-7821',
        customer: { id: 22, name: 'نهى محمود', email: 'noha@example.com', phone: '+966522345678' },
        date: '2026-01-27',
        amount: 289.99,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'طقم رياضي نسائي', quantity: 1, price: 289.99, total: 289.99 },
        ],
        address: 'شارع التخصصي، الرياض',
        trackingNumber: 'TRK-159357486',
      },
      {
        id: 'ORD-7820',
        customer: {
          id: 23,
          name: 'وليد أحمد',
          email: 'waleed@example.com',
          phone: '+966523456789',
        },
        date: '2026-01-27',
        amount: 456.25,
        paymentMethod: 'bank',
        status: 'processing',
        items: [
          { id: 1, productName: 'ثوب سعودي', quantity: 1, price: 350.0, total: 350.0 },
          { id: 2, productName: 'طاقية', quantity: 3, price: 35.417, total: 106.25 },
        ],
        address: 'حي السليمانية، الرياض',
      },
      {
        id: 'ORD-7819',
        customer: {
          id: 24,
          name: 'ياسمين علي',
          email: 'yasmin@example.com',
          phone: '+966524567890',
        },
        date: '2026-01-26',
        amount: 678.0,
        paymentMethod: 'credit',
        status: 'completed',
        items: [
          { id: 1, productName: 'عباية مطرزة', quantity: 1, price: 450.0, total: 450.0 },
          { id: 2, productName: 'شيلة حرير', quantity: 2, price: 114.0, total: 228.0 },
        ],
        address: 'حي الحمراء، جدة',
        trackingNumber: 'TRK-486159357',
      },
      {
        id: 'ORD-7818',
        customer: {
          id: 25,
          name: 'سامي إبراهيم',
          email: 'sami@example.com',
          phone: '+966525678901',
        },
        date: '2026-01-26',
        amount: 234.5,
        paymentMethod: 'cash',
        status: 'cancelled',
        items: [{ id: 1, productName: 'حذاء كاجوال', quantity: 1, price: 234.5, total: 234.5 }],
        address: 'شارع الخليج، الدمام',
        notes: 'رفض الاستلام',
      },
    ];
  }

  // ngOnInit(): void {
  //   this.orders = this.dashboardService.getRecentOrders();
  // }

  // // ✅ أضف هذه الدالة
  onViewOrder(order: any): void {
    this.viewOrder.emit(order as Order);
  }
}
