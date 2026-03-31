import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return categories.map((category) => ({
    slug: category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Category
          </p>
          <h1 className="mt-2 text-4xl font-bold capitalize text-gray-900">
            {slug}
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            Browse products in the {slug} category.
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-gray-600">
              No products found in this category.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}