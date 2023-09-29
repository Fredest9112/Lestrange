import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { ZapatoComponent } from './Components/zapato/zapato.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { ComentarioComponent } from './Components/comentario/comentario.component';
import { UsuarioDataTable } from './Components/usuariodatatable/usuariodatatable.component';
import { DetallecarritoComponent } from './Components/detallecarrito/detallecarrito.component';

const routes: Routes = [
  {path:"Carrito", component:CarritoComponent},
  {path:"Zapato", component:ZapatoComponent},
  {path:"Categorias", component:CategoriasComponent},
  {path:"Comentarios", component:ComentarioComponent},
  {path:"Detallecarrito",component:DetallecarritoComponent},
  {path:"Usuario", component:UsuarioDataTable}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
