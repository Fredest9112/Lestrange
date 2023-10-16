import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Comentario } from 'src/app/Models/comentario.interface';
import { ComentarioRestService } from 'src/app/Services/rest.comentarioservice';
import { MatDialog } from '@angular/material/dialog';
import { ComentarioformComponent } from 'src/app/Forms/comentarioform/comentarioform.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentariodatatable',
  templateUrl: './comentariodatatable.component.html',
  styleUrls: ['./comentariodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule]
})
export class Comentariodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource<Comentario>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: ComentarioRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.restService.comentariosData$.subscribe((comentarios: Comentario[]) => {
      this.dataSource.data = comentarios;

      if (comentarios.length > 0) {
        this.displayedColumns = Object.keys(comentarios[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges(); 
    });

    this.restService.getComentarioFromRemote().subscribe((comentario: Comentario[]) => {
      this.restService.updateComentariosData(comentario);
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
    this.editComentarioModal("Editar comentario", ComentarioformComponent, comentario);
  }

  agregarComentario(){
    this.addComentarioModal(ComentarioformComponent);
  }

  borrarComentario(comentario: Comentario) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this comentario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deleteComentario(comentario.id).subscribe(() => {
          Swal.fire('Deleted!', 'Your comentario has been deleted.', 'success');
          // Fetch all zapatos again after successful deletion
          this.restService.getComentarioFromRemote().subscribe((comentarios: Comentario[]) => {
            this.restService.updateComentariosData(comentarios);
          });
        }, (error) => {
          Swal.fire('Error', 'There was a problem deleting the comentario.', 'error');
        });
      }
    });
  }

  editComentarioModal(title: string, comentarioForm: any, comentario: Comentario) {
    const dialogRef = this.dialog.open(comentarioForm, {
      data: {
        id: comentario.id,
        zapatoId: comentario.zapatoId,
        usuarioId: comentario.usuarioId,
        texto: comentario.texto,
        fecha: comentario.fecha
      }
    });

    dialogRef.afterClosed().subscribe(updatedComentario => {
      console.log("updatedComentario: "+updatedComentario);
      if (updatedComentario) {
        this.updateLocalDataSource(updatedComentario);
      }
    });
  }

  addComentarioModal(comentarioForm: any) { 
    const dialogRef = this.dialog.open(comentarioForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(newComentario => {
      if (newComentario) {
        console.log("New comentario added:", newComentario);
      }
    });
   }

  updateLocalDataSource(updatedComentario: Comentario) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(comentario => comentario.id === updatedComentario.id);
    if (index > -1) {
      currentData[index] = updatedComentario;
      this.restService.updateComentariosData([...currentData]);
    }
  }  
}
