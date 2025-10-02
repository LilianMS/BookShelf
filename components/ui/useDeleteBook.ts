'use client';

import { useState } from 'react';
import { useToast } from './toast-context';
import { Book } from '@/types/books';
import { useRouter } from 'next/navigation';

interface UseDeleteBookOptions {
  onSuccess?: () => void;
  redirectTo?: string; // Nova opção para redirecionamento automático
}

export function useDeleteBook({ onSuccess, redirectTo }: UseDeleteBookOptions = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const deleteBook = async (book: Book) => {
    setIsDeleting(true);
    
    try {
      // Usar API fetch com cache busting
      const response = await fetch(`/api/books/${book.id}?_t=` + Date.now(), {
        method: 'DELETE',
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar livro');
      }

      addToast({
        title: `"${book.title}" foi deletado com sucesso!`,
        variant: 'success',
        duration: 4000
      });

      // Estratégia de revalidação robusta
      router.refresh();
      
      // Redirecionamento automático se especificado
      if (redirectTo) {
        // Adicionar toast de redirecionamento
        setTimeout(() => {
          addToast({
            title: 'Redirecionando...',
            variant: 'info',
            duration: 2000
          });
        }, 500);
        
        setTimeout(() => {
          router.push(redirectTo);
        }, 800);
      } else {
        // Forçar reload de dados após pequeno delay
        setTimeout(() => {
          router.refresh();
        }, 200);
      }
      
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