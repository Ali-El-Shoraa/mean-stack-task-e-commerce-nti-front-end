// src/app/features/content-management/components/contact-content/contact-content.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ContactInfo,
  ContactCard,
  SocialMedia,
  MapSettings,
  ContactSection,
} from '../../../../../core/models/content.model';

@Component({
  selector: 'app-contact-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-content.component.html',
  styleUrls: ['./contact-content.component.scss'],
})
export class ContactContentComponent {
  activeSection = signal<ContactSection>('contact-info');

  sections: { id: ContactSection; label: string; icon: string }[] = [
    { id: 'contact-info', label: 'معلومات الاتصال', icon: 'bi-info-circle' },
    { id: 'contact-form', label: 'نموذج الاتصال', icon: 'bi-envelope' },
    { id: 'contact-cards', label: 'بطاقات الاتصال', icon: 'bi-card-text' },
    { id: 'map-section', label: 'الخريطة والموقع', icon: 'bi-map' },
    { id: 'social-media', label: 'وسائل التواصل', icon: 'bi-share' },
    { id: 'faq-preview', label: 'عرض الأسئلة', icon: 'bi-question-circle' },
  ];

  // Contact Info
  contactInfo = signal<ContactInfo>({
    title: 'اتصل بنا',
    description: 'نحن هنا لمساعدتك! تواصل معنا عبر أي من القنوات المتاحة.',
    fullAddress: 'شارع الموضة، حي النخيل، الرياض 12345، المملكة العربية السعودية',
    mainPhone: '920001234',
    whatsappNumber: '+966 55 123 4567',
    email: 'info@fashionhub.com',
    workingHours: 'الأحد - الخميس: 9 صباحاً - 10 مساءً\nالجمعة: 4 مساءً - 10 مساءً\nالسبت: مغلق',
  });

  // Contact Form Settings
  formSectionTitle = signal('أرسل لنا رسالة');
  formSectionDescription = signal('املأ النموذج أدناه وسيقوم فريق الدعم لدينا بالرد على استفسارك.');
  subjectOptions = signal(['استفسار عام', 'استفسار عن منتج', 'مشكلة في الطلب']);
  enableNewsletter = signal(true);
  enableValidation = signal(true);

  // Contact Cards
  contactCards = signal<ContactCard[]>([
    {
      id: 'phone',
      icon: 'bi-telephone',
      title: 'اتصل بنا',
      description: 'تواصل مع فريق الدعم عبر الهاتف للحصول على مساعدة فورية',
      items: [
        { label: 'رقم الدعم', value: '920001234' },
        { label: 'رقم الواتساب', value: '+966 55 123 4567' },
      ],
      active: true,
    },
    {
      id: 'email',
      icon: 'bi-envelope',
      title: 'راسلنا',
      description: 'أرسل استفسارك عبر البريد الإلكتروني وسنرد عليك خلال 24 ساعة',
      items: [
        { label: 'البريد العام', value: 'info@fashionhub.com' },
        { label: 'الدعم الفني', value: 'support@fashionhub.com' },
      ],
      active: true,
    },
    {
      id: 'location',
      icon: 'bi-geo-alt',
      title: 'زورنا',
      description: 'يمكنك زيارة معرضنا للاستمتاع بتجربة تسوق حقيقية',
      items: [
        { label: 'العنوان', value: 'شارع الموضة، حي النخيل، الرياض 12345' },
        { label: 'ساعات العمل', value: 'الأحد - الخميس: 9 صباحاً - 10 مساءً' },
      ],
      active: true,
    },
  ]);

  // Map Settings
  mapSettings = signal<MapSettings>({
    title: 'موقعنا على الخريطة',
    locationTitle: 'معرض FashionHub',
    locationDescription: 'شارع الموضة، حي النخيل، الرياض 12345',
    latitude: '24.7136',
    longitude: '46.6753',
    showMap: true,
    enableDirections: true,
  });

  // Social Media
  socialMedia = signal<SocialMedia[]>([
    {
      platform: 'فيسبوك',
      icon: 'bi-facebook',
      color: '#1877f2',
      url: 'https://facebook.com/fashionhub',
    },
    {
      platform: 'تويتر',
      icon: 'bi-twitter',
      color: '#1da1f2',
      url: 'https://twitter.com/fashionhub',
    },
    {
      platform: 'إنستغرام',
      icon: 'bi-instagram',
      color: 'linear-gradient(45deg, #405de6, #833ab4)',
      url: 'https://instagram.com/fashionhub',
    },
    {
      platform: 'واتساب',
      icon: 'bi-whatsapp',
      color: '#25d366',
      url: 'https://wa.me/966551234567',
    },
    {
      platform: 'لينكدإن',
      icon: 'bi-linkedin',
      color: '#0a66c2',
      url: 'https://linkedin.com/company/fashionhub',
    },
    {
      platform: 'يوتيوب',
      icon: 'bi-youtube',
      color: '#ff0000',
      url: 'https://youtube.com/fashionhub',
    },
  ]);

  showSocialMedia = signal(true);

  // FAQ Preview
  faqSectionTitle = signal('أسئلة متكررة');
  faqSectionDescription = signal('ربما تجد إجابة لسؤالك في الأسئلة الأكثر شيوعاً');
  faqCount = signal(4);
  showFaqPreview = signal(true);
  enableFaqLink = signal(true);

  faqPreviewItems = [
    {
      question: 'ما هي مدة التوصيل؟',
      answer: 'مدة التوصيل تتراوح بين 1-3 أيام عمل داخل المدن الرئيسية.',
    },
    {
      question: 'هل يمكنني إرجاع المنتج؟',
      answer: 'نعم، يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام.',
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل الدفع نقداً عند الاستلام، وبطاقات الائتمان.',
    },
    { question: 'كيف أتتبع طلبي؟', answer: 'يمكنك تتبع طلبك من خلال حسابك الشخصي.' },
  ];

  setActiveSection(section: ContactSection): void {
    this.activeSection.set(section);
  }

  updateContactInfo<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]): void {
    this.contactInfo.update((c) => ({ ...c, [key]: value }));
  }

  addSubjectOption(): void {
    this.subjectOptions.update((options) => [...options, '']);
  }

  removeSubjectOption(index: number): void {
    this.subjectOptions.update((options) => options.filter((_, i) => i !== index));
  }

  updateSubjectOption(index: number, value: string): void {
    this.subjectOptions.update((options) => options.map((o, i) => (i === index ? value : o)));
  }

  updateContactCard(id: string, key: keyof ContactCard, value: any): void {
    this.contactCards.update((cards) =>
      cards.map((c) => (c.id === id ? { ...c, [key]: value } : c)),
    );
  }

  updateMapSettings<K extends keyof MapSettings>(key: K, value: MapSettings[K]): void {
    this.mapSettings.update((m) => ({ ...m, [key]: value }));
  }

  updateSocialMedia(index: number, key: keyof SocialMedia, value: string): void {
    this.socialMedia.update((media) =>
      media.map((m, i) => (i === index ? { ...m, [key]: value } : m)),
    );
  }
}
