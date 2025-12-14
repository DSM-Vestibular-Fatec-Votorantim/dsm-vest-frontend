const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/configuracao/banner";

export async function getBannerImageId(): Promise<number | null> {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data.bannerImageId;
}

export async function updateBannerImage(id: number) {
  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bannerImageId: id })
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar banner");
  }
}
