import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { HttpClientModule } from '@angular/common/http';
import { ZapatoComponent } from './Components/zapato/zapato.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { ComentarioComponent } from './Components/comentario/comentario.component';
import { DetallecarritoComponent } from './Components/detallecarrito/detallecarrito.component';
import { MatTableModule } from '@angular/material/table';
import { Zapatodatatable } from './Components/zapatodatatable/zapatodatatable.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CarritoComponent,
    ZapatoComponent,
    CategoriasComponent,
    ComentarioComponent,
    DetallecarritoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
