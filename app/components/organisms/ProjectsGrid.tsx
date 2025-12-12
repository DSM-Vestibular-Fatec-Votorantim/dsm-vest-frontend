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
    <div className="max-w-6xl w-full px-4 my-5">
      <h2 className="text-3xl font-semibold text-gray-900 mb-5">
        Projetos e postagens
      </h2>
      <h3 className="text-2xl font-normal mb-4">Nossos alunos são ativos na comunidade e regularmente desenvolvem projetos com parcerias, confira a seguir:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard data={proj} />
            </div>
          ))}
        </div>
    </div>
    
  );
}
