// src/app/website/pages/product-detail-page/components/product-info/product-info.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProductDetail, ProductVariant } from '../../../../../core/models/product.model';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss',
})
export class ProductInfoComponent {
  @Input() product!: ApiProductDetail;
  @Input() selectedVariant: ProductVariant | null = null;
  @Input() selectedSize: string = '';
  @Input() selectedColor: string = '';
  @Input() quantity: number = 1;
  @Input() availableSizes: string[] = [];
  @Input() availableColors: { name: string; hexCode: string }[] = [];
  @Input() isInWishlist: boolean = false;

  @Output() sizeChange = new EventEmitter<string>();
  @Output() colorChange = new EventEmitter<string>();
  @Output() quantityIncrease = new EventEmitter<void>();
  @Output() quantityDecrease = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() buyNow = new EventEmitter<void>();
  @Output() toggleWishlist = new EventEmitter<void>();

  get discountPercent(): number {
    return this.product?.price?.discount || 0;
  }

  get isOutOfStock(): boolean {
    return !this.selectedVariant || this.selectedVariant.stock === 0;
  }

  get stockStatus(): { text: string; class: string } {
    if (!this.selectedVariant) {
      return { text: 'اختر المقاس واللون', class: 'text-muted' };
    }
    const stock = this.selectedVariant.stock;
    if (stock === 0) {
      return { text: 'غير متوفر', class: 'text-danger' };
    }
    if (stock <= 5) {
      return { text: `متبقي ${stock} قطع فقط!`, class: 'text-warning' };
    }
    return { text: 'متوفر', class: 'text-success' };
  }

  selectSize(size: string): void {
    this.sizeChange.emit(size);
  }

  selectColor(colorName: string): void {
    this.colorChange.emit(colorName);
  }

  onQuantityDecrease(): void {
    this.quantityDecrease.emit();
  }

  onQuantityIncrease(): void {
    this.quantityIncrease.emit();
  }

  onAddToCart(): void {
    if (!this.isOutOfStock) {
      this.addToCart.emit();
    }
  }

  onBuyNow(): void {
    if (!this.isOutOfStock) {
      this.buyNow.emit();
    }
  }

  onToggleWishlist(): void {
    this.toggleWishlist.emit();
  }
}
