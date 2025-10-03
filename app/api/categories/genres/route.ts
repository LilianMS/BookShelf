import { NextRequest, NextResponse } from 'next/server'
import { BookStorage } from '@/lib/bookStorage'
import { bookGenre } from '@/types/books'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { genre } = body

    if (!genre || typeof genre !== 'string') {
      return NextResponse.json(
        { error: 'Nome do gênero é obrigatório' },
        { status: 400 }
      )
    }

    const books = await BookStorage.readBooks()
    const existingGenres = [...new Set(books.map(book => book.genre))]
    
    if (existingGenres.includes(genre as bookGenre)) {
      return NextResponse.json(
        { error: 'Gênero já existe' },
        { status: 409 }
      )
    }

    return NextResponse.json({
      message: `Gênero "${genre}" pode ser adicionado`,
      genre: genre
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar gênero:', error)
    return NextResponse.json(
      { error: 'Erro ao adicionar gênero' },
      { status: 500 }
    )
  }
}