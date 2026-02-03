import { Component, inject, input, effect, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderFilter } from './components/header-filter/header-filter';
import { ResultFilter } from './components/result-filter/result-filter';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [HeaderFilter, ResultFilter],
  templateUrl: './search-page.html',
})
export class SearchPage {
  protected productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // أنجولار ستقوم بتعبئة هذه الـ Inputs تلقائياً من الـ URL Query Params
  search = input<string>();
  category = input<string>();
  gender = input<string>();
  page = input<number>();

  constructor() {
    // الـ effect يعمل تلقائياً كلما تغيرت قيمة أي Input (أي كلما تغير الـ URL)
    effect(
      () => {
        const filters = {
          search: this.search(),
          category: this.category(),
          gender: this.gender(),
          page: this.page() || 1,
        };

        // نرسل الطلب للسيرفر
        this.productService.getProducts(filters).subscribe();
      },
      { allowSignalWrites: true },
    );
  }

  updateFilter(key: string, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [key]: value || null, page: 1 },
      queryParamsHandling: 'merge',
    });
  }
}
