"use client";

import React from "react";
import ForgotPasswordTemplate from "@/app/components/templates/forgot-password/ForgotPasswordTemplate";
import AuthService from "@/app/services/authService";

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");
  const [erro, setErro] = React.useState("");

  // ======================
  // STEP 1 - ENVIAR EMAIL
  // ======================
  const handleSendEmail = async (emailValue: string) => {
    try {
      setErro("");
      const res = await AuthService.forgotPassword(emailValue);

      setEmail(emailValue); // mantém email para o step 2
      setMensagem(res.message);
      setStep(2);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao enviar email");
    }
  };

  // ======================
  // STEP 2 - RESETAR SENHA
  // ======================
  const handleResetPassword = async (data: {
    email: string;
    codigo: string;
    novaSenha: string;
    confirmarSenha: string;
  }) => {
    try {
      setErro("");
      const res = await AuthService.resetPassword(
        data.email,
        data.codigo,
        data.novaSenha
      );

      setMensagem(res.message);
      setStep(3);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao redefinir senha");
    }
  };

  return (
    <ForgotPasswordTemplate
      step={step}
      setStep={setStep}
      email={email}
      mensagem={mensagem}
      erro={erro}
      handleSendEmail={handleSendEmail}
      handleResetPassword={handleResetPassword}
    />
  );
};

export default ForgotPasswordPage;
