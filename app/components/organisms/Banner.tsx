import { useAuth } from "@/app/contexts/AuthContext";
import { useSelectedImages } from "@/app/services/mediaService";
import ImageManagerModal from "../atoms/ImageManagerModal";
import { useState } from "react";

export default function Banner() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const images = useSelectedImages([12]);
  const bannerImage = images[0]?.src;

  return (
    <>
    <div
      className="w-full h-[350px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url('${bannerImage}')` }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>

      {isAuthenticated && (
          <button
            onClick={() => setOpen(true)}
            className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded"
          >
            Editar imagem
          </button>
        )}

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
    {open && (
        <ImageManagerModal
          onClose={() => setOpen(false)}
          onSelect={(imageId) => {
            console.log("Imagem selecionada:", imageId);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
