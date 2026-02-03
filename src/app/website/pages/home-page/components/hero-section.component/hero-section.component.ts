import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeroSlide } from '../../home-page';

@Component({
  selector: 'app-hero-section-component',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  heroSlides = input.required<HeroSlide[]>(); // يستقبل بيانات السلايدات كـ Input

  @ViewChild('swiperHeroRef') swiperHeroRef!: ElementRef;

  constructor(private router: Router) {} // حقن خدمة الـ Router

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    if (!this.swiperHeroRef) return;

    const swiperEl = this.swiperHeroRef.nativeElement;

    const swiperParams = {
      loop: true, // لتدوير السلايدر بشكل لا نهائي
      autoplay: {
        delay: 5000, // كل 5 ثوانٍ
        disableOnInteraction: false, // لا تتوقف عند تفاعل المستخدم
      },
      speed: 1000, // سرعة الانتقال بين السلايدات
      pagination: {
        clickable: true,
      },
      navigation: true,
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  }

  goToLink(link: string): void {
    this.router.navigate([link]); // ينتقل إلى الرابط المحدد
  }
}
