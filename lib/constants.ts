// Constantes da aplicação

// Arquivos SVG estáticos
export const DEFAULT_BOOK_COVER_FILE = "/default-cover.svg"
export const DEFAULT_BOOK_COVER_LARGE_FILE = "/default-cover-large.svg"

// SVG inline base64
export const DEFAULT_BOOK_COVER_BASE64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y1ZjVmNSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TZW0gQ2FwYTwvdGV4dD4KPC9zdmc+"
export const DEFAULT_BOOK_COVER_LARGE_BASE64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iI2Y1ZjVmNSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TZW0gQ2FwYTwvdGV4dD4KPC9zdmc+"

// Configuração: true = arquivos SVG, false = base64 inline
const USE_SVG_FILES = true

export function getBookCover(cover: string | undefined, isLarge = false): string {
  if (cover && cover.trim() !== '') {
    return cover
  }
  
  if (USE_SVG_FILES) {
    return isLarge ? DEFAULT_BOOK_COVER_LARGE_FILE : DEFAULT_BOOK_COVER_FILE
  } else {
    return isLarge ? DEFAULT_BOOK_COVER_LARGE_BASE64 : DEFAULT_BOOK_COVER_BASE64
  }
}