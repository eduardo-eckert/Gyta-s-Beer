import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../produto-service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-gerenciar-estoque',
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.css']
})
export class GerenciarEstoqueComponent implements OnInit {
  public produto: IProduto = {} as IProduto;
  public form!: FormGroup;
  public id = 0;
  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

 public ngOnInit(): void {
    this.form = new FormGroup({
      qtdEstoque: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.route.params.subscribe((params) => {
      this.id = params['idProduto'];
    });

    this.service
      .BuscarProdutoPorId(this.id)
      .pipe(take(1))
      .subscribe((dados: IProduto) => {
        this.produto = dados;
        this.produto.dataValidade = new Date(this.produto.dataValidade);
      });
  }
  public salvar(): void {
    if (this.form.valid) {
      const produtoEstoque: IProduto = {
        idProduto: this.produto.idProduto,
        descricao: this.produto.descricao,
        preco: this.produto.preco,
        dataValidade: this.produto.dataValidade,
        qtdEstoque: this.form.get('qtdEstoque')?.value,
        ativo: this.produto.ativo,
      };

      this.service
        .GerenciarEstoque(produtoEstoque)
        .pipe(take(1))
        .subscribe(() => {
          alert('Estoque atualizado com sucesso!');
          location.reload()
        });   
    }
  }

  public limpar() {
    this.form.reset();
  }
}
