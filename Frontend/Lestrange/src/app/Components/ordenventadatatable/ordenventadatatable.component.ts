import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OrdenVenta } from 'src/app/Models/ordenVenta.interface';
import { ordenVentaservice } from 'src/app/Services/rest.ordenVentaservice';

@Component({
  selector: 'app-ordenventadatatable',
  templateUrl: './ordenventadatatable.component.html',
  styleUrls: ['./ordenventadatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Ordenventadatatable implements AfterViewInit {
  dataSource: MatTableDataSource<OrdenVenta> = new MatTableDataSource<OrdenVenta>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: ordenVentaservice) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getOrdenVentaFromRemote().subscribe((ordenVentas: OrdenVenta[]) => {
      this.dataSource.data = ordenVentas;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (ordenVentas.length > 0) {
        this.displayedColumns = Object.keys(ordenVentas[0]);

        this.displayedColumns.push('acciones');

        // Bind the sort to the table dynamically
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

  editarOrdenVenta(ordenVenta: OrdenVenta) {
    console.log("Editar Orden de venta: "+ordenVenta.id);
    alert("Editando Orden # "+ordenVenta.id);
  }
  
  borrarOrdenVenta(ordenVenta: OrdenVenta) {
    console.log("Borrar Orden de venta: "+ordenVenta.id);
    alert("Borrando Orden # "+ordenVenta.id);
  }
}
