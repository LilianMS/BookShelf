/* eslint-disable @typescript-eslint/no-unused-vars */
import { Book, BookPayload } from '@/types/books';
import { toast } from '@/lib/services/use-toast';

let lastId = 5;
const generateId = () => (++lastId).toString();
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export async function createBook(payload: BookPayload): Promise<Book> {
  const t = toast({ variant: "loading", title: "Adicionando Livro..." });
  await delay(1000);

  try {
    if (!payload.title || !payload.author || !payload.publisher) {
        throw new Error("Dados essenciais (Título, Autor, Editora) estão incompletos.");
    }
    
    const newBook: Book = {
      ...payload,
      id: generateId(),
      status: payload.status || 'QUERO-LER',
      pagesRead: payload.pagesRead ?? 0,
    };

    t.update({
      variant: "success",
      title: "Livro Adicionado!",
      description: `"${newBook.title}" agora está na sua estante.`,
      duration: 3000,
    });

    return newBook;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha desconhecida ao adicionar livro.";
    t.update({
      variant: "destructive",
      title: "Erro ao Adicionar",
      description: message,
      duration: 5000,
    });
    throw error;
  }
}


export async function updateBook(id: string, payload: Book): Promise<Book> {
  const t = toast({ variant: "loading", title: "Atualizando Livro..." });
  await delay(800);
  try {
    
    const updatedBook: Book = { ...payload, id }; 
      
    t.update({
      variant: "success",
      title: "Atualização Completa",
      description: `As informações do livro foram salvas.`,
      duration: 3000,
    });
    
    return updatedBook;

  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha desconhecida ao editar livro.";
    t.update({
      variant: "destructive",
      title: "Erro ao Editar",
      description: message,
      duration: 5000,
    });
    throw error;
  }
}


export async function deleteBook(_id: string): Promise<void> {
  const t = toast({ variant: "loading", title: "Removendo Livro..." });
  await delay(500);

  try {
    
    t.update({
      variant: "success",
      title: "Livro Excluído",
      description: "O item foi removido permanentemente da sua coleção.",
      duration: 4000,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha desconhecida ao excluir livro.";
    t.update({
      variant: "destructive",
      title: "Falha na Exclusão",
      description: message,
      duration: 5000,
    });
    throw error;
  }
}