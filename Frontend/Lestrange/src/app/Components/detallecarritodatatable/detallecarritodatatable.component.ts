import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DetalleCarrito } from 'src/app/Models/detallecarrito.interface';
import { DetalleCarritoRestService } from 'src/app/Services/rest.detallecarritoservice'; // Actualiza el import del servicio
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DetallecarritoformComponent } from 'src/app/Forms/detallecarritoform/detallecarritoform.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detallecarritodatatable', // Actualiza el selector
  templateUrl: './detallecarritodatatable.component.html',
  styleUrls: ['./detallecarritodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Detallecarritodatatable implements AfterViewInit { // Actualiza el nombre de la clase
  dataSource: MatTableDataSource<DetalleCarrito> = new MatTableDataSource<DetalleCarrito>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: DetalleCarritoRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) { // Actualiza el nombre del servicio
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    // Obtén los datos y asígnalos al origen de datos
    this.restService.detalleCarritoData$.subscribe((detalleCarritos: DetalleCarrito[]) => {
      this.dataSource.data = detalleCarritos;
  
      // Popula displayedColumns basado en las propiedades del primer detalleCarrito (asumiendo que todos los detalleCarritos tienen las mismas propiedades)
      if (detalleCarritos.length > 0) {
        this.displayedColumns = Object.keys(detalleCarritos[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges();
    });
    this.restService.getDetalleCarritoFromRemote().subscribe((detalleCarritos: DetalleCarrito[]) => {
      this.restService.updateDetalleCarritosData(detalleCarritos);
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarDetalleCarrito(detalleCarrito: DetalleCarrito) {
    this.editDetalleCarritoModal("Editar carrito", DetallecarritoformComponent, detalleCarrito);
  }
  
  agregarDetalleCarrito() {
    this.addDetalleCarritoModal(DetallecarritoformComponent);
  }

  borrarDetalleCarrito(detalleCarrito: DetalleCarrito) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este detalleCarrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deleteDetalleCarrito(detalleCarrito.id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'Tu detalleCarrito ha sido eliminado.', 'success');
          // Volver a obtener todos los detalleCarritos después de la eliminación exitosa
          this.restService.getDetalleCarritoFromRemote().subscribe((detalleCarritos: DetalleCarrito[]) => {
            this.restService.updateDetalleCarritosData(detalleCarritos);
          });
        }, (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el detalleCarrito.', 'error');
        });
      }
    });
  }
  
  editDetalleCarritoModal(title: string, detalleCarritoForm: any, detalleCarrito: DetalleCarrito){
    const dialogRef = this.dialog.open(detalleCarritoForm, {
      data: {
        id: detalleCarrito.id,
        carritoId: detalleCarrito.carritoId,
        zapatoId: detalleCarrito.zapatoId,
        cantidad: detalleCarrito.cantidad,
        precio: detalleCarrito.precio
      }
    });
    dialogRef.afterClosed().subscribe(updatedDetalleCarrito => {
      console.log("updatedDetalleCarrito: " + updatedDetalleCarrito);
      if (updatedDetalleCarrito) {
        this.updateLocalDataSource(updatedDetalleCarrito);
      }
    });
  }

  addDetalleCarritoModal(detalleCarritoForm: any) { 
    const dialogRef = this.dialog.open(detalleCarritoForm, {
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(newDetalleCarrito => {
      if (newDetalleCarrito) {
        console.log("New detalleCarrito added:", newDetalleCarrito);
      }
    });
  }
  
  updateLocalDataSource(updatedDetalleCarrito: DetalleCarrito) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(detalleCarrito => detalleCarrito.id === updatedDetalleCarrito.id);
    if (index > -1) {
      currentData[index] = updatedDetalleCarrito;
      this.restService.updateDetalleCarritosData([...currentData]);  // Actualizar los datos del servicio
    }
  }
  

}
