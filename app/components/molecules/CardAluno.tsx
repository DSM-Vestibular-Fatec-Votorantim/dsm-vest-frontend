import { Quote } from "lucide-react";
import Image from "next/image";

interface CardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function CardAluno({ name, description, imageUrl }: CardProps) {
    return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-t-4 border-[#A63524]">
      <div className="flex items-center mb-4">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#A63524]"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#AE0F0A] rounded-full p-1.5">
            <Quote className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm italic">
        &quot;{description}&quot;
      </p>
    </div>
  );
}