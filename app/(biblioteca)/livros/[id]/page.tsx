// esta pagina mostra o preview do livro selecionado

import { PreviewLivro } from "@/app/components/PreviewLivro";
import booksData from "@/data/books.json";
import { Book } from "@/types/books";

interface PageProps {
  params: {
    id: string;
  };
}

function getBookById(id: string): Book | undefined {
  // A asserção 'as Book[]' garante ao TypeScript que o JSON tem o formato correto.
  return (booksData as Book[]).find((book) => book.id === id);
}

export default function BookDetailPage({ params }: PageProps) {
  const { id } = params;
  const book = getBookById(id);

  if (!book) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Livro não encontrado!</h1>
      </div>
    );
  }

  return <PreviewLivro book={book} />;
}
