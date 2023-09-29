import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Zapato } from 'src/app/Models/zapato.interface';
import { ZapatoRestService } from 'src/app/Services/rest.zapatoservice';

@Component({
  selector: 'app-zapatodatatable',
  templateUrl: './zapatodatatable.component.html',
  styleUrls: ['./zapatodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Zapatodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Zapato> = new MatTableDataSource<Zapato>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: ZapatoRestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getZapatosFromRemote().subscribe((zapatos: Zapato[]) => {
      this.dataSource.data = zapatos;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (zapatos.length > 0) {
        this.displayedColumns = Object.keys(zapatos[0]);

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

  editarZapato(zapato: Zapato) {
    console.log("editar usuario: "+zapato.Nombre);
  }
  
  borrarZapato(zapato: Zapato) {
    console.log("borrar usuario: "+zapato.Nombre);
  }
}
