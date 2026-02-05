// src/app/shared/models/table.models.ts

export interface TableColumn {
  key: string;
  // type?: 'text' | 'badge' | 'currency' | 'date' | 'actions' | 'custom' | 'link';
  width?: string;
  sortable?: boolean;
  badgeConfig?: BadgeConfig;
  currencySymbol?: string;
  dateFormat?: string;
  customTemplate?: string;
  currencyCode?: string;
  header: string;
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'currency'
    | 'custom'
    | 'badge'
    | 'image'
    | 'actions'
    | 'link';
  align?: 'start' | 'center' | 'end';
  linkRoute?: string; // مسار الرابط مثل '/orders'
  linkParam?: string; // المفتاح الذي سيستخدم كـ parameter مثل 'id'
}

// export interface TableColumn {
//   key: string;
//   header: string;
//   sortable?: boolean;
//   type?: 'text' | 'number' | 'date' | 'currency' | 'custom' | 'badge' | 'image';
//   width?: string;
//   align?: 'start' | 'center' | 'end';
//   customTemplate?: string;
//   currencyCode?: string;
// }

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
  emptyIcon?: string; // ✅ جديد
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
