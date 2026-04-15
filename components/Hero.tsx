import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 py-8 sm:px-6 md:py-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Bienvenue A KalStore
          </p>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            Tout en un
          </h1>

          <p className="mb-6 max-w-xl text-base text-gray-600 md:text-lg">
            Decouvrez des produits de qualite pour ameliorer votre quotidien. Explorez notre selection de produits innovants et profitez de la technologie a votre service.
          </p>

          <div className="flex flex-col gap-1 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-xl bg-black px-6 py-3 text-center text-white transition hover:bg-gray-800"
            >
              Acheter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
