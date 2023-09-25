import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Usuario } from 'src/app/Models/usuario.interface';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-usuariodatatable',
  templateUrl: './usuariodatatable.component.html',
  styleUrls: ['./usuariodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
})
export class UsuarioDataTable implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombreUsuario', 'correo', 'contrasena','direccionEnvio','fechaRegistro'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: RestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getUsuarioFromRemote().subscribe((users: Usuario[]) => {
      this.dataSource.data = users;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
