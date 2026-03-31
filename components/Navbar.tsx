"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Audio", href: "/categories/audio" },
    { name: "Gaming", href: "/categories/gaming" },
  ];

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          KalStore
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 md:flex md:max-w-md"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-l-xl border border-r-0 border-gray-300 px-4 py-2 text-sm outline-none focus:border-black"
          />
          <button
            type="submit"
            className="rounded-r-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Search
          </button>
        </form>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-black"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
            Login
          </button>
          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
            Cart
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <form onSubmit={handleSearch} className="mb-4 flex">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-l-xl border border-r-0 border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
              />
              <button
                type="submit"
                className="rounded-r-xl bg-black px-4 py-3 text-sm font-medium text-white"
              >
                Search
              </button>
            </form>

            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <button className="rounded-lg border px-4 py-3 text-sm font-medium transition hover:bg-gray-100">
                Login
              </button>
              <button className="rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}