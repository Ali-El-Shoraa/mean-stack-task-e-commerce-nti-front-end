// src/app/shared/components/data-table/data-table.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableAction, TableColumn, TableConfig } from '../../../../core/models/table.models';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None, // ✅ مهم جداً
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() config: TableConfig = {};
  @Input() trackBy: string = 'id';

  @ContentChild('customCell') customCellTemplate!: TemplateRef<any>;
  @ContentChild('actionsCell') actionsCellTemplate!: TemplateRef<any>;

  @Output() sortChange = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  currentSort: { column: string; direction: 'asc' | 'desc' } | null = null;
  currentPage = 1;

  // الإعدادات الافتراضية
  get tableConfig(): TableConfig {
    return {
      showHeader: true,
      showActions: true,
      emptyMessage: 'لا توجد بيانات للعرض',
      loading: false,
      minWidth: '600px',
      pageSize: 5, // افتراضي 10
      showPagination: true,
      ...this.config,
    };
  }

  // البيانات المعروضة حسب الصفحة الحالية
  get displayedData(): any[] {
    if (!this.tableConfig.showPagination) {
      return this.data;
    }
    const start = (this.currentPage - 1) * this.tableConfig.pageSize!;
    const end = start + this.tableConfig.pageSize!;
    return this.data.slice(start, end);
  }

  // إجمالي الصفحات
  get totalPages(): number {
    return Math.ceil(this.data.length / this.tableConfig.pageSize!);
  }

  // أرقام الصفحات للعرض
  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    const direction =
      this.currentSort?.column === column.key && this.currentSort?.direction === 'asc'
        ? 'desc'
        : 'asc';

    this.currentSort = { column: column.key, direction };
    this.sortChange.emit(this.currentSort);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  executeAction(action: TableAction, item: any, event: Event): void {
    event.stopPropagation();
    if (action.callback) {
      action.callback(item);
    }
  }

  isActionVisible(action: TableAction, item: any): boolean {
    return action.visible ? action.visible(item) : true;
  }

  getCellValue(item: any, column: TableColumn): any {
    return column.key.split('.').reduce((obj, key) => obj?.[key], item);
  }

  getRouteLink(route: string, item: any, param?: string): string {
    if (param && item[param]) {
      return `${route}/${item[param]}`;
    }
    return route;
  }

  trackByFn(index: number, item: any): any {
    return item[this.trackBy] || index;
  }
}
