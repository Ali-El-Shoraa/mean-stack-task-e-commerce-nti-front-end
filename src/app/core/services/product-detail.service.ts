// src/app/core/services/product-detail.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiProductDetail, ProductDetailResponse, ProductVariant } from '../models/product.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ✅ Signals
  product = signal<ApiProductDetail | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  // ✅ Selected Options
  selectedVariant = signal<ProductVariant | null>(null);
  selectedSize = signal<string>('');
  selectedColor = signal<string>('');
  quantity = signal<number>(1);

  // ============================================
  // ✅ جلب المنتج بالـ Slug
  // ============================================
  getProductBySlug(slug: string): Observable<ProductDetailResponse> {
    this.isLoading.set(true);
    this.error.set('');

    return this.http.get<ProductDetailResponse>(`${this.apiUrl}/products/product/${slug}`).pipe(
      tap((res) => {
        if (res.success) {
          this.product.set(res.data);
          this.initializeSelections(res.data);
        }
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.error.set(err.error?.message || 'حدث خطأ في جلب المنتج');
        this.isLoading.set(false);
        return throwError(() => err);
      }),
    );
  }

  // ============================================
  // ✅ جلب المنتج بالـ ID
  // ============================================
  getProductById(id: string): Observable<ProductDetailResponse> {
    this.isLoading.set(true);
    this.error.set('');

    return this.http.get<ProductDetailResponse>(`${this.apiUrl}/products/id/${id}`).pipe(
      tap((res) => {
        if (res.success) {
          this.product.set(res.data);
          this.initializeSelections(res.data);
        }
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.error.set(err.error?.message || 'حدث خطأ في جلب المنتج');
        this.isLoading.set(false);
        return throwError(() => err);
      }),
    );
  }

  // ============================================
  // ✅ تهيئة الاختيارات الافتراضية
  // ============================================
  private initializeSelections(product: ApiProductDetail): void {
    if (product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      this.selectedVariant.set(firstVariant);
      this.selectedSize.set(firstVariant.size);
      this.selectedColor.set(firstVariant.color.name);
    }
    this.quantity.set(1);
  }

  // ============================================
  // ✅ تحديث الـ Variant المختار
  // ============================================
  selectSize(size: string): void {
    this.selectedSize.set(size);
    this.updateSelectedVariant();
  }

  selectColor(colorName: string): void {
    this.selectedColor.set(colorName);
    this.updateSelectedVariant();
  }

  private updateSelectedVariant(): void {
    const product = this.product();
    if (!product) return;

    const variant = product.variants.find(
      (v) => v.size === this.selectedSize() && v.color.name === this.selectedColor(),
    );

    if (variant) {
      this.selectedVariant.set(variant);
    }
  }

  // ============================================
  // ✅ الكمية
  // ============================================
  incrementQuantity(): void {
    const maxStock = this.selectedVariant()?.stock || 10;
    if (this.quantity() < maxStock) {
      this.quantity.update((q) => q + 1);
    }
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  setQuantity(qty: number): void {
    const maxStock = this.selectedVariant()?.stock || 10;
    if (qty >= 1 && qty <= maxStock) {
      this.quantity.set(qty);
    }
  }

  // ============================================
  // ✅ Helpers
  // ============================================
  getAvailableSizes(): string[] {
    const product = this.product();
    if (!product) return [];
    return [...new Set(product.variants.map((v) => v.size))];
  }

  getAvailableColors(): { name: string; hexCode: string }[] {
    const product = this.product();
    if (!product) return [];

    const colorsMap = new Map<string, string>();
    product.variants.forEach((v) => {
      colorsMap.set(v.color.name, v.color.hexCode);
    });

    return Array.from(colorsMap, ([name, hexCode]) => ({ name, hexCode }));
  }

  getColorsForSize(size: string): { name: string; hexCode: string }[] {
    const product = this.product();
    if (!product) return [];

    return product.variants
      .filter((v) => v.size === size)
      .map((v) => ({ name: v.color.name, hexCode: v.color.hexCode }));
  }

  isVariantAvailable(size: string, colorName: string): boolean {
    const product = this.product();
    if (!product) return false;

    const variant = product.variants.find((v) => v.size === size && v.color.name === colorName);
    return variant ? variant.stock > 0 : false;
  }

  getVariantStock(size: string, colorName: string): number {
    const product = this.product();
    if (!product) return 0;

    const variant = product.variants.find((v) => v.size === size && v.color.name === colorName);
    return variant?.stock || 0;
  }

  // ✅ Reset
  reset(): void {
    this.product.set(null);
    this.selectedVariant.set(null);
    this.selectedSize.set('');
    this.selectedColor.set('');
    this.quantity.set(1);
    this.error.set('');
  }
}
