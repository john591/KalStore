import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold">KalStore</h2>
          <p className="mt-4 text-sm leading-6 text-gray-400">
            La boutique en ligne.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Shop
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <Link href="/" className="transition hover:text-white">
                Tous les produits
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Arrivages
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Meilleurs ventes
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Offres spéciales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Notre entreprise
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <Link href="/" className="transition hover:text-white">
                A propos de nous
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-white">
                Conditions d&apos;utilisation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-gray-400">
            Recevez des offres exclusives et les dernières nouvelles de KalStore directement dans votre boîte de réception.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-gray-400 md:flex-row">
          <p>© 2026 KalStore. Tout droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition hover:text-white">
              Facebook
            </Link>
            <Link href="/" className="transition hover:text-white">
              Instagram
            </Link>
            <Link href="/" className="transition hover:text-white">
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}