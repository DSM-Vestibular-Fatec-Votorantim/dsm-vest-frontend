/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { User } from "../types/User";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading?: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Cria um contexto vazio só pra não dar erro
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if(token){
      (async () => {
        try {
          const userData = await authService.getUser(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Erro ao buscar usuário logado:", error.message);
            if (error.message.includes("Token inválido")) {
              localStorage.removeItem("access_token");
              setIsAuthenticated(false);
            }
          } else {
            console.error("Erro desconhecido ao buscar usuário logado:", error);
          }
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try{
      const response = await authService.login({email, senha: password});
      localStorage.setItem("access_token", response.access_token);

      setIsAuthenticated(true);

      try{
        const fullUser = await authService.getUser(response.access_token);
        setUser(fullUser);
      } catch(error){
        console.warn("Falha no getUsuario com o token: ", error)
      }

      router.push("/pages/admin");
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("savedCredentials");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
  
  // return (
  //   <AuthContext.Provider
  //     value={{
  //       login: async (email, password) => {
  //         console.log("Mock login chamado:", { email, password });
  //       },
  //     }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );
};
