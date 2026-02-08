// section-slider.component.ts

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  ViewChild,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/section-header.component/section-header.component';
import { CollectionTabsComponent } from '../../../../shared/collection-tabs.component/collection-tabs.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../shared/product-card.component/product-card.component';

@Component({
  selector: 'app-section-slider-component',
  imports: [CommonModule, SectionHeaderComponent, ProductCardComponent, CollectionTabsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './section-slider.component.html',
  styleUrl: './section-slider.component.scss',
})
export class SectionSliderComponent {
  private cdr = inject(ChangeDetectorRef);

  titleHeader = input<string | null>(null);
  descHeader = input<string | null>(null);
  allProducts = input<any[]>([]);

  // ✅ عادي string وليس signal
  activeTab: string = 'all';

  // ✅ getter بدلاً من متغير عادي
  get filteredProducts(): any[] {
    const products = this.allProducts();
    if (this.activeTab === 'all') {
      return products;
    }
    return products.filter((p) => p.category === this.activeTab);
  }

  @ViewChild('swiperRef') swiperRef!: ElementRef;

  // ✅ وظيفة التبديل بين الـ Tabs
  filterProducts(category: string): void {
    this.activeTab = category;
    // تحديث Swiper بعد تغيير البيانات
    setTimeout(() => {
      this.updateSwiper();
    }, 10);
  }

  ngAfterViewInit(): void {
    // تأخير التهيئة لضمان وجود البيانات
    setTimeout(() => {
      this.initSwiper();
    }, 100);
  }

  private initSwiper(): void {
    const swiperEl = this.swiperRef?.nativeElement;
    if (!swiperEl) return;

    const swiperParams = {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: true,
      pagination: true,
      injectStyles: [
        `
        .swiper-button-next, .swiper-button-prev {
          background-color: white;
          padding: 8px 16px;
          border-radius: 100%;
          border: 1px solid #ccc;
          color: red;
        }
        `,
      ],
      breakpoints: {
        640: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }

  private updateSwiper(): void {
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.update();
      swiperEl.swiper.slideTo(0);
    }
  }

  // ✅ Track function للـ @for
  trackByProductId(index: number, product: any): string | number {
    return product._id ?? product.id ?? index;
  }
}
