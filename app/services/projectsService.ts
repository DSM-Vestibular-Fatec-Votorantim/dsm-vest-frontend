import { useEffect, useState } from "react";

export interface Projetos {
    IdProjeto: number,
    Tipo: string,
    LinkProj: string,
    ImagemURL: string,
}

function detectMediaType(url: string): "image" | "video" {
  return url.includes("/video/upload/") ? "video" : "image";
}

function generateThumbnailFromVideoUrl(videoUrl: string): string {
  if (!videoUrl.includes("/video/upload/")) {
    console.warn("URL inválida ou não é um vídeo Cloudinary");
    return "";
  }

  const [base, rest] = videoUrl.split("/video/upload/");

  return `${base}/video/upload/c_fill,ar_16:9,q_auto,f_auto/${rest.replace(
    /\.(mp4|mov|webm|mkv)$/i,
    ".jpg"
  )}`;
}

export async function getProjetos(): Promise<Projetos[]> {
    const res = await fetch("http://localhost:4000/api/projetos")

    if(!res.ok){
        console.error("Erro ao buscar projetos e postagens cadastradas");
        return [];
    }

    return res.json();
}

export function useAllProjects() {
    const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjetos().then((data) => {
      const normalizados = data.map((proj) => {
        const mediaType = detectMediaType(proj.ImagemURL);

        return {
          id: proj.IdProjeto,
          type: mediaType,            
          turma: proj.Tipo,           
          link: proj.LinkProj,

          media: mediaType === "image" ? proj.ImagemURL : null,
          video: mediaType === "video" ? proj.ImagemURL : null,

          thumbnail:
            mediaType === "video"
              ? generateThumbnailFromVideoUrl(proj.ImagemURL)
              : proj.ImagemURL,
        };
      });

      setProjects(normalizados);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
}