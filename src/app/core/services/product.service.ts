// core/services/product.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

// ✅ Interfaces
export interface ProductVariant {
  sku: string;
  size: string;
  color: {
    name: string;
    hexCode: string;
  };
  stock: number;
  images: {
    main: string;
    gallery?: string[];
  };
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: { _id: string; name: string };
  gender: 'men' | 'women';
  price: {
    original: number;
    discount: number;
    final: number;
  };
  variants: ProductVariant[];
  rating: {
    average: number;
    count: number;
  };
  isActive: boolean;
}

export interface TopSellerProduct {
  _id: string;
  product: Product;
  totalSold: number;
  totalRevenue: number;
  ordersCount: number;
}

export interface TopSellersResponse {
  success: boolean;
  data: TopSellerProduct[];
  filters: { gender: string; limit: number };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ✅ Signals للـ State
  topSellersMen = signal<Product[]>([]);
  topSellersWomen = signal<Product[]>([]);
  isLoadingMen = signal<boolean>(false);
  isLoadingWomen = signal<boolean>(false);
  error = signal<string>('');

  // ============================================
  // ✅ جلب Top Sellers حسب الجنس
  // ============================================
  getTopSellers(gender: 'men' | 'women'): Observable<Product[]> {
    const loadingSignal = gender === 'men' ? this.isLoadingMen : this.isLoadingWomen;
    const dataSignal = gender === 'men' ? this.topSellersMen : this.topSellersWomen;

    loadingSignal.set(true);

    return this.http
      .get<TopSellersResponse>(`${this.apiUrl}/top-sellers`, {
        params: { gender, limit: '8' },
      })
      .pipe(
        map((res) => {
          if (res.success && res.data.length > 0) {
            // تحويل البيانات لصيغة المنتج المطلوبة
            return res.data.map((item) => this.transformTopSellerToProduct(item));
          }
          return [];
        }),
        tap((products) => {
          if (products.length > 0) {
            dataSignal.set(products);
          } else {
            // استخدام البيانات الافتراضية إذا لم توجد بيانات
            dataSignal.set(this.getDefaultProducts(gender));
          }
          loadingSignal.set(false);
        }),
        catchError((err) => {
          console.error(`Error fetching top sellers for ${gender}:`, err);
          // في حالة الخطأ، نستخدم البيانات الافتراضية
          dataSignal.set(this.getDefaultProducts(gender));
          loadingSignal.set(false);
          return of(this.getDefaultProducts(gender));
        }),
      );
  }

  // ============================================
  // ✅ تحويل بيانات Top Seller لصيغة Product
  // ============================================
  private transformTopSellerToProduct(item: TopSellerProduct): Product {
    return {
      ...item.product,
      // يمكن إضافة badge بناءً على المبيعات
      badge: item.totalSold > 100 ? 'Best Seller' : item.totalSold > 50 ? 'Hot' : 'Popular',
    } as Product;
  }

