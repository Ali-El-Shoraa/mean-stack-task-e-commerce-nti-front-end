import { Component, effect, inject } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/product-card.component/product-card.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/pagination.component/pagination.component';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-result-filter',
  imports: [ProductCardComponent, CommonModule, PaginationComponent],
  templateUrl: './result-filter.html',
  styleUrl: './result-filter.scss',
})
export class ResultFilter {
  productService = inject(ProductService);
}
