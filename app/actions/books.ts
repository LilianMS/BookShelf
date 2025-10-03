import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { BookStorage } from '@/lib/bookStorage'
import { Book } from '@/types/books'

export async function createBook(formData: FormData) {
  try {
    const bookData = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      publisher: formData.get('publisher') as string || '',
      genre: formData.get('genre') as Book['genre'] || 'Ficção',
      year: parseInt(formData.get('year') as string) || new Date().getFullYear(),
      pages: parseInt(formData.get('pages') as string) || 0,
      language: formData.get('language') as string || 'Português',
      rating: parseInt(formData.get('rating') as string) || 5,
      synopsis: formData.get('synopsis') as string || '',
      cover: formData.get('cover') as string || '',
      status: formData.get('status') as Book['status'] || 'QUERO-LER'
    }

    if (!bookData.title || !bookData.author) {
      throw new Error('Título e autor são obrigatórios')
    }

    await BookStorage.addBook(bookData)
    
    // Revalidar as páginas que mostram livros
    revalidatePath('/livros')
    revalidatePath('/')
    
  } catch (error) {
    console.error('Erro ao criar livro:', error)
    throw error
  }
  
  // Redirecionar para a lista de livros
  redirect('/livros')
}

export async function updateBook(id: string, formData: FormData) {
  try {
    const updates = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      publisher: formData.get('publisher') as string || '',
      genre: formData.get('genre') as Book['genre'] || 'Ficção',
      year: parseInt(formData.get('year') as string) || new Date().getFullYear(),
      pages: parseInt(formData.get('pages') as string) || 0,
      language: formData.get('language') as string || 'Português',
      rating: parseInt(formData.get('rating') as string) || 5,
      synopsis: formData.get('synopsis') as string || '',
      cover: formData.get('cover') as string || '',
      status: formData.get('status') as Book['status'] || 'QUERO-LER'
    }

    if (!updates.title || !updates.author) {
      throw new Error('Título e autor são obrigatórios')
    }

    const updatedBook = await BookStorage.updateBook(id, updates)
    
    if (!updatedBook) {
      throw new Error('Livro não encontrado')
    }
    
    // Revalidar as páginas que mostram livros
    revalidatePath('/livros')
    revalidatePath(`/livros/${id}`)
    revalidatePath('/')
    
  } catch (error) {
    console.error('Erro ao atualizar livro:', error)
    throw error
  }
  
  // Redirecionar para a página do livro
  redirect(`/livros/${id}`)
}

export async function deleteBook(id: string) {
  try {
    const deletedBook = await BookStorage.deleteBook(id)
    
    if (!deletedBook) {
      throw new Error('Livro não encontrado')
    }
    
    // Revalidar TODAS as páginas relacionadas
    revalidatePath('/livros')
    revalidatePath(`/livros/${id}`)
    revalidatePath('/')
    revalidatePath('/livros', 'page') // Força revalidação da página específica
    
    // Revalidar todo o layout se necessário
    revalidatePath('/', 'layout')
    
    return { success: true, message: `"${deletedBook.title}" foi deletado com sucesso` }
  } catch (error) {
    console.error('Erro ao deletar livro:', error)
    throw error
  }
}