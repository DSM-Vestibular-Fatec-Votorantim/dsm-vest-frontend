"use client";

import { useEffect, useState } from "react";
import {
  getCalendar,
  CalendarItem,
  formatDate,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/calendarService";
import { useAuth } from "@/app/contexts/AuthContext";
import { calendarValidationSchema } from "../../validators/calendarValidation";

export default function CalendarSection() {
  const [calendar, setCalendar] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isAuthenticated } = useAuth();

  // modais / form state
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CalendarItem | null>(null);

  const [form, setForm] = useState({
    DataInicio: "",
    DataFim: "",
    Descricao: "",
  });

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const modalAberto = openCreateModal || openEditModal;
    document.body.style.overflow = modalAberto ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCreateModal, openEditModal]);

  async function load() {
    setLoading(true);
    try {
      const data = await getCalendar();
      setCalendar(data);
    } catch (err) {
      console.error("Erro ao carregar calendário:", err);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm({ DataInicio: "", DataFim: "", Descricao: "" });
    setEditingItem(null);
    setErrors({});
    setOpenCreateModal(true);
  }

  function openEdit(item: CalendarItem) {
  setEditingItem(item);
  // Use split para pegar apenas a parte da data
  const start = item.DataInicio.split('T')[0];
  const end = item.DataFim.split('T')[0];
  setForm({ DataInicio: start, DataFim: end, Descricao: item.Descricao });
  setErrors({});
  setOpenEditModal(true);
}
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await calendarValidationSchema.validate(form, { abortEarly: false });
      setErrors({});
      await createEvent(form);
      setOpenCreateModal(false);
      await load();
    } catch (err: any) {
      if (err.inner) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        console.error("Erro ao criar evento:", err);
        alert("Erro ao criar evento");
      }
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingItem) return;

    try {
      await calendarValidationSchema.validate(form, { abortEarly: false });
      setErrors({});
      await updateEvent(editingItem.IdCalendario, form);
      setOpenEditModal(false);
      setEditingItem(null);
      await load();
    } catch (err: any) {
      if (err.inner) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        console.error("Erro ao atualizar evento:", err);
        alert("Erro ao atualizar evento");
      }
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este evento?")) return;
    try {
      await deleteEvent(id);
      await load();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro ao excluir evento");
    }
  }

  return (
    <section id="Calendario" className="w-full bg-[#c4161c] py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-4xl p-6 rounded shadow relative">
        {isAuthenticated && (
          <div className="flex justify-end mb-4">
            <button
              onClick={openCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Adicionar Evento
            </button>
          </div>
        )}

        <h2 className="text-white font-semibold text-xl bg-[#c4161c] px-4 py-2 rounded">
          Calendário
        </h2>

        <p className="mt-4 text-sm text-gray-700">
          Encontre aqui a programação para o processo seletivo do vestibular
        </p>

        <div className="mt-6 border-2 border-[#c4161c] rounded p-4 space-y-4 text-sm">
          {loading ? (
            <p>Carregando...</p>
          ) : calendar.length === 0 ? (
            <p>Nenhum evento cadastrado</p>
          ) : (
            calendar.map((item) => (
              <div key={item.IdCalendario} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    {item.DataInicio === item.DataFim
                      ? <>📅 Em {formatDate(item.DataInicio)}</>
                      : <>📅 De {formatDate(item.DataInicio)} até {formatDate(item.DataFim)}</>
                    }
                  </p>
                  <p className="font-semibold">{item.Descricao}</p>
                </div>

                {isAuthenticated && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.IdCalendario)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {(openCreateModal || openEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-700">
              {openCreateModal ? "Adicionar Evento" : "Editar Evento"}
            </h3>

            <form onSubmit={openCreateModal ? handleCreate : handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm">Data Início</label>
                <input
                  type="date"
                  value={form.DataInicio}
                  onChange={(e) => setForm({ ...form, DataInicio: e.target.value })}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
                {errors.DataInicio && <p className="text-red-600 text-sm">{errors.DataInicio}</p>}
              </div>

              <div>
                <label className="block text-sm">Data Fim</label>
                <input
                  type="date"
                  value={form.DataFim}
                  onChange={(e) => setForm({ ...form, DataFim: e.target.value })}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
                {errors.DataFim && <p className="text-red-600 text-sm">{errors.DataFim}</p>}
              </div>

              <div>
                <label className="block text-sm">Descrição</label>
                <input
                  type="text"
                  value={form.Descricao}
                  onChange={(e) => setForm({ ...form, Descricao: e.target.value })}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
                {errors.Descricao && <p className="text-red-600 text-sm">{errors.Descricao}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenCreateModal(false);
                    setOpenEditModal(false);
                    setEditingItem(null);
                  }}
                  className="px-3 py-1 border rounded"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
                  {openCreateModal ? "Criar" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
