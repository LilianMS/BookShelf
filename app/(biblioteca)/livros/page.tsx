
import ListarLivro from '@/app/components/ListarLivro'; 
import { Book } from '@/types/books';

async function getBooksFromAPI() {
  const response = await fetch('http://localhost:3000/api/books')
  return response.json()
} 

export default async function HomePage() {
  const books: Book[] = await getBooksFromAPI()
  return <ListarLivro books={books} />;
}