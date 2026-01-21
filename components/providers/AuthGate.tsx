"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppLoader from "@/components/ui/AppLoader";

type User = {
  id: string;
  role: "ADMIN" | "YOUTH";
};

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        // ❌ Not logged in
        if (!res.ok) {
          if (
            pathname.startsWith("/admin") ||
            pathname.startsWith("/youth")
          ) {
            router.replace("/login");
          }
          setLoading(false);
          return;
        }

        const user: User = await res.json();

        // ✅ Logged in but on auth pages
        if (pathname === "/login" || pathname === "/register") {
          if (user.role === "ADMIN") router.replace("/admin");
          if (user.role === "YOUTH") router.replace("/youth");
          return;
        }

        // 🔐 Role protection
        if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
          router.replace("/unauthorized");
          return;
        }

        if (pathname.startsWith("/youth") && user.role !== "YOUTH") {
          router.replace("/unauthorized");
          return;
        }

        setLoading(false);
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) return <AppLoader />;

  return <>{children}</>;
}
