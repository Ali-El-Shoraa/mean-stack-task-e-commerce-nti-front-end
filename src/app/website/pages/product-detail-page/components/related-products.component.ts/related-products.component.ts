// src/app/website/pages/product-detail-page/components/related-products/related-products.component.ts

import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.development';
import { ProductCardComponent } from '../../../../shared/product-card.component/product-card.component';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements OnChanges {
  @Input() categoryId: string = '';
  @Input() currentProductId: string = '';
  @Input() gender: string = '';

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  relatedProducts = signal<any[]>([]);
  isLoading = signal<boolean>(false);

  ngOnChanges(): void {
    if (this.categoryId) {
      this.loadRelatedProducts();
    }
  }

  private loadRelatedProducts(): void {
    this.isLoading.set(true);

    this.http
      .get<any>(`${this.apiUrl}/products`, {
        params: {
          category: this.categoryId,
          gender: this.gender,
          limit: '8',
        },
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            // استبعاد المنتج الحالي
            this.relatedProducts.set(
              res.data.filter((p: any) => p._id !== this.currentProductId).slice(0, 4),
            );
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }
}
