import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DetalleOrden } from 'src/app/Models/detalleOrden.interface';
import { DetalleOrdenRestService } from 'src/app/Services/rest.detalleOrdenservice';

@Component({
  selector: 'app-detalleordendatatable',
  templateUrl: './detalleordendatatable.component.html',
  styleUrls: ['./detalleordendatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Detalleordendatatable implements AfterViewInit {
  dataSource: MatTableDataSource<DetalleOrden> = new MatTableDataSource<DetalleOrden>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: DetalleOrdenRestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getDetalleOrdenFromRemote().subscribe((detalleOrdenes: DetalleOrden[]) => {
      this.dataSource.data = detalleOrdenes;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (detalleOrdenes.length > 0) {
        this.displayedColumns = Object.keys(detalleOrdenes[0]);

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

  editarDetalleOrden(detalleOrden: DetalleOrden) {
    console.log("editar Detalle de orden: "+detalleOrden.cantidad);
    alert("Editando Orden # "+detalleOrden.ordenVentaId);
    
  }
  
  borrarDetalleOrden(detalleOrden: DetalleOrden) {
    console.log("borrar pago: "+detalleOrden.cantidad);
    alert("Borrando Orden # "+detalleOrden.ordenVentaId);
  }
}
