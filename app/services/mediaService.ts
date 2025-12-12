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

export async function getImagens(): Promise<Imagens[]> {
    const res = await fetch("http://localhost:4000/api/imagens")

    if(!res.ok){
        console.error("Erro ao buscar imagens cadastradas");
        return [];
    }

    return res.json();
}

export function useSelectedImages(targetIds: number[]) {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:4000/api/imagens");
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
  }, [targetIds]);

  return images;
}

export async function getVideos(): Promise<Videos[]> {
    const res = await fetch("http://localhost:4000/api/videos")

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
        const res = await fetch("http://localhost:4000/api/videos");
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