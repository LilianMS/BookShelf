'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Book } from '@/types/books'
import BookForm from '@/components/ui/BookForm'
import { useToast } from '@/components/ui/toast-context'

export default function AddBookPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      if (!response.ok) {
        throw new Error('Erro ao adicionar livro')
      }

      // Toast de sucesso
      addToast({
        title: 'Livro adicionado!',
        description: `"${bookData.title}" foi adicionado à sua biblioteca.`,
        variant: 'success'
      })

      // Redirecionar para a lista de livros após sucesso
      router.push('/livros')
      router.refresh() // Forçar atualização dos dados
    } catch (error) {
      console.error('Erro ao adicionar livro:', error)
      
      // Toast de erro
      addToast({
        title: 'Erro ao adicionar livro',
        description: 'Verifique os dados e tente novamente.',
        variant: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Adicionar Novo Livro
        </h1>
        <p className="text-muted-foreground">
          Preencha as informações do livro que deseja adicionar à sua biblioteca.
        </p>
      </div>

      <BookForm 
        onSubmit={handleAddBook}
        submitText="Adicionar Livro"
        isLoading={isLoading}
      />
    </div>
  )
}