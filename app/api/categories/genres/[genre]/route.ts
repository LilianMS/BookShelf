import { NextRequest, NextResponse } from 'next/server'
import { BookStorage } from '@/lib/bookStorage'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> }
) {
  try {
    const { genre } = await params
    
    if (!genre) {
      return NextResponse.json(
        { error: 'Gênero é obrigatório' },
        { status: 400 }
      )
    }

    const books = await BookStorage.readBooks()
    const booksWithGenre = books.filter(book => book.genre === decodeURIComponent(genre))
    
    if (booksWithGenre.length > 0) {
      return NextResponse.json(
        { 
          error: `Não é possível remover o gênero "${decodeURIComponent(genre)}" pois existem ${booksWithGenre.length} livro(s) cadastrado(s) com este gênero`,
          booksCount: booksWithGenre.length
        },
        { status: 409 }
      )
    }

    return NextResponse.json({
      message: `Gênero "${decodeURIComponent(genre)}" pode ser removido`,
      genre: decodeURIComponent(genre)
    }, { status: 200 })
    
  } catch (error) {
    console.error('Erro ao remover gênero:', error)
    return NextResponse.json(
      { error: 'Erro ao remover gênero' },
      { status: 500 }
    )
  }
}