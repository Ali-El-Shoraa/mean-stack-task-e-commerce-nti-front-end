// src/app/website/pages/product-detail-page/components/product-images/product-images.component.ts

import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss',
})
export class ProductImagesComponent {
  @Input() images: { main: string; gallery?: string[] } | null = null;
  @Input() productName: string = '';

  selectedImage = signal<string>('');
  isZoomed = signal<boolean>(false);
  zoomPosition = signal<{ x: number; y: number }>({ x: 50, y: 50 });

  ngOnChanges(): void {
    if (this.images?.main) {
      this.selectedImage.set(this.images.main);
    }
  }

  get allImages(): string[] {
    if (!this.images) return [];
    const imgs = [this.images.main];
    if (this.images.gallery) {
      imgs.push(...this.images.gallery);
    }
    return imgs;
  }

  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.zoomPosition.set({ x, y });
  }

  onMouseEnter(): void {
    this.isZoomed.set(true);
  }

  onMouseLeave(): void {
    this.isZoomed.set(false);
  }
}
