import Link from "next/link";
import { Book } from "@/types/books";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ListarLivroProps {
  books: Book[];
}

// Componente para exibir estrelas de avaliação
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? "text-yellow-400" : "text-gray-400"}
      >
        ★
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

export default function ListarLivro({ books }: ListarLivroProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Meus Livros</h1>

      {/* Área para Busca e Filtros (a ser implementada) */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Buscar e Filtrar</h2>
        {/* Inputs de busca e filtros serão adicionados aqui em um próximo passo */}
        <p className="text-gray-600">
          Em breve: campos para buscar por título/autor e filtrar por gênero.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card
            key={book.id}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <img
                src={book.cover}
                alt={`Capa do livro ${book.title}`}
                className="w-full h-64 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full">
                {book.genre}
              </span>
              <CardTitle className="text-lg font-bold text-gray-800">
                {book.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">por {book.author}</p>
              <p className="text-xs text-gray-500 mt-2">Ano: {book.year}</p>
              <div className="mt-2">
                <StarRating rating={book.rating} />
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 border-t">
              <div className="w-full flex justify-between gap-2">
                <Link href={`/livros/${book.id}`} passHref className="flex-1">
                  <Button variant="outline" className="w-full">
                    Visualizar
                  </Button>
                </Link>
                <Button variant="secondary" className="flex-1">
                  Editar
                </Button>
                <Button variant="secondary" className="flex-1">
                  Excluir
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
