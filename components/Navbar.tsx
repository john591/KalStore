"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, Search, User, ChevronDown, Store } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import CartButton from "@/components/CartButton";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import CategoriesMegaMenu from "@/components/CategoriesMegaMenu";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoggedIn, logout } = useAuth();
  const currentQuery = searchParams.toString();
  const returnTo = currentQuery ? `${pathname}?${currentQuery}` : pathname;
  const loginHref = `/login?redirect=${encodeURIComponent(returnTo)}`;

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Audio", href: "/categories/audio" },
    { name: "Jeux", href: "/categories/gaming" },
  ];

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Store className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-lg font-bold leading-none">KalStore</p>
            <p className="text-xs text-muted-foreground">Smart marketplace</p>
          </div>
        </Link>

        <div className="hidden lg:block">
          <CategoriesMegaMenu />
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 md:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Recherche des produits et categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 rounded-full border-border bg-background pl-10 pr-28"
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 h-9 -translate-y-1/2 rounded-full px-5"
            >
              Recherche
            </Button>
          </div>
        </form>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CartButton />

          {isLoggedIn ? (
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              <User className="mr-2 h-4 w-4" />
              Deconnexion
            </Button>
          ) : (
            <Button asChild variant="outline" className="rounded-full">
              <Link href={loginHref}>
                <User className="mr-2 h-4 w-4" />
                Connexion
              </Link>
            </Button>
          )}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto rounded-full md:ml-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[320px] sm:w-[380px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <Store className="h-5 w-5" />
                KalStore
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Recherche
                </Button>
              </form>

              <Separator />

              <div className="space-y-1">
                <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Parcourir
                </p>

                <Link
                  href="/categories"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-muted"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    onClick={handleLogout}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Deconnexion
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <Link href={loginHref} onClick={() => setMobileOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Connexion
                    </Link>
                  </Button>
                )}

                <CartButton mobile />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
