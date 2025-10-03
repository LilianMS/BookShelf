import { NextRequest, NextResponse } from 'next/server'
import { BookStorage } from '@/lib/bookStorage'


export async function GET() {
    try {
        const books = await BookStorage.readBooks()
        return NextResponse.json(books, { status: 200 })
    } catch (error) {
        console.error('Erro ao buscar livros:', error)
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

        const newBookData = {
            title: body.title,
            author: body.author,
            publisher: body.publisher || '',
            genre: body.genre || 'Ficção',
            year: body.year || new Date().getFullYear(),
            pages: body.pages || 0,
            language: body.language || 'Português',
            rating: body.rating || 5,
            synopsis: body.synopsis || '',
            cover: body.cover || undefined, // undefined em vez de string vazia
            status: body.status || 'QUERO-LER'
        }

        const newBook = await BookStorage.addBook(newBookData)
        return NextResponse.json(newBook, { status: 201 })
    } catch (error) {
        console.error('Erro ao criar livro:', error)
        return NextResponse.json(
            { error: 'Erro ao criar livro' },
            { status: 500 }
        )
    }
}