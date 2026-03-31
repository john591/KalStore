import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
    maxPrice?: string;
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const selectedCategory = params.category?.toLowerCase() || "all";
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;

    const priceMatch = maxPrice === null || product.price <= maxPrice;

    return categoryMatch && priceMatch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Shop
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            All Products
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            Explore our full collection of tech products, gadgets, and digital
            accessories.
          </p>
        </div>

        <div className="mb-10 grid gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-3 md:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              <a
                href="/shop"
                className={`rounded-full px-4 py-2 text-sm ${
                  selectedCategory === "all"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </a>

              {categories.map((category) => (
                <a
                  key={category}
                  href={
                    maxPrice
                      ? `/shop?category=${category}&maxPrice=${maxPrice}`
                      : `/shop?category=${category}`
                  }
                  className={`rounded-full px-4 py-2 text-sm capitalize ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="flex flex-wrap gap-2">
              {[50, 100, 200, 500, 1000].map((price) => (
                <a
                  key={price}
                  href={
                    selectedCategory !== "all"
                      ? `/shop?category=${selectedCategory}&maxPrice=${price}`
                      : `/shop?maxPrice=${price}`
                  }
                  className={`rounded-full px-4 py-2 text-sm ${
                    maxPrice === price
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Under ${price}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <a
              href="/shop"
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Reset Filters
            </a>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-gray-600">
              No products match the selected filters.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}