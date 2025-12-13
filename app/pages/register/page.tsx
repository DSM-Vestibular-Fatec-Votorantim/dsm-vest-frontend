"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../../services/authService";
import RegisterTemplate from "../../components/templates/register/RegisterTemplate";

const RegisterPage: React.FC = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  const handleRegister = async (
    nome: string,
    email: string,
    senha: string,
    confirmarSenha: string
  ) => {
    try {
      setErrorMessages([]);

      await AuthService.register({ nome, email, senha });

      alert("Administrador cadastrado com sucesso!");
      router.push("admin");
    } catch (error: any) {
      const response = error.response?.data;

      // ✅ Caso backend retorne array de erros
      if (Array.isArray(response?.errors)) {
        setErrorMessages(
          response.errors.map((err: { msg: string }) => err.msg)
        );
        return;
      }

      // ✅ Caso backend retorne mensagem única
      if (response?.message) {
        setErrorMessages([response.message]);
        return;
      }

      // ❌ Erro genérico
      setErrorMessages([
        "Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.",
      ]);

      console.error("Erro no registro:", error);
    }
  };

  return (
    <RegisterTemplate
      onRegister={handleRegister}
      errorMessages={errorMessages}
    />
  );
};

export default RegisterPage;
