import React from "react";

const FAQSection = () => {
  return (
    <section id="Duvidas" className="w-full bg-white py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-5xl p-6 rounded shadow flex">
        
        {/* Lado esquerdo - categorias */}
        <div className="w-1/3 border-r border-gray-300 pr-4">
          <h3 className="bg-[#c4161c] text-white font-semibold px-4 py-2 rounded">
            Dúvidas Frequentes
          </h3>

          <ul className="mt-4 text-sm">
            <li className="py-2 px-2 bg-[#c4161c] text-white">Todas</li>
            <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer">Geral</li>
            <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer">Isenção e Redução</li>
            <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer">Inscrição</li>
            <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer">Prova</li>
            <li className="py-2 px-2 hover:bg-gray-200 cursor-pointer">Classificação</li>
          </ul>
        </div>

        {/* Lado direito com perguntas */}
        <div className="w-2/3 pl-6">
          <h3 className="text-gray-800 font-semibold mb-4 text-lg">GERAL</h3>

          <div className="space-y-3">
            <details className="bg-white p-3 rounded shadow cursor-pointer">
              <summary className="font-semibold text-red-700">
                O que é o vestibular?
              </summary>
              <p className="mt-2 text-sm text-gray-700">
                O vestibular é um processo seletivo...
              </p>
            </details>

            <details className="bg-white p-3 rounded shadow cursor-pointer">
              <summary className="font-semibold text-red-700">Pergunta 2</summary>
              <p className="mt-2 text-sm text-gray-700">
                Resposta da pergunta 2.
              </p>
            </details>

            <details className="bg-white p-3 rounded shadow cursor-pointer">
              <summary className="font-semibold text-red-700">Pergunta 3</summary>
              <p className="mt-2 text-sm text-gray-700">
                Resposta da pergunta 3.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
