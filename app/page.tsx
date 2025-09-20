"use client";

export default function Home() {
  return (
   <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Dashboard de Leitura
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">Total de Livros</h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">24</p>
              <p className="text-sm text-green-500 mt-1">+10% em relação ao mês anterior</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">Sendo Lidos</h2>
              <p className="text-4xl font-bold text-yellow-500 mt-2">5</p>
              <p className="text-sm text-gray-500 mt-1">Comece um novo livro hoje!</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">Livros Finalizados</h2>
              <p className="text-4xl font-bold text-green-600 mt-2">19</p>
              <p className="text-sm text-gray-500 mt-1">Parabéns pelas leituras!</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">Páginas Lidas</h2>
              <p className="text-4xl font-bold text-purple-600 mt-2">5,676</p>
              <p className="text-sm text-gray-500 mt-1">Continue a jornada!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}