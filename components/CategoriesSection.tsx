import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export default async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Categories
        </p>
        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          Achat par Categorie
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Parcourez nos principales lignes de produits et trouvez ce qui correspond à vos besoins.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {category.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                Parcourir {category.productCount} produit
                {category.productCount === 1 ? "" : "s"} dans {category.name}.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
