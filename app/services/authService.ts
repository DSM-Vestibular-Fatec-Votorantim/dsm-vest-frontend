import axios from "axios";
import { User } from "../types/User";

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/login";

interface LoginCredentials {
  email: string;
  senha: string;
}

interface RegisterCredentials {
  nome: string;
  email: string;
  senha: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
}

function getToken(): string | null {
  return localStorage.getItem("access_token");
}


class AuthService {
  async login(credentials: LoginCredentials) {
    try {
      const response = await axios.post(apiUrl, credentials);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  async register(credentials: RegisterCredentials) {
    try {
      const response = await axios.post(`${apiUrl}/cadastro`, credentials);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    }
  }

  // async forgotPassword(email: string) {
  //   try {
  //     const response = await axios.post(`${apiUrl}/forgot`, {email});

  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     //console.error("Erro ao enviar email de recuperação:", error);
  //     //throw error;
  //   }
  // }

  // async verifyCode(email: string, codigo: string) {
  // try {
  //   const response = await axios.post(`${apiUrl}/verify`, { email, codigo });
  //   return response.data;
  // } catch (error) {
  //   console.error("Erro ao verificar código:", error);
  //   throw error;
  // }
  // }

  // async resetPassword(email: string, codigo: string, novaSenha: string) {
  //   try {
  //     const response = await axios.patch(`${apiUrl}/reset`, {
  //       email,
  //       codigo,
  //       novaSenha,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Erro ao redefinir senha:", error);
  //     throw error;
  //   }
  // }

  async getAdmins(): Promise<Admin[]> {
    const token = localStorage.getItem("access_token");

    const res = await axios.get(apiUrl, {
      headers: {
        "access-token": token,
      },
    });

    return res.data.map((u: any) => ({
      id: u.IdUsuario,
      name: u.Nome,
      email: u.Email,
    }));
  }

  async forgotPassword(email: string) {
    try {
      const response = await axios.post(`${apiUrl}/esqueci`, {email});

      return response.data;
    } catch (error) {
      console.log(error);
      console.error("Erro ao enviar email de recuperação:", error);
      throw error;
    }
  }

  async verifyCode(email: string, codigo: string) {
  try {
    const response = await axios.post(`${apiUrl}/verificar`, { email, codigo });
    return response.data;
  } catch (error) {
    console.error("Erro ao verificar código:", error);
    throw error;
  }
  }

  async resetPassword(email: string, codigo: string, novaSenha: string) {
    try {
      const response = await axios.patch(`${apiUrl}/resetar`, {
        email,
        codigo,
        novaSenha,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      throw error;
    }
  }

  async changePassword(
    senhaAtual: string,
    novaSenha: string,
    confirmaNovaSenha: string
  ) {
  const token = localStorage.getItem("access_token");

  const response = await axios.patch(
    `${apiUrl}/mudar`,
    { senhaAtual, novaSenha, confirmaNovaSenha },
    {
      headers: {
        "access-token": token,
      },
    }
  );

  return response.data;
}

  async deleteAdmin(id: number): Promise<void> {
    const token = localStorage.getItem("access_token");

    await axios.delete(`${apiUrl}/${id}`, {
      headers: {
        "access-token": token,
      },
    });
  }

  async getUser(token?: string): Promise<User> {
    const tokenToUse = token ?? localStorage.getItem("access_token");
    if (!tokenToUse) throw new Error("Token ausente");

    const res = await fetch(`${apiUrl}/usuarioLogado`, {
      headers: {
        "access-token": tokenToUse,
      },
    });

    if (!res.ok) throw new Error("Erro ao buscar usuário");

    const data = await res.json();
    return {
      Id: data.IdUsuario,
      Nome: data.Nome,
      Email: data.Email,
    };
  }
}

export default new AuthService();