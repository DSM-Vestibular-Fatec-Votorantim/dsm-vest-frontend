import Carousel from "../molecules/Carousel";

export default function ReceptionSection() {
  const images = [
    {
      src: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765553779/imagens/jqzslmzsk9hcvlsh81gg.png",
      alt: "Banner 1",
    },
    {
      src: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765553806/imagens/hqne5kd5ckbnm3imcr7q.png",
      alt: "Banner 2",
    },
    {
      src: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765553850/imagens/pzd526sxrjv6tytxyngl.png",
      alt: "Banner 3",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <Carousel images={images} />
    </section>
  );
}
