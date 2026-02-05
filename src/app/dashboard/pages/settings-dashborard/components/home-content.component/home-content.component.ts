// src/app/features/content-management/components/home-content/home-content.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AdSlot,
  Banner,
  FaqItem,
  HeroSection,
  HomeSection,
  Offer,
  SeoSettings,
  SiteSettings,
} from '../../../../../core/models/content.model';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent {
  activeSection = signal<HomeSection>('site-settings');

  sections: { id: HomeSection; label: string; icon: string }[] = [
    { id: 'site-settings', label: 'إعدادات الموقع', icon: 'bi-building' },
    { id: 'hero-section', label: 'القسم الرئيسي', icon: 'bi-image' },
    { id: 'offers', label: 'العروض والخصومات', icon: 'bi-tags' },
    { id: 'banners', label: 'البانرات الإعلانية', icon: 'bi-card-image' },
    { id: 'ads', label: 'إعلانات جوجل', icon: 'bi-megaphone' },
    { id: 'meta-seo', label: 'Meta Tags & SEO', icon: 'bi-search' },
    { id: 'policies', label: 'السياسات والشروط', icon: 'bi-shield-check' },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: 'bi-question-circle' },
  ];

  // Site Settings
  siteSettings = signal<SiteSettings>({
    siteName: 'FashionHub',
    siteDescription: 'متجر FashionHub هو وجهتك الأولى لجميع احتياجات الموضة العصرية.',
    logo: 'https://via.placeholder.com/200x60/e63946/ffffff?text=FashionHub',
    favicon: '',
    primaryColor: '#e63946',
    phone: '+966 50 123 4567',
    email: 'info@fashionhub.com',
    address: 'شارع الملك فهد، الرياض، السعودية',
    maintenanceMode: false,
  });

  // Hero Section
  heroSection = signal<HeroSection>({
    image: 'https://via.placeholder.com/1920x600/1d3557/ffffff?text=Fashion+Hero',
    title: 'موضة لا تتكرر، أناقة لا تنسى',
    description: 'اكتشف أحدث صيحات الموضة من ملابس وإكسسوارات من علامات تجارية عالمية.',
    textColor: 'light',
    button1Text: 'تسوق الآن',
    button1Link: '/products',
    enabled: true,
  });

  // Offers
  offer = signal<Offer>({
    code: 'FASHION30',
    discount: 30,
    description: 'استخدم هذا الكوبون عند الدفع للحصول على خصم 30% على طلبك الأول',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    minAmount: 50,
    maxUses: 1000,
    active: true,
  });

  // Banners
  banners = signal<Banner[]>([
    {
      id: 1,
      image: '',
      text: 'عرض خاص على التيشيرتات',
      link: '/category/t-shirts',
      position: 'top',
      active: true,
    },
  ]);

  // Ad Slots
  adSlots = signal<AdSlot[]>([
    {
      id: 'sidebar',
      name: 'إعلان جانبي كبير',
      location: 'الشريط الجانبي',
      size: '300x600px',
      code: '<script async src="https://pagead2.googlesyndication.com/..."></script>',
      active: true,
    },
    {
      id: 'horizontal',
      name: 'إعلان أفقي',
      location: 'بين الأقسام',
      size: '728x90px',
      code: '',
      active: true,
    },
    {
      id: 'content',
      name: 'إعلان وسط الصفحة',
      location: 'وسط المحتوى',
      size: '300x250px',
      code: '',
      active: false,
    },
  ]);

  adsAutoRefresh = signal(false);
  adsFrequencyCapping = signal(true);

  // SEO Settings
  seoSettings = signal<SeoSettings>({
    pageTitle: 'FashionHub - متجر الملابس الإلكتروني',
    pageDescription: 'متجر FashionHub هو وجهتك الأولى لجميع احتياجات الموضة العصرية.',
    keywords: ['ملابس', 'موضة', 'تسوق إلكتروني', 'أزياء'],
    canonicalUrl: 'https://www.fashionhub.com',
    ogImage: '',
    ogType: 'website',
    enableSitemap: true,
    enableRobotsTxt: true,
  });

  newKeyword = '';

  // FAQ
  faqItems = signal<FaqItem[]>([
    {
      id: 1,
      question: 'كيف يمكنني تتبع طلبي؟',
      answer: 'بعد تأكيد طلبك، سنرسل لك رابط تتبع عبر البريد الإلكتروني.',
      order: 1,
    },
    {
      id: 2,
      question: 'ما هي مدة التوصيل؟',
      answer: 'مدة التوصيل تتراوح بين 2-7 أيام عمل حسب المنطقة.',
      order: 2,
    },
    {
      id: 3,
      question: 'هل الدفع عبر الإنترنت آمن؟',
      answer: 'نعم، جميع عمليات الدفع عبر موقعنا مشفرة وآمنة.',
      order: 3,
    },
    {
      id: 4,
      question: 'كيف يمكنني تغيير أو إلغاء طلبي؟',
      answer: 'يمكنك تغيير أو إلغاء الطلب خلال ساعة من تقديمه.',
      order: 4,
    },
  ]);

  faqOrder = signal<'manual' | 'alphabetical' | 'popularity'>('manual');
  faqSearchEnabled = signal(true);
  expandedFaq = signal<number | null>(null);

  setActiveSection(section: HomeSection): void {
    this.activeSection.set(section);
  }

  // Site Settings Methods
  updateSiteSettings<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]): void {
    this.siteSettings.update((s) => ({ ...s, [key]: value }));
  }

  onLogoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateSiteSettings('logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Hero Section Methods
  updateHeroSection<K extends keyof HeroSection>(key: K, value: HeroSection[K]): void {
    this.heroSection.update((h) => ({ ...h, [key]: value }));
  }

  // Offer Methods
  updateOffer<K extends keyof Offer>(key: K, value: Offer[K]): void {
    this.offer.update((o) => ({ ...o, [key]: value }));
  }

  // Banner Methods
  updateBanner(id: number, key: keyof Banner, value: any): void {
    this.banners.update((banners) =>
      banners.map((b) => (b.id === id ? { ...b, [key]: value } : b)),
    );
  }

  addBanner(): void {
    const newId = Math.max(...this.banners().map((b) => b.id), 0) + 1;
    this.banners.update((banners) => [
      ...banners,
      { id: newId, image: '', text: '', link: '', position: 'top', active: true },
    ]);
  }

  // Ad Slots Methods
  updateAdSlot(id: string, key: keyof AdSlot, value: any): void {
    this.adSlots.update((slots) => slots.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  }

  // SEO Methods
  updateSeoSettings<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]): void {
    this.seoSettings.update((s) => ({ ...s, [key]: value }));
  }

  addKeyword(): void {
    if (this.newKeyword.trim()) {
      this.seoSettings.update((s) => ({
        ...s,
        keywords: [...s.keywords, this.newKeyword.trim()],
      }));
      this.newKeyword = '';
    }
  }

  removeKeyword(keyword: string): void {
    this.seoSettings.update((s) => ({
      ...s,
      keywords: s.keywords.filter((k) => k !== keyword),
    }));
  }

  getTitleRemaining(): number {
    return 60 - this.seoSettings().pageTitle.length;
  }

  getDescriptionRemaining(): number {
    return 160 - this.seoSettings().pageDescription.length;
  }

  // FAQ Methods
  toggleFaq(id: number): void {
    this.expandedFaq.update((current) => (current === id ? null : id));
  }

  addFaq(): void {
    const newId = Math.max(...this.faqItems().map((f) => f.id), 0) + 1;
    this.faqItems.update((items) => [
      ...items,
      { id: newId, question: '', answer: '', order: items.length + 1 },
    ]);
  }

  updateFaq(id: number, key: keyof FaqItem, value: any): void {
    this.faqItems.update((items) => items.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  }

  deleteFaq(id: number): void {
    this.faqItems.update((items) => items.filter((f) => f.id !== id));
  }
}
