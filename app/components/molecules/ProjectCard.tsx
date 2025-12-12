"use client";

import { useState } from "react";
import Image from "next/image";
import VideoModal from "../atoms/VideoModal";

type ProjectProps = {
  data: {
    type: "image" | "video";
    turma: string;
    link: string;
    thumbnail: string;
    media?: string;
    video?: string;
  };
};

export default function ProjectCard({ data }: ProjectProps) {
  const [open, setOpen] = useState(false);

  const isVideo = data.type === "video";

  return (
    <>
      <div
        onClick={() => isVideo ? setOpen(true) : window.open(data.link, "_blank")}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        <div className="w-full aspect-video relative bg-gray-200">
          <Image
            src={data.thumbnail}
            alt={data.turma}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <p className="text-sm font-semibold text-indigo-600">{data.turma}</p>
          <p className="text-blue-600 text-sm underline">
            {isVideo ? "Ver Vídeo →" : "Ver Projeto →"}
          </p>
        </div>
      </div>

      {isVideo && data.video && open && (
        <VideoModal video={data.video} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
