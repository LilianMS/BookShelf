'use client'

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/books";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRatingDisplay } from "@/components/ui/StarRating";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteBook } from "@/components/ui/useDeleteBook";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBookCover } from "@/lib/constants";
import { Search } from "lucide-react";

interface SearchParams {
  search?: string;
  genre?: string;
  status?: string;
  sort?: string;
}

interface ListarLivroWithFiltersProps {
  books: Book[];
  initialSearchParams?: SearchParams;
}

export default function ListarLivroWithFilters({ books, initialSearchParams }: ListarLivroWithFiltersProps) {
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState(initialSearchParams?.search || '');
  const [selectedGenre, setSelectedGenre] = useState(initialSearchParams?.genre || '');
  const [selectedStatus, setSelectedStatus] = useState(initialSearchParams?.status || '');
  const [sortBy, setSortBy] = useState(initialSearchParams?.sort || 'title');
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Auto-scroll para busca quando vem do footer
  useEffect(() => {
    if (window.location.hash === '#search') {
      setTimeout(() => {
        document.getElementById('search-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, []);
  
  const availableGenres = [...new Set(books.map(book => book.genre))];
  const availableStatuses = [...new Set(books.map(book => book.status))];

  const { deleteBook, isDeleting } = useDeleteBook({
    onSuccess: () => {
      setBookToDelete(null);
    }
  });

  // Atualizar URL quando filtros mudarem
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (selectedGenre) params.set('genre', selectedGenre);
    if (selectedStatus) params.set('status', selectedStatus);
    if (sortBy !== 'title') params.set('sort', sortBy);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/livros?${queryString}` : '/livros';
    
    // Só atualizar se a URL mudou
    if (window.location.search !== (queryString ? `?${queryString}` : '')) {
      router.replace(newUrl, { scroll: false });
    }
  }, [searchTerm, selectedGenre, selectedStatus, sortBy, router]);

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
    }
  };

  // Aplicar filtros
  const filteredBooks = books.filter((book) => {
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
    const matchesStatus = selectedStatus === '' || book.status === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  // Aplicar ordenação
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'year':
        return b.year - a.year; // Mais recente primeiro
      case 'rating':
        return b.rating - a.rating; // Maior rating primeiro
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Meus Livros</h1>

      {/* Área para Busca e Filtros */}
      <div id="search-section" className="mb-8 p-4 bg-card rounded-lg shadow-md border border-border">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground flex items-center gap-2">
          <Search className="w-5 h-5" />
          Buscar e Filtrar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Campo de busca */}
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            className="p-3 sm:p-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {/* Filtro por gênero */}
          <select
            className="p-3 sm:p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base sm:text-sm"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Todos os gêneros</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          
          {/* Filtro por status */}
          <select
            className="p-3 sm:p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base sm:text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          
          {/* Ordenação */}
          <select
            className="p-3 sm:p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base sm:text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Ordenar por Título</option>
            <option value="author">Ordenar por Autor</option>
            <option value="year">Ordenar por Ano</option>
            <option value="rating">Ordenar por Avaliação</option>
          </select>
        </div>
        
        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-muted-foreground">
          Mostrando {sortedBooks.length} de {books.length} livros
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <Card
            key={book.id}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card border-border"
          >
            <CardHeader className="p-0">
              <Image
                src={getBookCover(book.cover)}
                alt={`Capa do livro ${book.title}`}
                width={300}
                height={400}
                className="w-full h-48 sm:h-64 object-cover"
              />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 flex-grow bg-card">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full border border-primary/20">
                {book.genre}
              </span>
              <CardTitle className="text-lg font-bold text-card-foreground">
                {book.title}
              </CardTitle>
              <p className="text-base sm:text-lg font-bold text-card-foreground">por {book.author}</p>
              <p className="text-xs text-muted-foreground mt-2">Ano: {book.year}</p>
              <div className="mt-2">
                <StarRatingDisplay rating={book.rating} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Status: <span className="font-medium">{book.status}</span>
              </p>
            </CardContent>
            <CardFooter className="p-3 sm:p-4 bg-muted/30 border-t border-border">
              <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href={`/livros/${book.id}`} passHref className="w-full sm:flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Visualizar
                  </Button>
                </Link>

                {/* Agrupamento dos botões secundários */}
                <div className="flex gap-2">
                  <Link href={`/livros/${book.id}/edit`} className="flex-1 sm:flex-none">
                    <Button variant="secondary" className="w-full" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    iconVariant="delete"
                    className="px-3" 
                    onClick={() => handleDeleteClick(book)}
                    aria-label={`Deletar ${book.title}`}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de confirmação de delete */}
      <ConfirmModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Deletar livro"
        description={bookToDelete ? `Tem certeza que deseja deletar "${bookToDelete.title}"? Esta ação não pode ser desfeita.` : ''}
        confirmText="Deletar"
        cancelText="Cancelar"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}