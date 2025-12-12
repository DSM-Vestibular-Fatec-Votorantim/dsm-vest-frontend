export default function Banner() {
  return (
    <div
      className="w-full h-[350px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/banner-img.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Vestibular Fatec – Inscrições Abertas
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto">
          Inicie sua jornada profissional estudando em uma das melhores
          faculdades públicas do estado.
        </p>

        <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold">
          Saiba mais
        </button>
      </div>
    </div>
  );
}
