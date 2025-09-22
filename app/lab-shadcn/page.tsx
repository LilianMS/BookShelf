"use client";

// CSS do laboratório
import "./lab.css";
import "./test-tailwind.css";

// Importando shadcn/ui Button original (problemático)
import { Button } from "@/components/ui/button";

// Importando ButtonFixed (nossa solução)
import { ButtonFixed } from "@/app/lab-shadcn/button-fixed";

// Importando NOSSOS componentes do laboratório
import { 
  LabButton,
  LabCard, 
  LabCardContent, 
  LabCardFooter, 
  LabCardHeader, 
  LabCardTitle 
} from "./components";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function LabShadcnPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Laboratório shadcn/ui - Testes Completos</h1>
      
      {/* Teste 1: CSS Variables no :root */}
      <div className="border-2 border-purple-300 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-purple-700">
          🧪 Teste 1: CSS Variables no :root
        </h2>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .test-css-vars {
              --background: 0 0% 100%;
              --foreground: 240 10% 3.9%;
              --primary: 240 9% 17%;
              --primary-foreground: 0 0% 98%;
              --destructive: 0 84.2% 60.2%;
              --destructive-foreground: 0 0% 98%;
              --secondary: 240 4.8% 95.9%;
              --secondary-foreground: 240 5.9% 10%;
              --border: 240 5.9% 90%;
              --ring: 240 5.9% 10%;
            }
          `
        }} />
        
        <div className="test-css-vars space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button variant="destructive">Destructive Test 1</Button>
            <Button variant="default">Default Test 1</Button>
            <Button variant="secondary">Secondary Test 1</Button>
          </div>
          
          <p className="text-sm text-purple-600 bg-purple-50 p-3 rounded">
            <strong>Teste:</strong> CSS Variables definidas localmente. Se funcionar → problema é escopo global.
          </p>
        </div>
      </div>

      {/* Teste 2: Forçar classes Tailwind customizadas */}
      <div className="border-2 border-orange-300 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-orange-700">
          🧪 Teste 2: Classes Tailwind Personalizadas
        </h2>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-destructive {
              --tw-bg-opacity: 1;
              background-color: rgb(220 38 38 / var(--tw-bg-opacity)) !important;
              --tw-text-opacity: 1;
              color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
            }
            .custom-destructive:hover {
              background-color: rgb(185 28 28 / var(--tw-bg-opacity)) !important;
            }
          `
        }} />
        
        <div className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button variant="destructive" className="custom-destructive">
              Destructive + CSS Override
            </Button>
            <Button variant="destructive" className="!bg-red-600 !text-white hover:!bg-red-700">
              Destructive + Important Classes
            </Button>
          </div>
          
          <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
            <strong>Teste:</strong> Forçar cores com CSS override e classes !important.
          </p>
        </div>
      </div>

      {/* Teste 3: Modificar as classes do shadcn diretamente */}
      <div className="border-2 border-teal-300 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-teal-700">
          🧪 Teste 3: Verificar se bg-destructive existe no Tailwind
        </h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="bg-destructive text-destructive-foreground p-2 rounded">
              Div com bg-destructive
            </div>
            <div className="bg-red-600 text-white p-2 rounded">
              Div com bg-red-600 (controle)
            </div>
          </div>
          
          <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded">
            <strong>Teste:</strong> Verificar se o Tailwind reconhece bg-destructive como classe válida.
          </p>
        </div>
      </div>

      {/* Teste 4: Nossa solução ButtonFixed (controle) */}
      <div className="border-2 border-green-300 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-green-700">
          ✅ Controle: Nossa Solução ButtonFixed (que sabemos que funciona)
        </h2>
        
        <div className="flex gap-4 flex-wrap">
          <ButtonFixed variant="destructive">ButtonFixed Destructive</ButtonFixed>
          <ButtonFixed variant="default">ButtonFixed Default</ButtonFixed>
          <ButtonFixed variant="secondary">ButtonFixed Secondary</ButtonFixed>
        </div>
        
        <p className="text-sm text-green-600 bg-green-50 p-3 rounded">
          <strong>✅ Funciona:</strong> Estas DEVEM funcionar (nossa solução de referência).
        </p>
      </div>

      {/* Teste 5: CSS Classes manuais */}
      <div className="border-2 border-indigo-300 p-4 rounded">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          🧪 Teste 5: Classes CSS Manuais + CSS Variables
        </h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <button className="test-manual-destructive">
              CSS Manual + Variables
            </button>
            <Button variant="destructive">
              shadcn/ui após CSS fix
            </Button>
          </div>
          
          <p className="text-sm text-indigo-600 bg-indigo-50 p-3 rounded">
            <strong>Teste:</strong> CSS Variables globais + classes manuais. Se funcionar → shadcn/ui pode ser "consertado".
          </p>
        </div>
      </div>

      {/* Resumo dos Resultados */}
      <div className="border-2 border-gray-400 p-4 rounded bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          📊 Análise dos Resultados
        </h2>
        
        <div className="space-y-2 text-sm">
          <p><strong>Se Teste 1 funcionar:</strong> Problema é escopo das CSS Variables</p>
          <p><strong>Se Teste 2 funcionar:</strong> Tailwind funciona, problema é mapeamento das classes</p>
          <p><strong>Se Teste 3 falhar:</strong> bg-destructive não é reconhecida pelo Tailwind</p>
          <p><strong>Se Teste 4 sempre funciona:</strong> Nossa solução é válida</p>
          <p><strong>Se Teste 5 funcionar:</strong> shadcn/ui pode ser "consertado" com configuração</p>
        </div>
      </div>

      {/* Seção: Nossos componentes para comparação */}
      <div className="lab-section working">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          🔵 COMPARAÇÃO: Nossos Componentes (Sempre funcionam)
        </h2>
        
        <LabCard>
          <LabCardHeader>
            <LabCardTitle>Nossos Componentes (Tailwind Puro)</LabCardTitle>
          </LabCardHeader>
          <LabCardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <LabButton variant="default">Default</LabButton>
              <LabButton variant="destructive">Destructive</LabButton>
              <LabButton variant="outline">Outline</LabButton>
              <LabButton variant="secondary">Secondary</LabButton>
              <LabButton variant="ghost">Ghost</LabButton>
              <LabButton variant="link">Link</LabButton>
            </div>
            
            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded">
              <p><strong>💡 Referência:</strong> Assim que deveria ficar o shadcn/ui!</p>
            </div>
          </LabCardContent>
        </LabCard>
      </div>

      {/* Seção: Explicação técnica */}
      <LabCard>
        <LabCardHeader>
          <LabCardTitle>🔧 O que fizemos para corrigir</LabCardTitle>
        </LabCardHeader>
        <LabCardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">1. Criamos arquivo CSS isolado:</h4>
            <code className="text-sm bg-white p-2 rounded block">app/lab-shadcn/lab.css</code>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">2. Definimos CSS Variables:</h4>
            <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`.lab-shadcn-theme {
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --primary: 240 9% 17%;
  /* etc... */
}`}
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold mb-2">3. Aplicamos a classe:</h4>
            <code className="text-sm bg-white p-2 rounded block">
              className="lab-shadcn-theme"
            </code>
          </div>
          
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <p className="text-green-700 font-semibold">
              ✅ Resultado: shadcn/ui funciona perfeitamente na seção verde!
            </p>
          </div>
        </LabCardContent>
      </LabCard>

      {/* Seção 3: Button Sizes */}
      <LabCard>
        <LabCardHeader>
          <LabCardTitle>3. Tamanhos dos Botões</LabCardTitle>
        </LabCardHeader>
        <LabCardContent className="space-y-4">
          <div className="flex gap-4 items-center flex-wrap">
            <LabButton size="sm">Small</LabButton>
            <LabButton size="default">Default</LabButton>
            <LabButton size="lg">Large</LabButton>
            <LabButton size="icon">🔥</LabButton>
          </div>
        </LabCardContent>
      </LabCard>

      {/* Seção 4: Cards Comparação */}
      <LabCard>
        <LabCardHeader>
          <LabCardTitle>4. Cards - shadcn/ui vs Nossos</LabCardTitle>
        </LabCardHeader>
        <LabCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card shadcn/ui original */}
            <div>
              <h4 className="font-semibold mb-2 text-red-600">❌ shadcn/ui Original:</h4>
              <Card>
                <CardHeader>
                  <CardTitle>Card Problemático</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Pode ter problemas de estilo...</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Ação</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Nosso card */}
            <div>
              <h4 className="font-semibold mb-2 text-green-600">✅ Nosso Card:</h4>
              <LabCard>
                <LabCardHeader>
                  <LabCardTitle>Card Funcional</LabCardTitle>
                </LabCardHeader>
                <LabCardContent>
                  <p>Funciona perfeitamente!</p>
                </LabCardContent>
                <LabCardFooter>
                  <LabButton size="sm" variant="destructive">Ação</LabButton>
                </LabCardFooter>
              </LabCard>
            </div>
          </div>
        </LabCardContent>
      </LabCard>

      {/* Seção 5: Explicação do Código */}
      <LabCard>
        <LabCardHeader>
          <LabCardTitle>5. � Diferença no Código</LabCardTitle>
        </LabCardHeader>
        <LabCardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            <div className="bg-red-50 p-4 rounded border border-red-200">
              <h4 className="font-semibold text-red-700 mb-2">❌ shadcn/ui (Não funciona)</h4>
              <pre className="text-xs overflow-x-auto">
{`// Usa CSS Variables que não existem
destructive: "bg-destructive text-white"

// bg-destructive = hsl(var(--destructive))
// Mas --destructive não está definida!`}
              </pre>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <h4 className="font-semibold text-green-700 mb-2">✅ Nosso (Funciona)</h4>
              <pre className="text-xs overflow-x-auto">
{`// Usa cores Tailwind diretas
destructive: "bg-red-600 text-white hover:bg-red-700"

// bg-red-600 = cor Tailwind real
// Funciona sempre!`}
              </pre>
            </div>
          </div>
        </LabCardContent>
      </LabCard>

      {/* Seção 6: Como usar nossos componentes */}
      <LabCard>
        <LabCardHeader>
          <LabCardTitle>6. � Como usar nossos componentes</LabCardTitle>
        </LabCardHeader>
        <LabCardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// Import dos NOSSOS componentes
import { LabButton, LabCard, LabCardContent } from "./components";

// Uso (IGUAL ao shadcn/ui, mas funciona!)
<LabButton variant="destructive" size="sm">
  Deletar
</LabButton>

<LabCard>
  <LabCardHeader>
    <LabCardTitle>Título</LabCardTitle>
  </LabCardHeader>
  <LabCardContent>
    Conteúdo que funciona!
  </LabCardContent>
</LabCard>`}
          </pre>
        </LabCardContent>
      </LabCard>
    </div>
  );
}
