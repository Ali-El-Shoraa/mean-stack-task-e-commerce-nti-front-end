import { Component, inject, input, effect } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderFilter } from './components/header-filter/header-filter';
import { ResultFilter } from './components/result-filter/result-filter';
import { ProductsService } from '../../../core/services/products.service';
import { ProductCategory } from '../../../core/models/product.model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [HeaderFilter, ResultFilter],
  templateUrl: './search-page.html',
})
export class SearchPage {
  protected productService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  search = input<string>();
  category = input<string>();
  page = input<number>();

  constructor() {
    effect(
      () => {
        this.productService.updateFilters({
          searchTerm: this.search() || '',
          category: (this.category() as ProductCategory) || '',
        });

        const page = this.page();
        if (page && page > 0) {
          this.productService.setPage(page);
        }
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
