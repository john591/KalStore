import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailActions from "@/components/ProductDetailActions";
import ProductImageGallery from "@/components/ProductImageGallery";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getProducts } from "@/lib/catalog";

function formatProductPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const products = await getProducts();
  const productFacts = [
    {
      label: "Marque",
      value: product.brand?.name || "KalStore Select",
    },
    {
      label: "Model",
      value: product.sku || `MDL-${product.id}`,
    },
    {
      label: "Category",
      value: product.subcategory?.name || product.category.name,
    },
    {
      label: "Stock",
      value: product.stock > 0 ? `${product.stock} available` : "Disponible sur demande",
    },
  ];
  const relatedProducts = products.filter(
    (item) =>
      item.category.slug === product.category.slug && item.slug !== product.slug,
  );

  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <section className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/shop" className="hover:text-gray-900">
            Shop
          </Link>
          <ChevronRight className="size-4" />
          <span>{product.category.name}</span>
          <ChevronRight className="size-4" />
          <span>{product.subcategory?.name || "General catalog"}</span>
          <ChevronRight className="size-4" />
          <span className="font-medium text-gray-800">{product.name}</span>
        </div>

        <div className="rounded-[2rem] border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-8 p-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)_360px] lg:p-6">
            <div className="min-w-0">
              <ProductImageGallery
                key={product.id}
                productName={product.name}
                images={product.images}
              />
            </div>

            <div className="min-w-0 space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
                  {product.category.name}
                </p>
                <h1 className="text-2xl font-semibold leading-tight text-gray-950 sm:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                    <BadgeCheck className="size-4" />
                    Produit de qualité
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700">
                    <PackageCheck className="size-4" />
                    Livraison pret
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div>

                  <div className="rounded-[1.5rem] border border-gray-200 p-4">
                    <p className="mb-3 text-sm font-semibold text-gray-900">
                      Couleur:
                      <span className="ml-2 font-normal text-gray-600">
                        {product.brand?.name || "Default"}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {product.images.length > 0 ? (
                        product.images.map((image, index) => (
                          <button
                            key={image.id}
                            type="button"
                            className={`relative h-16 w-16 overflow-hidden rounded-2xl border bg-white ${
                              index === 0
                                ? "border-orange-500 ring-2 ring-orange-100"
                                : "border-gray-200"
                            }`}
                          >
                            <Image
                              src={image.image}
                              alt={image.altText}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </button>
                        ))
                      ) : (
                        <div className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600">
                          Finition standard
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-gray-200 p-4">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Details cles</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {productFacts.map((fact) => (
                      <div key={fact.label} className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                          {fact.label}
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-900">{fact.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-gray-200 p-5">
                  <h2 className="text-lg font-semibold text-gray-900">Apropos de {product.name}</h2>
                  <p className="mt-3 leading-7 text-gray-600">
                    {product.description ||
                      "Conçu pour répondre aux exigences quotidiennes du commerce de détail et de gros, avec un finition durable, un stock prêt à l'emploi et un support fournisseur simple."}
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[1.75rem] border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-5">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-950">
                    {formatProductPrice(product.price)}
                  </p>
                </div>

                <div className="space-y-5 p-5">
                  <div className="rounded-[1.25rem] bg-[#fff7ed] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                      Disponibilite
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {product.stock > 0 ? `${product.stock} unites en stock` : "Currently unavailable"}
                    </p>
                  </div>

                  <div>
                    <Separator />
                  </div>

                  <div>
                    <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Truck className="size-5 text-orange-600" />
                      Livraison
                    </h2>
                    <div className="rounded-[1.25rem] bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                      Livraison rapide disponible.
                      {" "}
                      {product.stock > 0
                        ? `${product.stock}`
                        : "Le stock est limite. Contactez-nous pour les details de livraison."}
                    </div>
                  </div>

                  <ProductDetailActions
                    product={{
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      image: product.image,
                      price: product.price,
                      stock: product.stock,
                    }}
                  />

                  <div className="rounded-[1.25rem] border border-sky-100 bg-sky-50 p-4 text-sm text-sky-950">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 size-5 shrink-0" />
                      <p>
                         claire des produits et assistance client reactive pour une experience d&apos;achat en toute confiance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
                  En bas
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Produits connexes
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Plus de produits de la même catégorie, avec des prix et des styles similaires, pour vous aider à trouver exactement ce que vous cherchez.
                </p>
              </div>
              <Link href="/shop" className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                Voir tous les produits
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group rounded-[1.5rem] border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <div className="relative mb-4 h-56 overflow-hidden rounded-[1.25rem] bg-white">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    {item.category.name}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-xl font-semibold text-gray-900">
                    {formatProductPrice(item.price)}
                  </p>
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
