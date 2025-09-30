export type bookStatus = 'QUERO-LER'| 'LENDO'| 'LIDO' | 'ABANDONADO' | 'PAUSADO';

export type bookGenre = 
  | 'Literatura Brasileira'
  | 'Ficção Científica'
  | 'Realismo Mágico'
  | 'Ficção'
  | 'Fantasia'
  | 'Romance'
  | 'Biografia'
  | 'História'
  | 'Autoajuda'
  | 'Tecnologia'
  | 'Programação'
  | 'Negócios'
  | 'Psicologia'
  | 'Filosofia'
  | 'Poesia'
  | 'Infantil';

export interface Book {

  id:string;
  title:string;
  author:string;
  publisher:string;
  genre:bookGenre;
  year:number;
  pages:number;
  language:string;
  rating:number;
  synopsis:string;
  cover?:string;
  status:bookStatus;

}

export interface BookWithProgress extends Book {
  progress: number; // Progresso de leitura em porcentagem (0 a 100)
}