import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/types/product";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

export async function getProducts(): Promise<Product[]> {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data) as Product[];
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export {
  getTotalStock,
  getSizesForColor,
  getStock,
  formatPrice,
} from "./stock-utils";
