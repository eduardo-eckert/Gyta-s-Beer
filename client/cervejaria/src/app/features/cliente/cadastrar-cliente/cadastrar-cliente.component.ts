import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ICliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],
})
export class CadastrarClienteComponent implements OnInit {
  public form!: FormGroup;

  constructor(private clienteService: ClienteService, private router: Router) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      cpfCliente: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{11}")
      ]),
      dataNascimento: new FormControl(null, [Validators.required]),
    });
  }
  public Cadastrar(): void {
    if (this.form.valid) {
      const novoCliente: ICliente = {
        idCliente: 0,
        nome: this.form.get('nome')?.value,
        cpfCliente: this.form.get('cpfCliente')?.value,
        dataNascimento: this.form.get('dataNascimento')?.value,
        ptsFidelidade: 0,
      };
      this.clienteService
        .CadastrarCliente(novoCliente)
        .pipe(take(1))
        .subscribe(() => {
          alert('Cliente cadastrado com sucesso!')
          location.reload()
          this.router.navigate(['/cliente/gerenciar']);  
        })
        
    }
  }
  public limpar() {
    this.form.reset();
  }
}
