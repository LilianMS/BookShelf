// esta pagina mostra o preview do livro selecionado

import { PreviewLivro } from "@/app/components/PreviewLivro";
import { Book } from "@/types/books";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBookById(id: string): Promise<Book | null> {
  try {
    // Se estamos no servidor, usar BookStorage diretamente
    if (typeof window === 'undefined') {
      const { BookStorage } = await import('@/lib/bookStorage')
      return await BookStorage.getBookById(id)
    }
    
    // No cliente, usar API com cache busting
    const response = await fetch(`/api/books/${id}?_t=` + Date.now(), {
      cache: 'no-store'
    })
    if (!response.ok) {
      return null
    }
    return response.json()
  } catch (error) {
    console.error('Erro ao buscar livro:', error)
    // Fallback para JSON estático apenas em caso de erro
    const { default: booksData } = await import('@/data/books.json')
    const books = booksData as Book[]
    return books.find((b) => b.id === id) || null
  }
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return (
      <div className="container mx-auto p-4 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Livro não encontrado!</h1>
        <p className="text-muted-foreground mb-6">O livro que você está procurando pode ter sido removido ou não existe.</p>
        <Link
          href="/livros"
          className="inline-flex items-center text-foreground hover:text-green-700 dark:text-green-300 dark:hover:text-green-100 mb-4 sm:mb-6 transition-colors p-2 -m-2 rounded-md hover:bg-green-50 dark:hover:bg-green-950/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="text-sm sm:text-base">Voltar para a Biblioteca</span>
        </Link>
      </div>
    );
  }

  return <PreviewLivro book={book} />;
}
