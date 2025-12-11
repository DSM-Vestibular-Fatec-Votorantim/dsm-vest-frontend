import React from "react";

const CalendarSection = () => {
  return (
    <section className="w-full bg-[#c4161c] py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-4xl p-6 rounded shadow">
        <h2 className="text-white font-semibold text-xl bg-[#c4161c] px-4 py-2 rounded">
          Calendário
        </h2>

        <p className="mt-4 text-sm text-gray-700">
          Encontre aqui a programação para o processo seletivo do vestibular
        </p>

        <div className="mt-6 border-2 border-[#c4161c] rounded p-4 space-y-4 text-sm">
          <p>📅 De XX/XX até XX/XX/XXXX — Seleção de bolsistas</p>
          <p>📅 De XX/XX até XX/XX/XXXX — Resultado da 1ª fase</p>
          <p>📅 De XX/XX até XX/XX/XXXX — Divulgação dos locais de exame</p>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
