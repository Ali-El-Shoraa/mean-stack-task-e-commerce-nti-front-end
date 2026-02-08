// features/home/pages/home-page/home-page.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SectionSliderComponent } from './components/section-slider.component/section-slider.component';
import { HeroSectionComponent } from './components/hero-section.component/hero-section.component';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { WishlistService } from '../../../core/services/wishlist.service';

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  buttonText: string;
  theme?: 'dark' | 'light';
}

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, SectionSliderComponent, HeroSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  // ✅ Inject Services
  private productService = inject(ProductService);
  public wishlistService = inject(WishlistService);

  // ✅ بيانات المنتجات (Signals)
  get menProducts() {
    return this.productService.topSellersMen();
  }

  get womenProducts() {
    return this.productService.topSellersWomen();
  }

  get isLoadingMen() {
    return this.productService.isLoadingMen();
  }

  get isLoadingWomen() {
    return this.productService.isLoadingWomen();
  }

  // Hero Slides
  heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'New Season Arrivals',
      subtitle: 'Discover the latest trends in fashion.',
      image: 'https://images.unsplash.com/photo-1550392339-a99f13c63198?w=2000&q=80',
      link: '/shop/new-arrivals',
      buttonText: 'Shop Now',
      theme: 'light',
    },
    {
      id: 2,
      title: 'Winter Collection Sale',
      subtitle: 'Up to 50% off on selected items!',
      image: 'https://images.unsplash.com/photo-1543087900-a4b26ade1068?w=2000&q=80',
      link: '/shop/winter-sale',
      buttonText: 'View Offers',
      theme: 'dark',
    },
    {
      id: 3,
      title: 'Exclusive Online Deals',
      subtitle: "Don't miss out on our special web-only discounts.",
      image: 'https://images.unsplash.com/photo-1552093077-ecf80901e1a5?w=2000&q=80',
      link: '/shop/exclusive-deals',
      buttonText: 'Explore Deals',
      theme: 'light',
    },
  ];

  ngOnInit(): void {
    // جلب Top Sellers للرجال والنساء بالتوازي
    forkJoin([
      this.productService.getTopSellers('men'),
      this.productService.getTopSellers('women'),
    ]).subscribe();
  }
}
