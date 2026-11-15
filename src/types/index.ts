export type UserRole = "customer" | "admin" | "super_admin";

export type ProductStatus = "draft" | "active" | "archived";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod = "cod" | "card" | "manual";

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string;
  material: string | null;
  care_instructions: string | null;
  status: ProductStatus;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size: string | null;
  color_name: string | null;
  color_hex: string | null;
  price_uzs: number;
  compare_at_price_uzs: number | null;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  variant_id: string | null;
  storage_path: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
}

export interface DeliveryAddress {
  recipient_name: string;
  phone: string;
  region: string;
  city: string;
  district?: string;
  street: string;
  house: string;
  apartment?: string;
  landmark?: string;
}

export interface CartItem {
  id: string;
  variant_id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    primary_image?: string;
  };
  variant: {
    id: string;
    sku: string;
    size: string | null;
    color_name: string | null;
    price_uzs: number;
    stock_quantity: number;
  };
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  delivery_address: DeliveryAddress;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  subtotal_uzs: number;
  discount_uzs: number;
  shipping_uzs: number;
  total_uzs: number;
  customer_note: string | null;
  idempotency_key: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_name_snapshot: string;
  sku_snapshot: string;
  size_snapshot: string | null;
  color_snapshot: string | null;
  unit_price_uzs: number;
  quantity: number;
  line_total_uzs: number;
  created_at: string;
}

export interface ShopSettings {
  store_name: string;
  phone: string;
  email: string;
  address: string;
  shipping_fee_tashkent: number;
  shipping_fee_regions: number;
  free_shipping_threshold: number;
}
