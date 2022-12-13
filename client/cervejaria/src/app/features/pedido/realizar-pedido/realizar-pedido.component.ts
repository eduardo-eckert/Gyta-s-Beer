import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../../produto/produto-service';
import { IProduto } from '../../produto/produto.model';
import { IPedido } from '../pedido.model';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
  public form!: FormGroup;
  public produtos: IProduto[] = [];
  public produto: IProduto = {} as IProduto;
  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      cpfCliente: new FormControl(null, [Validators.pattern("[0-9]{11}")]),
      produto: new FormControl( null, [Validators.required]),
      qtdProduto: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this.produto.qtdEstoque)]),
    });

    this.produtoService
      .BuscarProdutosAtivos()
      .pipe(take(1))
      .subscribe((dados: IProduto[]) => {
        this.produtos = dados;
      });
  }

  public Realizar(): void {
    this.produtos.forEach(element => {
      if(element.idProduto === this.form.get('produto')?.value){
        this.produto = element;
      }
    });
    const novoPedido: IPedido = {
      idPedido: 0,
      cpfCliente: this.form.get('cpfCliente')?.value,
      produto: this.produto,
      qtdProduto: this.form.get('qtdProduto')?.value,
      valorTotal: 0,
      dataPedido: new Date(),
      status: 0
    };
      if (this.form.get('cpfCliente')?.value === null) {
        novoPedido.cpfCliente = ""
      }
    
    if(this.produto.qtdEstoque > novoPedido.qtdProduto)
    this.pedidoService.RealizarPedido(novoPedido).pipe(take(1)).subscribe(() => {
        alert('Pedido realizado com sucesso!');
        location.reload()
      });
  }
  
  public Limpar() {
    this.form.reset();
  }
}
