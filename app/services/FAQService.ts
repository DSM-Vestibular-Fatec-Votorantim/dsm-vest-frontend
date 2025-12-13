// FAQService.ts

export interface Duvida {
  IdDuvidas: number;
  Secao: string;
  Titulo: string;
  Descricao: string;
  IdUsuario?: number; // opcional caso venha no retorno
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/duvidas";

export async function getDuvidas(): Promise<Duvida[]> {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Erro ao buscar dúvidas");
  }

  return res.json();
}

export async function createDuvida(data: {
  IdUsuario: number;
  Secao: string;
  Titulo: string;
  Descricao: string;
}) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar dúvida frequente");

  return res.json();
}

export async function updateDuvida(
  id: number,
  data: {
    IdUsuario: number;
    Secao: string;
    Titulo: string;
    Descricao: string;
  }
) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar dúvida frequente");

  return res.json();
}

export async function deleteDuvida(id: number) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar dúvida frequente");

  return res.json();
}
