"use client";

import DashboardCard from "@/components/DashboardCard";
import { useBooks } from "@/contexts/BooksContext";
import { Loader2, BookOpen, CheckCircle, ListTodo, Star, BarChart3, Activity } from "lucide-react";

export default function Home() {
    const { loading, stats, booksWithProgress } = useBooks(); 
    
    // Cálculo da Lista de Desejos (QUERO-LER)
    const wantToReadBooks = booksWithProgress.filter(book => book.status === 'QUERO-LER').length;

    // Cálculo da Avaliação Média (Re-introduzido)
    const ratedBooks = booksWithProgress.filter(book => (book.rating || 0) > 0);
    const totalRating = ratedBooks.reduce((sum, book) => sum + (book.rating || 0), 0);
    const avgRating = ratedBooks.length > 0 ? (totalRating / ratedBooks.length).toFixed(1) : 'N/A';

    // Cálculo do total de páginas no acervo (Re-introduzido)
    const totalPagesInAcervo = booksWithProgress.reduce((sum, book) => sum + (book.pages || 0), 0);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh] flex-col">
                <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
                <p className="text-lg text-gray-600">Carregando sua estante de livros...</p>
            </div>
        );
    }

    const formatNumber = (num: number) => num.toLocaleString('pt-BR');

    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-gray-800">
              Dashboard de Leitura
            </h1>

            {/* Ajuste o grid para 6 colunas em telas XL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              
              <DashboardCard
                title="Sua Coleção"
                value={formatNumber(stats.totalBooks)}
                description={`Total de ${formatNumber(totalPagesInAcervo)} páginas no acervo`}
                valueColor="text-gray-900"
                icon={<BookOpen className="text-gray-400" />}
              />

              <DashboardCard
                title="Sendo Lidos"
                value={formatNumber(stats.readingBooks)}
                description="Livros no momento (Lendo/Pausado)"
                valueColor="text-blue-600"
                icon={<Activity className="text-blue-400" />}
              />

              <DashboardCard
                title="Livros Finalizados"
                value={formatNumber(stats.finishedBooks)}
                description="Total de leituras concluídas"
                valueColor="text-green-600"
                icon={<CheckCircle className="text-green-400" />}
              />

              <DashboardCard
                title="Para Começar"
                value={formatNumber(wantToReadBooks)}
                description="Próximos livros na fila (Quero-Ler)"
                valueColor="text-indigo-500"
                icon={<ListTodo className="text-indigo-400" />}
              />
              
              <DashboardCard
                title="Páginas Acumuladas"
                value={formatNumber(stats.pagesRead)}
                description="Total de páginas lidas até hoje"
                valueColor="text-purple-600"
                icon={<BarChart3 className="text-purple-400" />}
              />
              
              {/* Card de Rating Médio (Re-introduzido) */}
              <DashboardCard
                title="Rating Médio"
                value={avgRating}
                description={`${ratedBooks.length} livros avaliados`}
                valueColor="text-yellow-600"
                icon={<Star className="text-yellow-400" />}
              />
            </div>
            
          </div>
        </main>
      </div>
    );
}