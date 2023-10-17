import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Categoria } from 'src/app/Models/categoria.interface';
import { CategoriaRestService } from 'src/app/Services/rest.categoriaservice';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaformComponent } from 'src/app/Forms/categoriaform/categoriaform.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoriadatatable',
  templateUrl: './categoriadatatable.component.html',
  styleUrls: ['./categoriadatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Categoriadatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: CategoriaRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.restService.categoriasData$.subscribe((categorias: Categoria[]) => {
      this.dataSource.data = categorias;

      if (categorias.length > 0) {
        this.displayedColumns = Object.keys(categorias[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges();
    });

    this.restService.getCategoriaFromRemote().subscribe((categorias: Categoria[]) => {
      this.restService.updateCategoriasData(categorias);
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
    this.editCategoriaModal("Editar categoria", CategoriaformComponent, categoria);
  }

  agregarCategoria(){
    this.addCategoriaModal(CategoriaformComponent);
  }

  borrarCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this categoria?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deleteCategoria(categoria.id).subscribe(() => {
          Swal.fire('Deleted!', 'Your categoria has been deleted.', 'success');
          this.restService.getCategoriaFromRemote().subscribe((categorias: Categoria[]) => {
            this.restService.updateCategoriasData(categorias);
          });
        }, (error) => {
          Swal.fire('Error', 'There was a problem deleting the categoria.', 'error');
        });
      }
    });
  }

  editCategoriaModal(title: string, categoriaForm: any, categoria: Categoria) {
    const dialogRef = this.dialog.open(categoriaForm, {
      data: {
        id: categoria.id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion
      }
    });

    dialogRef.afterClosed().subscribe(updatedCategoria => {
      console.log("updatedCategoria: "+updatedCategoria);
      if (updatedCategoria) {
        this.updateLocalDataSource(updatedCategoria);
      }
    });
  }

  addCategoriaModal(categoriaForm: any) { 
    const dialogRef = this.dialog.open(categoriaForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(newCategoria => {
      if (newCategoria) {
        console.log("New categoria added:", newCategoria);
      }
    });
   }

  updateLocalDataSource(updatedCategoria: Categoria) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(categoria => categoria.id === updatedCategoria.id);
    if (index > -1) {
      currentData[index] = updatedCategoria;
      this.restService.updateCategoriasData([...currentData]);
    }
  } 
}
