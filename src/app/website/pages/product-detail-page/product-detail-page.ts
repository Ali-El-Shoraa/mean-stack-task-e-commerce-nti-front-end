// src/app/website/pages/product-detail-page/product-detail-page.ts

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductDetailService } from '../../../core/services/product-detail.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ProductImagesComponent } from './components/product-images.component/product-images.component';
import { ProductInfoComponent } from './components/product-info.component/product-info.component';
import { ProductTabsComponent } from './components/product-tabs.component/product-tabs.component';
import { RelatedProductsComponent } from './components/related-products.component.ts/related-products.component';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductImagesComponent,
    ProductInfoComponent,
    ProductTabsComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss',
})
export class ProductDetailPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public productService = inject(ProductDetailService);
  public wishlistService = inject(WishlistService);
  public cartService = inject(CartService);

  ngOnInit(): void {
    // الاستماع لتغيير الـ route params
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadProduct(slug);
      }
    });
  }

  ngOnDestroy(): void {
    this.productService.reset();
  }

  private loadProduct(slug: string): void {
    this.productService.getProductBySlug(slug).subscribe({
      error: (err) => {
        console.error('Error loading product:', err);
        // يمكن التوجيه لصفحة 404
        // this.router.navigate(['/404']);
      },
    });
  }

  // ✅ إضافة للسلة — تمرير arguments منفصلة
  addToCart(): void {
    const product = this.productService.product();
    const variant = this.productService.selectedVariant();
    const quantity = this.productService.quantity();

    if (!product || !variant) return;

    // ✅ addToCart(productId, variantSku, quantity, price)
    this.cartService
      .addToCart(
        product._id, // productId: string
        variant.sku, // variantSku: string
        quantity, // quantity: number
        product.price.final, // price?: number
      )
      .subscribe({
        next: () => {
          console.log('تمت الإضافة للسلة');
          this.cartService.openCart(); // فتح السلة الجانبية
        },
        error: (err) => {
          console.error('خطأ في الإضافة للسلة:', err);
        },
      });
  }

  // ✅ شراء الآن
  buyNow(): void {
    const product = this.productService.product();
    const variant = this.productService.selectedVariant();
    const quantity = this.productService.quantity();

    if (!product || !variant) return;

    this.cartService.addToCart(product._id, variant.sku, quantity, product.price.final).subscribe({
      next: () => {
        this.router.navigate(['/checkout']);
      },
    });

    console.log('تمت الإضافة للسلة');
  }

  // // ✅ شراء الآن
  // buyNow(): void {
  //   this.addToCart();
  //   this.router.navigate(['/checkout']);
  // }

  // ✅ Toggle Wishlist
  toggleWishlist(): void {
    const product = this.productService.product();
    if (product) {
      this.wishlistService.toggleWishlist(product._id).subscribe();
    }
  }

  get isInWishlist(): boolean {
    const product = this.productService.product();
    return product ? this.wishlistService.isInWishlist(product._id) : false;
  }
}
