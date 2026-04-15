"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { createWhatsAppProductLink } from "@/lib/whatsapp";

type ProductDetailActionsProps = {
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    stock: number;
  };
};

export default function ProductDetailActions({
  product,
}: ProductDetailActionsProps) {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const isInStock = product.stock > 0;

  const addProductToCart = () => {
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
  };

  const handleAddToCart = () => {
    addProductToCart();
    setIsJustAdded(true);

    window.setTimeout(() => {
      setIsJustAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addProductToCart();
    setIsBuyingNow(true);
    const whatsappLink = createWhatsAppProductLink(product, window.location.origin);

    window.open(whatsappLink, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setIsBuyingNow(false);
    }, 1800);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {isLoggedIn ? (
        <Button
          type="button"
          className="h-14 rounded-full text-base font-semibold"
          disabled={!isInStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="size-5" />
          {isJustAdded ? "Added to Cart" : "Ajouter"}
        </Button>
      ) : (
        <Button asChild className="h-14 rounded-full text-base font-semibold" disabled={!isInStock}>
          <Link href="/login">
            <ShoppingCart className="size-5" />
            Ajouter
          </Link>
        </Button>
      )}
      <Button
        type="button"
        className="h-14 rounded-full border border-[#25D366] !bg-[#25D366] text-white px-5 text-base font-semibold shadow-[0_8px_20px_rgba(37,211,102,0.25)] hover:!bg-[#1fb95a] hover:border-[#1fb95a] focus-visible:ring-[#25D366]/35"
        disabled={!isInStock}
        onClick={handleBuyNow}
      >
        <MessageCircle className="size-5 fill-current" />
        {isBuyingNow ? "Envoi vers WhatsApp..." : "WhatsApp"}
      </Button>
    </div>
  );
}
