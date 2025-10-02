'use client';

import { useState } from 'react';
import { useToast } from './toast-context';
import { Book } from '@/types/books';
import { useRouter } from 'next/navigation';

interface UseDeleteBookOptions {
  onSuccess?: () => void;
}

export function useDeleteBook({ onSuccess }: UseDeleteBookOptions = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const deleteBook = async (book: Book) => {
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/books/${book.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar livro');
      }

      addToast({
        title: `"${book.title}" foi deletado com sucesso!`,
        variant: 'success',
        duration: 4000
      });

      // Revalidar a página atual para atualizar a lista
      router.refresh();
      
      onSuccess?.();
      
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      addToast({
        title: 'Erro ao deletar livro. Tente novamente.',
        variant: 'error',
        duration: 5000
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteBook, isDeleting };
}