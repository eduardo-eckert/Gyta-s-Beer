import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduto } from './produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private api: string = 'http://localhost:5000/api';

  constructor(private httpClient: HttpClient) {}

  public CadastrarProduto(novoProduto: IProduto): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.api}/produto`, novoProduto);
  }

  public BuscarProdutos(): Observable<IProduto[]> {
    return this.httpClient.get<IProduto[]>(`${this.api}/produto`);
  }

  public BuscarProdutosAtivos(): Observable<IProduto[]> {
    return this.httpClient.get<IProduto[]>(`${this.api}/produto/ativos`);
  }

  public EditarProduto(ProdutoEditado: IProduto): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/produto`, ProdutoEditado);
  }

  public BuscarProdutoPorId(id: number): Observable<IProduto> {
    return this.httpClient.get<IProduto>(`${this.api}/produto/id?idProduto=${id}`);
  }

  public AtivarDesativarProduto(produto: IProduto): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.api}/produto/alterar-disponibilidade`, produto);
  }

  public GerenciarEstoque(produtoEditado: IProduto): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.api}/produto`, produtoEditado);
  }
}