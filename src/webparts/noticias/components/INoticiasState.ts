import { IListItem } from './IListItem';  
import { Categoria } from './Categoria';  

export interface INoticiasState {  
  items: IListItem[];  
  searchState: string;
  Categorias: Categoria[];
  filtro: string;
} 