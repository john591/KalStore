"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MenuCategory = {
  id: number;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  imageAlt: string;
  href: string;
};

export default function CategoriesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const response = await fetch("/api/categories-menu", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as MenuCategory[];

        if (!isMounted) {
          return;
        }

        setCategories(data);
        setActiveCategorySlug((currentSlug) => currentSlug ?? data[0]?.slug ?? null);
      } catch (error) {
        console.error("Unable to load menu categories", error);

        if (isMounted) {
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeCategory = useMemo(() => {
    if (categories.length === 0) {
      return null;
    }

    return (
      categories.find((category) => category.slug === activeCategorySlug) ?? categories[0]
    );
  }, [activeCategorySlug, categories]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        <span className="text-lg">☰</span>
        <span>Categories</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[960px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="grid min-h-[500px] grid-cols-[280px_1fr]">
            <div className="border-r border-gray-200 bg-[#f7f8fa]">
              <div className="border-b border-gray-200 px-5 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Toutes les categories
                </h3>
              </div>

              <div className="max-h-[440px] overflow-y-auto py-2">
                {isLoading ? (
                  <div className="space-y-2 px-3 py-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-12 animate-pulse rounded-lg bg-white"
                      />
                    ))}
                  </div>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onMouseEnter={() => setActiveCategorySlug(category.slug)}
                      onClick={() => setActiveCategorySlug(category.slug)}
                      className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm transition ${
                        activeCategory?.id === category.id
                          ? "bg-white font-semibold text-black"
                          : "text-gray-700 hover:bg-white hover:text-black"
                      }`}
                    >
                      <span className="pr-4">{category.name}</span>
                      <span className="text-xs text-gray-400">
                        {category.productCount}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-6 text-sm text-gray-500">
                    No categories found in the database.
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {activeCategory ? (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                        Categories pour moi
                      </p>
                      <h2 className="mt-2 text-3xl font-bold text-gray-900">
                        {activeCategory.name}
                      </h2>
                    </div>

                    <Link
                      href={activeCategory.href}
                      className="text-sm font-medium text-gray-700 transition hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Voir tous
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        onMouseEnter={() => setActiveCategorySlug(category.slug)}
                        onClick={() => setIsOpen(false)}
                        className="group flex flex-col items-center text-center"
                      >
                        <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full bg-gray-100 transition group-hover:scale-105">
                          <Image
                            src={category.image}
                            alt={category.imageAlt}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-800 transition group-hover:text-black">
                          {category.name}
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          {category.productCount} produit
                          {category.productCount > 1 ? "s" : ""}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  No categories available right now.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
