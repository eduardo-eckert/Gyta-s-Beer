import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarClienteComponent } from './features/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { EditarClienteComponent } from './features/cliente/editar-cliente/editar-cliente.component';
import { GerenciarClienteComponent } from './features/cliente/gerenciar-cliente/gerenciar-cliente.component';
import { AcompanharPedidoComponent } from './features/pedido/acompanhar-pedido/acompanhar-pedido.component';
import { AlterarStatusComponent } from './features/pedido/alterar-status/alterar-status.component';
import { GerenciarPedidoComponent } from './features/pedido/gerenciar-pedido/gerenciar-pedido.component';
import { RealizarPedidoComponent } from './features/pedido/realizar-pedido/realizar-pedido.component';
import { CadastrarProdutoComponent } from './features/produto/cadastrar-produto/cadastrar-produto.component';
import { EditarProdutoComponent } from './features/produto/editar-produto/editar-produto.component';
import { GerenciarEstoqueComponent } from './features/produto/gerenciar-estoque/gerenciar-estoque.component';
import { GerenciarProdutoComponent } from './features/produto/gerenciar-produto/gerenciar-produto.component';
import { InicioComponent } from './templates/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
  path: 'cliente', 
  children: [
    {
      path: 'cadastrar',
      component: CadastrarClienteComponent  
    },
    {
      path: 'editar/:idCliente',
      component: EditarClienteComponent  
    },
    {
      path: 'gerenciar',
      component: GerenciarClienteComponent  
    }
  ]
},
{
  path: 'produto',
  children: [
    {
      path: 'cadastrar',
      component: CadastrarProdutoComponent
    },
    {
      path: 'gerenciar',
      component: GerenciarProdutoComponent
    },
    {
      path: 'gerenciar-estoque/:idProduto',
      component: GerenciarEstoqueComponent
    },
    {
      path: 'editar/:idProduto',
      component: EditarProdutoComponent
    }
  ]
},
{
  path: 'pedido',
  children:[
    {
      path: 'realizar',
      component: RealizarPedidoComponent
    },
    {
      path: 'gerenciar',
      component: GerenciarPedidoComponent
    }, 
    {
      path: 'alterar-status/:idPedido',
      component: AlterarStatusComponent
    },
    {
      path: 'acompanhar-pedido/:idPedido',
      component: AcompanharPedidoComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
