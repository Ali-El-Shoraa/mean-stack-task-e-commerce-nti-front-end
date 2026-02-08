// header.component.ts

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/interfaces.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public cartService = inject(CartService);

  couponInput = '';

  handleLogout() {
    this.authService.logout();
  }

  // ✅ استخدام _id مباشرة بدلاً من productId+size+color
  incrementItem(item: CartItem) {
    this.cartService.incrementQuantity(item._id);
  }

  decrementItem(item: CartItem) {
    this.cartService.decrementQuantity(item._id);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item._id).subscribe();
  }

  applyCoupon() {
    if (this.couponInput.trim()) {
      this.cartService.applyCoupon(this.couponInput.trim()).subscribe({
        next: () => {
          this.couponInput = '';
        },
      });
    }
  }

  removeCoupon() {
    this.cartService.removeCoupon();
  }
}
