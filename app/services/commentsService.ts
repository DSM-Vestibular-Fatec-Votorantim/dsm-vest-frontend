import { useEffect, useState } from "react";

export interface Comentario {
  IdComentario: number;
  IdUsuario: number;
  Nome: string;
  Descricao: string;
  ImagemURL: string;
}

export interface PartnerComment {
  id: number;
  name: string;
  comment: string;
  image: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/comentariosSaibaM";

export function usePartnerComments() {
  const [comments, setComments] = useState<PartnerComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: Comentario[]) => {
        const normalized = data.map((item) => ({
          id: item.IdComentario,
          name: item.Nome,
          comment: item.Descricao,
          image: item.ImagemURL,
        }));

        setComments(normalized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { comments, loading };
}


export async function createComment(formData: FormData) {
  const res = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erro ao criar comentário");
}

export async function updateComment(id: number, formData: FormData) {
  const res = await fetch(
    `${apiUrl}/${id}`,
    {
      method: "PUT",
      body: formData,
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Erro ao atualizar comentário");
}

export async function deleteComment(id: number) {
  const res = await fetch(
    `${apiUrl}/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Erro ao excluir comentário");
}
