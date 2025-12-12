export interface FaleConosco {
  IdFaleConosco: number;
  Tel: string;
  Email: string;
  End: string;
  LinkFace: string;
  LinkInsta: string;
  LinkLinkedin: string;
  Localizacao: string;
}

export async function getFaleConosco(): Promise<FaleConosco[]> {
  const res = await fetch("http://localhost:4000/api/faleconosco");

  if (!res.ok) {
    console.error("Erro ao buscar Fale Conosco");
    return [];
  }

  return res.json();
}
