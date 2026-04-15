import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/catalog";

type SearchPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const products = await getProducts();
  const query = params.query?.toLowerCase().trim() || "";

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand?.name.toLowerCase().includes(query) ||
      product.subcategory?.name.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Search
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Search Results
          </h1>
          <p className="mt-4 text-gray-600">
            Showing results for:{" "}
            <span className="font-semibold text-gray-900">
              {query || "all products"}
            </span>
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-gray-600">No matching products found.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
