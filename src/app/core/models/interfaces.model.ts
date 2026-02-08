// src/app/models/interfaces.ts

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  _id: string;
  user: string;
  label: string; // المنزل، العمل
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface ProfileData {
  profile: User;
  addresses: Address[];
}

export interface CartItem {
  _id: string;
  product: string | { _id: string; name: string };
  variantSku: string;
  name: string;
  image: string;
  size?: string;
  color?: string;
  colorCode?: string;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isActive: boolean;
  // ✅ حقول الكوبون
  coupon?: string | null;
  couponCode?: string | null;
  discountAmount: number;
  finalPrice: number;
}
export interface OrderItem {
  product: {
    id: string;
    name: string;
    image?: string;
    category?: string;
  };
  variantSku: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  totalItems: number;
  items: OrderItem[];
  status: string;
  createdAt: string;
}

export interface WishlistItem {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images?: { main?: string };
    category?: { name: string };
    variants?: any[];
  };
  variantSku: string;
}

export interface Wishlist {
  _id?: string;
  items: WishlistItem[];
  totalItems: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
