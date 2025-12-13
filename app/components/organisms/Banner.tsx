import { useAuth } from "@/app/contexts/AuthContext";
import { useSelectedImages } from "@/app/services/mediaService";
import { useEffect, useState } from "react";
import MediaManagerModal from "../atoms/MediaManagerModal";
import { getBannerImageId, updateBannerImage } from "@/app/services/bannerService";

export default function Banner() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [bannerImageId, setBannerImageId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const id = await getBannerImageId();
      setBannerImageId(id);
    }

    load()
  }, [])

  const images = useSelectedImages(bannerImageId ? [bannerImageId] : []);
  const bannerImage = images[0]?.src;
  const fallbackImage = "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765553829/imagens/dxthecct9anqqkdyjzkk.png";


  return (
    <>
    <div
      className="w-full h-[350px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: bannerImage ? `url('${bannerImage}')` : fallbackImage }}
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

        {open && (
        <MediaManagerModal
          open={open}
          onClose={() => setOpen(false)}
          mediaType="image"
          onSelect={async (img) => {
            await updateBannerImage(img.id);
            setBannerImageId(img.id);
            setOpen(false);
          }}
        />
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
    
    </>
  );
}
