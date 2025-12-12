"use client";

import { useEffect, useState } from "react";
import { getDuvidas, Duvida } from "../../services/FAQService";

export default function FAQSection() {
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [secaoSelecionada, setSecaoSelecionada] = useState("Todas");

  useEffect(() => {
    getDuvidas().then(setDuvidas);
  }, []);

  const secoes = ["Todas", "Geral", "Isenção e Redução", "Inscrição", "Prova", "Classificação"];

  const filtradas = secaoSelecionada === "Todas"
    ? duvidas
    : duvidas.filter((d) => d.Secao === secaoSelecionada);

  return (
    <section className="w-full bg-white py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-5xl p-6 rounded shadow flex">
        
        {/* LADO ESQUERDO */}
        <div className="w-1/3 border-r border-gray-300 pr-4">
          <h3 className="bg-[#c4161c] text-white font-semibold px-4 py-2 rounded">
            Dúvidas Frequentes
          </h3>

          <ul className="mt-4 text-sm">
            {secoes.map((item) => (
              <li
                key={item}
                onClick={() => setSecaoSelecionada(item)}
                className={`py-2 px-2 cursor-pointer ${
                  secaoSelecionada === item
                    ? "bg-[#c4161c] text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* LADO DIREITO */}
        <div className="w-2/3 pl-6">
          <h3 className="text-gray-800 font-semibold mb-4 text-lg">
            {secaoSelecionada.toUpperCase()}
          </h3>

          <div className="space-y-3">
            {filtradas.map((item) => (
              <details key={item.IdDuvidas} className="bg-white p-3 rounded shadow cursor-pointer">
                <summary className="font-semibold text-red-700">
                  {item.Titulo}
                </summary>
                <p className="mt-2 text-sm text-gray-700">{item.Descricao}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
