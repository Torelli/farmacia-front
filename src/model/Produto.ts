import Categoria from "./Categoria";

export default interface Produto {
  id: number;
  titulo: string;
  descricao: string | null;
  categoria: Categoria;
}
