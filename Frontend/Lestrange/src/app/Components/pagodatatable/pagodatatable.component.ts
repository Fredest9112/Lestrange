import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Pago } from 'src/app/Models/pago.interface';
import { pago } from 'src/app/Services/rest.pago.service';

@Component({
  selector: 'app-pagodatatable',
  templateUrl: './pagodatatable.component.html',
  styleUrls: ['./pagodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Pagodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource<Pago>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: pago) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getPagoFromRemote().subscribe((pagos: Pago[]) => {
      this.dataSource.data = pagos;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (pagos.length > 0) {
        this.displayedColumns = Object.keys(pagos[0]);

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

  editarPago(pago: Pago) {
    console.log("editar pago: "+pago.monto);
    alert("Editando Pago por "+pago.monto+" pesos");
  }
  
  borrarPago(pago: Pago) {
    console.log("borrar pago: "+pago.monto);
    alert("Borrando Pago por "+pago.monto+" pesos");
  }
}
