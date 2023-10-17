import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Carrito } from 'src/app/Models/carrito.interface'; // Asegúrate de importar el modelo de datos correcto
import { CarritoRestService } from 'src/app/Services/rest.carritoservice';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CarritoformComponent } from 'src/app/Forms/carritoform/carritoform.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carritodatatable', // Cambia el nombre del selector
  templateUrl: './carritodatatable.component.html',
  styleUrls: ['./carritodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Carritodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Carrito> = new MatTableDataSource<Carrito>([]);
  displayedColumns: string[] = []; // Inicializa como un array vacío

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: CarritoRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Obtén los datos y asígnalos al origen de datos
    this.restService.carritosData$.subscribe((carritos: Carrito[]) => {
      this.dataSource.data = carritos;

      // Popula displayedColumns basado en las propiedades del primer carrito (asumiendo que todos los carritos tienen las mismas propiedades)
      if (carritos.length > 0) {
        this.displayedColumns = Object.keys(carritos[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges();
    });
    this.restService.getCarritoFromRemote().subscribe((carritos: Carrito[]) => {
      this.restService.updateCarritosData(carritos);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarCarrito(carrito: Carrito) {
    this.editCarritoModal("Editar carrito", CarritoformComponent, carrito);
  }

  agregarCarrito(){
    this.addCarritoModal(CarritoformComponent);
  }

  borrarCarrito(carrito: Carrito) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deleteCarrito(carrito.id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'Tu carrito ha sido eliminado.', 'success');
          // Volver a obtener todos los carritos después de la eliminación exitosa
          this.restService.getCarritoFromRemote().subscribe((carritos: Carrito[]) => {
            this.restService.updateCarritosData(carritos);
          });
        }, (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el Carrito.', 'error');
        });
      }
    });
  }
  
  editCarritoModal(title: string, carritoForm: any, carrito: Carrito){
    const dialogRef = this.dialog.open(carritoForm,{
      data: {
        id: carrito.id,
        usuarioId: carrito.usuarioId,
        fechaCreacion: carrito.fechaCreacion
      }
    });
    dialogRef.afterClosed().subscribe(updatedCarrito => {
      console.log("updatedCarrito: "+updatedCarrito);
      if (updatedCarrito) {
        this.updateLocalDataSource(updatedCarrito);
      }
    });
    }

    addCarritoModal(carritoForm: any) { 
      const dialogRef = this.dialog.open(carritoForm, {
        data: {}
      });
    
      dialogRef.afterClosed().subscribe(newCarrito => {
        if (newCarrito) {
          console.log("New carrito added:", newCarrito);
        }
      });
    }
      
    updateLocalDataSource(updatedCarrito: Carrito) {
      const currentData = this.dataSource.data;
      const index = currentData.findIndex(carrito => carrito.id === updatedCarrito.id);
      if (index > -1) {
        currentData[index] = updatedCarrito;
        this.restService.updateCarritosData([...currentData]);  // Actualizar los datos del servicio
      }
    }
}
