// src/app/pages/profile/components/notifications/notifications.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../../core/toast/toast.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notifications = [
    {
      id: 1,
      title: 'طلب جديد تم تأكيده',
      time: 'قبل 5 دقائق',
      message: 'تم تأكيد طلبك #ORD-2023-004 بنجاح.',
      detail: 'سيتم التوصيل خلال 2-5 أيام عمل',
      read: false,
    },
    {
      id: 2,
      title: 'تخفيضات جديدة',
      time: 'قبل يوم',
      message: 'خصم يصل إلى 50% على الملابس الشتوية.',
      detail: 'العرض ساري حتى 31 ديسمبر',
      read: false,
    },
    {
      id: 3,
      title: 'طلب قيد التوصيل',
      time: 'قبل 3 أيام',
      message: 'طلبك #ORD-2023-003 قيد التوصيل الآن.',
      detail: 'رقم التتبع: TRK-789456123',
      read: false,
    },
    {
      id: 4,
      title: 'تقييم منتج',
      time: 'قبل أسبوع',
      message: 'كيف كانت تجربتك مع "تيشيرت قطني مميز"؟',
      detail: 'شارك تجربتك مع المستخدمين الآخرين',
      read: false,
    },
  ];

  constructor(private toast: ToastService) {}

  markAllRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.toast.show('تم تحديد جميع الإشعارات كمقروءة');
  }
}
