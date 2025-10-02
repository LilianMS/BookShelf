import { NextRequest, NextResponse } from 'next/server'
import { Book } from '@/types/books'
import booksData from '@/data/books.json'


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const books: Book[] = booksData as Book[]
    const book = books.find((b) => b.id === id)

    if (book) {
        return NextResponse.json(book, { status: 200 })
    } else {
        return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 })
    }
}


export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const books: Book[] = booksData as Book[]
        const bookIndex = books.findIndex(book => book.id === id)

        if (bookIndex === -1) {
            return NextResponse.json(
                { error: 'Livro não encontrado' },
                { status: 404 }
            )
        }

        const updatedBook: Book = {
            ...books[bookIndex],
            ...body,
            id
        }

        return NextResponse.json(updatedBook, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao atualizar livro' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const books: Book[] = booksData as Book[]
        const bookIndex = books.findIndex(book => book.id === id)

        if (bookIndex === -1) {
            return NextResponse.json(
                { error: 'Livro não encontrado' },
                { status: 404 }
            )
        }

        const deletedBook = books[bookIndex]
        // remover o livro ...
        return NextResponse.json(
            {
                message: 'Livro excluído com sucesso',
                deletedBook: deletedBook
            },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao excluir livro' },
            { status: 500 }
        )
    }
}