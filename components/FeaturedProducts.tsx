import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/catalog";

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Recommandé pour vous
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Produits en vedette
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          Voir tous les produits
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
