'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Book } from '@/types/books'
import BookForm from '@/components/ui/BookForm'
import { useToast } from '@/components/ui/toast-context'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

async function getBookById(id: string): Promise<Book | null> {
    try {
        // No cliente, sempre usar API com cache busting
        const response = await fetch(`/api/books/${id}?_t=` + Date.now(), {
            cache: 'no-store'
        })
        if (!response.ok) {
            return null
        }
        return response.json()
    } catch (error) {
        console.error('Erro ao buscar livro:', error)
        return null
    }
}

export default function EditBookPage({ params }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [book, setBook] = useState<Book | null>(null)
    const [isLoadingBook, setIsLoadingBook] = useState(true)
    const { addToast } = useToast()

    useEffect(() => {
        async function loadBook() {
            const { id } = await params
            const bookData = await getBookById(id)
            setBook(bookData)
            setIsLoadingBook(false)
        }
        loadBook()
    }, [params])

    const handleUpdateBook = async (bookData: Omit<Book, 'id'>) => {
        if (!book) return

        setIsLoading(true)

        try {
            const response = await fetch(`/api/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar livro')
            }

            // Toast de sucesso
            addToast({
                title: 'Livro atualizado!',
                description: `"${bookData.title}" foi atualizado com sucesso.`,
                variant: 'success'
            })

            // Redirecionar para a página de detalhes ou biblioteca
            router.push(`/livros/${book.id}`)
        } catch (error) {
            console.error('Erro ao atualizar livro:', error)

            // Toast de erro
            addToast({
                title: 'Erro ao atualizar livro',
                description: 'Verifique os dados e tente novamente.',
                variant: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoadingBook) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Carregando livro...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Livro não encontrado</h1>
                    <p className="text-muted-foreground mb-6">O livro que você está tentando editar não existe.</p>
                    <Link href="/livros">
                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                            Voltar para Biblioteca
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb/Voltar */}
            <Link
                href={`/livros/${book.id}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors p-2 -m-2 rounded-md hover:bg-muted/50"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm">Voltar para detalhes</span>
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Editar Livro
                </h1>
                <p className="text-muted-foreground">
                    {`Altere as informações de "${book.title}" conforme necessário.`}
                </p>
            </div>

            <BookForm
                initialData={book}
                onSubmit={handleUpdateBook}
                submitText="Atualizar Livro"
                isLoading={isLoading}
            />
        </div>
    )
}