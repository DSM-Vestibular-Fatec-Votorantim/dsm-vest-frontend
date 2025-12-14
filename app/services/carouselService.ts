const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/configuracao";

export type RawCarouselItem = {
  IdImagem: number;
  Posicao: number;
};

export async function getCarouselImageIds(): Promise<RawCarouselItem[]> {
  const res = await fetch(
    apiUrl + "/carousel"
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar imagens do carousel");
  }

  return res.json();
}

export async function updateCarouselImage(position: number, imageId: number) {
  const res = await fetch(`${apiUrl}/carousel/${position}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageId }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar imagem do carousel");
  }
}

export async function addCarouselImage(imageId: number) {
  const res = await fetch(
    `${apiUrl}/carousel`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageId }),
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao adicionar imagem ao carousel");
  }
}

export async function removeCarouselImage(position: number) {
  const res = await fetch(
    `${apiUrl}/carousel/${position}`,
    { method: "DELETE" }
  );

  if (!res.ok) {
    throw new Error("Erro ao remover imagem do carousel");
  }
}