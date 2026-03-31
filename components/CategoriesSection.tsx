import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Smartphones",
    description: "Latest phones for work, content, and daily use.",
    icon: "📱",
    slug: "smartphones",
  },
  {
    id: 2,
    title: "Computing",
    description: "Powerful and reliable machines for every professional.",
    icon: "💻",
    slug: "computing",
  },
  {
    id: 3,
    title: "Audio",
    description: "Headphones, speakers, and immersive sound gear.",
    icon: "🎧",
    slug: "audio",
  },
  {
    id: 4,
    title: "Gaming",
    description: "Gear and devices built for performance and fun.",
    icon: "🎮",
    slug: "gaming",
  },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Categories
        </p>
        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          Shop by Category
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Browse our main product lines and find the technology that fits your
          needs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-4xl">{category.icon}</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {category.title}
            </h3>
            <p className="text-sm leading-6 text-gray-600">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}