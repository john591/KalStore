"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";

type CartButtonProps = {
  mobile?: boolean;
};

export default function CartButton({ mobile = false }: CartButtonProps) {
  const { cartCount } = useCart();

  if (mobile) {
    return (
      <Button asChild className="w-full rounded-full">
        <Link href="/shop">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
          {cartCount > 0 ? ` (${cartCount})` : ""}
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild variant="ghost" size="icon" className="relative rounded-full">
      <Link href="/shop" aria-label={`Cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}>
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            {cartCount}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
