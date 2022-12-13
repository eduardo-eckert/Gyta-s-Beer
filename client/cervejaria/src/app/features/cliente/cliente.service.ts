import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from './cliente.model';

@Injectable()
export class ClienteService {
  private api: string = 'http://localhost:5000/api';

  constructor(private httpClient: HttpClient) {}

  public CadastrarCliente(novoCliente: ICliente): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.api}/cliente`, novoCliente);
  }
  public BuscarClientes(): Observable<ICliente[]> {
    return this.httpClient.get<ICliente[]>(`${this.api}/cliente`);
  }
  public EditarCliente(clienteEditado: ICliente): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/cliente`, clienteEditado);
  }
  public DeletarCliente(cpfCliente: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}/cliente?cpf=${cpfCliente}`);
  }
  public BuscarClientePorId(idCliente: number): Observable<ICliente> {
    return this.httpClient.get<ICliente>(`${this.api}/cliente/id?idCliente=${idCliente}`);
  }
}
