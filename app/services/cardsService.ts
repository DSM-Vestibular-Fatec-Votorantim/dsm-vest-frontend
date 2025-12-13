import { useEffect, useState } from "react";

export interface Card {
  IdCardsIni: number;
  IdImagem: number | null;
  IdVideos: number | null;
  LinkProj: string;
  Tipo: string;
  ImagemURL: string | null;
  VideoURL: string | null;
}

export interface CardPost {
  id: number;
  mediaType: "image" | "video";
  src: string;
  orientation: "horizontal" | "vertical";
  link?: string;
}

function detectMedia(card: Card): "image" | "video" {
  return card.VideoURL ? "video" : "image";
}


function detectOrientation(url: string): "horizontal" | "vertical" {
  if (
    url.includes("ar_9:16") ||
    url.includes("/reel/") ||
    url.includes("vertical")
  ) {
    return "vertical";
  }

  return "horizontal";
}


export function useCards() {
  const [cards, setCards] = useState<CardPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/cards")
      .then((res) => res.json())
      .then(async (data: Card[]) => {
        const normalized = data.map((item) => {
            const src = item.VideoURL ?? item.ImagemURL;

            if (!src) return null;

            const mediaType = item.VideoURL ? "video" : "image";

            return {
                id: item.IdCardsIni,
                src,
                mediaType,
                orientation: detectOrientation(src),
                link: item.LinkProj,
            };
        }).filter(Boolean) as CardPost[];

        setCards(normalized);
        setLoading(false);
      });
  }, []);

  return { cards, loading };
}