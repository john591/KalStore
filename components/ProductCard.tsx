"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import type { CatalogProduct } from "@/lib/catalog";
import { createWhatsAppProductLink } from "@/lib/whatsapp";

type ProductCardProps = {
  product: CatalogProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0;
  const productHref = `/products/${product.slug}`;
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isJustAdded, setIsJustAdded] = useState(false);
  const currentQuery = searchParams.toString();
  const returnTo = currentQuery ? `${pathname}?${currentQuery}` : pathname;
  const loginHref = `/login?redirect=${encodeURIComponent(returnTo)}`;

  const handleAddToCart = () => {
    if (!isInStock) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
    });

    setIsJustAdded(true);
    window.setTimeout(() => {
      setIsJustAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!isInStock) {
      return;
    }

    const whatsappLink = createWhatsAppProductLink(product, window.location.origin);
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="rounded-xl bg-white p-2 transition hover:shadow-md">
      <Link href={productHref} className="block">
        <div className="mb-3 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={500}
            height={500}
            className="h-40 w-full object-cover sm:h-44 md:h-48"
          />
        </div>

        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm leading-5 text-gray-900">
            {product.name}
          </h3>

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {product.category.name}
          </p>

          <p className="pt-1 text-2xl font-bold leading-none text-gray-900">
            ${product.price}
          </p>

          {product.oldPrice ? (
            <p className="text-sm text-gray-500 line-through">${product.oldPrice}</p>
          ) : null}

          <p className="truncate text-sm text-gray-600">
            {product.brand?.name || product.subcategory?.name || "General catalog item"}
          </p>

          <div className="pt-1">
            {isInStock ? (
              <span className="text-sm font-semibold text-emerald-700">
                En stock: {product.stock}
              </span>
            ) : (
              <span className="text-sm text-amber-700">En rupture de stock</span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {isLoggedIn ? (
          <Button
            type="button"
            size="xs"
            className="w-full rounded-lg"
            disabled={!isInStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart />
            {isJustAdded ? "Added" : "Ajouter"}
          </Button>
        ) : (
          <Button asChild size="xs" className="w-full rounded-lg" disabled={!isInStock}>
            <Link href={loginHref}>
              <ShoppingCart />
              Ajouter
            </Link>
          </Button>
        )}
        <Button
          type="button"
          size="xs"
          className="w-full rounded-lg border border-[#25D366] bg-[#25D366] text-green-500 shadow-sm hover:bg-[#1ebe5b] hover:border-[#1ebe5b]"
          disabled={!isInStock}
          onClick={handleBuyNow}
        >
          <MessageCircle />
          WhatsApp
        </Button>
      </div>
    </article>
  );
}
