"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { Book, BookPayload, BookWithProgress } from "@/types/books";
import * as BookService from "@/lib/services/BookService";
import { toast } from "@/lib/services/use-toast";


// --- DADOS INICIAIS ---
const initialBooksFromSource: Book[] = [
    {
        id: "1",
        title: "O Programador Apaixonado",
        author: "Fowler Chad",
        publisher:"Casa do Codigo",
        genre: "Tecnologia",
        year: 2014,
        pages: 255,
        language:"Português",
        rating: 4,
        synopsis: "Para ter sucesso no mercado de TI atual, é preciso ver sua carreira como se fosse um negócio...",
        cover: "https://m.media-amazon.com/images/I/81dBiDT7qTL._SL1500_.jpg",
        status: "LENDO",
        pagesRead: 100
    },
    {
        id: "2",
        title: "Entendendo Algoritmos",
        author: "Aditya Y. Bhargava",
        publisher:"Novatec",
        genre: "Tecnologia",
        year: 2017,
        pages: 264,
        language:"Português",
        rating: 5,
        synopsis: "O livro Entendendo Algoritmos apresenta uma abordagem agradável para esse tópico essencial...",
        cover: "https://m.media-amazon.com/images/I/71Vkg7GfPFL._SL1296_.jpg",
        status: "LIDO",
        pagesRead: 264
    },
    {
        id: "3",
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        publisher:"HarperCollins",
        genre: "Infantil",
        year: 2018,
        pages: 96,
        language:"Português",
        rating: 5,
        synopsis: "Um livro para todos os públicos, O pequeno príncipe é uma obra atemporal...",
        cover: "https://m.media-amazon.com/images/I/81TmOZIXvzL._SL1500_.jpg",
        status: "QUERO-LER",
        pagesRead: 0
    },
    {
        id: "4",
        title: "Iracema",
        author: "Jose de Alencar",
        publisher:"Principis",
        genre:"Literatura Brasileira",
        year: 2022,
        pages: 128,
        language:"Português",
        rating: 3,
        synopsis: "A pitiguara Iracema, a 'virgem dos lábios de mel', encontra nas florestas da orla cearense o português Martim. Uma espécie de poema em prosa, o conturbado amor proibido mostra o conflito histórico entre tribos indígenas e europeus e revela, com lirismo e aventura, a contradição e o embate entre civilizações.",
        cover: "https://m.media-amazon.com/images/I/71LCDi6E2oL._SL1500_.jpg",
        status: "QUERO-LER",
        pagesRead: 0
    },
    {
        id: "5",
        title: "Dom Casmurro",
        author: "Machado de Assis",
        publisher:"Principis",
        genre: "Literatura Brasileira",
        year: 1899,
        pages: 240,
        language:"Português",
        rating: 5,
        synopsis: "O livro é narrado por Bentinho, que, na velhice, relata sua história e a de seu grande amor, Capitu...",
        cover: "https://m.media-amazon.com/images/I/61x1ZHomWUL._SL1200_.jpg",
        status: "LIDO",
        pagesRead: 240
    }
];

// --- TIPAGEM ESSENCIAL ---

interface StatsType {
    totalBooks: number;
    readingBooks: number;
    finishedBooks: number;
    pagesRead: number;
    avgRating: number;
    wantToReadBooks: number;
}

export type BookFormData = Omit<Book, 'id'>;


interface BooksContextType {
  booksWithProgress: BookWithProgress[];
  addBook: (book: BookPayload) => Promise<Book>; // Retorna o Book para obter o ID
  updateBook: (id: string, book: BookPayload) => Promise<Book>; // Retorna o Book atualizado
  deleteBook: (id: string) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  loading: boolean;
  stats: StatsType;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

// --- FUNÇÕES DE CÁLCULO ---

const calculateProgress = (book: Book): number => {
    if (book.status === 'LIDO') return 100;
    // Garante que pagesRead e pages não são undefined e pages > 0 para o cálculo
    if (book.pagesRead === undefined || book.pagesRead === 0 || book.pages === 0) return 0;
    
    return Math.min(100, Math.floor(((book.pagesRead || 0) / book.pages) * 100));
};

const checkDuplicate = (
  books: Book[],
  book: BookPayload | Book
): boolean => {
  return books.some(
    (b) =>
      b.id !== (book as Book).id &&
      b.title.trim().toLowerCase() === book.title.trim().toLowerCase() &&
      b.author.trim().toLowerCase() === book.author.trim().toLowerCase()
  );
};


// --- PROVIDER ---

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>(initialBooksFromSource);
  const [loading] = useState(false);

