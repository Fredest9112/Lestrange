import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Carrito } from 'src/app/Models/carrito.interface'; // Asegúrate de importar el modelo de datos correcto
import { CarritoRestService } from 'src/app/Services/rest.carritoservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carritodatatable', // Cambia el nombre del selector
  templateUrl: './carritodatatable.component.html',
  styleUrls: ['./carritodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Carritodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Carrito> = new MatTableDataSource<Carrito>([]);
  displayedColumns: string[] = []; // Inicializa como un array vacío

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: CarritoRestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Obtén los datos y asígnalos al origen de datos
    this.restService.getCarritoFromRemote().subscribe((carritos: Carrito[]) => {
      this.dataSource.data = carritos;

      // Popula displayedColumns basado en las propiedades del primer carrito (asumiendo que todos los carritos tienen las mismas propiedades)
      if (carritos.length > 0) {
        this.displayedColumns = Object.keys(carritos[0]);

        // Puedes personalizar las columnas aquí

        this.displayedColumns.push('acciones');

        // Vincula la clasificación a la tabla dinámicamente
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarCarrito(carrito: Carrito) {
    console.log("editar carrito: " + carrito.usuarioId); // Actualiza según las propiedades del modelo de datos del Carrito
  }

  borrarCarrito(carrito: Carrito) {
    console.log("borrar carrito: " + carrito.usuarioId); // Actualiza según las propiedades del modelo de datos del Carrito
  }
}
