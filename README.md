# Leafly 🌿 – Sua Biblioteca Digital Pessoal

O **Leafly** é uma aplicação web moderna e responsiva para quem deseja **organizar, catalogar e acompanhar o progresso de leitura de seus livros**. A plataforma oferece estatísticas interativas, busca inteligente, sistema de temas adaptativos e uma biblioteca visualmente agradável, ideal para leitores que querem transformar sua coleção em algo prático e inspirador.

---

## ✨ Principais Recursos

- 📊 **Dashboard intuitivo** com estatísticas de leitura: total de livros, progresso, finalizados e páginas lidas
- 📚 **Biblioteca em cards** com capas, títulos, autores e informações detalhadas
- 🔍 **Sistema de busca e filtros** para encontrar facilmente livros por título, autor ou gênero
- 🌙 **Dark Mode completo** com 3 modos (claro/escuro/sistema) e persistência de preferência
- 📱 **Design responsivo** e mobile-first, adaptado para desktop, tablet e celular
- 🎨 **Paleta otimizada** para leitura confortável em dispositivos móveis
- ♿ **Acessibilidade** com contraste WCAG e navegação por teclado

---

## 🚀 Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) (App Router + React 19)
- [React 19](https://react.dev/) (Context API + Hooks)
- [TypeScript](https://www.typescriptlang.org/) (Tipagem completa)
- [Tailwind CSS 4+](https://tailwindcss.com/) (Styling moderno)
- [shadcn/ui](https://ui.shadcn.com/) (Componentes acessíveis)
- [Lucide React](https://lucide.dev/) (Ícones consistentes)

---

## ⚙️ Funcionalidades

### 📊 Dashboard Principal ✅ IMPLEMENTADO

- **Estatísticas dinâmicas** da biblioteca:  
  - 📚 Total de livros cadastrados  
  - ⏱️ Livros sendo lidos  
  - ✅ Livros finalizados  
  - 📖 Total de páginas lidas  
- 🎨 **Cards visuais** com ícones e cores temáticas
- 🚀 **Navegação rápida** para outras seções  
- 📱 **Design responsivo** e mobile-first

### 📚 Biblioteca (Listagem de Livros) ✅ IMPLEMENTADO

- 🃏 **Exibição em cards** com capas, títulos e informações
- � **Sistema de busca** por título ou autor em tempo real
- 🎭 **Filtros por gênero** literário (16+ categorias)
- ⭐ **Sistema de avaliação** visual com estrelas
- 🔗 **Navegação** para detalhes individuais de cada livro

### 👁️ Visualização de Livros ✅ IMPLEMENTADO

- 📖 **Preview detalhado** com todas as informações do livro
- 🖼️ **Capa em alta resolução** com fallback para imagem padrão
- ⭐ **Avaliação visual** com sistema de estrelas
- 📝 **Sinopse completa** e metadados (editora, ano, páginas, idioma)
- 🔙 **Navegação intuitiva** de volta para a biblioteca

### 🌙 Sistema de Temas ✅ IMPLEMENTADO

- ☀️ **Light Mode**: Paleta creme/sépia otimizada para leitura
- 🌙 **Dark Mode**: Tons marrons para reduzir fadiga ocular
- 🖥️ **System Mode**: Detecção automática da preferência do sistema
- 💾 **Persistência**: Salva preferência entre sessões
- � **Toggle intuitivo**: Ciclo entre os 3 modos com ícones visuais

### 📱 Interface Responsiva ✅ IMPLEMENTADO

- 📱 **Mobile-first**: Otimizado para dispositivos móveis
- 🧭 **Navegação adaptativa**: Navbar desktop + Footer mobile
- 👆 **Touch-friendly**: Botões e áreas de toque otimizadas
- ♿ **Acessibilidade**: Contraste WCAG e navegação por teclado

---

## 🚧 Funcionalidades Planejadas

### ➕ Adicionar Novo Livro 🔄 EM DESENVOLVIMENTO

- 📝 **Formulário completo** para cadastro de livros
- 🖼️ **Upload de capa** ou URL de imagem
- ✅ **Validação** de campos obrigatórios
- 💾 **Persistência** em JSON local

### ✏️ Editar Livro 📋 PLANEJADO

- ✏️ **Formulário de edição** com dados pré-preenchidos
- 🔄 **Atualização** de informações existentes
- 🖼️ **Troca de capa** do livro

### 🗑️ Excluir Livro 📋 PLANEJADO

- 🗑️ **Remoção** de livros da biblioteca
- ⚠️ **Confirmação** antes da exclusão
- 🔄 **Atualização** automática das estatísticas

### 📊 Progresso de Leitura 📋 PLANEJADO

- 📈 **Acompanhamento** de páginas lidas
- 📊 **Barra de progresso** visual
- 🎯 **Metas** de leitura personalizadas

---

## 🛠️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

### 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Git](https://git-scm.com/)

Verifique as versões instaladas:

```bash
node -v
npm -v
git --version
```

### 2. Clonar o Repositório

Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/LilianMS/BookShelf.git
```

### 3. Instalar as Dependências

Entre na pasta do projeto e instale as dependências:

```bash
cd BookShelf
npm install
```

### 4. Executar o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

👉 <http://localhost:3000>

---

### 👥 Participantes do projeto

- **Geraldo George Trindade Costa** 
- **Lilian Mendes Silva dos Santos** 
- **Juliana Cristina Alves Fioretti**
- **Edmilson Junior**
- **Christal Camillo**
- **Sarah Santana**

---

## 📖 Estrutura do Projeto

```
Leafly/
├── app/                          # Next.js App Router
│   ├── (biblioteca)/            # Grupo de rotas da biblioteca
│   │   └── livros/              # Páginas dos livros
│   │       ├── [id]/            # Página de detalhes (dinâmica)
│   │       └── page.tsx         # Lista de livros
│   ├── components/              # Componentes React
│   │   ├── DashboardCard.tsx    # Cards do dashboard
│   │   ├── ListarLivro.tsx      # Lista de livros
│   │   ├── PreviewLivro.tsx     # Preview detalhado
│   │   ├── ThemeToggleButton.tsx # Controle de tema
│   │   ├── navbar.tsx           # Navegação principal
│   │   └── FixedFooter.tsx      # Footer mobile
│   ├── globals.css              # Estilos globais + CSS Variables
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial (Dashboard)
├── components/ui/               # Componentes shadcn/ui
├── data/                        # Dados estáticos
│   ├── books.json              # Base de dados dos livros
│   └── dashboard.json          # Dados do dashboard
├── hooks/                       # Custom Hooks
│   └── useTheme.tsx            # Hook de gerenciamento de tema
├── types/                       # Definições TypeScript
│   └── books.ts                # Tipos dos livros
└── public/                     # Arquivos estáticos
    └── images/                 # Imagens do projeto
```

---

## 🎨 Sistema de Design

### 🌈 Paleta de Cores

#### Light Mode (Otimizado para Leitura)
- **Fundo**: Creme suave (`#faf9f6`) para reduzir fadiga ocular
- **Texto**: Cinza azulado (`#3a3f47`) para boa legibilidade
- **Cards**: Tons creme (`#f6f4f0`) para contraste sutil
- **Primária**: Verde marca preservado para identidade visual

#### Dark Mode (Conforto Noturno)  
- **Fundo**: Marrom escuro (`#1f1e1b`) para reduzir blue light
- **Texto**: Creme claro (`#d4d1c9`) para leitura confortável
- **Cards**: Marrom médio (`#26241f`) para hierarquia visual
- **Primária**: Verde claro adaptado para tema escuro

### 📐 Componentes Base

- **Cards**: Layout flexível com hover effects
- **Botões**: Estados visuais claros e feedback tátil
- **Navegação**: Responsiva com breakpoints bem definidos
- **Formulários**: Validação visual e UX intuitiva

---

## 🚀 Próximos Passos

### 🎯 Roadmap de Desenvolvimento

1. **Fase 1 - CRUD Completo** 🔄
   - [ ] Formulário de adição de livros
   - [ ] Sistema de edição inline
   - [ ] Confirmação de exclusão
   - [ ] Persistência em localStorage/API

2. **Fase 2 - Recursos Avançados** 📋
   - [ ] Sistema de progresso de leitura
   - [ ] Metas e estatísticas avançadas
   - [ ] Categorização personalizada
   - [ ] Exportação de dados

3. **Fase 3 - Social & Integração** 📋
   - [ ] Compartilhamento de listas
   - [ ] Integração com APIs de livros
   - [ ] Sistema de recomendações
   - [ ] PWA (Progressive Web App)

### 🐛 Issues Conhecidas

- Funcionalidades de CRUD ainda em desenvolvimento
- Dados hardcoded em JSON (migração para API planejada)
- Algumas animações podem ser otimizadas

---

## 📄 Documentação Adicional

- 🎨 **[Design System]** - Em desenvolvimento
- 🔧 **[API Reference]** - Planejado para próxima versão

---
