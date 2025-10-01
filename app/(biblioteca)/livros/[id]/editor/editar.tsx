"use client";

import DashboardCard from "@/components/DashboardCard";
import { useBooks } from "@/contexts/BooksContext";
import { Loader2, BookOpen, CheckCircle, ListTodo, Star, BarChart3, TrendingUp } from "lucide-react";

export default function Home() {
    const { loading, stats, booksWithProgress } = useBooks();
    
    // As estatísticas básicas são obtidas do contexto (stats), mas alguns cálculos são feitos aqui para detalhes específicos
    
    // Cálculo da Lista de Desejos (QUERO-LER)
    const wantToReadBooks = booksWithProgress.filter(book => book.status === 'QUERO-LER').length;

    // Cálculo da Avaliação Média
    const ratedBooks = booksWithProgress.filter(book => (book.rating || 0) > 0);
    const totalRating = ratedBooks.reduce((sum, book) => sum + (book.rating || 0), 0);
    const avgRating = ratedBooks.length > 0 ? (totalRating / ratedBooks.length).toFixed(1) : 'N/A';
    
    // Cálculo do total de páginas no acervo
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
              BookShelf: Visão Geral da Sua Leitura
            </h1>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              
              
              <DashboardCard
                title="Sua Coleção"
                value={formatNumber(stats.totalBooks)}
                description={`Total de ${formatNumber(totalPagesInAcervo)} páginas no acervo`}
                valueColor="text-gray-900"
                icon={<BookOpen className="text-gray-400" />}
              />

              
              <DashboardCard
                title="Leituras Ativas"
                value={formatNumber(stats.readingBooks)}
                description="Livros LENDO ou PAUSADO"
                valueColor="text-blue-600"
                icon={<TrendingUp className="text-blue-400" />}
              />

              
              <DashboardCard
                title="Finalizados"
                value={formatNumber(stats.finishedBooks)}
                description="Leituras concluídas com sucesso"
                valueColor="text-green-600"
                icon={<CheckCircle className="text-green-400" />}
              />

              
              <DashboardCard
                title="Lista de Desejos"
                value={formatNumber(wantToReadBooks)}
                description="Próximos livros na fila"
                valueColor="text-indigo-500"
                icon={<ListTodo className="text-indigo-400" />}
              />

              
              <DashboardCard
                title="Páginas Lidas"
                value={formatNumber(stats.pagesRead)}
                description="Total acumulado em todas as leituras"
                valueColor="text-purple-600"
                icon={<BarChart3 className="text-purple-400" />}
              />
                
              
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