"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Edit, Loader2 } from "lucide-react";
import { useBooks } from "@/contexts/BooksContext";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; 
import { BookWithProgress } from "@/types/books";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'LIDO': return 'bg-green-600 hover:bg-green-600/90';
    case 'LENDO': return 'bg-blue-500 hover:bg-blue-500/90';
    case 'PAUSADO': return 'bg-yellow-500 hover:bg-yellow-500/90';
    case 'ABANDONADO': return 'bg-red-600 hover:bg-red-600/90';
    case 'QUERO-LER': return 'bg-indigo-500 hover:bg-indigo-500/90';
    default: return 'bg-gray-500';
  }
};

const DeleteButtonWithConfirmation = ({ bookId, bookTitle }: { bookId: string, bookTitle: string }) => {
    const { deleteBook } = useBooks();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteBook(bookId);
            
            toast({
                title: "Livro Excluído",
                description: `O livro "${bookTitle}" foi removido com sucesso.`,
                variant: "default",
            });
            
        } catch (error) {
            
            console.error("Erro ao excluir livro:", error);
            toast({
                title: "Erro na Exclusão",
                description: "Não foi possível remover o livro. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            
            setIsDeleting(false); 
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button 
                    variant="destructive" 
                    size="icon" 
                    disabled={isDeleting} 
                >
                    {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Trash2 className="w-4 h-4" />
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você removerá o livro **"{bookTitle}"** da sua biblioteca. Esta ação é irreversível.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete} 
                        className="bg-destructive hover:bg-destructive/90"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <span className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Excluindo...
                            </span>
                        ) : (
                            "Confirmar Exclusão"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

interface ListarLivroProps {
    books: BookWithProgress[];
}


export const ListarLivro = ({ books }: ListarLivroProps) => {
    
  if (books.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold">Nenhum livro cadastrado.</h2>
        <p className="text-muted-foreground">
          Use o botão "Adicionar Livro" no menu para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-card rounded-lg shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl"
        >
          <Link href={`/livros/${book.id}`} className="block relative h-64">
            <Image
              src={book.cover || "/images/placeholder.jpg"}
              alt={`Capa do livro ${book.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
              className="hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </Link>

          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold line-clamp-2 text-card-foreground">
                    {book.title}
                </h3>
                <Badge className={`${getStatusColor(book.status)} text-white ml-2 shrink-0`}>
                    {book.status}
                </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              Por **{book.author}**
            </p>

            <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progresso:</span>
                    <span>{book.progress}%</span>
                </div>
                <Progress value={book.progress} className="h-2" /> 
            </div>

            <div className="flex items-center space-x-1 text-yellow-500 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    book.rating >= star ? "fill-yellow-500" : "fill-transparent"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-auto pt-2 space-x-2">
              <Button asChild variant="secondary" size="sm" className="flex-1">
                <Link href={`/livros/${book.id}`}>Visualizar</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Link href={`/livros/${book.id}/editar`} className="flex items-center justify-center">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Link>
              </Button>

              <DeleteButtonWithConfirmation 
                bookId={book.id} 
                bookTitle={book.title} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListarLivro;
