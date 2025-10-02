import ListarLivro from '@/app/components/ListarLivro'; 
import { Book } from '@/types/books';

async function getBooksFromAPI() {
  // Durante build (local ou Vercel), usa import direto
  if (typeof window === 'undefined') {
    const { default: booksData } = await import('@/data/books.json')
    return booksData as Book[]
  }
  
  // No cliente, usa API
  const response = await fetch('/api/books')
  return response.json()
} 

export default async function HomePage() {
  const books: Book[] = await getBooksFromAPI()
  return <ListarLivro books={books} />;
}