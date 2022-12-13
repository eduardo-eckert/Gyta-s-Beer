import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IPedido } from '../pedido.model';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-gerenciar-pedido',
  templateUrl: './gerenciar-pedido.component.html',
  styleUrls: ['./gerenciar-pedido.component.css']
})
@Input()
export class GerenciarPedidoComponent implements OnInit {
  public pedidos: IPedido[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

 public ngOnInit(): void {
    this.pedidoService
      .BuscarPedidos()
      .pipe(take(1))
      .subscribe((dados: IPedido[]) => {
        this.pedidos = dados;
      });
  }

  public alterarStatus(idPedido: number) {
    this.router.navigate(['/pedido/alterar-status', idPedido]);
  }

  public acompanhar(idPedido: number) {
    this.router.navigate(['/pedido/acompanhar-pedido', idPedido]);
  }

  public deletar(idPedido: number) {
    if (confirm(`Você deseja deletar o pedido ${idPedido}?`)) {
      this.pedidoService
        .ExcluirPedido(idPedido)
        .pipe(take(1))
        .subscribe(() => {
          alert(`O pedido ${idPedido} foi deletado!`);
          location.reload();
        });
    }
    
  }
}

