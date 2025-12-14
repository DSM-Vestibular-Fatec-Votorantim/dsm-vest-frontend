"use client";

import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  getFaleConosco,
  updateFaleConosco,
  FaleConosco,
} from "../../services/talkToUsService";
import { useAuth } from "@/app/contexts/AuthContext";
import { contactValidationSchema } from "../../validators/contactValidation";

export default function ContactSection() {
  const [dados, setDados] = useState<FaleConosco[]>([]);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  const [openEditModal, setOpenEditModal] = useState(false);

  const [form, setForm] = useState({
    Tel: "",
    Email: "",
    LinkFace: "",
    LinkInsta: "",
    LinkLinkedin: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    document.body.style.overflow = openEditModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEditModal]);

  async function load() {
    setLoading(true);
    try {
      const data = await getFaleConosco();
      setDados(data);

      if (data.length > 0) {
        const info = data[0];
        setForm({
          Tel: info.Tel,
          Email: info.Email,
          LinkFace: info.LinkFace,
          LinkInsta: info.LinkInsta,
          LinkLinkedin: info.LinkLinkedin,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const info = dados[0];
    if (!info) return;

    // "Trata" o telefone: remove espaços antes/depois
    const telTratado = form.Tel.trim();

    const payload = {
      Tel: telTratado,
      Email: form.Email.trim(),
      End: info.End,
      LinkFace: form.LinkFace.trim(),
      LinkInsta: form.LinkInsta.trim(),
      LinkLinkedin: form.LinkLinkedin.trim(),
      Localizacao: info.Localizacao
    };

    try {
      // valida com Yup antes de enviar
      await contactValidationSchema.validate(payload, { abortEarly: false });

      await updateFaleConosco(info.IdFaleConosco, payload);
      setOpenEditModal(false);
      await load();
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        // Agora o TypeScript sabe que err tem .errors
        setErrors(
          err.inner.reduce((acc, curr) => {
            if (curr.path) acc[curr.path] = curr.message;
            return acc;
          }, {} as { [key: string]: string })
        );
      } else {
        console.error(err);
        alert("Erro ao atualizar dados");
      }
    }
  }

  const info = dados[0];

  return (
    <section id="Contatos" className="bg-[#c4161c] py-10 flex justify-center">
      <div className="bg-[#ececec] w-[90%] max-w-4xl p-6 rounded shadow relative">

        <h2 className="bg-[#f58c47] text-white font-semibold text-xl px-4 py-2 rounded">
          Fale Conosco
        </h2>

        {loading || !info ? (
          <p className="mt-4">Carregando...</p>
        ) : (
          <>
            <div className="space-y-3 text-sm text-gray-800 mt-4">
              <p className="flex items-center gap-2">
                <Phone size={18} /> {info.Tel}
              </p>

              <a href={`mailto:${info.Email}`} className="flex items-center gap-2">
                <Mail size={18} /> {info.Email}
              </a>

              <p className="flex items-center gap-2">
                <MapPin size={18} /> {info.End}
              </p>

              <div className="flex gap-4 pt-3">
                <a href={info.LinkFace} target="_blank">
                  <Facebook size={20} />
                </a>
                <a href={info.LinkInsta} target="_blank">
                  <Instagram size={20} />
                </a>
                <a href={info.LinkLinkedin} target="_blank">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {info.Localizacao && (
              <div className="mt-6 w-full h-64 rounded overflow-hidden shadow">
                <iframe
                  src={info.Localizacao}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            )}
            {isAuthenticated && info && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => { setOpenEditModal(true); setErrors({}); }}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL EDITAR */}
      {openEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-700">Editar Contatos</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Telefone</label>
                <input
                  className="w-full border p-2 rounded"
                  value={form.Tel}
                  onChange={(e) => setForm({ ...form, Tel: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
                {errors.Tel && <p className="text-red-600 text-sm">{errors.Tel}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={form.Email}
                  onChange={(e) => setForm({ ...form, Email: e.target.value })}
                  placeholder="contato@email.com"
                />
                {errors.Email && <p className="text-red-600 text-sm">{errors.Email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Facebook</label>
                <input
                  className="w-full border p-2 rounded"
                  value={form.LinkFace}
                  onChange={(e) => setForm({ ...form, LinkFace: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
                {errors.LinkFace && <p className="text-red-600 text-sm">{errors.LinkFace}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Instagram</label>
                <input
                  className="w-full border p-2 rounded"
                  value={form.LinkInsta}
                  onChange={(e) => setForm({ ...form, LinkInsta: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
                {errors.LinkInsta && <p className="text-red-600 text-sm">{errors.LinkInsta}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">LinkedIn</label>
                <input
                  className="w-full border p-2 rounded"
                  value={form.LinkLinkedin}
                  onChange={(e) => setForm({ ...form, LinkLinkedin: e.target.value })}
                  placeholder="https://linkedin.com/..."
                />
                {errors.LinkLinkedin && <p className="text-red-600 text-sm">{errors.LinkLinkedin}</p>}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenEditModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
