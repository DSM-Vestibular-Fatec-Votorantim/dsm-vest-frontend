import { useState } from "react";

type Props = {
  open: boolean;
  initialData?: {
    IdProjeto?: number;
    Tipo: string;
    LinkProj: string;
  };
  onClose: () => void;
  onSubmit: (data: {
    Tipo: string;
    LinkProj: string;
    file?: File;
  }) => Promise<void>;
};

export default function ProjectEditorModal({ open, initialData, onClose, onSubmit }: Props) {
  const [tipo, setTipo] = useState(initialData?.Tipo ?? "");
  const [linkProj, setLinkProj] = useState(initialData?.LinkProj ?? "");
  const [file, setFile] = useState<File | undefined>();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-bold">
          {initialData ? "Editar projeto" : "Novo projeto"}
        </h3>

        <input
          className="w-full border rounded p-2"
          placeholder="Link do projeto"
          value={linkProj}
          onChange={(e) => setLinkProj(e.target.value)}
        />

        <select
          className="w-full border rounded p-2"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="Obras">Obras</option>
          <option value="DSM">DSM</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200">
            Cancelar
          </button>

          <button
            onClick={() =>
              onSubmit({
                Tipo: tipo,
                LinkProj: linkProj,
                file,
              })
            }
            className="px-3 py-1 rounded bg-cyan-700 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
