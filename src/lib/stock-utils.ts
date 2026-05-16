import type { Product } from "@/types/product";

export function getTotalStock(product: Product): number {
  return product.colors.reduce((total, color) => {
    return (
      total +
      Object.values(color.stock).reduce((sum, qty) => sum + qty, 0)
    );
  }, 0);
}

export function getSizesForColor(
  product: Product,
  colorName: string
): string[] {
  const color = product.colors.find((c) => c.name === colorName);
  if (!color) return [];
  return Object.keys(color.stock);
}

export function getStock(
  product: Product,
  colorName: string,
  size: string
): number {
  const color = product.colors.find((c) => c.name === colorName);
  if (!color) return 0;
  return color.stock[size] ?? 0;
}

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}
