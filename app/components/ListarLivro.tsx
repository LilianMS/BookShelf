import { Book } from '@/types/books';

interface ListarLivroProps {
  books: Book[];
}

export default function ListarLivro({ books }: ListarLivroProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meus livros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4">
            <img 
              src={book.cover} 
              alt={`Capa do livro ${book.title}`} 
              className="w-full h-auto object-cover rounded-md mb-4"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-1">{book.title}</h2>
              <p className="text-sm text-gray-400 mb-2">Autor: {book.author}</p>
              
              <p className="text-sm text-gray-400">
                Gênero: {book.genre}
              </p>
              <p className="text-sm text-gray-400">
                Ano: {book.year}
              </p>
              <p className="text-sm text-gray-400">
                Avaliação: {book.rating} estrelas
              </p>
              <p className="text-sm text-gray-400">
                Status: {book.status}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}