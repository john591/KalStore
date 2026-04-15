"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loginWithDjango, type AuthUser } from "@/lib/auth";

type AuthContextValue = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "kalstore-auth";
const AUTH_TOKEN_STORAGE_KEY = "kalstore-auth-token";
const AUTH_REFRESH_TOKEN_STORAGE_KEY = "kalstore-refresh-token";
const AUTH_USER_STORAGE_KEY = "kalstore-user";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    const storedUser = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);

    setIsLoggedIn(storedIsLoggedIn);

    if (!storedUser) {
      setHasHydrated(true);
      return;
    }

    try {
      setUser(JSON.parse(storedUser) as AuthUser);
    } catch {
      window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, String(isLoggedIn));
  }, [hasHydrated, isLoggedIn]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!user) {
      window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  }, [hasHydrated, user]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login: async (email: string, password: string) => {
        const authResult = await loginWithDjango(email, password);

        setIsLoggedIn(true);
        setUser(authResult.user);

        if (authResult.accessToken) {
          window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authResult.accessToken);
        } else {
          window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        }

        if (authResult.refreshToken) {
          window.localStorage.setItem(
            AUTH_REFRESH_TOKEN_STORAGE_KEY,
            authResult.refreshToken,
          );
        } else {
          window.localStorage.removeItem(AUTH_REFRESH_TOKEN_STORAGE_KEY);
        }
      },
      logout: () => {
        setIsLoggedIn(false);
        setUser(null);
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        window.localStorage.removeItem(AUTH_REFRESH_TOKEN_STORAGE_KEY);
      },
    }),
    [isLoggedIn, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
