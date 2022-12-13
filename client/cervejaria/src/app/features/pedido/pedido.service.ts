import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedido } from './pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private api: string = 'http://localhost:5000/api';

  constructor(private httpClient: HttpClient) {}

  public RealizarPedido(novoPedido: IPedido): Observable<Boolean> {
    return this.httpClient.post<Boolean>(`${this.api}/pedido`, novoPedido);
  }

  public BuscarPedidos(): Observable<IPedido[]> {
    return this.httpClient.get<IPedido[]>(`${this.api}/pedido`);
  }

  public ExcluirPedido(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}/pedido/?idProduto=${id}` );
  }

  public BuscarPedidoPorId(id:number): Observable<IPedido> {
    return this.httpClient.get<IPedido>(`${this.api}/pedido/id?idPedido=${id}`);
  }

  public AlterarStatus(pedido: IPedido): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.api}/pedido?idPedido=${pedido.idPedido}&status=${pedido.status}`,pedido.idPedido);
  }
}