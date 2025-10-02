import { promises as fs } from 'fs'
import { join } from 'path'
import { Book } from '@/types/books'

const booksFilePath = join(process.cwd(), 'data', 'books.json')

export class BookStorage {
  // Helper para limpar strings vazias
  private static cleanEmptyStrings(obj: Record<string, unknown>): Record<string, unknown> {
    const cleaned = { ...obj };
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === '') {
        cleaned[key] = undefined;
      }
    });
    return cleaned;
  }

  static async readBooks(): Promise<Book[]> {
    try {
      const fileContents = await fs.readFile(booksFilePath, 'utf8')
      return JSON.parse(fileContents) as Book[]
    } catch (error) {
      console.error('Erro ao ler arquivo de livros:', error)
      return []
    }
  }

  static async writeBooks(books: Book[]): Promise<void> {
    try {
      await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), 'utf8')
    } catch (error) {
      console.error('Erro ao escrever arquivo de livros:', error)
      throw error
    }
  }

  static async addBook(newBook: Omit<Book, 'id'>): Promise<Book> {
    const books = await this.readBooks()
    const cleanedData = this.cleanEmptyStrings(newBook)
    const book = {
      ...cleanedData,
      id: Date.now().toString()
    } as Book
    books.push(book)
    await this.writeBooks(books)
    return book
  }

  static async updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
    const books = await this.readBooks()
    const index = books.findIndex(book => book.id === id)
    
    if (index === -1) {
      return null
    }

    books[index] = { ...books[index], ...this.cleanEmptyStrings(updates), id }
    await this.writeBooks(books)
    return books[index]
  }

  static async deleteBook(id: string): Promise<Book | null> {
    const books = await this.readBooks()
    const index = books.findIndex(book => book.id === id)
    
    if (index === -1) {
      return null
    }

    const deletedBook = books[index]
    books.splice(index, 1)
    await this.writeBooks(books)
    return deletedBook
  }

  static async getBookById(id: string): Promise<Book | null> {
    const books = await this.readBooks()
    return books.find(book => book.id === id) || null
  }
}