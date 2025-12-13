import { useSelectedImages } from "@/app/services/mediaService";
import Carousel from "../molecules/Carousel";
import PostCard from "../molecules/PostCard";
import Image from "next/image";
import { useCards } from "@/app/services/cardsService";
import { usePartnerComments } from "@/app/services/commentsService";

export default function ReceptionSection() {
  // const { cards, loading: loadingCards } = useCards();
  const images = useSelectedImages([10, 11, 13]);
  const { comments, loading: loadingComments } = usePartnerComments();

  // if(loadingCards || loadingComments) return null;

  if(loadingComments) return null;
  

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      <Carousel images={images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cards de vídeos e postagens */}
          {/* <div
            className="
              lg:col-span-2
              grid
              grid-cols-2
              auto-rows-[180px]
              gap-4
            "
          >
            {cards.map((post, index) => (
              <div
                key={post.id}
                className={`
                  animate-fade-in
                  ${post.orientation === "vertical"
                    ? "row-span-2"
                    : "row-span-1"}
                `}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div> */}


          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-cyan-700 text-2xl font-bold">O que dizem sobre nós</h3>
            
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg p-4 shadow-md border-l-4 border-[#FF8C42]"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Image
                    src={comment.image}
                    alt={comment.name}
                    width={64}
                    height={64}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="font-bold text-sm">{comment.name}</p>
                </div>
                <p className="text-xs italic text-gray-700">
                  &quot;{comment.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
