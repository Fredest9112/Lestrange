import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Zapato } from 'src/app/Models/zapato.interface';
import { ZapatoRestService } from 'src/app/Services/rest.zapatoservice';
import { MatDialog } from '@angular/material/dialog';
import { ZapatoformComponent } from 'src/app/Forms/zapatoform/zapatoform.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zapatodatatable',
  templateUrl: './zapatodatatable.component.html',
  styleUrls: ['./zapatodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Zapatodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Zapato> = new MatTableDataSource<Zapato>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: ZapatoRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Subscribe to the zapatosData$ observable
    this.restService.zapatosData$.subscribe((zapatos: Zapato[]) => {
      this.dataSource.data = zapatos;

      if (zapatos.length > 0) {
        this.displayedColumns = Object.keys(zapatos[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges(); 
    });

    // Initial data fetch
    this.restService.getZapatosFromRemote().subscribe((zapatos: Zapato[]) => {
      this.restService.updateZapatosData(zapatos);
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
    this.editZapatoModal("Editar zapato", ZapatoformComponent, zapato);
  }

  agregarZapato(){
    this.addZapatoModal(ZapatoformComponent);
  }

  borrarZapato(zapato: Zapato) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this zapato?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deleteZapato(zapato.id).subscribe(() => {
          Swal.fire('Deleted!', 'Your zapato has been deleted.', 'success');
          // Fetch all zapatos again after successful deletion
          this.restService.getZapatosFromRemote().subscribe((zapatos: Zapato[]) => {
            this.restService.updateZapatosData(zapatos);
          });
        }, (error) => {
          Swal.fire('Error', 'There was a problem deleting the Zapato.', 'error');
        });
      }
    });
  }

  editZapatoModal(title: string, zapatoForm: any, zapato: Zapato) {
    const dialogRef = this.dialog.open(zapatoForm, {
      data: {
        id: zapato.id,
        nombre: zapato.nombre,
        descripcion: zapato.descripcion,
        precio: zapato.precio,
        imagenUrl: zapato.imagenUrl,
        stock: zapato.stock,
        categoriaId: zapato.categoriaId
      }
    });

    dialogRef.afterClosed().subscribe(updatedZapato => {
      console.log("updatedZapato: "+updatedZapato);
      if (updatedZapato) {
        this.updateLocalDataSource(updatedZapato);
      }
    });
  }

  addZapatoModal(zapatoForm: any) { 
    const dialogRef = this.dialog.open(zapatoForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(newZapato => {
      if (newZapato) {
        console.log("New zapato added:", newZapato);
      }
    });
   }

  updateLocalDataSource(updatedZapato: Zapato) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(zapato => zapato.id === updatedZapato.id);
    if (index > -1) {
      currentData[index] = updatedZapato;
      this.restService.updateZapatosData([...currentData]);  // Update service's data
    }
  }  
}
