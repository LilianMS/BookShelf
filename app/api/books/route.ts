import { NextRequest, NextResponse } from 'next/server'
import { Book } from '@/types/books'
import booksData from '@/data/books.json'


export async function GET() {
    try {
        const books: Book[] = booksData as Book[]
        return NextResponse.json(books, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar livros' },
            { status: 500 }
        )
    }

}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if (!body.title || !body.author) {
            return NextResponse.json({ error: 'Título e autor são obrigatórios' }, { status: 400 })
        }

        const newBook: Book = {
            id: Date.now().toString(),
            title: body.title,
            author: body.author,
            publisher: body.publisher || '',
            genre: body.genre || 'Ficção',
            year: body.year || new Date().getFullYear(),
            pages: body.pages || 0,
            language: body.language || 'Português',
            rating: body.rating || 5,
            synopsis: body.synopsis || '',
            cover: body.cover || '',
            status: body.status || 'QUERO-LER'
        }
        return NextResponse.json(newBook, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar livro' },
            { status: 500 }
        )
    }
}