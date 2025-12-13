"use client";

import ProtectedRoute from "@/app/components/templates/protectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageTemplate } from "../../components/templates/admin/AdminTemplate";
import authService, { Admin } from "@/app/services/authService";

export default function AdminPage() {
  const router = useRouter();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    try {
      setLoading(true);
      const data = await authService.getAdmins();
      setAdmins(data);
    } catch (err) {
      console.error("Erro ao buscar administradores:", err);
      alert("Erro ao carregar administradores");
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    router.push("register");
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Deseja realmente excluir este administrador?");
    if (!confirmDelete) return;

    try {
      await authService.deleteAdmin(id);
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    } catch (err) {
      console.error("Erro ao excluir administrador:", err);
      alert("Erro ao excluir administrador");
    }
  }

  function handleChangePassword(id: number) {
    router.push(`change-password?id=${id}`);
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="pt-24 text-center text-gray-500">
          Carregando administradores...
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminPageTemplate
        admins={admins}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onChangePassword={handleChangePassword}
      />
    </ProtectedRoute>
  );
}
