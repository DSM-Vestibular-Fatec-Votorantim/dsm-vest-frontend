"use client";

import ProtectedRoute from "@/app/components/templates/protectedRoute";
import AdminRegisterTemplate from "@/app/components/templates/admin-register/AdminRegisterTemplate";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthService from "@/app/services/authService";


const AdminRegisterPage: React.FC = () => {
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleRegister = async (
    nome: string,
    email: string,
    senha: string,
    confirmarSenha: string
  ) => {
    if (senha !== confirmarSenha) {
      setErrorMessages(["As senhas não coincidem. Por favor, verifique."]);
      return;
    }

    try {
      /*await AdminService.register({
        nome,
        email,
        senha,
        role: "admin",
      });*/
      console.log(`${nome}, ${email}, ${senha}`)
      alert("Administrador criado com sucesso!");
      router.push("admin");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        Array.isArray(error.response.data.errors)
      ) {
        setErrorMessages(
          error.response.data.errors.map((err: { msg: string }) => err.msg)
        );
      } else {
        setErrorMessages([
          "Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.",
        ]);
      }
      console.error("Erro no registro:", error);
    }
  };

  return (
    <ProtectedRoute>
      <AdminRegisterTemplate
        onRegister={handleRegister}
        errorMessages={errorMessages}
      />
    </ProtectedRoute>
  );
};

export default AdminRegisterPage;
