// src/app/website/pages/product-detail-page/components/product-tabs/product-tabs.component.ts

import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProductDetail } from '../../../../../core/models/product.model';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-tabs.component.html',
  styleUrl: './product-tabs.component.scss',
})
export class ProductTabsComponent {
  @Input() product!: ApiProductDetail;

  activeTab = signal<'description' | 'specs' | 'reviews'>('description');

  setTab(tab: 'description' | 'specs' | 'reviews'): void {
    this.activeTab.set(tab);
  }
}
