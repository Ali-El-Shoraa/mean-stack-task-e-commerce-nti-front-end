// src/app/core/models/product.model.ts

export type ProductStatus = 'active' | 'inactive' | 'out-of-stock';
export type ProductCategory = 'men' | 'women' | 'kids' | 'accessories';
export type StockLevel = 'high' | 'medium' | 'low' | 'out';
export type Gender = 'men' | 'women';

// ============================================
// ✅ 1. Interface للـ Dashboard (حقول مطلوبة)
// ============================================
export interface DashboardProduct {
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

// ============================================
// ✅ 2. Interfaces للـ API (المتجر)
// ============================================
export interface ProductVariant {
  sku: string;
  size: string;
  color: {
    name: string;
    hexCode: string;
  };
  stock: number;
  images: {
    main: string;
    gallery?: string[];
  };
}

export interface ProductRating {
  average: number;
  count: number;
}

export interface ProductPrice {
  original: number;
  discount: number;
  final: number;
}

export interface CategoryInfo {
  _id: string;
  name: string;
}

export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: CategoryInfo;
  gender: Gender;
  price: ProductPrice;
  variants: ProductVariant[];
  rating: ProductRating;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ============================================
// ✅ 3. Interface موحد للـ Product Card (مرن)
// ============================================
export interface Product {
  _id: string | number;
  name: string;

  // Dashboard fields
  code?: string;
  stock?: number;
  status?: ProductStatus | string;

  // Flexible category & price
  category?: ProductCategory | CategoryInfo | string;
  price?: number | ProductPrice;

  // API fields
  slug?: string;
  gender?: Gender;
  variants?: ProductVariant[];
  rating?: ProductRating;
  isActive?: boolean;

  // Legacy/Static data fields
  title?: string;
  description?: string;
  image?: string;
  oldPrice?: number;
  badge?: string;
  badgeClass?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

// ============================================
// ✅ 4. باقي الـ Interfaces
// ============================================
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

// ============================================
// ✅ 5. Helper Functions
// ============================================
export function isProductPrice(price: any): price is ProductPrice {
  return typeof price === 'object' && price !== null && 'final' in price;
}

export function isCategoryInfo(category: any): category is CategoryInfo {
  return typeof category === 'object' && category !== null && 'name' in category;
}

export function getProductImage(product: Product): string {
  if (product.variants?.[0]?.images?.main) {
    return product.variants[0].images.main;
  }
  return product.image || 'assets/images/placeholder.jpg';
}

export function getProductPrice(product: Product): number {
  if (isProductPrice(product.price)) {
    return product.price.final;
  }
  return (product.price as number) || 0;
}

export function getProductOriginalPrice(product: Product): number | null {
  if (isProductPrice(product.price)) {
    return product.price.original > product.price.final ? product.price.original : null;
  }
  return product.oldPrice || null;
}

export function getProductDiscount(product: Product): number {
  if (isProductPrice(product.price)) {
    return product.price.discount || 0;
  }
  if (product.oldPrice && product.price) {
    const price = product.price as number;
    return Math.round(((product.oldPrice - price) / product.oldPrice) * 100);
  }
  return 0;
}

export function getCategoryName(product: Product): string {
  if (!product.category) return '';
  if (isCategoryInfo(product.category)) {
    return product.category.name;
  }
  const cat = product.category as ProductCategory;
  return CATEGORY_CONFIG[cat]?.label || String(product.category);
}

export function getProductName(product: Product): string {
  return product.name || product.title || 'Unknown Product';
}

export function getProductSlug(product: Product): string {
  return product.slug || String(product._id);
}

// ============================================
// ✅ 6. Configs
// ============================================
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

// src/app/core/models/product.model.ts - إضافة للـ interfaces الموجودة

// ✅ API Product Response (للتفاصيل)
export interface ApiProductDetail {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  gender: 'men' | 'women';
  price: {
    original: number;
    discount: number;
    final: number;
  };
  variants: ProductVariant[];
  rating: {
    average: number;
    count: number;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDetailResponse {
  success: boolean;
  data: ApiProductDetail;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  colorCode?: string;
  image: string;
  sku?: string;
}

// ✅ Interface للبيانات القادمة من صفحة المنتج
export interface AddToCartInput {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant: {
    sku: string;
    size: string;
    color: string;
    image: string;
    colorCode?: string;
  };
}
