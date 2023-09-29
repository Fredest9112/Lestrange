import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Categoria } from 'src/app/Models/categoria.interface';
import { CategoriaRestService } from 'src/app/Services/rest.categoriaservice';

@Component({
  selector: 'app-categoriadatatable',
  templateUrl: './categoriadatatable.component.html',
  styleUrls: ['./categoriadatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Categoriadatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: CategoriaRestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getCategoriaFromRemote().subscribe((categorias: Categoria[]) => {
      this.dataSource.data = categorias;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (categorias.length > 0) {
        this.displayedColumns = Object.keys(categorias[0]);

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

  editarCategoria(categoria: Categoria) {
    console.log("editar usuario: "+categoria.Nombre);
  }
  
  borrarCategoria(categoria: Categoria) {
    console.log("borrar usuario: "+categoria.Nombre);
  }
}
