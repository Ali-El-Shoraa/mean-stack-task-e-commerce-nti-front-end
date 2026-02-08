// src/app/pages/profile/components/wishlist/wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistItem } from '../../../../../core/models/interfaces.model';
import { WishlistService } from '../../../../../core/services/wishlist.service';
import { CartService } from '../../../../../core/services/cart.service';
import { ToastService } from '../../../../../core/toast/toast.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  items: WishlistItem[] = [];
  loading = false;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe((w) => {
      this.items = w.items;
    });
  }

  removeItem(item: WishlistItem) {
    this.wishlistService.removeFromWishlist(item.product._id, item.variantSku).subscribe({
      next: () => this.toast.show('تمت إزالة المنتج من قائمة الرغبات'),
      error: () => this.toast.show('حدث خطأ', 'error'),
    });
  }

  addToCart(item: WishlistItem) {
    this.cartService.addToCart(item.product._id, item.variantSku, 1, item.product.price).subscribe({
      next: () => this.toast.show(`تمت إضافة ${item.product.name} إلى سلة التسوق`),
      error: () => this.toast.show('حدث خطأ', 'error'),
    });
  }

  clearAll() {
    if (confirm('هل أنت متأكد من مسح جميع العناصر من قائمة الرغبات؟')) {
      this.wishlistService.clearWishlist().subscribe({
        next: () => this.toast.show('تم مسح قائمة الرغبات بنجاح'),
        error: () => this.toast.show('حدث خطأ', 'error'),
      });
    }
  }
}
