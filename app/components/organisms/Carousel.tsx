import Image from "next/image";
import { useState } from "react";

const slides = [
  "/img/carousel1.jpg",
  "/img/carousel2.jpg",
  "/img/carousel3.jpg",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {slides.map((src, i) => (
        <Image 
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      {/* Setas */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
