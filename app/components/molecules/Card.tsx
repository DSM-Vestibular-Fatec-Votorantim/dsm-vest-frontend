interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="border shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition">
      <div className="w-12 h-12 rounded-full bg-gray-300 mb-3"></div>

      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>

      <button className="mt-4 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
        Ver mais
      </button>
    </div>
  );
}
