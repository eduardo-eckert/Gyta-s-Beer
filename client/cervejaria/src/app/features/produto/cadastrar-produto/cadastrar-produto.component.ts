import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../produto-service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {
  public form!: FormGroup;
  constructor(private produtoService: ProdutoService, private router: Router,) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      preco: new FormControl(null, [Validators.required, Validators.min(1)]),
      dataValidade: new FormControl(null, [Validators.required])
    })
  }
  public Cadastrar(){
    if(this.form.valid){
      const novoProduto: IProduto = {
        idProduto:0,
        descricao: this.form.get('descricao')?.value,
        preco: this.form.get('preco')?.value,
        dataValidade: this.form.get('dataValidade')?.value,
        qtdEstoque: 0,
        ativo: true
      }
      this.produtoService.CadastrarProduto(novoProduto)
      .pipe(take(1)).subscribe(() => {
        alert('Produto cadastrado com sucesso!')
        location.reload()
      })
    }
  };

  public limpar(){
    this.form.reset();
  }
}