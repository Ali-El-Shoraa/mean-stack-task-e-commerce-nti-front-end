// src/app/core/services/wishlist.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Wishlist, ApiResponse } from '../models/interfaces.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/wishlist`;

  private wishlistSubject = new BehaviorSubject<Wishlist>({
    items: [],
    totalItems: 0,
  });
  wishlist$ = this.wishlistSubject.asObservable();
  wishlistCount$ = this.wishlist$.pipe(map((w) => w.totalItems));

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<Wishlist> {
    return this.http.get<ApiResponse<Wishlist>>(this.apiUrl).pipe(
      map((res) => res.data),
      tap((wishlist) => this.wishlistSubject.next(wishlist)),
    );
  }

  // ✅ التحقق من وجود المنتج في المفضلة
  isInWishlist(productId: string): boolean {
    const wishlist = this.wishlistSubject.getValue();
    return wishlist.items.some(
      (item: any) =>
        item.productId === productId || item.product === productId || item._id === productId,
    );
  }

  // ✅ تبديل حالة المنتج في المفضلة (إضافة/إزالة)
  toggleWishlist(productId: string, variantSku?: string): Observable<any> {
    if (this.isInWishlist(productId)) {
      return this.removeFromWishlist(productId, variantSku || '');
    } else {
      return this.addToWishlist(productId, variantSku || '');
    }
  }

  addToWishlist(productId: string, variantSku: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/add`, { productId, variantSku })
      .pipe(tap(() => this.refreshWishlist()));
  }

  removeFromWishlist(productId: string, variantSku: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/remove`, { productId, variantSku })
      .pipe(tap(() => this.refreshWishlist()));
  }

  clearWishlist(): Observable<any> {
    return this.http
      .delete<any>(this.apiUrl)
      .pipe(tap(() => this.wishlistSubject.next({ items: [], totalItems: 0 })));
  }

  // ✅ إعادة تحميل بدون subscribe متداخل
  private refreshWishlist(): void {
    this.http
      .get<ApiResponse<Wishlist>>(this.apiUrl)
      .pipe(map((res) => res.data))
      .subscribe((wishlist) => this.wishlistSubject.next(wishlist));
  }
}
