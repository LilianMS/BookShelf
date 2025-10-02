'use client'

import booksData from '@/data/books.json'
import { Book } from '@/types/books'
import { BookOpen, Clock, CheckCircle2, FileText } from 'lucide-react'

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
   <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-foreground">
            Início
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <DashboardCard
              title="Total de Livros"
              value={stats.totalBooks}
              description="+10% em relação ao mês anterior"
              valueColor="text-blue-600 dark:text-blue-400"
              icon={<BookOpen className="h-6 w-6 sm:h-7 sm:w-7" />}
            />

            <DashboardCard
              title="Sendo Lidos"
              value={stats.readingBooks}
              description="Comece um novo livro hoje!"
              valueColor="text-yellow-600 dark:text-yellow-400"
              icon={<Clock className="h-6 w-6 sm:h-7 sm:w-7" />}
            />

            <DashboardCard
              title="Livros Finalizados"
              value={stats.finishedBooks}
              description="Parabéns pelas leituras!"
              valueColor="text-green-600 dark:text-green-400"
              icon={<CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />}
            />

            <DashboardCard
              title="Páginas Lidas"
              value={stats.totalPagesRead}
              description="Continue a jornada!"
              valueColor="text-purple-600 dark:text-purple-400"
              icon={<FileText className="h-6 w-6 sm:h-7 sm:w-7" />}
            />
          </div>
        </div>
      </main>
    </div>
  );
}