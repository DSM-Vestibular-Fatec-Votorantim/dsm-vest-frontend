import React, { useRef, useState } from "react";
import CardAluno from "../molecules/CardAluno";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAllCards } from "@/app/services/studentsService";

const StudentsSection = () => {
  const { cards, loading } = useAllCards();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newPosition = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="Relatos" className="w-full md:max-w-6xl py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-cyan-700 text-2xl md:text-4xl">Relatos de nossos alunos</h1>

        <div className="relative mt-6">
            <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#A63524] hover:text-white border-2 border-[#A63524] group"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

            <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
          >
            {loading && (
              <p className="text-center w-full text-gray-500">Carregando...</p>
            )}

            {!loading &&
              cards.map((relato) => (
                <CardAluno
                  key={relato.IdComentario}
                  name={relato.Nome}
                  description={relato.Descricao}
                  imageUrl={relato.ImagemURL}
                />
              ))}
          </div>

            <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#A63524] hover:text-white border-2 border-[#A63524] group"
            aria-label="Rolar para direita"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicador de Scroll */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(Math.ceil(cards.length / 4))].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#A63524] transition-colors duration-300 cursor-pointer"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
  
}

export default StudentsSection;