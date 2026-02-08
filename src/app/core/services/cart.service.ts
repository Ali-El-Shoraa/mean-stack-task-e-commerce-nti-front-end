// src/app/core/services/cart.service.ts

import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';
import { Cart, CartItem, ApiResponse } from '../models/interfaces.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  // ========== Signals (State) ==========
  private cartSignal = signal<Cart | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private isCartOpenSignal = signal<boolean>(false);

  // ========== Computed (Derived State) ==========

  /** قائمة العناصر في السلة */
  items = computed(() => this.cartSignal()?.items ?? []);

  /** عدد العناصر */
  itemsCount = computed(() => this.cartSignal()?.totalItems ?? 0);

  /** هل السلة فارغة */
  isEmpty = computed(() => this.items().length === 0);

  /** حالة التحميل */
  isLoading = computed(() => this.loadingSignal());

  /** رسالة الخطأ */
  error = computed(() => this.errorSignal());

  /** المجموع الفرعي (قبل الخصم والشحن) */
  subtotal = computed(() => this.cartSignal()?.totalPrice ?? 0);

  /** كود الكوبون المطبّق */
  appliedCoupon = computed(() => this.cartSignal()?.couponCode ?? null);

  /** قيمة الخصم */
  discountAmount = computed(() => this.cartSignal()?.discountAmount ?? 0);

  /** تكلفة الشحن */
  shippingCost = computed(() => {
    const subtotal = this.subtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 500 ? 0 : 30; // شحن مجاني فوق 500
  });

  /** الإجمالي النهائي */
  total = computed(() => {
    return this.subtotal() - this.discountAmount() + this.shippingCost();
  });

  /** هل السلة مفتوحة */
  isCartOpen = computed(() => this.isCartOpenSignal());

  constructor(private http: HttpClient) {}

  // ========== Cart Sidebar State ==========

  openCart(): void {
    this.isCartOpenSignal.set(true);
  }

  closeCart(): void {
    this.isCartOpenSignal.set(false);
  }

  toggleCart(): void {
    this.isCartOpenSignal.update((v) => !v);
  }

  // ========== API Calls ==========

  getCart(): Observable<Cart> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<ApiResponse<Cart>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap((cart) => this.cartSignal.set(cart)),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  addToCart(
    productId: string,
    variantSku: string,
    quantity: number = 1,
    price?: number,
  ): Observable<CartItem> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http
      .post<ApiResponse<CartItem>>(this.apiUrl, {
        productId,
        variantSku,
        quantity,
        price,
      })
      .pipe(
        map((res) => res.data),
        tap(() => this.refreshCart()),
        finalize(() => this.loadingSignal.set(false)),
      );
  }

  updateQuantity(itemId: string | number | null, quantity: number): Observable<Cart> {
    const id = String(itemId);
    this.loadingSignal.set(true);

    return this.http.patch<ApiResponse<Cart>>(`${this.apiUrl}/items/${id}`, { quantity }).pipe(
      map((res) => res.data),
      tap((cart) => this.cartSignal.set(cart)),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  removeFromCart(itemId: string): Observable<Cart> {
    this.loadingSignal.set(true);

    return this.http.delete<ApiResponse<Cart>>(`${this.apiUrl}/items/${itemId}`).pipe(
      map((res) => res.data),
      tap((cart) => this.cartSignal.set(cart)),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  // ✅ حذف بالـ productId + size + color (للـ Header)
  removeItem(productId: string, size: string, color: string): void {
    const item = this.findCartItem(productId, size, color);
    if (item) {
      this.removeFromCart(item._id).subscribe();
    }
  }

  // ✅ زيادة الكمية
  incrementQuantity(itemIdOrProductId: string | number, size?: string, color?: string): void {
    const item = this.resolveItem(itemIdOrProductId, size, color);
    if (item) {
      this.updateQuantity(item._id, item.quantity + 1).subscribe();
    }
  }

  // ✅ إنقاص الكمية
  decrementQuantity(itemIdOrProductId: string | number, size?: string, color?: string): void {
    const item = this.resolveItem(itemIdOrProductId, size, color);
    if (item) {
      if (item.quantity <= 1) {
        this.removeFromCart(item._id).subscribe();
      } else {
        this.updateQuantity(item._id, item.quantity - 1).subscribe();
      }
    }
  }

  clearCart(): Observable<void> {
    this.loadingSignal.set(true);

    return this.http.delete<ApiResponse<void>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap(() => this.cartSignal.set(null)),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  // ========== Coupon ==========

  applyCoupon(code: string): Observable<Cart> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<ApiResponse<Cart>>(`${this.apiUrl}/coupon`, { code }).pipe(
      map((res) => res.data),
      tap((cart) => this.cartSignal.set(cart)),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  removeCoupon(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .delete<ApiResponse<Cart>>(`${this.apiUrl}/coupon`)
      .pipe(
        map((res) => res.data),
        tap((cart) => this.cartSignal.set(cart)),
        finalize(() => this.loadingSignal.set(false)),
      )
      .subscribe();
  }

  // ========== Helpers ==========

  private resolveItem(
    itemIdOrProductId: string | number,
    size?: string,
    color?: string,
  ): any | null {
    const cart = this.cartSignal();
    if (!cart?.items) return null;

    if (size !== undefined && color !== undefined) {
      return this.findCartItem(String(itemIdOrProductId), size, color);
    }

    const id = String(itemIdOrProductId);
    return cart.items.find((item: any) => item._id === id) || null;
  }

  private findCartItem(productId: string, size: string, color: string): any | null {
    const cart = this.cartSignal();
    if (!cart?.items) return null;

    return (
      cart.items.find(
        (item: any) =>
          (item.product === productId || item.product?._id === productId) &&
          item.size === size &&
          item.color === color,
      ) || null
    );
  }

  private refreshCart(): void {
    this.http
      .get<ApiResponse<Cart>>(this.apiUrl)
      .pipe(map((res) => res.data))
      .subscribe((cart) => this.cartSignal.set(cart));
  }
}
