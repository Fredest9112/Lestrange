import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { Usuariodatatable } from './Components/usuariodatatable/usuariodatatable.component';
import { DetallecarritoComponent } from './Components/detallecarrito/detallecarrito.component';
import { Zapatodatatable } from './Components/zapatodatatable/zapatodatatable.component';
import { Categoriadatatable } from './Components/categoriadatatable/categoriadatatable.component';
import { Comentariodatatable } from './Components/comentariodatatable/comentariodatatable.component';

const routes: Routes = [
  {path:"Carrito", component:CarritoComponent},
  {path:"Zapato", component:Zapatodatatable},
  {path:"Categorias", component:Categoriadatatable},
  {path:"Comentarios", component:Comentariodatatable},
  {path:"Detallecarrito",component:DetallecarritoComponent},
  {path:"Usuario", component:Usuariodatatable}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
