"use client";

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoginTemplate from "../../components/templates/LoginTemplate";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async (
    email: string,
    password: string,
  ) => {
    try {
      await login(email, password );
    } catch (error) {
      setErrorMessage("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return <LoginTemplate onLogin={handleLogin} errorMessage={errorMessage} />;
};

export default LoginPage;
