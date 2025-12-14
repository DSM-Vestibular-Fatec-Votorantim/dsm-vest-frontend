"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

type ProjectProps = {
  data: {
    type: "image";
    turma: string;
    link: string;
    thumbnail: string;
    media?: string;
  };
};

export default function ProjectCard({ data }: ProjectProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-t-4 border-[#A63524] group">
      <div className="w-full aspect-video relative bg-gray-200 overflow-hidden">
          <Image
            src={data.thumbnail}
            alt={data.turma}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-[#A63524] rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
          </div>

          <div className="absolute top-3 right-3 bg-[#FF8C42] text-white text-xs font-bold px-3 py-1 rounded-full">
            PROJETO
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm font-bold text-[#A63524] mb-1 uppercase tracking-wide">
            {data.turma}
          </p>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 text-sm flex items-center gap-1 group-hover:text-[#A63524] transition-colors duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Ver Projeto
          </a>
        </div>
      </div>
  );
}