  // ============================================
  // ✅ البيانات الافتراضية (Fallback)
  // ============================================
  private getDefaultProducts(gender: 'men' | 'women'): Product[] {
    if (gender === 'men') {
      return [
        {
          _id: 'default-1',
          name: 'Premium Cotton T-Shirt',
          slug: 'premium-cotton-tshirt',
          description: 'High quality cotton t-shirt',
          category: { _id: 'cat-1', name: 'Shirts' },
          gender: 'men',
          price: { original: 39.99, discount: 25, final: 29.99 },
          variants: [
            {
              sku: 'TSH-001-M-BLK',
              size: 'M',
              color: { name: 'Black', hexCode: '#000000' },
              stock: 50,
              images: {
                main: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500',
              },
            },
          ],
          rating: { average: 4.5, count: 120 },
          isActive: true,
        },
        {
          _id: 'default-2',
          name: 'Slim Fit Dark Blue Jeans',
          slug: 'slim-fit-jeans',
          description: 'Modern slim fit jeans',
          category: { _id: 'cat-2', name: 'Pants' },
          gender: 'men',
          price: { original: 59.99, discount: 17, final: 49.99 },
          variants: [
            {
              sku: 'JNS-001-32-BLU',
              size: '32',
              color: { name: 'Blue', hexCode: '#1d3557' },
              stock: 30,
              images: {
                main: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500',
              },
            },
          ],
          rating: { average: 4.3, count: 85 },
          isActive: true,
        },
        {
          _id: 'default-3',
          name: 'Classic Leather Sneakers',
          slug: 'leather-sneakers',
          description: 'Comfortable leather sneakers',
          category: { _id: 'cat-3', name: 'Shoes' },
          gender: 'men',
          price: { original: 120.0, discount: 25, final: 89.99 },
          variants: [
            {
              sku: 'SHO-001-42-WHT',
              size: '42',
              color: { name: 'White', hexCode: '#ffffff' },
              stock: 25,
              images: {
                main: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
              },
            },
          ],
          rating: { average: 4.7, count: 200 },
          isActive: true,
        },
        {
          _id: 'default-4',
          name: 'Luxury Chronograph Watch',
          slug: 'chronograph-watch',
          description: 'Elegant chronograph watch',
          category: { _id: 'cat-4', name: 'Accessories' },
          gender: 'men',
          price: { original: 250.0, discount: 20, final: 199.99 },
          variants: [
            {
              sku: 'WCH-001-SLV',
              size: 'One Size',
              color: { name: 'Silver', hexCode: '#C0C0C0' },
              stock: 15,
              images: {
                main: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
              },
            },
          ],
          rating: { average: 4.8, count: 150 },
          isActive: true,
        },
      ];
    }

    // Women's default products
    return [
      {
        _id: 'default-w1',
        name: 'Floral Summer Dress',
        slug: 'floral-summer-dress',
        description: 'Beautiful floral pattern dress',
        category: { _id: 'cat-5', name: 'Dresses' },
        gender: 'women',
        price: { original: 59.99, discount: 23, final: 45.99 },
        variants: [
          {
            sku: 'DRS-001-M-FLR',
            size: 'M',
            color: { name: 'Floral', hexCode: '#ff6b6b' },
            stock: 40,
            images: {
              main: 'https://images.unsplash.com/photo-1572804013307-a99f13c63198?w=500',
            },
          },
        ],
        rating: { average: 4.6, count: 95 },
        isActive: true,
      },
      {
        _id: 'default-w2',
        name: 'High-Waist Skinny Jeans',
        slug: 'high-waist-jeans',
        description: 'Trendy high-waist jeans',
        category: { _id: 'cat-2', name: 'Pants' },
        gender: 'women',
        price: { original: 49.99, discount: 20, final: 39.99 },
        variants: [
          {
            sku: 'JNS-W01-28-BLU',
            size: '28',
            color: { name: 'Blue', hexCode: '#457b9d' },
            stock: 35,
            images: {
              main: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
            },
          },
        ],
        rating: { average: 4.4, count: 78 },
        isActive: true,
      },
      {
        _id: 'default-w3',
        name: 'Designer Leather Handbag',
        slug: 'leather-handbag',
        description: 'Premium leather handbag',
        category: { _id: 'cat-4', name: 'Accessories' },
        gender: 'women',
        price: { original: 180.0, discount: 28, final: 129.99 },
        variants: [
          {
            sku: 'BAG-001-BRN',
            size: 'One Size',
            color: { name: 'Brown', hexCode: '#8B4513' },
            stock: 20,
            images: {
              main: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
            },
          },
        ],
        rating: { average: 4.9, count: 180 },
        isActive: true,
      },
      {
        _id: 'default-w4',
        name: 'Classic White Sneakers',
        slug: 'white-sneakers-women',
        description: 'Comfortable white sneakers',
        category: { _id: 'cat-3', name: 'Shoes' },
        gender: 'women',
        price: { original: 85.0, discount: 24, final: 65.0 },
        variants: [
          {
            sku: 'SHO-W01-38-WHT',
            size: '38',
            color: { name: 'White', hexCode: '#ffffff' },
            stock: 45,
            images: {
              main: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
            },
          },
        ],
        rating: { average: 4.5, count: 110 },
        isActive: true,
      },
    ];
  }
}
