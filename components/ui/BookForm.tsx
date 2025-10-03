'use client';

import { Book, bookGenre, bookStatus } from "@/types/books";
import { useState, FormEvent } from "react";
import StarRating from "@/components/ui/StarRating";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface BookFormProps {
  initialData?: Partial<Book>
  
  // Para Server Actions (novo - recomendado)
  action?: (formData: FormData) => Promise<void>
  
  // Para fetch tradicional (mantido para compatibilidade)
  onSubmit?: (bookData: Omit<Book, 'id'>) => Promise<void>
  
  submitText?: string
  isLoading?: boolean
}

const GENRE_OPTIONS: bookGenre[] = [
  'Literatura Brasileira',
  'Ficção Científica',
  'Realismo Mágico',
  'Ficção',
  'Fantasia',
  'Romance',
  'Biografia',
  'História',
  'Autoajuda',
  'Tecnologia',
  'Programação',
  'Negócios',
  'Psicologia',
  'Filosofia',
  'Poesia',
  'Infantil'
];

const STATUS_OPTIONS: bookStatus[] = [
  'QUERO-LER',
  'LENDO',
  'LIDO',
  'ABANDONADO',
  'PAUSADO'
];

export default function BookForm({
  initialData,
  action,
  onSubmit,
  submitText = "Salvar",
  isLoading = false
}: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [publisher, setPublisher] = useState(initialData?.publisher || '');
  const [genre, setGenre] = useState<bookGenre>(initialData?.genre || 'Ficção');
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear());
  const [pages, setPages] = useState(initialData?.pages || 0);
  const [language, setLanguage] = useState(initialData?.language || 'Português');
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [synopsis, setSynopsis] = useState(initialData?.synopsis || '');
  const [cover, setCover] = useState(initialData?.cover || '');
  const [status, setStatus] = useState<bookStatus>(initialData?.status || 'QUERO-LER');

  // Função para lidar com onSubmit tradicional (fetch)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Se tem Server Action, não usa handleSubmit
    if (action) return;

    const bookData: Omit<Book, 'id'> = {
      title,
      author,
      publisher,
      genre,
      year,
      pages,
      language,
      rating,
      synopsis,
      cover: cover || undefined,
      status
    };

    if (onSubmit) {
      await onSubmit(bookData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card border-border">
        <CardHeader>
          <CardTitle>Informações do Livro</CardTitle>
          <CardDescription>
            Preencha todos os campos obrigatórios marcados com *
          </CardDescription>
        </CardHeader>
        
        <form 
          onSubmit={action ? undefined : handleSubmit}
          action={action}
        >
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
                Título *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 bg-input border border-border rounded-lg 
                focus:outline-none
                focus:ring-2 focus:ring-green-500 focus:border-transparent 
                transition-all
                text-base placeholder:text-muted-foreground"
                placeholder="Digite o título do livro"
              />
            </div>

            {/* Autor */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-card-foreground mb-2">
                Autor *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full p-3 bg-input border border-border rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground placeholder:text-muted-foreground"
                placeholder="Nome do autor"
              />
            </div>

            {/* Editora */}
            <div>
              <label htmlFor="publisher" className="block text-sm font-medium text-card-foreground mb-2">
                Editora *
              </label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground placeholder:text-muted-foreground"
                placeholder="Nome da editora"
              />
            </div>

            {/* Gênero */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-card-foreground mb-2">
                Gênero *
              </label>
              <select
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value as bookGenre)}
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground"
              >
                {GENRE_OPTIONS.map((genreOption) => (
                  <option key={genreOption} value={genreOption}>
                    {genreOption}
                  </option>
                ))}
              </select>
            </div>

            {/* Ano */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-card-foreground mb-2">
                Ano de Publicação *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                min="1000"
                max={new Date().getFullYear() + 1}
                className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground"
              />
            </div>

            {/* Páginas */}
            <div>
              <label htmlFor="pages" className="block text-sm font-medium text-card-foreground mb-2">
                Número de Páginas *
              </label>
              <input
                type="number"
                id="pages"
                name="pages"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                required
                min="1"
                className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground"
              />
            </div>

            {/* Idioma */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-card-foreground mb-2">
                Idioma *
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground placeholder:text-muted-foreground"
                placeholder="Ex: Português, Inglês, Espanhol"
              />
            </div>

            {/* Avaliação */}
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Avaliação *
              </label>
              <div className="p-3 bg-input border border-border rounded-lg">
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  interactive={true}
                  size="lg"
                  className="justify-center"
                />
              </div>
              {/* Campo hidden para Server Actions */}
              <input type="hidden" name="rating" value={rating} />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-card-foreground mb-2">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as bookStatus)}
                required
                className="w-full p-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground"
              >
                {STATUS_OPTIONS.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* URL da Capa */}
            <div className="md:col-span-2">
              <label htmlFor="cover" className="block text-sm font-medium text-card-foreground mb-2">
                URL da Capa (opcional)
              </label>
              <input
                type="url"
                id="cover"
                name="cover"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground placeholder:text-muted-foreground"
                placeholder="https://exemplo.com/capa.jpg"
              />
            </div>

            {/* Sinopse */}
            <div className="md:col-span-2">
              <label htmlFor="synopsis" className="block text-sm font-medium text-card-foreground mb-2">
                Sinopse *
              </label>
              <textarea
                id="synopsis"
                name="synopsis"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                required
                rows={4}
                className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-card-foreground placeholder:text-muted-foreground resize-vertical"
                placeholder="Descreva a sinopse do livro..."
              />
            </div>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 border-t border-border">
            <div className="flex justify-end w-full">
              <button
                type="submit"
                disabled={isLoading}
                aria-live="polite"
                aria-busy={isLoading}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? 'Salvando...' : submitText}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
