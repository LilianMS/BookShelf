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

interface PreviewLivroProps {
  livro: Book;
}

export function PreviewLivro({ livro }: PreviewLivroProps) { 
    return (
            <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
       <Link href="/livros" className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors">
         <ArrowLeft className="mr-2 h-4 w-4" />
         Voltar para a Biblioteca
            </Link>
            
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Coluna da Capa */}
          <div className="md:col-span-1">
            <img 
              src={book.cover} 
              alt={`Capa do livro ${book.title}`} 
              className="w-full h-full object-cover"
            />
          </div>
}
