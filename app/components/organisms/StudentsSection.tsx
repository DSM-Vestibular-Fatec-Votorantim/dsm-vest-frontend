import React, { useRef, useState } from "react";
import CardAluno from "../molecules/CardAluno";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Relato = {
  idComentario: number;
  name: string;
  description: string;
  imageUrl: string;
};

const relatos: Relato[] = [
    {
        idComentario: 1,
        description: "A Fatec Votorantim é um lugar com muito espaço e disponibilidade de todas as ferramentas necessárias ao aluno, possui ótima didática!",
        name: "Gabriela Silva",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 2,
        description: "Professores super capacitados, formados e com experiência na área, recomendo demais!",
        name: "Tobias Santos",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 3,
        description: "Não dei valor enquanto estudava, mas quando prossegui no mercado de trabalho, percebi o quanto a faculdade me ajudou.",
        name: "Fernanda Ribeiro",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 4,
        description: "Sempre recomendo a familiares e amigos que optem pelo estudo em Fatecs e Etecs, aqui não é diferente!",
        name: "Nicole Almeida",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 5,
        description: "Professores empáticos que apresentam problemas e soluções úteis ao aluno e futuro profissional formado, agradeço por tudo o que estudei aqui.",
        name: "Francisco Caetano",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 6,
        description: "Realizei projetos muito interessantes que foram aprovados para representação de uma empresa pelo INOVA, recomendo!!!",
        name: "Matheus Matos",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 7,
        description: "Observei uma evolução constante desde que o prédio foi inaugurado, e é impressionante a diferença entre a instituição de agora e a que observei no início, meus parabéns!",
        name: "Antônio Nunes",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    },
    {
        idComentario: 8,
        description: "Entrei aqui a partir de um programa de incentivo diretamente do ensino médio, pela Etec, não me arrependo!",
        name: "Maria Rodrigues",
        imageUrl: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765494081/imagens/a6wsgerzwjrcwksohhuf.png"
    }
]

const StudentsSection = () => {
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
    <section className="w-full md:max-w-6xl py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-4xl">Relatos de nossos alunos</h1>

        <div className="relative">
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
                style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
                }}
            >
                {relatos.map((itemrelato) => (
                <CardAluno key={itemrelato.idComentario} name={itemrelato.name} description={itemrelato.description} imageUrl={itemrelato.imageUrl} />
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
          {[...Array(Math.ceil(relatos.length / 4))].map((_, index) => (
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