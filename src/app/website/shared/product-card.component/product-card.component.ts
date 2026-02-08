// src/app/shared/product-card.component/product-card.component.ts

import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';
import {
  Product,
  getProductImage,
  getProductPrice,
  getProductOriginalPrice,
  getProductDiscount,
  getCategoryName,
  getProductName,
  getProductSlug,
} from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  private wishlistService = inject(WishlistService);

  get isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(String(this.product._id));
  }

  get mainImage(): string {
    return getProductImage(this.product);
  }

  get productName(): string {
    return getProductName(this.product);
  }

  get categoryName(): string {
    return getCategoryName(this.product);
  }

  get finalPrice(): number {
    return getProductPrice(this.product);
  }

  get originalPrice(): number | null {
    return getProductOriginalPrice(this.product);
  }

  get discountPercent(): number {
    return getProductDiscount(this.product);
  }

  get productSlug(): string {
    return getProductSlug(this.product);
  }

  // ✅ التعامل الآمن مع badge (قد لا تكون في الـ Product interface)
  get badge(): string | null {
    return (this.product as any).badge || null;
  }

  get badgeClass(): string {
    return (this.product as any).badgeClass || 'badge-sale';
  }

  // ✅ تمرير variantSku إن وجد
  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const variantSku = (this.product as any).variants?.[0]?.sku || '';
    this.wishlistService.toggleWishlist(String(this.product._id), variantSku).subscribe();
  }
}
