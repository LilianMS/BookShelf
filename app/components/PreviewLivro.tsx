

import { Book } from "@/types/books";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Trash2, Pencil, Star } from "lucide-react"; 
import Image from "next/image"; 


const getStatusColorClass = (status: string) => {
  switch (status) {
    case 'LIDO': return 'bg-green-600 text-white';
    case 'LENDO': return 'bg-blue-500 text-white';
    case 'PAUSADO': return 'bg-yellow-500 text-gray-900';
    case 'ABANDONADO': return 'bg-red-600 text-white';
    case 'QUERO-LER': return 'bg-indigo-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};


const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-lg sm:text-xl md:text-2xl">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface PreviewLivroProps {
  book: Book;
}

export function PreviewLivro({ book }: PreviewLivroProps) {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link
        href="/livros"
        className="inline-flex items-center text-green-700 hover:text-green-900 mb-4 sm:mb-6 transition-colors p-2 -m-2 rounded-md hover:bg-green-50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="text-sm sm:text-base">Voltar para a Biblioteca</span>
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
         
          <div className="md:col-span-1 bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8 md:pt-14">
            
            <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[280px] aspect-[2/3] shadow-xl">
              <Image
                src={book.cover || "/images/placeholder.jpg"}
                alt={`Capa do livro ${book.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                unoptimized 
              />
            </div>
          </div>

          
          <div className="md:col-span-2 p-4 sm:p-6 flex flex-col">
            <Badge variant="secondary" className="self-start mb-3 text-xs sm:text-sm">
              {book.genre}
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{book.title}</h1>
            <h2 className="text-lg sm:text-xl text-gray-600 mt-1">por {book.author}</h2>

            <div className="flex items-center my-4">
              <StarRating rating={book.rating} />
              <span className="ml-3 text-gray-500">
                ({book.rating} de 5 estrelas)
              </span>
            </div>

            <div className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2 mb-4 sm:mb-6">
              <p>
                <span className="font-semibold">Editora:</span> {book.publisher}
              </p>
              <p>
                <span className="font-semibold">Ano:</span> {book.year}
              </p>
              <p>
                <span className="font-semibold">Páginas:</span> {book.pages}
              </p>
              <p>
                <span className="font-semibold">Idioma:</span> {book.language}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                
                <Badge className={`ml-2 font-medium ${getStatusColorClass(book.status)}`}>
                  {book.status}
                </Badge>
              </p>
            </div>

            <div className="flex-grow mt-3 sm:mt-4 border-t pt-3 sm:pt-4">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Sinopse</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{book.synopsis}</p>
            </div>

            <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
              
                
              <Link href={`/livros/${book.id}/editar`} passHref>
                <Button variant="secondary" className="w-full sm:w-auto" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                  Editar Livro
                </Button>
              </Link>
                
                
                <Button variant="destructive" size="sm" className="w-full sm:w-auto flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Excluir Livro
                </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}