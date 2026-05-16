export interface ColorVariant {
  name: string;
  hex: string;
  stock: Record<string, number>;
}

export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  hoverImage: string;
  colors: ColorVariant[];
  featured: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}
