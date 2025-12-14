import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  src: string;
  onClose: () => void;
}

export default function VideoModal({ src, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white"
      >
        <X size={32} />
      </button>

      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        className="max-w-[90vw] max-h-[90vh] object-contain"
      />
    </div>
  );
}
