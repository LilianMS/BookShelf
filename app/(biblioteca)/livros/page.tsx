import ListarLivroWithFilters from '@/app/components/ListarLivroWithFilters'; 
import { Book } from '@/types/books';
import { Suspense } from 'react';

async function getBooksFromAPI() {
  // SEMPRE usar BookStorage para dados dinâmicos
  // Import direto do JSON só funciona para dados estáticos
  try {
    // Se estamos no servidor, usar BookStorage diretamente
    if (typeof window === 'undefined') {
      const { BookStorage } = await import('@/lib/bookStorage')
      return await BookStorage.readBooks()
    }
    
    // No cliente, usar API com cache busting
    const response = await fetch('/api/books?_t=' + Date.now(), {
      cache: 'no-store'
    })
    return response.json()
  } catch (error) {
    console.error('Erro ao buscar livros:', error)
    // Fallback para JSON estático apenas em caso de erro
    const { default: booksData } = await import('@/data/books.json')
    return booksData as Book[]
  }
} 

interface SearchParams {
  search?: string;
  genre?: string;
  status?: string;
  sort?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const books: Book[] = await getBooksFromAPI()
  const params = await searchParams
  
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ListarLivroWithFilters books={books} initialSearchParams={params} />
    </Suspense>
  );
}