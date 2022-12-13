export interface IProduto{
    idProduto: number;
    descricao: string;
    preco: number;
    qtdEstoque: number;
    dataValidade: Date;
    ativo: boolean;
}