import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IPedido } from '../pedido.model';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-alterar-status',
  templateUrl: './alterar-status.component.html',
  styleUrls: ['./alterar-status.component.css']
})
export class AlterarStatusComponent implements OnInit {
  public id = 0;
  public pedido: IPedido = {} as IPedido;
  public form!: FormGroup;
  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      status: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      this.id = params['idPedido'];
    });

    this.pedidoService
      .BuscarPedidoPorId(this.id)
      .pipe(take(1))
      .subscribe((dados: IPedido) => {
        this.pedido = dados;
      });
  }

  public alterarStatus() {
    const pedido: IPedido = {
      idPedido: this.pedido.idPedido,
      cpfCliente: this.pedido.cpfCliente,
      produto: this.pedido.produto,
      qtdProduto: this.pedido.qtdProduto,
      valorTotal: this.pedido.valorTotal,
      dataPedido: this.pedido.dataPedido,
      status: this.form.get('status')?.value,
    };
    this.pedidoService
      .AlterarStatus(pedido)
      .pipe(take(1))
      .subscribe(() => {
        alert('O status foi alterado!');
        location.reload()
      });
  }
}
