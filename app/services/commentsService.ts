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

export function usePartnerComments() {
  const [comments, setComments] = useState<PartnerComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/comentariosSaibaM")
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
