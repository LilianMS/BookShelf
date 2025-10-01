"use client";

import { useMemo, useState, useEffect } from "react";
import { Book, bookGenre, bookStatus, BookPayload } from "@/types/books";
import { useBooks, BookFormData } from "@/contexts/BooksContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type FormStateType = BookFormData & Partial<Pick<Book, 'id'>>;

interface BookFormProps {
  initialData?: Book;
  isEditMode: boolean;
  onSuccess?: (id: string) => void;
}

const defaultInitialFormData: FormStateType = {
  title: "",
  author: "",
  publisher: "",
  genre: "Ficção",
  year: new Date().getFullYear(),
  pages: 1,
  language: "Português",
  rating: 0,
  synopsis: "",
  cover: "",
  status: "QUERO-LER",
  pagesRead: 0,
};

const genres: bookGenre[] = [
  'Literatura Brasileira', 'Ficção Científica', 'Realismo Mágico', 'Ficção',
  'Fantasia', 'Romance', 'Biografia', 'História', 'Autoajuda', 'Tecnologia',
  'Programação', 'Negócios', 'Psicologia', 'Filosofia', 'Poesia', 'Infantil', 'Outros',
];

const statuses: bookStatus[] = ['QUERO-LER', 'LENDO', 'LIDO', 'ABANDONADO', 'PAUSADO'];

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
  isEditMode,
  onSuccess,
}) => {
  const getInitialFormState = (data?: Book): FormStateType => {
    return data
      ? ({ ...data, id: data.id } as FormStateType)
      : defaultInitialFormData;
  };

  const [formData, setFormData] = useState<FormStateType>(getInitialFormState(initialData));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addBook, updateBook } = useBooks();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setFormData(getInitialFormState(initialData));
  }, [initialData]);

  const isFormDirty = useMemo(() => {
    if (!isEditMode || !initialData) return true;
    
    const currentDataForComparison = { ...formData };
    delete currentDataForComparison.id;
    const initialDataForComparison = { ...initialData };
    delete initialDataForComparison.id;

    return JSON.stringify(currentDataForComparison) !== JSON.stringify(initialDataForComparison);
  }, [formData, initialData, isEditMode]);


  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const currentYear = new Date().getFullYear();
    let isDataCleaned = false;
    
    if (!formData.title?.trim()) newErrors.title = "O Título é obrigatório.";
    if (!formData.author?.trim()) newErrors.author = "O Autor é obrigatório.";
    if (!formData.publisher?.trim()) newErrors.publisher = "A Editora é obrigatória.";
    if (!formData.genre) newErrors.genre = "O Gênero é obrigatório.";
    
    const pages = formData.pages ?? 0;
    const year = formData.year ?? 0;
    const rating = formData.rating ?? 0;
    const pagesRead = formData.pagesRead ?? 0;

    if (pages <= 0) newErrors.pages = "Páginas deve ser um número positivo válido.";
    if (year > currentYear || year < 1000) newErrors.year = `Ano inválido (deve ser entre 1000 e ${currentYear}).`;
    if (rating < 0 || rating > 5) newErrors.rating = "A Avaliação deve ser entre 0 e 5.";
    
    let cleanedPagesRead: number | undefined = pagesRead;
    
    if (formData.status === 'LIDO') {
        if (pagesRead !== pages) {
            cleanedPagesRead = pages;
            isDataCleaned = true;
        }
    } else if (formData.status === 'QUERO-LER' || formData.status === 'ABANDONADO') {
        if (pagesRead !== 0) {
            cleanedPagesRead = 0;
            isDataCleaned = true;
        }
    } else if (formData.status === 'LENDO' || formData.status === 'PAUSADO') {
        if (pagesRead < 1 || pagesRead >= pages) {
            newErrors.pagesRead = `Páginas lidas devem ser entre 1 e ${pages - 1}.`;
        }
    }
    
    if (isDataCleaned) {
        setFormData(prev => ({...prev, pagesRead: cleanedPagesRead! }));
        setErrors({}); 
        
        toast({
          title: "Ajuste Automático",
          description: "O número de páginas lidas foi ajustado conforme o status de leitura.",
          variant: "default",
          duration: 2000,
        });
        
        return false;
    }

    setErrors(newErrors);
    
    if(Object.keys(newErrors).length > 0) {
      toast({
          title: "Campos Inválidos",
          description: "Por favor, corrija os erros no formulário para salvar.",
          variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    let newValue: string | number | undefined = value;

    if (id === "year" || id === "pages" || id === "pagesRead" || id === "rating") {
      newValue = parseInt(value, 10);
      if (isNaN(newValue)) {
        newValue = 0;
      }
    }

    setFormData((prev) => ({ ...prev, [id]: newValue }));
    
    // CORREÇÃO CRÍTICA: Remove a chave em vez de definir como 'undefined'
    setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[id];
        return nextErrors;
    });
  };

  const handleSelectChange = (id: 'genre' | 'status', value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value as bookGenre | bookStatus }));
    
    // CORREÇÃO CRÍTICA: Remove a chave em vez de definir como 'undefined'
    setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[id];
        return nextErrors;
    });
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
    
    // CORREÇÃO CRÍTICA: Remove a chave em vez de definir como 'undefined'
    setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors.rating;
        return nextErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload: BookPayload = {
        title: formData.title || "",
        author: formData.author || "",
        publisher: formData.publisher || "",
        genre: formData.genre || defaultInitialFormData.genre,
        year: formData.year ?? defaultInitialFormData.year,
        pages: formData.pages ?? defaultInitialFormData.pages,
        language: formData.language || defaultInitialFormData.language,
        synopsis: formData.synopsis || defaultInitialFormData.synopsis,
        cover: formData.cover || defaultInitialFormData.cover,
        rating: formData.rating ?? defaultInitialFormData.rating,
        status: formData.status || defaultInitialFormData.status,
        pagesRead: formData.pagesRead ?? defaultInitialFormData.pagesRead,
      };

      let resultBook: Book;

      if (isEditMode && formData.id) {
        resultBook = await updateBook(formData.id, payload);
        toast({
          title: "Sucesso!",
          description: `O livro "${payload.title}" foi atualizado com sucesso.`,
          variant: "success",
        });
      } else {
        resultBook = await addBook(payload);
      }

      if (onSuccess) {
        onSuccess(resultBook.id);
      } else {
        router.push(`/livros/${resultBook.id}`);
      }

    } catch (error) {
      console.error("Erro na submissão do formulário:", error);
      toast({
          title: "Erro na Operação",
          description: "Não foi possível salvar o livro. Verifique o console.",
          variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleText = isEditMode ? "Editar Livro" : "Adicionar Novo Livro";
  const isDisabled = isSubmitting || (isEditMode && !isFormDirty); 

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-card rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-card-foreground">{titleText}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
            <Input id="title" value={formData.title || ""} onChange={handleChange} placeholder="Ex: O Senhor dos Anéis" aria-invalid={!!errors.title} disabled={isDisabled} />
            {errors.title && (<p className="text-red-500 text-sm">{errors.title}</p>)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)} disabled={isDisabled}>
              <SelectTrigger id="status" aria-invalid={!!errors.status}>
                <SelectValue placeholder="Status de Leitura" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
              </SelectContent>
            </Select>
            {errors.status && (<p className="text-red-500 text-sm">{errors.status}</p>)}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="author">Autor <span className="text-red-500">*</span></Label>
            <Input id="author" value={formData.author || ""} onChange={handleChange} placeholder="Ex: J.R.R. Tolkien" aria-invalid={!!errors.author} disabled={isDisabled} />
            {errors.author && (<p className="text-red-500 text-sm">{errors.author}</p>)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="publisher">Editora <span className="text-red-500">*</span></Label>
            <Input id="publisher" value={formData.publisher || ""} onChange={handleChange} placeholder="Ex: Martins Fontes" aria-invalid={!!errors.publisher} disabled={isDisabled} />
            {errors.publisher && (<p className="text-red-500 text-sm">{errors.publisher}</p>)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Gênero <span className="text-red-500">*</span></Label>
            <Select value={formData.genre} onValueChange={(val) => handleSelectChange("genre", val)} disabled={isDisabled}>
              <SelectTrigger id="genre" aria-invalid={!!errors.genre}>
                <SelectValue placeholder="Selecione o Gênero" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (<SelectItem key={g} value={g}>{g}</SelectItem>))}
              </SelectContent>
            </Select>
            {errors.genre && (<p className="text-red-500 text-sm">{errors.genre}</p>)}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Ano de Publicação <span className="text-red-500">*</span></Label>
            <Input id="year" type="number" value={formData.year || ""} onChange={handleChange} placeholder="2024" aria-invalid={!!errors.year} disabled={isDisabled} />
            {errors.year && (<p className="text-red-500 text-sm">{errors.year}</p>)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pages">Páginas Totais <span className="text-red-500">*</span></Label>
            <Input id="pages" type="number" value={formData.pages || ""} onChange={handleChange} placeholder="1200" aria-invalid={!!errors.pages} disabled={isDisabled} />
            {errors.pages && (<p className="text-red-500 text-sm">{errors.pages}</p>)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pagesRead">Páginas Lidas</Label>
            <Input id="pagesRead" type="number" value={formData.pagesRead || 0} onChange={handleChange} placeholder="0" aria-invalid={!!errors.pagesRead} disabled={isDisabled || formData.status === 'QUERO-LER' || formData.status === 'ABANDONADO'} />
            {errors.pagesRead && (<p className="text-red-500 text-sm">{errors.pagesRead}</p>)}
          </div>
        </div>

        
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Input id="language" value={formData.language || ""} onChange={handleChange} placeholder="Ex: Inglês" disabled={isDisabled} />
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="cover">URL da Capa</Label>
                <Input id="cover" value={formData.cover || ""} onChange={handleChange} placeholder="http://exemplo.com/capa.jpg" disabled={isDisabled} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="rating">Avaliação (1-5)</Label>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer transition-colors ${
                                (formData.rating || 0) >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => handleRatingChange(star)}
                            />
                        ))}
                    </div>
                    {errors.rating && (<p className="text-red-500 text-sm">{errors.rating}</p>)}
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                    <Label htmlFor="synopsis">Sinopse</Label>
                    <Textarea id="synopsis" value={formData.synopsis || ""} onChange={handleChange} placeholder="Resumo do livro..." rows={3} disabled={isDisabled} />
                </div>
            </div>
        </div>


        
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
          disabled={isDisabled}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditMode ? "Salvando..." : "Adicionando..."}
            </span>
          ) : isEditMode ? (
            "Salvar Alterações"
          ) : (
            "Adicionar Livro"
          )
          }
        </Button>
      </form>
    </div>
  );
};