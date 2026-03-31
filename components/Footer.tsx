import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold">KalStore</h2>
          <p className="mt-4 text-sm leading-6 text-gray-400">
            Your trusted destination for modern tech, quality gadgets, and
            everyday digital essentials.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Shop
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <Link href="/" className="transition hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Special Offers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <Link href="/" className="transition hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-gray-400">
            Get updates about new products and exclusive deals.
          </p>

          <form className="mt-4 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-gray-400 md:flex-row">
          <p>© 2026 KalStore. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition hover:text-white">
              Facebook
            </Link>
            <Link href="/" className="transition hover:text-white">
              Instagram
            </Link>
            <Link href="/" className="transition hover:text-white">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}