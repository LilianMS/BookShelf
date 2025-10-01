'use client'

import booksData from '@/data/books.json'
import { Book } from '@/types/books'

import DashboardCard from "./components/DashboardCard";

function calculateDashboardStats(books: Book[]) {
  return {
    totalBooks: books.length,
    readingBooks: books.filter(book => book.status === 'LENDO').length,
    finishedBooks: books.filter(book => book.status === 'LIDO').length,
    totalPagesRead: books
      .filter(book => book.status === 'LIDO')
      .reduce((total, book) => total + book.pages, 0)
  }
}


export default function Home() {
  const books: Book[] = booksData as Book[];
  const stats = calculateDashboardStats(books);

  return (
   <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-800">
            Dashboard de Leitura
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <DashboardCard
              title="Total de Livros"
              value={stats.totalBooks}
              description="+10% em relação ao mês anterior"
              valueColor="text-blue-600"
              descriptionColor="text-green-500"
            />

            <DashboardCard
              title="Sendo Lidos"
              value={stats.readingBooks}
              description="Comece um novo livro hoje!"
              valueColor="text-yellow-500"
            />

            <DashboardCard
              title="Livros Finalizados"
              value={stats.finishedBooks}
              description="Parabéns pelas leituras!"
              valueColor="text-green-600"
            />

            <DashboardCard
              title="Páginas Lidas"
              value={stats.totalPagesRead}
              description="Continue a jornada!"
              valueColor="text-purple-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
}