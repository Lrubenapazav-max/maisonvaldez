import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { MaisonSection } from "@/components/MaisonSection";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductGrid products={products} />
      <MaisonSection />
      <Footer />
    </>
  );
}
