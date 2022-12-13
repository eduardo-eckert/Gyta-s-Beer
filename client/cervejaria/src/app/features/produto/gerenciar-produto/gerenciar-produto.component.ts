import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../produto-service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-gerenciar-produto',
  templateUrl: './gerenciar-produto.component.html',
  styleUrls: ['./gerenciar-produto.component.css']
})
export class GerenciarProdutoComponent implements OnInit {
  public produtos: IProduto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

 public ngOnInit(): void {
    this.produtoService
      .BuscarProdutos()
      .pipe(take(1))
      .subscribe((dados: IProduto[]) => {
        this.produtos = dados;
      });
  };

  public gerenciarEstoque(id: number) {
    this.router.navigate(['/produto/gerenciar-estoque', id]);
  };

  public editar(id:number){
    this.router.navigate(['/produto/editar', id]);
  };
  public desativar(produto: IProduto) {
    if (produto.ativo) {
      if (confirm(`Você deseja desativar o produto ${produto.descricao}?`)) {
        this.produtoService
          .AtivarDesativarProduto(produto)
          .pipe(take(1))
          .subscribe(() => {
            alert(`${produto.descricao} foi desativado!`);
          });
      }
    } 
    else {
      if (confirm(`Você deseja ativar o produto ${produto.descricao}?`)) {
        this.produtoService
          .AtivarDesativarProduto(produto)
          .pipe(take(1))
          .subscribe(() => {
            alert(`${produto.descricao} foi ativado!`);
          });
      }
    }
  }
}
