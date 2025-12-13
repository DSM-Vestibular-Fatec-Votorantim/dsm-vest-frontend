import React, { useState, useRef } from 'react';
import { Play, Pause, Heart, MessageCircle, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import VideoModal from '../atoms/VideoModal';

interface Post {
    src: string;
    mediaType: "image" | "video";
    orientation: "horizontal" | "vertical";
}

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
  if (post.mediaType === "video") {
    setOpen(true);
    return;
  }

  if (post.mediaType === "image" && post.link) {
    window.open(post.link, "_blank", "noopener,noreferrer");
  }
};

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
};

  const isVertical = post.orientation === 'vertical';

  return (
    <>
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-[#A63524] group">
        <div 
            className={`relative bg-black overflow-hidden cursor-pointer ${
            isVertical ? 'aspect-[9/16]' : 'aspect-video'
            }`}
            onClick={handleClick}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {post.mediaType === "video" ? (
                <video
                    src={post.src}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                    playsInline
                />
                ) : (
                <Image
                    src={post.src}
                    fill
                    className="w-full h-full object-cover"
                    alt="Post"
                />
            )}

            <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                } flex items-center justify-center`}
            >
                {post.mediaType === "video" && (
                    <div className="bg-[#A63524] rounded-full p-4">
                        <Play className="w-10 h-10 text-white fill-white" />
                    </div>
                )}
                {post.mediaType === "video" && (
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors duration-300"
                    >
                        {isMuted ? (
                            <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                        )}
                    </button>
                )}

                {post.mediaType === "image" && post.link && (
                    <div className="bg-[#A63524] rounded-full p-4">
                        <ExternalLink className="w-10 h-10 text-white" />
                    </div>
                )}
          
            </div>

            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </div>

        
        </div>
    </div>

    {post.mediaType === "video" && open && (
        <VideoModal
            src={post.src}
            onClose={() => setOpen(false)}
        />
    )}
    </>
    
    
    
  );
};

export default PostCard;
