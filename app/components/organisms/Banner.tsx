import { useSelectedImages } from "@/app/services/mediaService";

export default function Banner() {
  const selectedImageBanner = useSelectedImages([12]);

  const bannerImage = selectedImageBanner[0]?.src;

  return (
    <div
      className="w-full h-[350px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url('${bannerImage || 
          "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765553829/imagens/dxthecct9anqqkdyjzkk.png"
        }')` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Vestibular Fatec Votorantim – Inscrições Abertas
        </h1>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold"
            href="https://fatecvotorantim.cps.sp.gov.br/" target="_blank"
          >
            Saiba mais
          </a>
          
          <a
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-semibold"
            href="https://vestibular.fatec.sp.gov.br/home/" target="_blank"
          >
            Processo Seletivo
          </a>
        </div>

      </div>
    </div>
  );
}
