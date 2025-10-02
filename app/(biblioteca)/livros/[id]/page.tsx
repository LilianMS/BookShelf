// esta pagina mostra o preview do livro selecionado

import { PreviewLivro } from "@/app/components/PreviewLivro";
import booksData from "@/data/books.json";
import { Book } from "@/types/books";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBookById(id: string): Promise<Book | null> {
  const response = await fetch(`http://localhost:3000/api/books/${id}`)
  if (!response.ok) {
    return null  // Livro não encontrado
  }
  return response.json()
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return (
      <div className="container mx-auto p-4 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Livro não encontrado!</h1>
        <Link
          href="/livros"
          className="inline-flex items-center text-green-700 hover:text-green-900 mb-4 sm:mb-6 transition-colors p-2 -m-2 rounded-md hover:bg-green-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="text-sm sm:text-base">Voltar para a Biblioteca</span>
        </Link>
      </div>
    );
  }

  return <PreviewLivro book={book} />;
}
