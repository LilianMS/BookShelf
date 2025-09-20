export type bookStatus = 'QUERO-LER'| 'LENDO'| 'LIDO';

export interface Book {

  id:string;
  title:string;
  author:string;
  publisher:string;
  genre:string;
  year:number;
  pages:number;
  language:string;
  rating:number;
  synopsis:string;
  cover:string;
  status:bookStatus;


}