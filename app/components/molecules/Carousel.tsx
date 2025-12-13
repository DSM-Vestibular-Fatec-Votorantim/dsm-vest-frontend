"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";
import MediaManagerModal from "../atoms/MediaManagerModal";
import { addCarouselImage, updateCarouselImage } from "@/app/services/carouselService";


type CarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
  onImageUpdated?: () => void;
  interval?: number;
};

export default function Carousel({ images, interval = 8000, onImageUpdated }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const { isAuthenticated } = useAuth();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);


  // AUTOPLAY
  useEffect(() => {
    if (images.length === 0 || editingIndex !== null) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, editingIndex]);
  

  const prev = () => {
    setIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const next = () => {
    setIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      {images.length === 0 && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
          Nenhuma imagem no carousel, adicione no botão "Editar Carousel"
        </div>
      )}

      {isAuthenticated && (
        <button
          onClick={() => setEditingIndex(-1)}
          className="absolute top-3 right-3 z-20 bg-black/70 text-white px-3 py-1 rounded text-sm"
        >
          Editar carousel
        </button>
      )}
      

      {images.length > 0 && (
        <>
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="min-w-full relative aspect-video">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
                {isAuthenticated && (
                  <button
                    onClick={() => setEditingIndex(i)}
                    className="absolute top-3 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs"
                  >
                    Editar Imagem Atual
                  </button>
                )}
              </div>
              
            ))}
          </div>

          {/* Botão Anterior */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-md"
          >
            ◀
          </button>

          {/* Botão Próximo */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-md"
          >
            ▶
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === i ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
            {feedback && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded text-sm z-30">
                {feedback}
              </div>
            )}
          </div>
        </>
      )}
      
      {editingIndex !== null && (
        <MediaManagerModal
          open
          mediaType="image"
          onClose={() => setEditingIndex(null)}
          onSelect={async (img) => {
            try {
              if (editingIndex === -1) {
                await addCarouselImage(img.id);
                setFeedback("Imagem adicionada ao carousel");
              } else {
                await updateCarouselImage(editingIndex + 1, img.id);
                setFeedback("Imagem do carousel atualizada");
              }

              setEditingIndex(null);
              onImageUpdated?.();

              setTimeout(() => setFeedback(null), 2500);
            } catch (err) {
              setFeedback("Erro ao salvar imagem no carousel");
              console.error(err);
            }
          }}
        />
      )}
    </div>
  );
}