  // CRÍTICO: Cálculo otimizado de booksWithProgress e stats
  const booksWithProgress: BookWithProgress[] = useMemo(() => {
      return books.map(book => ({
          ...book,
          progress: calculateProgress(book),
      }));
  }, [books]);

  const stats: StatsType = useMemo(() => {
    const initialStats: StatsType = {
        totalBooks: 0,
        readingBooks: 0,
        finishedBooks: 0,
        pagesRead: 0,
        avgRating: 0,
        wantToReadBooks: 0,
    };
    
    const calculation = books.reduce((acc, book) => {
        acc.totalBooks += 1;
        acc.pagesRead += book.pagesRead || 0;
        
        if (book.status === 'LENDO' || book.status === 'PAUSADO') {
            acc.readingBooks += 1;
        } else if (book.status === 'LIDO') {
            acc.finishedBooks += 1;
        } else if (book.status === 'QUERO-LER') {
            acc.wantToReadBooks += 1;
        }
        
        return acc;
    }, initialStats);

    const ratedBooks = books.filter(b => (b.rating || 0) > 0);
    const totalRating = ratedBooks.reduce((sum, b) => sum + (b.rating || 0), 0);
    
    calculation.avgRating = ratedBooks.length > 0 ? parseFloat((totalRating / ratedBooks.length).toFixed(2)) : 0;
    
    return calculation;
  }, [books]);


  // --- OPERAÇÕES CRUD ---

  const addBook = useCallback(async (newBook: BookPayload): Promise<Book> => {
    if (checkDuplicate(books, newBook)) {
      toast({
        title: "Erro de Validação",
        description: "Este livro (título e autor) já existe na sua biblioteca.",
        variant: "destructive",
      });
      // Lança um erro para interromper a submissão e o 'finally' do formulário
      throw new Error("Duplicata detectada"); 
    }

    try {
      const bookWithId = await BookService.createBook(newBook);
      setBooks((prev) => [...prev, bookWithId]);
      return bookWithId; // CRÍTICO: Retorna o livro com o ID
    } catch (error) {
      // O BookService já trata o Toast de erro, apenas re-lançamos a exceção.
      throw error; 
    }
  }, [books]);


  const updateBook = useCallback(async (id: string, payload: BookPayload): Promise<Book> => {
    const updatedBook = { ...payload, id };
    
    // Converte o payload para o tipo Book para usar no checkDuplicate
    const bookForCheck: Book = { ...updatedBook, id, pagesRead: updatedBook.pagesRead ?? 0 };

    if (checkDuplicate(books, bookForCheck)) {
      toast({
        title: "Erro de Validação",
        description: "Este livro (título e autor) já existe na sua biblioteca!",
        variant: "destructive",
      });
      // Lança um erro para interromper a submissão e o 'finally' do formulário
      throw new Error("Duplicata detectada");
    }

    try {
      // Usamos BookPayload aqui, mas o BookService espera o BookEditPayload, que é Book
      const savedBook = await BookService.updateBook(id, bookForCheck); 
      setBooks((prev) =>
        prev.map((b) => (b.id === savedBook.id ? savedBook : b))
      );
      return savedBook; // CRÍTICO: Retorna o livro atualizado
    } catch (error) {
      throw error;
    }
  }, [books]);


  const deleteBook = useCallback(async (id: string): Promise<void> => {
    try {
      await BookService.deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      // O toast de sucesso é tratado pelo BookService
    } catch (error) {
      throw error;
    }
  
  }, []);


  const getBookById = useCallback(
    (id: string) => {
      return books.find((book) => book.id === id);
    },
    [books]
  );

  return (
    <BooksContext.Provider
      value={{ booksWithProgress, addBook, updateBook, deleteBook, getBookById, loading, stats }}
    >
      {children}
    </BooksContext.Provider>
  );
};

// --- Hook customizado ---
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks deve ser usado dentro de um BooksProvider");
  }
  return context;
};