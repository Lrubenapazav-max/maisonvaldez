import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, color, size, quantity } = body as {
    productId: string;
    color: string;
    size: string;
    quantity: number;
  };

  if (!productId || !color || !size || quantity < 1) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const products = await getProducts();
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const product = products[productIndex];
  const colorIndex = product.colors.findIndex((c) => c.name === color);
  if (colorIndex === -1) {
    return NextResponse.json({ error: "Color not found" }, { status: 404 });
  }

  const currentStock = product.colors[colorIndex].stock[size] ?? 0;
  if (currentStock < quantity) {
    return NextResponse.json(
      { error: "Insufficient stock", available: currentStock },
      { status: 409 }
    );
  }

  product.colors[colorIndex].stock[size] = currentStock - quantity;
  products[productIndex] = product;
  await saveProducts(products);

  return NextResponse.json({
    success: true,
    remaining: product.colors[colorIndex].stock[size],
  });
}
