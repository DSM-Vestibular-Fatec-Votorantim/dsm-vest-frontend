import { useEffect, useState } from "react";

export interface Projeto {
  IdProjeto: number;
  Tipo: string;      // turma do projeto
  LinkProj: string;  // link externo
  ImagemURL: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASEURL + "/projetos";

export async function getProjetos(): Promise<Projeto[]> {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    console.error("Erro ao buscar projetos cadastrados");
    return [];
  }

  return res.json();
}

export function useAllProjects() {
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjetos().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
}

export async function createProject(formData: FormData) {
  const res = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMsg = errorData.error || "Erro ao criar projeto";
    throw new Error(errorMsg);
  }
}

export async function updateProject(id: number, formData: FormData) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMsg = errorData.error || "Erro ao criar projeto";
    throw new Error(errorMsg);
  }
}

export async function deleteProject(id: number) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro ao excluir projeto");
  }
}
