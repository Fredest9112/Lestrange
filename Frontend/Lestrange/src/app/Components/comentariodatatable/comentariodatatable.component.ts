import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Comentario } from 'src/app/Models/comentario.interface';
import { ComentarioRestService } from 'src/app/Services/rest.comentarioservice';

@Component({
  selector: 'app-comentariodatatable',
  templateUrl: './comentariodatatable.component.html',
  styleUrls: ['./comentariodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule]
})
export class Comentariodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource<Comentario>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: ComentarioRestService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.getComentarioFromRemote().subscribe((comentarios: Comentario[]) => {
      this.dataSource.data = comentarios;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (comentarios.length > 0) {
        this.displayedColumns = Object.keys(comentarios[0]);

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

  editarComentario(comentario: Comentario) {
    console.log("editar comentario: "+comentario.Texto);
  }
  
  borrarComentario(comentario: Comentario) {
    console.log("borrar comentario: "+comentario.Texto);
  }
}
