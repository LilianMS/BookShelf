"use client";

import DashboardCard from "./components/DashboardCard";

export default function Home() {
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
              value={24}
              description="+10% em relação ao mês anterior"
              valueColor="text-blue-600"
              descriptionColor="text-green-500"
            />

            <DashboardCard
              title="Sendo Lidos"
              value={5}
              description="Comece um novo livro hoje!"
              valueColor="text-yellow-500"
            />

            <DashboardCard
              title="Livros Finalizados"
              value={19}
              description="Parabéns pelas leituras!"
              valueColor="text-green-600"
            />

            <DashboardCard
              title="Páginas Lidas"
              value="5,676"
              description="Continue a jornada!"
              valueColor="text-purple-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
}