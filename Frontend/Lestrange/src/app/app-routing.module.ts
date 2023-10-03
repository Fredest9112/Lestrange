import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carritodatatable } from './Components/carritodatatable/carritodatatable.component';
import { Usuariodatatable } from './Components/usuariodatatable/usuariodatatable.component';
import { Detallecarritodatatable } from './Components/detallecarritodatatable/detallecarritodatatable.component';
import { Zapatodatatable } from './Components/zapatodatatable/zapatodatatable.component';
import { Categoriadatatable } from './Components/categoriadatatable/categoriadatatable.component';
import { Comentariodatatable } from './Components/comentariodatatable/comentariodatatable.component';

const routes: Routes = [
  {path:"Carrito", component:Carritodatatable},
  {path:"Zapato", component:Zapatodatatable},
  {path:"Categorias", component:Categoriadatatable},
  {path:"Comentarios", component:Comentariodatatable},
  {path:"Detallecarrito",component:Detallecarritodatatable},
  {path:"Usuario", component:Usuariodatatable}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
