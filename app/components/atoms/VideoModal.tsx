"use client";

import { useRef } from "react";

type Props = {
  video: string;
  onClose: () => void;
};

export default function VideoModal({ video, onClose }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!ref.current) return;
    ref.current.paused ? ref.current.play() : ref.current.pause();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl"
      >
        ✕
      </button>

      {/* Container do vídeo — sem overflow-hidden */}
      <div className="relative max-h-[90vh] flex items-center justify-center">
        <video
          ref={ref}
          src={video}
          className="max-h-[90vh] w-auto rounded-xl"
          playsInline
          controls
        />
      </div>
    </div>
  );
}
