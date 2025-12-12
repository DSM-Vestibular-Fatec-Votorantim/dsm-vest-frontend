"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return null; // Evita piscar conteúdo
  }

  return <>{children}</>;
}
