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

export async function getCards(): Promise<ComentariosIni[]> {
    const res = await fetch("http://localhost:4000/api/comentariosIni")

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

