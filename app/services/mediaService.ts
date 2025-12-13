import { useEffect, useState } from "react";

export interface Imagens {
    IdImagem: number,
    URL: string,
    Descricao: string,
    public_id: string
}

export interface Videos {
    IdVideos: number,
    URL: string,
    Descricao: string,
    public_id: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/imagens";

export async function getAllImages(): Promise<Imagens[]> {
    const res = await fetch(apiUrl)

    if(!res.ok){
        console.error("Erro ao buscar imagens cadastradas");
        return [];
    }

    return res.json();
}

export async function deleteImage(id: number) {
  const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar imagem");
}

export async function uploadImage(file: File, descricao: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("Descricao", descricao);

  const res = await fetch(apiUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Erro ao enviar imagem");
  return res.json();
}

export async function updateImage(id: number, file: File, descricao: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("Descricao", descricao);

  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Erro ao atualizar imagem");
}


export function useSelectedImages(targetIds: number[]) {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Erro ao buscar imagens");

        const data: Imagens[] = await res.json();

        const filtered = data
          .filter((img) => targetIds.includes(img.IdImagem))
          .map((img) => ({
            src: img.URL,
            alt: img.Descricao || `Imagem ${img.IdImagem}`,
          }));

        setImages(filtered);
      } catch (err) {
        console.error("Erro ao carregar imagens:", err);
      }
    }

    load();
  }, [targetIds.join(",")]);

  return images;
}

export async function getVideos(): Promise<Videos[]> {
    const res = await fetch(apiUrl)

    if(!res.ok){
        console.error("Erro ao buscar vídeos cadastrados");
        return [];
    }

    return res.json();
}

export function useSelectedVideos(targetIds: number[]) {
  const [videos, setVideos] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Erro ao buscar vídeos");

        const data: Videos[] = await res.json();

        const filtered = data
          .filter((img) => targetIds.includes(img.IdVideos))
          .map((img) => ({
            src: img.URL,
            alt: img.Descricao || `Vídeo ${img.IdVideos}`,
          }));

        setVideos(filtered);
      } catch (err) {
        console.error("Erro ao carregar vídeos:", err);
      }
    }

    load();
  }, [targetIds]);

  return videos;
}