"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  initialData?: {
    id?: number;
    name: string;
    comment: string;
  };
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    comment: string;
    file?: File;
  }) => Promise<void>;
};

export default function CommentEditorModal({
  open,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [comment, setComment] = useState(initialData?.comment ?? "");
  const [file, setFile] = useState<File | undefined>();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-bold">
          {initialData ? "Editar comentário" : "Novo comentário"}
        </h3>

        <input
          className="w-full border rounded p-2"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full border rounded p-2"
          placeholder="Comentário"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSubmit({ name, comment, file })
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
