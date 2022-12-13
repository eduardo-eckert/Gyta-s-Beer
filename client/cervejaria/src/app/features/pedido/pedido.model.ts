import { IProduto } from "../produto/produto.model";

export interface IPedido {
  idPedido: number,
  cpfCliente?: string,
  produto: IProduto,
  qtdProduto: number,
  dataPedido: Date,
  valorTotal: number,
  status: number
}
