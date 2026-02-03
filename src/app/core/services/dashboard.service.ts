// src/app/services/dashboard.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem, StatsCard, Order, Activity, QuickAction } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  toggleSidebar(): void {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }

  closeSidebar(): void {
    this.sidebarOpen.next(false);
  }

  getMenuItems(): MenuItem[] {
    return [
      { icon: 'bi-speedometer2', text: 'لوحة التحكم', route: '/dashboard/home', active: true },
      { icon: 'bi-cart3', text: 'الطلبات', route: '/dashboard/orders', badge: 15 },
      { icon: 'bi-bag', text: 'المنتجات', route: '/dashboard/products', badge: 3 },
      { icon: 'bi-people', text: 'العملاء', route: '/dashboard/customers', badge: 24 },
      { icon: 'bi-bar-chart', text: 'التقارير', route: '/dashboard/reports' },
      { icon: 'bi-tags', text: 'العروض', route: '/dashboard/offers' },
      { icon: 'bi-chat-left-text', text: 'المراجعات', route: '/dashboard/reviews' },
      { icon: 'bi-gear', text: 'الإعدادات', route: '/dashboard/settings' },
    ];
  }

  getStatsCards(): StatsCard[] {
    return [
      {
        icon: 'bi-currency-dollar',
        iconClass: 'primary',
        value: '$12,540',
        title: 'إجمالي المبيعات',
        changePercent: 12,
        changeType: 'positive',
      },
      {
        icon: 'bi-cart-check',
        iconClass: 'men',
        value: '342',
        title: 'الطلبات الجديدة',
        changePercent: 8,
        changeType: 'positive',
      },
      {
        icon: 'bi-people',
        iconClass: 'women',
        value: '1,245',
        title: 'العملاء الجدد',
        changePercent: 15,
        changeType: 'positive',
      },
      {
        icon: 'bi-bar-chart',
        iconClass: 'success',
        value: '$4,230',
        title: 'متوسط قيمة الطلب',
        changePercent: 3,
        changeType: 'negative',
      },
    ];
  }

  getRecentOrders(): Order[] {
    return [
      {
        id: '#ORD-7842',
        customer: 'أحمد محمد',
        date: '2023-12-15',
        amount: '$245.99',
        status: 'completed',
      },
      {
        id: '#ORD-7841',
        customer: 'سارة علي',
        date: '2023-12-14',
        amount: '$189.50',
        status: 'processing',
      },
      {
        id: '#ORD-7840',
        customer: 'خالد حسن',
        date: '2023-12-14',
        amount: '$320.75',
        status: 'pending',
      },
      {
        id: '#ORD-7839',
        customer: 'فاطمة عبدالله',
        date: '2023-12-13',
        amount: '$150.00',
        status: 'completed',
      },
      {
        id: '#ORD-7838',
        customer: 'عمر كمال',
        date: '2023-12-12',
        amount: '$425.30',
        status: 'cancelled',
      },
    ];
  }

  getActivities(): Activity[] {
    return [
      { type: 'order', icon: 'bi-cart-check', title: 'طلب جديد #ORD-7842', time: 'منذ 15 دقيقة' },
      { type: 'user', icon: 'bi-person-plus', title: 'عميل جديد مسجل', time: 'منذ ساعة واحدة' },
      { type: 'product', icon: 'bi-box-seam', title: 'تم إضافة منتج جديد', time: 'منذ 3 ساعات' },
      { type: 'order', icon: 'bi-truck', title: 'تم شحن الطلب #ORD-7835', time: 'منذ 5 ساعات' },
      {
        type: 'product',
        icon: 'bi-tag',
        title: 'عرض جديد: خصم 30% على الفساتين',
        time: 'منذ يوم واحد',
      },
    ];
  }

  getQuickActions(): QuickAction[] {
    return [
      {
        icon: 'bi-plus-circle',
        title: 'إضافة منتج جديد',
        description: 'أضف منتجات جديدة إلى المتجر',
        route: '/products/new',
      },
      {
        icon: 'bi-receipt',
        title: 'إنشاء فاتورة',
        description: 'أنشئ فاتورة جديدة للعميل',
        route: '/invoices/new',
      },
      {
        icon: 'bi-tags',
        title: 'إضافة كوبون خصم',
        description: 'أنشئ كوبون خصم جديد',
        route: '/coupons/new',
      },
      {
        icon: 'bi-bar-chart',
        title: 'تقرير المبيعات',
        description: 'عرض تقارير المبيعات الشهرية',
        route: '/reports/sales',
      },
      {
        icon: 'bi-person-plus',
        title: 'إضافة عميل جديد',
        description: 'سجل عميل جديد في النظام',
        route: '/customers/new',
      },
      {
        icon: 'bi-chat-left-text',
        title: 'إدارة المراجعات',
        description: 'عرض وإدارة مراجعات العملاء',
        route: '/reviews',
      },
    ];
  }

  getSalesChartData() {
    return {
      labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
      data: [1200, 1900, 1500, 2200, 1800, 2500, 2100],
    };
  }

  getGenderChartData() {
    return {
      labels: ['رجالي', 'نسائي', 'أطفال'],
      data: [45, 40, 15],
    };
  }
}
