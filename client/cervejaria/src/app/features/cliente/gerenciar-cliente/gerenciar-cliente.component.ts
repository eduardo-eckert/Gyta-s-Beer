import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ICliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-gerenciar-cliente',
  templateUrl: './gerenciar-cliente.component.html',
  styleUrls: ['./gerenciar-cliente.component.css']
})
export class GerenciarClienteComponent implements OnInit {
  public clientes: ICliente[] = [];
  
  constructor(private clienteService: ClienteService, private router: Router) { }

  public ngOnInit(): void {
    this.clienteService.BuscarClientes()
    .pipe(take(1))
    .subscribe((dados: ICliente[]) => {
      this.clientes = dados;
    });
  }
  public editar(idCliente: number) {
    this.router.navigate(['/cliente/editar', idCliente]);
  }

  public deletar(cpfCLiente: string) {
    if (confirm(`Você realmente deseja excluir o cliente com CPF ${cpfCLiente}?`)){
    this.clienteService
      .DeletarCliente(cpfCLiente)
      .pipe(take(1))
      .subscribe(() => {
        alert(`O cliente com CPF: ${cpfCLiente} foi deletado com sucesso!`)
        location.reload()
      })};

  }

}
