import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { SectionSliderComponent } from './components/section-slider.component/section-slider.component';
import { HeroSectionComponent } from './components/hero-section.component/hero-section.component';

// في ملف home-page.ts أو ملف بيانات مخصص
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string; // رابط الصورة الخلفية
  link: string; // الرابط الذي سيتم الانتقال إليه عند النقر
  buttonText: string; // نص الزر (مثلاً "Shop Now" أو "View Offer")
  theme?: 'dark' | 'light'; // لتغيير لون النص حسب الصورة
}

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, SectionSliderComponent, HeroSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // مهم جداً
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  // البيانات الكاملة
  allProducts = [
    {
      id: 1,
      title: 'Premium Cotton T-Shirt',
      category: 'Shirts',
      price: 29.99,
      oldPrice: 39.99,
      badge: 'New',
      badgeClass: 'badge-new',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500',
    },
    {
      id: 2,
      title: 'Slim Fit Dark Blue Jeans',
      category: 'Pants',
      price: 49.99,
      oldPrice: 59.99,
      badge: 'Sale',
      badgeClass: 'badge-sale',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
    },
    {
      id: 3,
      title: 'Classic Leather Sneakers',
      category: 'Shoes',
      price: 89.99,
      oldPrice: 120.0,
      badge: 'Hot',
      badgeClass: 'badge-hot',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    },
    {
      id: 4,
      title: 'Luxury Chronograph Watch',
      category: 'Accessories',
      price: 199.99,
      oldPrice: 250.0,
      badge: 'Featured',
      badgeClass: 'badge-featured',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    },
    {
      id: 5,
      title: 'Oxford Button-Down Shirt',
      category: 'Shirts',
      price: 45.0,
      oldPrice: 60.0,
      badge: 'New',
      badgeClass: 'badge-new',
      image: 'https://images.unsplash.com/photo-1596755094514-f87034a31217?w=500',
    },
    {
      id: 6,
      title: 'Urban Cargo Pants',
      category: 'Pants',
      price: 55.0,
      oldPrice: 75.0,
      badge: 'Sale',
      badgeClass: 'badge-sale',
      image: 'https://images.unsplash.com/photo-1517438476312-10d79c67750d?w=500',
    },
    {
      id: 7,
      title: 'Sport Performance Shoes',
      category: 'Shoes',
      price: 110.0,
      oldPrice: 140.0,
      badge: 'New',
      badgeClass: 'badge-new',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    },
    {
      id: 8,
      title: 'Polarized Sunglasses',
      category: 'Accessories',
      price: 35.0,
      oldPrice: 50.0,
      badge: 'Hot',
      badgeClass: 'badge-hot',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    },
  ];

  allProductsForWomen = [
    {
      id: 1,
      title: 'Floral Summer Dress',
      category: 'Dresses',
      price: 45.99,
      oldPrice: 59.99,
      badge: 'New',
      badgeClass: 'badge-new',
      image: 'https://images.unsplash.com/photo-1572804013307-a9a111784b24?w=500',
    },
    {
      id: 2,
      title: 'High-Waist Skinny Jeans',
      category: 'Pants',
      price: 39.99,
      oldPrice: 49.99,
      badge: 'Sale',
      badgeClass: 'badge-sale',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    },
    {
      id: 3,
      title: 'Elegant Silk Blouse',
      category: 'Shirts',
      price: 34.5,
      oldPrice: 45.0,
      badge: 'Hot',
      badgeClass: 'badge-hot',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500',
    },
    {
      id: 4,
      title: 'Designer Leather Handbag',
      category: 'Accessories',
      price: 129.99,
      oldPrice: 180.0,
      badge: 'Featured',
      badgeClass: 'badge-featured',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
    },
    {
      id: 5,
      title: 'Classic White Sneakers',
      category: 'Shoes',
      price: 65.0,
      oldPrice: 85.0,
      badge: 'New',
      badgeClass: 'badge-new',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
    },
    {
      id: 6,
      title: 'Oversized Knit Sweater',
      category: 'Shirts',
      price: 55.0,
      oldPrice: 70.0,
      badge: 'Sale',
      badgeClass: 'badge-sale',
      image: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=500',
    },
    {
      id: 7,
      title: 'Wide-Leg Tailored Trousers',
      category: 'Pants',
      price: 49.0,
      oldPrice: 65.0,
      badge: 'New',
      badgeClass: 'badge-new',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    },
    {
      id: 8,
      title: 'Rose Gold Minimalist Watch',
      category: 'Accessories',
      price: 110.0,
      oldPrice: 150.0,
      badge: 'Hot',
      badgeClass: 'badge-hot',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
    },
  ]; // بيانات عروض الهيرو
  heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'New Season Arrivals',
      subtitle: 'Discover the latest trends in fashion.',
      image:
        'https://images.unsplash.com/photo-1550392339-a99f13c63198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      link: '/shop/new-arrivals',
      buttonText: 'Shop Now',
      theme: 'light', // النص سيكون فاتحاً ليتناسب مع الخلفية الداكنة
    },
    {
      id: 2,
      title: 'Winter Collection Sale',
      subtitle: 'Up to 50% off on selected items!',
      image:
        'https://images.unsplash.com/photo-1543087900-a4b26ade1068?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
      link: '/shop/winter-sale',
      buttonText: 'View Offers',
      theme: 'dark', // النص سيكون داكناً ليتناسب مع الخلفية الفاتحة
    },
    {
      id: 3,
      title: 'Exclusive Online Deals',
      subtitle: "Don't miss out on our special web-only discounts.",
      image:
        'https://images.unsplash.com/photo-1552093077-ecf80901e1a5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
      link: '/shop/exclusive-deals',
      buttonText: 'Explore Deals',
      theme: 'light',
    },
  ];
}
