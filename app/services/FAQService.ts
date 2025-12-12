export interface Duvida {
  IdDuvidas: number;
  Secao: string;
  Titulo: string;
  Descricao: string;
}

export async function getDuvidas(): Promise<Duvida[]> {
  const res = await fetch("http://localhost:4000/api/duvidas");
  
  if (!res.ok) {
    console.error("Erro na API");
    return [];
  }

  return res.json();
}
