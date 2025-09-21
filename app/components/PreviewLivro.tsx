import { Book } from "@/types/books";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Ícone para o botão de voltar

// Reutilização do componente StarsRating criado anteriormente
const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
      ★
    </span>
  ));
  return <div className="flex text-2xl">{stars}</div>;
};

interface PreviewLivroProps {
  book: Book;
}

export function PreviewLivro({ book }: PreviewLivroProps) {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link
        href="/livros"
        className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para a Biblioteca
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Coluna da Capa */}
          <div className="md:col-span-1 bg-gray-50 flex items-center justify-center p-6 md:p-8">
            <img
              src={book.cover}
              alt={`Capa do livro ${book.title}`}
              className="rounded-lg shadow-lg w-full max-w-[250px] object-contain"
            />
          </div>

          {/* Coluna de Detalhes */}
          <div className="md:col-span-2 p-6 flex flex-col">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold mb-3 px-3 py-1 rounded-full self-start">
              {book.genre}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <h2 className="text-xl text-gray-600 mt-1">por {book.author}</h2>

            <div className="flex items-center my-4">
              <StarRating rating={book.rating} />
              <span className="ml-3 text-gray-500">
                ({book.rating} de 5 estrelas)
              </span>
            </div>

            <div className="text-sm text-gray-700 space-y-2 mb-6">
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
                <span className="ml-2 font-medium text-white bg-blue-500 px-2 py-1 rounded-md">
                  {book.status}
                </span>
              </p>
            </div>

            <div className="flex-grow mt-4 border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Sinopse</h3>
              <p className="text-gray-600 leading-relaxed">{book.synopsis}</p>
            </div>

            <div className="mt-6 pt-4 border-t flex gap-4">
              <Button variant="secondary" className="w-full">
                Editar Livro
              </Button>
              <Button variant="destructive" className="w-full">
                Excluir Livro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
