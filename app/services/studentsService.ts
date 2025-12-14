import { useEffect, useState } from "react";

export interface ComentariosIni {
    IdComentario: number,
    IdUsuario: number,
    Descricao: string,
    Tipo: string,
    Data: string,
    Nome: string,
    ImagemURL: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + '/comentariosIni'

export async function getCards(): Promise<ComentariosIni[]> {
    const res = await fetch(apiUrl)

    if(!res.ok){
        console.error("Erro ao buscar relatos cadastrados");
        return [];
    }

    return res.json();
}

export function useAllCards() {
  const [cards, setCards] = useState<ComentariosIni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCards().then((data) => {
      setCards(data);
      setLoading(false);
    });
  }, []);

  return { cards, loading };
}

export async function createStudentCard(formData: FormData) {
  const res = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao criar relato");
  }
}

export async function updateStudentCard(
  id: number,
  formData: FormData
) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao atualizar relato");
  }
}

export async function deleteStudentCard(id: number) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao excluir relato");
  }
}

