import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/section-header.component/section-header.component';
import { CollectionTabsComponent } from '../../../../shared/collection-tabs.component/collection-tabs.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../shared/product-card.component/product-card.component';

@Component({
  selector: 'app-section-slider-component',
  imports: [CommonModule, SectionHeaderComponent, ProductCardComponent, CollectionTabsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // مهم جداً
  templateUrl: './section-slider.component.html',
  styleUrl: './section-slider.component.scss',
})
export class SectionSliderComponent {
  titleHeader = input<string | null>(null);
  descHeader = input<string | null>(null);
  allProducts = input<any[]>([]);
  // التصنيف الحالي المختار
  activeTab: string = 'all';

  // المصفوفة التي سيتم عرضها
  filteredProducts: any[] = [];

  // constructor() {
  //   // نستخدم effect لمراقبة وصول البيانات لأول مرة
  //   effect(() => {
  //     this.filteredProducts = [...this.allProducts()];
  //   });
  // }
  ngOnInit() {
    this.filteredProducts = [...this.allProducts()];
  }

  // وظيفة التبديل بين الـ Tabs
  filterProducts(category: string) {
    this.activeTab = category;
    if (category === 'all') {
      this.filteredProducts = [...this.allProducts()];
    } else {
      this.filteredProducts = this.allProducts().filter((p) => p.category === category);
    }
  }

  @ViewChild('swiperRef') swiperRef!: ElementRef;

  ngAfterViewInit() {
    const swiperEl = this.swiperRef.nativeElement;
    console.log('this.allProducts', this.allProducts());
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

    // نربط الإعدادات ونقوم بالتشغيل
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }
}
