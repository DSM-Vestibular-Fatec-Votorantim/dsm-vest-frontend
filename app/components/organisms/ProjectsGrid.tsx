import ProjectCard from "../molecules/ProjectCard";
import { useAllProjects } from "@/app/services/projectsService";

export default function ProjectsGrid() {
  const { projects, loading } = useAllProjects();

  return (
    <div className="max-w-6xl w-full px-4 my-5">
      <h2 className="text-3xl font-semibold text-gray-900 mb-5">
        Projetos e postagens
      </h2>

      <h3 className="text-2xl font-normal mb-4">
        Nossos alunos são ativos na comunidade e regularmente desenvolvem projetos com parcerias, confira:
      </h3>

      {loading && <p>Carregando...</p>}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard data={proj} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}