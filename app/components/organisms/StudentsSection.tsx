import React, { useEffect, useRef, useState } from "react";
import CardAluno from "../molecules/CardAluno";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAllCards, createStudentCard, updateStudentCard, deleteStudentCard } from "@/app/services/studentsService";
import { useAuth } from "@/app/contexts/AuthContext";
import StudentEditorModal from "../atoms/StudentEditorModal";

const StudentsSection = () => {
  const { cards:initialCards, loading } = useAllCards();
  const [cards, setCards] = useState(initialCards);
  const [editing, setEditing] = useState<any | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

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

  const reloadCards = async () => {
    const data = await fetch(process.env.NEXT_PUBLIC_API_BASEURL + '/comentariosIni');
    const json = await data.json();
    setCards(json);
  };

  return (
    <section id="Relatos" className="w-full md:max-w-6xl py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-cyan-700 text-2xl md:text-4xl">Relatos de nossos alunos</h1>
          {isAuthenticated && (
            <button
              onClick={() => setEditing({})}
              className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-[#A63524]"
            >
              Adicionar relato
            </button>
          )}
        </div>

        <div className="relative mt-6">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#A63524] hover:text-white border-2 border-[#A63524] group"
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
              <div key={relato.IdComentario} className="relative">
                {isAuthenticated && (
                  <div className="absolute right-0 top-0 flex gap-1 z-10">
                    <button
                      onClick={() => setEditing(relato)}
                      className="text-xs bg-black text-white px-2 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Excluir relato?")) {
                            await deleteStudentCard(relato.IdComentario);
                            reloadCards();
                          }
                        }}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Excluir
                      </button>
                    </div>
                )}

                  <CardAluno
                    name={relato.Nome}
                    description={relato.Descricao}
                    imageUrl={relato.ImagemURL}
                    tipo={relato.Tipo}
                  />
                </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#A63524] hover:text-white border-2 border-[#A63524] group"
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

      {editing && (
        <StudentEditorModal
          open
          initialData={editing.IdComentario ? editing : undefined}
          onClose={() => setEditing(null)}
          onSubmit={async ({ Nome, Descricao, Tipo, file }) => {
            const formData = new FormData();
            formData.append("Nome", Nome);
            formData.append("Descricao", Descricao);
            formData.append("Tipo", Tipo);
            if (file) formData.append("file", file);

            if (editing.IdComentario) {
              await updateStudentCard(editing.IdComentario, formData);
            } else {
              await createStudentCard(formData);
            }

            setEditing(null);
            reloadCards();
          }}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
  
}

export default StudentsSection;