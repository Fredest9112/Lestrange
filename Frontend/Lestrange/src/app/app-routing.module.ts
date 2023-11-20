import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carritodatatable } from './Components/carritodatatable/carritodatatable.component';
import { Usuariodatatable } from './Components/usuariodatatable/usuariodatatable.component';
import { Detallecarritodatatable } from './Components/detallecarritodatatable/detallecarritodatatable.component';
import { Zapatodatatable } from './Components/zapatodatatable/zapatodatatable.component';
import { Categoriadatatable } from './Components/categoriadatatable/categoriadatatable.component';
import { Comentariodatatable } from './Components/comentariodatatable/comentariodatatable.component';
import { Ordenventadatatable } from './Components/ordenventadatatable/ordenventadatatable.component';
import { Detalleordendatatable } from './Components/detalleordendatatable/detalleordendatatable.component';
import { Pagodatatable } from './Components/pagodatatable/pagodatatable.component';
import { LoginComponent } from './Components/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu', 
    component: MenuComponent,
    children: [
      { path: 'Carrito', component: Carritodatatable },
      { path: 'Zapato', component: Zapatodatatable },
      { path: 'Categorias', component: Categoriadatatable },
      { path: 'Comentarios', component: Comentariodatatable },
      { path: 'Usuario', component: Usuariodatatable },
      { path: 'OrdenVenta', component: Ordenventadatatable },
      { path: 'DetalleOrden', component: Detalleordendatatable },
      { path: 'Pago', component: Pagodatatable },
      { path: 'Detallecarrito', component: Detallecarritodatatable },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
