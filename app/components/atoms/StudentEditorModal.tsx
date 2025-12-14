import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  initialData?: {
    IdComentario?: number;
    Nome: string;
    Descricao: string;
    Tipo: string;
  };
  onClose: () => void;
  onSubmit: (data: {
    Nome: string;
    Descricao: string;
    Tipo: string;
    file?: File;
  }) => Promise<void>;
};


export default function StudentEditorModal({
    open,
    initialData,
    onClose,
    onSubmit,
}: Props) {
    const [name, setName] = useState(initialData?.Nome ?? "");
    const [comment, setComment] = useState(initialData?.Descricao ?? "");
    const [tipo, setTipo] = useState(initialData?.Tipo ?? "DSM") //Tipo = Turma / padrão DSM
    const [file, setFile] = useState<File | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    useEffect(() => {
        setName(initialData?.Nome ?? "");
        setComment(initialData?.Descricao ?? "");
        setTipo(initialData?.Tipo ?? "Obras");
        setFile(undefined);
        setError(null);
        setSuccessMessage(null);
    }, [initialData, open]);

    if (!open) return null;

    const handleSubmit = async () => {
        setSuccessMessage(null)
        setError(null);
        try {
        await onSubmit({ Nome: name, Descricao: comment, Tipo: tipo, file });
        } catch (err: any) {
        setError(err.message || "Erro desconhecido");
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
                <h3 className="text-lg font-bold">
                    {initialData ? "Editar relato" : "Novo relato"}
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
    
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

                <div className="flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="px-3 py-1 rounded bg-gray-200"
                >
                    Cancelar
                </button>
        
                <button
                    onClick={handleSubmit}
                    className="px-3 py-1 rounded bg-cyan-700 text-white"
                >
                    Salvar
                </button>
                </div>
            </div>
        </div>
      );
}