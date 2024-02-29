import Produto from "./Produto";

export default interface Categoria {
  id: number;
  titulo: string;
  produtos: Produto[] | null;
}
