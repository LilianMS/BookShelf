'use client'

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/books";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRatingDisplay } from "@/components/ui/StarRating";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteBook } from "@/components/ui/useDeleteBook";
import { getBookCover } from "@/lib/constants";
import { useState } from "react";

interface ListarLivroProps {
  books: Book[];
}

export default function ListarLivro({ books }: ListarLivroProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const availableGenres = [...new Set(books.map(book => book.genre))];

  const { deleteBook, isDeleting } = useDeleteBook({
    onSuccess: () => {
      setBookToDelete(null);
      // Aqui seria ideal recarregar a lista, mas como estamos usando dados estáticos,
      // o usuário verá a atualização ao navegar ou recarregar
    }
  });

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
    }
  };

  const filterBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Meus Livros</h1>

      {/* Área para Busca e Filtros */}
      <div className="mb-8 p-4 bg-card rounded-lg shadow-md border border-border">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">Buscar e Filtrar</h2>
        <input
          type="text"
          placeholder="Buscar por título, autor ou gênero..."
          className="w-full p-3 sm:p-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full mt-3 sm:mt-2 p-3 sm:p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base sm:text-sm"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Todos os gêneros</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterBooks.map((book) => (
          <Card
            key={book.id}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card border-border"
          >
            <CardHeader className="p-0">
              <Image
                src={getBookCover(book.cover)}
                alt={`Capa do livro ${book.title}`}
                width={300}
                height={400}
                className="w-full h-48 sm:h-64 object-cover"
              />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 flex-grow bg-card">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full border border-primary/20">
                {book.genre}
              </span>
              <CardTitle className="text-lg font-bold text-card-foreground">
                {book.title}
              </CardTitle>
              <p className="text-base sm:text-lg font-bold text-card-foreground">por {book.author}</p>
              <p className="text-xs text-muted-foreground mt-2">Ano: {book.year}</p>
              <div className="mt-2">
                <StarRatingDisplay rating={book.rating} />
              </div>
            </CardContent>
            <CardFooter className="p-3 sm:p-4 bg-muted/30 border-t border-border">
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href={`/livros/${book.id}`} passHref className="w-full sm:flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Visualizar
                  </Button>
                </Link>

                {/* Agrupamento dos botões secundários */}
                <div className="flex gap-2">
                  <Link href={`/livros/${book.id}/edit`} className="flex-1 sm:flex-none">
                    <Button variant="secondary" className="w-full" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    iconVariant="delete"
                    className="px-3" 
                    onClick={() => handleDeleteClick(book)}
                    aria-label={`Deletar ${book.title}`}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de confirmação de delete */}
      <ConfirmModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Deletar livro"
        description={bookToDelete ? `Tem certeza que deseja deletar "${bookToDelete.title}"? Esta ação não pode ser desfeita.` : ''}
        confirmText="Deletar"
        cancelText="Cancelar"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
