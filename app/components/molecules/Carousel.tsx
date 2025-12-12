"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CarouselProps = {
  images: {
    src: string;
    alt: string;
  }[];
  interval?: number;
};

export default function Carousel({ images, interval = 8000 }: CarouselProps) {
  const [index, setIndex] = useState(0);

  // AUTOPLAY
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

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
    <div className="relative w-full overflow-hidden rounded-xl">
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
      </div>
    </div>
  );
}
