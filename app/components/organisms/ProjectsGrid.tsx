import ProjectCard from "../molecules/ProjectCard";

function generateThumbnailFromVideoUrl(videoUrl: string): string {
  if (!videoUrl.includes("/video/upload/")) {
    console.warn("URL inválida ou não é um vídeo Cloudinary");
    return "";
  }

  const [base, rest] = videoUrl.split("/video/upload/");

  return `${base}/video/upload/c_fill,ar_16:9,q_auto,f_auto/${rest.replace(
    /\.(mp4|mov|webm|mkv)$/i,
    ".jpg"
  )}`;
}

type Project = {
  type: "image" | "video";
  turma: string;
  link: string;
  thumbnail: string;
  media?: string;  // quando for imagem
  video?: string;  // quando for vídeo
};

const projects: Project[] = [
  {
    type: "image",
    media: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765497787/imagens/jmsk5wevhiiwfquw6lge.jpg",
    thumbnail: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765497787/imagens/jmsk5wevhiiwfquw6lge.jpg",
    turma: "Controle de Obras",
    link: "#",
  },
  {
    type: "video",
    video: "https://res.cloudinary.com/dbygxcrbp/video/upload/v1765490553/videos/fnhbc4ffs2fnad9fndog.mp4",
    thumbnail: generateThumbnailFromVideoUrl("https://res.cloudinary.com/dbygxcrbp/video/upload/v1765490553/videos/fnhbc4ffs2fnad9fndog.mp4"),
    turma: "DSM",
    link: "#",
  },
  {
    type: "image",
    media: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765497787/imagens/jmsk5wevhiiwfquw6lge.jpg",
    thumbnail: "https://res.cloudinary.com/dbygxcrbp/image/upload/v1765497787/imagens/jmsk5wevhiiwfquw6lge.jpg",
    turma: "DSM",
    link: "https://front-end-wine-nu.vercel.app",
  },
  {
    type: "video",
    video: "https://res.cloudinary.com/dbygxcrbp/video/upload/v1765490553/videos/fnhbc4ffs2fnad9fndog.mp4",
    thumbnail: generateThumbnailFromVideoUrl("https://res.cloudinary.com/dbygxcrbp/video/upload/v1765490553/videos/fnhbc4ffs2fnad9fndog.mp4"),
    turma: "Controle de Obras",
    link: "#",
  }
];

export default function ProjectsGrid() {
  return (
    <div className="max-w-6xl w-full px-4 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Projetos das Turmas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {projects.map((proj, i) => (
        <ProjectCard key={i} data={proj} />
      ))}
    </div>
    </div>
    
  );
}
