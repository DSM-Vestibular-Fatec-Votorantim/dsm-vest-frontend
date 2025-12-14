"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "../molecules/ProjectCard";
import { useAllProjects, createProject, updateProject, deleteProject, Projeto } from "@/app/services/projectsService";
import { useAuth } from "@/app/contexts/AuthContext";
import ProjectEditorModal from "../atoms/ProjectEditorModal";

export default function ProjectsGrid() {
  const { projects: initialProjects, loading } = useAllProjects();
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<any | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  // Atualiza lista quando inicialProjects muda
  // useState(() => initialValue);

  const reloadProjects = async () => {
    const data = await fetch(process.env.NEXT_PUBLIC_API_BASEURL + "/projetos");
    const json = await data.json();
    setProjects(json);
  };

  return (
    <section id="Projetos" className="w-full md:max-w-6xl py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-cyan-700 mb-5">
            Projetos e postagens
          </h2>
          {isAuthenticated && (
            <button
              onClick={() => setEditing({} as Projeto)}
              className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-[#A63524]"
            >
              Adicionar projeto
            </button>
          )}
        </div>

        <h3 className="text-2xl font-normal mb-4">
          Nossos alunos são ativos na comunidade e regularmente desenvolvem projetos com parcerias, confira:
        </h3>

        {loading && <p>Carregando...</p>}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((proj) => (
              <div key={proj.IdProjeto} className="relative">
                {isAuthenticated && (
                  <div className="absolute right-0 top-0 flex gap-1 z-10">
                    <button
                      onClick={() => setEditing(proj)}
                      className="text-xs bg-black text-white px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Excluir projeto?")) {
                          await deleteProject(proj.IdProjeto);
                          reloadProjects();
                        }
                      }}
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                )}
                <ProjectCard data={{
                  type: 'image',
                  turma: proj.Tipo,
                  link: proj.LinkProj,
                  thumbnail: proj.ImagemURL
                }} />
              </div>
            ))}
          </div>
        )}

        {editing && (
        <ProjectEditorModal
          open
          initialData={editing.IdProjeto ? editing : undefined}
          onClose={() => setEditing(null)}
          onSubmit={async ({ Tipo, LinkProj, file }) => {
            const formData = new FormData();
            formData.append("Tipo", Tipo);
            formData.append("LinkProj", LinkProj);
            if (file) formData.append("file", file);

            if (editing.IdProjeto) {
              await updateProject(editing.IdProjeto, formData);
            } else {
              await createProject(formData);
            }

            setEditing(null);
            reloadProjects();
          }}
        />
      )}
      </div>
    </section>
    
  );
}
