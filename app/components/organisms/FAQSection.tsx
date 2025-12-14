"use client";

import { useEffect, useState } from "react";
import { 
  getDuvidas,
  createDuvida,
  updateDuvida,
  deleteDuvida,
  Duvida
} from "../../services/FAQService";
import { useAuth } from "../../contexts/AuthContext";
import { faqValidationSchema } from "../../validators/FAQValidation";

export default function FAQSection() {
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [secaoSelecionada, setSecaoSelecionada] = useState("Todas");

  const { isAuthenticated, user } = useAuth();

  const [editModal, setEditModal] = useState<Duvida | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [deleting, setDeleting] = useState<Duvida | null>(null);

  const [editTitulo, setEditTitulo] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editSecao, setEditSecao] = useState("");

  const [newTitulo, setNewTitulo] = useState("");
  const [newDescricao, setNewDescricao] = useState("");
  const [newSecao, setNewSecao] = useState("Geral");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchDuvidas();
  }, []);

  useEffect(() => {
    const modalAberto = createModal || editModal || deleting;
    document.body.style.overflow = modalAberto ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [createModal, editModal, deleting]);

  async function fetchDuvidas() {
    const data = await getDuvidas();
    setDuvidas(data);
  }

  function openEditModal(d: Duvida) {
    setEditModal(d);
    setEditTitulo(d.Titulo);
    setEditDescricao(d.Descricao);
    setEditSecao(d.Secao);
    setErrors({});
  }

  async function handleEditSave() {
    if (!editModal || !user) return;

    try {
      // Validação
      await faqValidationSchema.validate(
        { Titulo: editTitulo, Descricao: editDescricao, Secao: editSecao },
        { abortEarly: false }
      );
      setErrors({});

      await updateDuvida(editModal.IdDuvidas, {
        Titulo: editTitulo,
        Descricao: editDescricao,
        Secao: editSecao,
        IdUsuario: user.Id
      });

      setEditModal(null);
      fetchDuvidas();
    } catch (err: any) {
      if (err.inner) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        console.error(err);
      }
    }
  }

  async function handleCreate() {
    if (!user) return;

    try {
      // Validação
      await faqValidationSchema.validate(
        { Titulo: newTitulo, Descricao: newDescricao, Secao: newSecao },
        { abortEarly: false }
      );
      setErrors({});

      await createDuvida({
        Titulo: newTitulo,
        Descricao: newDescricao,
        Secao: newSecao,
        IdUsuario: user.Id
      });

      setCreateModal(false);
      setNewTitulo("");
      setNewDescricao("");
      setNewSecao("Geral");

      fetchDuvidas();
    } catch (err: any) {
      if (err.inner) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        console.error(err);
      }
    }
  }

  async function handleDeleteConfirm() {
    if (!deleting) return;
    await deleteDuvida(deleting.IdDuvidas);
    setDeleting(null);
    fetchDuvidas();
  }

  const secoes = ["Todas", "Geral", "Isenção e Redução", "Inscrição", "Prova", "Classificação"];
  const filtradas = secaoSelecionada === "Todas"
    ? duvidas
    : duvidas.filter((d) => d.Secao === secaoSelecionada);

  return (
    <section id="Duvidas" className="w-full bg-white py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-5xl p-6 rounded shadow flex">
        
        {/* LADO ESQUERDO */}
        <div className="w-1/3 border-r border-gray-300 pr-4">
          <h3 className="bg-[#c4161c] text-white font-semibold px-4 py-2 rounded">
            Dúvidas Frequentes
          </h3>

          <ul className="mt-4 text-sm">
            {secoes.map((item) => (
              <li
                key={item}
                onClick={() => setSecaoSelecionada(item)}
                className={`py-2 px-2 cursor-pointer ${
                  secaoSelecionada === item ? "bg-[#c4161c] text-white" : "hover:bg-gray-200"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>

          {isAuthenticated && (
            <button
              onClick={() => setCreateModal(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Adicionar Pergunta
            </button>
          )}
        </div>

        {/* LADO DIREITO */}
        <div className="w-2/3 pl-6 max-h-[55vh] overflow-y-auto">
          <h3 className="text-gray-800 font-semibold mb-4 text-lg">
            {secaoSelecionada.toUpperCase()}
          </h3>

          <div className="space-y-3">
            {filtradas.map((item) => (
              <details
                key={item.IdDuvidas}
                className="bg-white p-3 rounded shadow relative"
              >
                <summary className="font-semibold text-red-700 cursor-pointer">
                  {item.Titulo}
                </summary>

                <p className="mt-2 text-sm text-gray-700">{item.Descricao}</p>

                {isAuthenticated && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => setDeleting(item)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>

        {/* MODAL DE CRIAÇÃO */}
        {createModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <div className="bg-white p-6 rounded shadow w-[400px]">
              <h2 className="font-bold text-lg mb-4 text-red-700">Adicionar Pergunta</h2>

              <label className="block text-sm font-semibold">Título</label>
              <input
                className="w-full p-2 border rounded mb-2"
                value={newTitulo}
                onChange={(e) => setNewTitulo(e.target.value)}
              />
              {errors.Titulo && <p className="text-red-600 text-sm">{errors.Titulo}</p>}

              <label className="block text-sm font-semibold">Descrição</label>
              <textarea
                className="w-full p-2 border rounded mb-2"
                rows={4}
                value={newDescricao}
                onChange={(e) => setNewDescricao(e.target.value)}
              />
              {errors.Descricao && <p className="text-red-600 text-sm">{errors.Descricao}</p>}

              <label className="block text-sm font-semibold">Seção</label>
              <select
                className="w-full p-2 border rounded mb-4"
                value={newSecao}
                onChange={(e) => setNewSecao(e.target.value)}
              >
                <option>Geral</option>
                <option>Isenção e Redução</option>
                <option>Inscrição</option>
                <option>Prova</option>
                <option>Classificação</option>
              </select>
              {errors.Secao && <p className="text-red-600 text-sm">{errors.Secao}</p>}

              <div className="flex justify-end gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => setCreateModal(false)}>
                  Cancelar
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleCreate}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE EDIÇÃO */}
        {editModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <div className="bg-white p-6 rounded shadow w-[400px]">
              <h2 className="font-bold text-lg mb-4 text-red-700">Editar Dúvida</h2>

              <label className="block text-sm font-semibold">Título</label>
              <input
                className="w-full p-2 border rounded mb-2"
                value={editTitulo}
                onChange={(e) => setEditTitulo(e.target.value)}
              />
              {errors.Titulo && <p className="text-red-600 text-sm">{errors.Titulo}</p>}

              <label className="block text-sm font-semibold">Descrição</label>
              <textarea
                className="w-full p-2 border rounded mb-2"
                rows={4}
                value={editDescricao}
                onChange={(e) => setEditDescricao(e.target.value)}
              />
              {errors.Descricao && <p className="text-red-600 text-sm">{errors.Descricao}</p>}

              <label className="block text-sm font-semibold">Seção</label>
              <select
                className="w-full p-2 border rounded mb-4"
                value={editSecao}
                onChange={(e) => setEditSecao(e.target.value)}
              >
                <option>Geral</option>
                <option>Isenção e Redução</option>
                <option>Inscrição</option>
                <option>Prova</option>
                <option>Classificação</option>
              </select>
              {errors.Secao && <p className="text-red-600 text-sm">{errors.Secao}</p>}

              <div className="flex justify-end gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => setEditModal(null)}>
                  Cancelar
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleEditSave}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DE EXCLUSÃO */}
        {deleting && (
          <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow text-center w-[350px]">
              <h2 className="font-bold text-lg mb-4 text-red-700">Confirmar Exclusão</h2>
              <p className="mb-6">
                Tem certeza que deseja excluir <strong>{deleting.Titulo}</strong>?
              </p>
              <div className="flex justify-center gap-3">
                <button className="px-4 py-1 bg-gray-400 rounded text-white" onClick={() => setDeleting(null)}>
                  Cancelar
                </button>
                <button className="px-4 py-1 bg-red-600 rounded text-white" onClick={handleDeleteConfirm}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
