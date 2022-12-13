import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ICliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  public cliente: ICliente= {} as ICliente;
  public form!: FormGroup;
  public id = 0;
  constructor(private service: ClienteService,private router: Router, private route: ActivatedRoute) {}

 public ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      cpfCliente: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{11}")]),
      dataNascimento: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe(params =>{
      this.id = params['idCliente'];
    });
    
    this.service.BuscarClientePorId(this.id)
    .pipe(take(1)).subscribe((dados: ICliente)=>{
      this.cliente = dados;
    })
  }
  public editar(): void {
    if (this.form.valid) {
      const clienteEditado: ICliente = {
        idCliente: this.cliente.idCliente,
        nome: this.form.get('nome')?.value,
        cpfCliente: this.form.get('cpfCliente')?.value,
        dataNascimento: this.form.get('dataNascimento')?.value,
        ptsFidelidade: 0,
      };

      this.service
        .EditarCliente(clienteEditado)
        .pipe(take(1))
        .subscribe(() => {   
          alert('Cliente alterado com sucesso!')
          location.reload()   
        });

    }
  }
  public limpar() {
    this.form.reset();
  }
}
