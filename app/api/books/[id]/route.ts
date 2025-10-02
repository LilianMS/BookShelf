import { NextRequest, NextResponse } from 'next/server'
import { BookStorage } from '@/lib/bookStorage'


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const book = await BookStorage.getBookById(id)

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
        
        const updatedBook = await BookStorage.updateBook(id, body)

        if (!updatedBook) {
            return NextResponse.json(
                { error: 'Livro não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(updatedBook, { status: 200 })

    } catch (error) {
        console.error('Erro ao atualizar livro:', error)
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
        
        const deletedBook = await BookStorage.deleteBook(id)

        if (!deletedBook) {
            return NextResponse.json(
                { error: 'Livro não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                message: 'Livro excluído com sucesso',
                deletedBook: deletedBook
            },
            { status: 200 }
        )

    } catch (error) {
        console.error('Erro ao excluir livro:', error)
        return NextResponse.json(
            { error: 'Erro ao excluir livro' },
            { status: 500 }
        )
    }
}