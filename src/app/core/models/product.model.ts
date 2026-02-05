// src/app/core/models/product.model.ts

export type ProductStatus = 'active' | 'inactive' | 'out-of-stock';
export type ProductCategory = 'men' | 'women' | 'kids' | 'accessories';
export type StockLevel = 'high' | 'medium' | 'low' | 'out';

export interface Product {
  _id: number;
  name: string;
  code: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  image?: string;
}

export interface ProductTwo {
  _id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ProductFilters {
  category: ProductCategory | '';
  status: ProductStatus | '';
  stockLevel: StockLevel | '';
  priceFrom: number | null;
  priceTo: number | null;
  searchTerm: string;
}

export interface ProductStats {
  total: number;
  active: number;
  outOfStock: number;
  lowStock: number;
}

export const STATUS_CONFIG: Record<ProductStatus, { label: string; class: string }> = {
  active: { label: 'نشط', class: 'active' },
  inactive: { label: 'غير نشط', class: 'inactive' },
  'out-of-stock': { label: 'غير متوفر', class: 'out-of-stock' },
};

export const CATEGORY_CONFIG: Record<
  ProductCategory,
  { label: string; icon: string; class: string }
> = {
  men: { label: 'رجالي', icon: 'bi-tshirt', class: 'men' },
  women: { label: 'نسائي', icon: 'bi-bag', class: 'women' },
  kids: { label: 'أطفال', icon: 'bi-tshirt', class: 'kids' },
  accessories: { label: 'إكسسوارات', icon: 'bi-watch', class: 'accessories' },
};

export const STOCK_LEVELS: Record<StockLevel, { label: string; class: string }> = {
  high: { label: 'مرتفع', class: 'high' },
  medium: { label: 'متوسط', class: 'medium' },
  low: { label: 'منخفض', class: 'low' },
  out: { label: 'نفذ', class: 'out' },
};
