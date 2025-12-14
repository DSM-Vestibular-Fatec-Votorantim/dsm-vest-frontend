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

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/faleConosco";

export async function getFaleConosco(): Promise<FaleConosco[]> {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Erro ao buscar Fale Conosco");
  }

  return res.json();
}

export async function updateFaleConosco(
  id: number,
  data: Pick<
    FaleConosco,
    "Tel" | "Email" | "LinkFace" | "LinkInsta" | "LinkLinkedin"
  >
) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar Fale Conosco");
  }

  return res.json();
}
