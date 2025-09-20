
import ListarLivro from '@/components/ListarLivro'; 
import booksData from '../data/books.json';
import { Book } from '@/types/books';

export default function HomePage() {
  const books: Book[] = booksData as Book[];

  return <ListarLivro books={books} />;
}