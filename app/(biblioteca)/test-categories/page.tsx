'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Category {
  name: string;
  count: number;
}

interface CategoriesResponse {
  genres: Category[];
  total: number;
}

export default function TestCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/categories');
      const data: CategoriesResponse = await response.json();
      setCategories(data.genres);
      setResult(`✅ Carregadas ${data.total} categorias`);
    } catch (error) {
      setResult(`❌ Erro ao carregar categorias: ${error}`);
    }
    setLoading(false);
  };

  const addGenre = async () => {
    const genre = prompt('Digite o nome do novo gênero:');
    if (!genre) return;

    try {
      const response = await fetch('/api/categories/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ ${data.message}`);
      } else {
        setResult(`❌ ${data.error}`);
      }
      
      // Recarregar categorias
      loadCategories();
    } catch (error) {
      setResult(`❌ Erro: ${error}`);
    }
  };

  const deleteGenre = async (genreName: string) => {
    if (!confirm(`Deseja remover o gênero "${genreName}"?`)) return;

    try {
      const response = await fetch(`/api/categories/genres/${encodeURIComponent(genreName)}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ ${data.message}`);
      } else {
        setResult(`❌ ${data.error}`);
      }
      
      // Recarregar categorias
      loadCategories();
    } catch (error) {
      setResult(`❌ Erro: ${error}`);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">🧪 Teste de Endpoints de Categorias</h1>
      
      <div className="grid gap-6 mb-6">
        {/* Seção de Ações */}
        <Card>
          <CardHeader>
            <CardTitle>🎮 Ações de Teste</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={loadCategories} 
                disabled={loading}
                variant="outline"
              >
                📋 Listar Categorias
              </Button>
              <Button 
                onClick={addGenre} 
                disabled={loading}
                variant="default"
              >
                ➕ Adicionar Gênero
              </Button>
            </div>
            
            {result && (
              <div className="p-4 bg-muted rounded-lg">
                <strong>Resultado:</strong> {result}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lista de Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>📚 Categorias Encontradas ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Carregando...</div>
            ) : (
              <div className="grid gap-3">
                {categories.map((category) => (
                  <div 
                    key={category.name}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground ml-2">
                        ({category.count} livro{category.count !== 1 ? 's' : ''})
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteGenre(category.name)}
                      disabled={loading}
                    >
                      🗑️ Remover
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Documentação dos Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>📖 Documentação dos Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-green-600">GET /api/categories</h3>
            <p className="text-sm text-muted-foreground">
              Lista todos os gêneros únicos dos livros + contador de livros por gênero
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-600">POST /api/categories/genres</h3>
            <p className="text-sm text-muted-foreground">
              Adiciona um novo gênero (valida se já existe)
            </p>
            <pre className="text-xs bg-muted p-2 rounded mt-1">
              {`{"genre": "Nome do Gênero"}`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold text-red-600">DELETE /api/categories/genres/[genre]</h3>
            <p className="text-sm text-muted-foreground">
              Remove um gênero (só permite se não há livros usando esse gênero)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}