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
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card border-border"
          >
            <CardHeader className="p-0">
              <img
                src={book.cover}
                alt={`Capa do livro ${book.title}`}
                className="w-full h-48 sm:h-64 object-cover"
              />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 flex-grow bg-card">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full border border-primary/20">
                {book.genre}
              </span>
              <CardTitle className="text-lg font-bold text-card-foreground">
                {book.title}
              </CardTitle>
              <p className="text-base sm:text-lg font-bold text-card-foreground">por {book.author}</p>
              <p className="text-xs text-muted-foreground mt-2">Ano: {book.year}</p>
              <div className="mt-2">
                <StarRating rating={book.rating} />
              </div>
            </CardContent>
            <CardFooter className="p-3 sm:p-4 bg-muted/30 border-t border-border">
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href={`/livros/${book.id}`} passHref className="w-full sm:flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Visualizar
                  </Button>
                </Link>
                
                {/* Agrupamento dos botões secundários */}
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 sm:flex-none" size="sm">
                    Editar
                  </Button>
                  <Button variant="destructive" cursor="pointer" size="sm" className="px-3" iconVariant="delete" />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
