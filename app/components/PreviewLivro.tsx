import { Book } from "@/types/books";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Ícone para o botão de voltar

// Reutilização do componente StarsRating criado anteriormente
const StarsRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
      ★
    </span>
  ));
  return <div className="flex text-2xl">{stars}</div>;
};
