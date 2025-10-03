import { NextResponse } from 'next/server'
import { BookStorage } from '@/lib/bookStorage'

export async function GET() {
  try {
    const books = await BookStorage.readBooks()
    
    // Extrair gêneros únicos dos livros
    const genres = [...new Set(books.map(book => book.genre))].sort()
    
    // Contar livros por gênero
    const categoriesWithCount = genres.map(genre => ({
      name: genre,
      count: books.filter(book => book.genre === genre).length
    }))

    return NextResponse.json({
      genres: categoriesWithCount,
      total: genres.length
    }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
}