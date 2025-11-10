"use client";

import { createContext, useContext } from "react";

// Cria um contexto vazio só pra não dar erro
const AuthContext = createContext({
  login: async (email: string, password: string ) => {
    console.log("Login mock:", { email, password });
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        login: async (email, password) => {
          console.log("Mock login chamado:", { email, password });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
