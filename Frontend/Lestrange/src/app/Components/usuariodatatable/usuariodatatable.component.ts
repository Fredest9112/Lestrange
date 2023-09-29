import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from 'src/app/Models/usuario.interface';
import { RestService } from 'src/app/Services/rest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuariodatatable',
  templateUrl: './usuariodatatable.component.html',
  styleUrls: ['./usuariodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class UsuarioDataTable implements AfterViewInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: RestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getUsuarioFromRemote().subscribe((users: Usuario[]) => {
      this.dataSource.data = users;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (users.length > 0) {
        this.displayedColumns = Object.keys(users[0]);

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

  editarUsuario(usuario: Usuario) {
    console.log("editar usuario: "+usuario.nombreUsuario);
  }
  
  borrarUsuario(usuario: Usuario) {
    console.log("borrar usuario: "+usuario.nombreUsuario);
  }
}

