"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import Carousel from "../molecules/Carousel";
import { usePartnerComments } from "@/app/services/commentsService";
import { useSelectedImages } from "@/app/services/mediaService";
import { getCarouselImageIds } from "@/app/services/carouselService";


type RawCarouselItem = {
  Posicao: number;
  IdImagem: number;
};

export default function ReceptionSection() {
  const { comments, loading: loadingComments } = usePartnerComments();
  const [rawItems, setRawItems] = useState<RawCarouselItem[]>([]);

  useEffect(() => {
    loadCarousel();
  }, []);

  async function loadCarousel() {
    const data = await getCarouselImageIds();
    setRawItems(data);
  }

  const images = useSelectedImages(rawItems.map(i => i.IdImagem));

  const carouselItems = images.map((img, idx) => ({
    ...img,
    position: rawItems[idx]?.Posicao,
  }));

  if (loadingComments) return null;

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        items={carouselItems}
        onImageUpdated={loadCarousel}
      />

      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        {/* Instagram Feed */}
        <div className="w-full">
          <h3 className="text-cyan-700 text-2xl font-bold mb-4">
            Instagram
          </h3>

          <div
            className="elfsight-app-2f01e036-eb46-4c1f-b325-240cd63a745d"
            data-elfsight-app-lazy
          />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-cyan-700 text-2xl font-bold">
            O que dizem sobre nós
          </h3>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#FF8C42]"
            >
              <div className="flex items-start gap-3 mb-2">
                <Image
                  src={comment.image}
                  alt={comment.name}
                  width={64}
                  height={64}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="font-bold text-sm">{comment.name}</p>
              </div>
              <p className="text-xs italic text-gray-700">
                &quot;{comment.comment}&quot;
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
