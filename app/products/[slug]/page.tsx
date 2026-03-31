import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category && item.slug !== product.slug
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link
          href="/shop"
          className="mb-8 inline-block text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-white shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="mb-6 text-2xl font-semibold text-gray-800">
              ${product.price}
            </p>

            <p className="mb-8 leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800">
                Add to Cart
              </button>
              <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 transition hover:bg-gray-100">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Related Products
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative mb-4 h-52 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-gray-600">${item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}