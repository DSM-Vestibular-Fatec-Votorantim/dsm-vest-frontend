const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL

export interface Duvida {
  IdDuvidas: number;
  Secao: string;
  Titulo: string;
  Descricao: string;
}

export async function getDuvidas(): Promise<Duvida[]> {
  const res = await fetch(apiUrl + "/duvidas");
  
  if (!res.ok) {
    console.error("Erro na API");
    return [];
  }

  return res.json();
}
