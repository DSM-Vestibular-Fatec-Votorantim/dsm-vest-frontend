"use client";

import ProtectedRoute from "@/app/components/templates/protectedRoute";
import React, { useState } from "react";
import AuthService from "../../services/authService";
import ChangePasswordTemplate from "@/app/components/templates/change-password/ChangePasswordTemplate";

const ChangePasswordPage: React.FC = () => {
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (values: {
    senhaAtual: string;
    novaSenha: string;
    confirmaNovaSenha: string;
  }) => {
    try {
      const data = await AuthService.changePassword(
        values.senhaAtual,
        values.novaSenha,
        values.confirmaNovaSenha
      );
      setMensagem(data.message); // Mensagem de sucesso
    } catch (error: any) {
      setMensagem(error.response?.data?.message || "Erro ao alterar senha.");
    }
  };

  return (
    <ProtectedRoute>
      <ChangePasswordTemplate
        onSubmit={handleSubmit}
        mensagem={mensagem}
        setMensagem={setMensagem}
      />
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;
