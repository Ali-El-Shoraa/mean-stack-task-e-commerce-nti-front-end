// src/app/shared/models/table.models.ts

export interface TableColumn {
  key: string;
  header: string;
  type?: 'text' | 'badge' | 'currency' | 'date' | 'actions' | 'custom' | 'link';
  width?: string;
  sortable?: boolean;
  badgeConfig?: BadgeConfig;
  currencySymbol?: string;
  dateFormat?: string;
  // للروابط
  linkRoute?: string; // مسار الرابط مثل '/orders'
  linkParam?: string; // المفتاح الذي سيستخدم كـ parameter مثل 'id'
}

export interface BadgeConfig {
  [key: string]: {
    label: string;
    class: string;
  };
}

export interface TableAction {
  icon?: string;
  label: string;
  class?: string;
  route?: string; // للتنقل بالرابط
  routeParam?: string; // المفتاح للـ parameter
  callback?: (item: any) => void; // اختياري الآن
  visible?: (item: any) => boolean;
}

export interface TableConfig {
  title?: string;
  showHeader?: boolean;
  showActions?: boolean;
  headerActions?: HeaderAction[];
  emptyMessage?: string;
  loading?: boolean;
  minWidth?: string;
  pageSize?: number; // عدد العناصر في الصفحة (افتراضي 10)
  showPagination?: boolean; // إظهار pagination
}

export interface HeaderAction {
  label: string;
  icon?: string;
  class?: string;
  route?: string; // للتنقل بالرابط
  callback?: () => void; // اختياري
}
