"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";
import MediaManagerModal from "../atoms/MediaManagerModal";
import {
  addCarouselImage,
  removeCarouselImage,
  updateCarouselImage,
} from "@/app/services/carouselService";

type CarouselItem = {
  position: number;
  src: string;
  alt: string;
};

type CarouselProps = {
  items: CarouselItem[];
  onImageUpdated?: () => void;
  interval?: number;
};

export default function Carousel({
  items,
  interval = 8000,
  onImageUpdated,
}: CarouselProps) {
  const { isAuthenticated } = useAuth();

  const [index, setIndex] = useState(0);
  const [editingPosition, setEditingPosition] = useState<number | null>(null);

  const MAX_IMAGES = 5;

  // AUTOPLAY
  useEffect(() => {
    if (items.length === 0 || editingPosition !== null) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, editingPosition]);

  const prev = () => {
    setIndex((current) =>
      current === 0 ? items.length - 1 : current - 1
    );
  };

  const next = () => {
    setIndex((current) =>
      current === items.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      {items.length === 0 && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
          Nenhuma imagem no carousel
        </div>
      )}

      {isAuthenticated && items.length < MAX_IMAGES && (
        <button
          onClick={() => setEditingPosition(-1)}
          className="absolute top-3 right-3 z-20 bg-black/70 text-white px-3 py-1 rounded text-sm"
        >
          Adicionar imagem
        </button>
      )}

      {items.length > 0 && (
        <>
          

          

          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.position}
                className="min-w-full relative aspect-video"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain"
                />

                {isAuthenticated && (
                  <div className="absolute top-2 left-2 flex gap-2">
                    <button
                      onClick={() => setEditingPosition(item.position)}
                      className="bg-black/60 text-white px-2 py-1 rounded text-xs"
                    >
                      Editar
                    </button>

                    <button
                      onClick={async () => {
                        if (confirm("Remover esta imagem do carousel?")) {
                          await removeCarouselImage(item.position);
                          onImageUpdated?.();
                        }
                      }}
                      className="bg-red-600/80 text-white px-2 py-1 rounded text-xs"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Botão Anterior */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-md z-10"
          >
            ◀
          </button>

          {/* Botão Próximo */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-md z-10"
          >
            ▶
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === i ? "bg-red-600" : "bg-red-300"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {editingPosition !== null && (
        <MediaManagerModal
          open
          mediaType="image"
          onClose={() => setEditingPosition(null)}
          onSelect={async (img) => {
            if (editingPosition === -1) {
              await addCarouselImage(img.id);
            } else {
              await updateCarouselImage(editingPosition, img.id);
            }

            setEditingPosition(null);
            onImageUpdated?.();
          }}
        />
      )}
    </div>
  );
}
