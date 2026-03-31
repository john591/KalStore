"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type SubCategory = {
  name: string;
  href: string;
  image: string;
};

type CategoryGroup = {
  id: number;
  name: string;
  href: string;
  subcategories: SubCategory[];
};

const categoryData: CategoryGroup[] = [
  {
    id: 1,
    name: "Electronics",
    href: "/categories/electronics",
    subcategories: [
      {
        name: "Smartphones",
        href: "/categories/smartphones",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Laptops",
        href: "/categories/laptops",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Smart Watches",
        href: "/categories/smart-watches",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Headphones",
        href: "/categories/headphones",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Gaming",
        href: "/categories/gaming",
        image:
          "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Speakers",
        href: "/categories/speakers",
        image:
          "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: 2,
    name: "Fashion",
    href: "/categories/fashion",
    subcategories: [
      {
        name: "Men Shoes",
        href: "/categories/men-shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Women Shoes",
        href: "/categories/women-shoes",
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Hoodies",
        href: "/categories/hoodies",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Bags",
        href: "/categories/bags",
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Watches",
        href: "/categories/fashion-watches",
        image:
          "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Accessories",
        href: "/categories/accessories",
        image:
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: 3,
    name: "Home & Garden",
    href: "/categories/home-garden",
    subcategories: [
      {
        name: "Furniture",
        href: "/categories/furniture",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Kitchen",
        href: "/categories/kitchen",
        image:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Lighting",
        href: "/categories/lighting",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Decoration",
        href: "/categories/decoration",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Storage",
        href: "/categories/storage",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Outdoor",
        href: "/categories/outdoor",
        image:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: 4,
    name: "Sports & Outdoor",
    href: "/categories/sports-outdoor",
    subcategories: [
      {
        name: "Bicycles",
        href: "/categories/bicycles",
        image:
          "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Fitness",
        href: "/categories/fitness",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Camping",
        href: "/categories/camping",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Scooters",
        href: "/categories/scooters",
        image:
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Motorcycles",
        href: "/categories/motorcycles",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80",
      },
      {
        name: "Travel Gear",
        href: "/categories/travel-gear",
        image:
          "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export default function CategoriesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryGroup>(categoryData[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
            <div className="border-r border-gray-200 bg-gray-50">
              <div className="border-b border-gray-200 px-5 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Categories
                </h3>
              </div>

              <div className="max-h-[440px] overflow-y-auto py-2">
                {categoryData.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() => setActiveCategory(category)}
                    onClick={() => setActiveCategory(category)}
                    className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm transition ${
                      activeCategory.id === category.id
                        ? "bg-white font-semibold text-black"
                        : "text-gray-700 hover:bg-white hover:text-black"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-400">›</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                    Categories for you
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
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {activeCategory.subcategories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col items-center text-center"
                  >
                    <div
                      className="mb-3 h-24 w-24 overflow-hidden rounded-full bg-gray-100 bg-cover bg-center transition group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <span className="text-sm font-medium text-gray-800 transition group-hover:text-black">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}