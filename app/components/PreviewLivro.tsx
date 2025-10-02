'use client'

import Image from "next/image";
import { Book } from "@/types/books";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteBook } from "@/components/ui/useDeleteBook";
import { useState } from "react";
import { getBookCover } from "@/lib/constants";


const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-yellow-400" : "text-muted-foreground"}>
      ★
    </span>
  ));
  return <div className="flex text-lg sm:text-xl md:text-2xl">{stars}</div>;
};

interface PreviewLivroProps {
  book: Book;
}

export function PreviewLivro({ book }: PreviewLivroProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { deleteBook, isDeleting } = useDeleteBook({
    redirectTo: '/livros', // Redirecionamento automático para biblioteca
    onSuccess: () => {
      setShowDeleteModal(false);
    }
  });

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteBook(book);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link
        href="/livros"
        className="inline-flex items-center text-foreground hover:text-green-700 dark:text-green-300 dark:hover:text-green-100 mb-4 sm:mb-6 transition-colors p-2 -m-2 rounded-md hover:bg-green-50 dark:hover:bg-green-950/50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="text-sm sm:text-base">Voltar para a Biblioteca</span>
      </Link>

      <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Coluna da Capa */}
          <div className="md:col-span-1 bg-muted/30 flex items-center justify-center p-4 sm:p-6 md:p-8 md:pt-14">
            <Image
              src={getBookCover(book.cover, true)}
              alt={`Capa do livro ${book.title}`}
              width={300}
              height={450}
              className="rounded-lg shadow-lg w-full max-w-[200px] sm:max-w-[250px] md:max-w-[280px] object-contain"
            />
          </div>
          {/* Coluna de Detalhes */}
          <div className="md:col-span-2 p-4 sm:p-6 flex flex-col">
            <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs sm:text-sm font-semibold mb-3 px-2 sm:px-3 py-1 rounded-full self-start">
              {book.genre}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-card-foreground">{book.title}</h1>
            <h2 className="text-lg sm:text-xl text-muted-foreground mt-1">por {book.author}</h2>

            <div className="flex items-center my-4">
              <StarRating rating={book.rating} />
              <span className="ml-3 text-muted-foreground">
                ({book.rating} de 5 estrelas)
              </span>
            </div>

            <div className="text-xs sm:text-sm text-card-foreground space-y-1 sm:space-y-2 mb-4 sm:mb-6">
              <p>
                <span className="font-semibold">Editora:</span> {book.publisher}
              </p>
              <p>
                <span className="font-semibold">Ano:</span> {book.year}
              </p>
              <p>
                <span className="font-semibold">Páginas:</span> {book.pages}
              </p>
              <p>
                <span className="font-semibold">Idioma:</span> {book.language}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span className="ml-2 font-medium text-white bg-blue-600 dark:bg-blue-700 px-2 py-1 rounded-md">
                  {book.status}
                </span>
              </p>
            </div>

            <div className="flex-grow mt-3 sm:mt-4 border-t border-border pt-3 sm:pt-4">
              <h3 className="font-semibold text-base sm:text-lg mb-2 text-card-foreground">Sinopse</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{book.synopsis}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
              <Link href={`/livros/${book.id}/edit`}>
                <Button variant="secondary" className="w-full sm:w-auto" size="sm">
                  Editar Livro
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                size="sm" 
                iconVariant="delete"
                className="w-full sm:w-auto" 
                onClick={handleDeleteClick}
                aria-label={`Deletar ${book.title}`}
              >
                Deletar Livro
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de delete */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Deletar livro"
        description={`Tem certeza que deseja deletar "${book.title}"? Esta ação não pode ser desfeita e o livro será removido permanentemente da sua biblioteca.`}
        confirmText="Deletar"
        cancelText="Cancelar"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}
