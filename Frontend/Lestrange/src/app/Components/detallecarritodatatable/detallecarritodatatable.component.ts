import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DetalleCarrito } from 'src/app/Models/detallecarrito.interface';
import { DetalleCarritoRestService } from 'src/app/Services/rest.detallecarritoservice'; // Actualiza el import del servicio
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detallecarritodatatable', // Actualiza el selector
  templateUrl: './detallecarritodatatable.component.html',
  styleUrls: ['./detallecarritodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Detallecarritodatatable implements AfterViewInit { // Actualiza el nombre de la clase
  dataSource: MatTableDataSource<DetalleCarrito> = new MatTableDataSource<DetalleCarrito>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: DetalleCarritoRestService) { // Actualiza el nombre del servicio
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.restService.getDetalleCarritoFromRemote().subscribe((detallecarritos: DetalleCarrito[]) => { // Actualiza el nombre del método del servicio
      this.dataSource.data = detallecarritos;

      if (detallecarritos.length > 0) {
        this.displayedColumns = Object.keys(detallecarritos[0]);
        this.displayedColumns.push('acciones');
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

  editarDetalleCarrito(detallecarrito: DetalleCarrito) { // Actualiza el nombre del método
    console.log("editar carrito: " + detallecarrito.carritoId);
  }

  borrarDetalleCarrito(detallecarrito: DetalleCarrito) { // Actualiza el nombre del método
    console.log("borrar carrito: " + detallecarrito.carritoId);
  }
}
