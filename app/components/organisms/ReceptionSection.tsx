import { useSelectedImages } from "@/app/services/mediaService";
import Carousel from "../molecules/Carousel";

export default function ReceptionSection() {

  const images = useSelectedImages([10, 11, 13]);

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <Carousel images={images} />
    </section>
  );
}
