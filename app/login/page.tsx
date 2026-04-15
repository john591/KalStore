"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { isLoggedIn, login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/shop";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Ecrivez votre email et mot de passe pour continuer.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setError("Ecrivez une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await login(trimmedEmail, password);
      router.push(redirectTo);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to log in with the Django server.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto flex max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Compte
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Connecvion</h1>
          <p className="mt-3 text-gray-600">
            Connectez-vous avant d&apos;ajouter des produits à votre panier.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-xl border-gray-300 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <span className="text-xs text-gray-400">Le mot de passe est bon</span>
              </div>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 rounded-xl border-gray-300 pl-10"
                />
              </div>
            </div>

            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            {isLoggedIn && user?.email ? (
              <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <p className="font-medium text-emerald-900">Inscrivez vous</p>
                <p className="mt-1">Current account: {user.email}</p>
              </div>
            ) : null}

            <div className="space-y-3">
              <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting}>
                <User className="mr-2 h-4 w-4" />
                {isSubmitting ? "Signing in..." : isLoggedIn ? "Continue" : "Connectez-vous"}
              </Button>

              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href={redirectTo}>
                  Retour a la boutique
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
