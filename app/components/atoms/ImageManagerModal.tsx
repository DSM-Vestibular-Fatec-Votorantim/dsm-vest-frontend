/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { getAllImages, deleteImage, uploadImage } from "@/app/services/mediaService";
import { X, Trash } from "lucide-react";
import Image from "next/image";

interface Props {
  onSelect: (imageId: number) => void;
  onClose: () => void;
}

export default function ImageManagerModal({ onSelect, onClose }: Props) {
    const [images, setImages] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [descricao, setDescricao] = useState("");

    const itensPorPag = 8;

    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(images.length / itensPorPag);

    const paginatedImages = images.slice(
        (page - 1) * itensPorPag,
        page * itensPorPag
    );


    async function load() {
        const data = await getAllImages();
        setImages(data);
        setPage(1);
    }

    useEffect(() => {
        load();
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = "auto";
        };
    }, []);

    async function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        if (!file) return;
        await uploadImage(file, descricao);
        setFile(null);
        setDescricao("");
        await load();
    }

    async function handleDelete(id: number) {
        if (!confirm("Deseja excluir esta imagem?")) return;
        await deleteImage(id);
        await load();
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full p-6 relative">

            <button onClick={onClose} className="absolute top-4 right-4">
            <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">Gerenciar Imagens</h2>

            {/* Grid de imagens */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {paginatedImages.map(img => (
                <div key={img.IdImagem} className="relative group border rounded overflow-hidden">
                    <Image
                        src={img.URL}
                        alt={img.Descricao}
                        width={120}
                        height={120}
                        className="w-full h-32 object-cover cursor-pointer"
                        onClick={() => onSelect(img.IdImagem)}
                    />

                    <div className="p-2 text-xs bg-white">
                        <p className="font-semibold text-gray-700">
                        ID: {img.IdImagem}
                        </p>
                        <p className="text-gray-500 truncate">
                        {img.Descricao || "Sem descrição"}
                        </p>
                    </div>

                <button
                    onClick={() => handleDelete(img.IdImagem)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100"
                    title="Excluir imagem"
                >
                    <Trash size={14} />
                </button>
                </div>
            ))}
            </div>

            <div className="flex justify-center items-center gap-2 my-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Anterior
                </button>

                <span className="text-sm text-gray-600">
                    Página {page} de {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Próxima
                </button>
            </div>

            {/* Upload */}
            <form onSubmit={handleUpload} className="flex gap-2 items-center">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Enviar
            </button>
            </form>

        </div>
        </div>
    );
}
