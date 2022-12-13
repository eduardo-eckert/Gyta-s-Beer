import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteService } from './features/cliente/cliente.service';
import { CadastrarClienteComponent } from './features/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { GerenciarClienteComponent } from './features/cliente/gerenciar-cliente/gerenciar-cliente.component';
import { EditarClienteComponent } from './features/cliente/editar-cliente/editar-cliente.component';
import { CadastrarProdutoComponent } from './features/produto/cadastrar-produto/cadastrar-produto.component';
import { GerenciarProdutoComponent } from './features/produto/gerenciar-produto/gerenciar-produto.component';
import { EditarProdutoComponent } from './features/produto/editar-produto/editar-produto.component';
import { GerenciarEstoqueComponent } from './features/produto/gerenciar-estoque/gerenciar-estoque.component';
import { RealizarPedidoComponent } from './features/pedido/realizar-pedido/realizar-pedido.component';
import { GerenciarPedidoComponent } from './features/pedido/gerenciar-pedido/gerenciar-pedido.component';
import { AlterarStatusComponent } from './features/pedido/alterar-status/alterar-status.component';
import { AcompanharPedidoComponent } from './features/pedido/acompanhar-pedido/acompanhar-pedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from './features/produto/produto-service';
import { PedidoService } from './features/pedido/pedido.service';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { InicioComponent } from './templates/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarClienteComponent,
    GerenciarClienteComponent,
    EditarClienteComponent,
    CadastrarProdutoComponent,
    GerenciarProdutoComponent,
    EditarProdutoComponent,
    GerenciarEstoqueComponent,
    RealizarPedidoComponent,
    GerenciarPedidoComponent,
    AlterarStatusComponent,
    AcompanharPedidoComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ClienteService, ProdutoService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
