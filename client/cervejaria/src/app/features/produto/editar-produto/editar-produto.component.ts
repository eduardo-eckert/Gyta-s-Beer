import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../produto-service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
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
      descricao: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      preco: new FormControl(null, [Validators.required, Validators.min(1)]),
      dataValidade: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      this.id = params['idProduto'];
    });

    this.service
      .BuscarProdutoPorId(this.id)
      .pipe(take(1))
      .subscribe((dados: IProduto) => {
        this.produto = dados;
      });
  }
  public editar(): void {
    if (this.form.valid) {
      const produtoEditado: IProduto = {
        idProduto: this.produto.idProduto,
        descricao: this.form.get('descricao')?.value,
        preco: this.form.get('preco')?.value,
        dataValidade: this.form.get('dataValidade')?.value,
        qtdEstoque: this.produto.qtdEstoque,
        ativo: this.produto.ativo,
      };

      this.service
        .EditarProduto(produtoEditado)
        .pipe(take(1))
        .subscribe(() => {
          alert('Produto alterado com sucesso!');
          location.reload()
        });
      
    }
  }

  public limpar() {
    this.form.reset();
  }
}