import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DetalleOrden } from 'src/app/Models/detalleOrden.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DetalleOrdenRestService } from 'src/app/Services/rest.detalleOrdenservice';
import Swal from 'sweetalert2';
import { DetalleordenformComponent } from 'src/app/Forms/detalleordenform/detalleordenform.component';

@Component({
  selector: 'app-detalleordendatatable',
  templateUrl: './detalleordendatatable.component.html',
  styleUrls: ['./detalleordendatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Detalleordendatatable implements AfterViewInit {
  dataSource: MatTableDataSource<DetalleOrden> = new MatTableDataSource<DetalleOrden>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: DetalleOrdenRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.detalleOrdenesData$.subscribe((detalleOrdenes: DetalleOrden[]) => {
      this.dataSource.data = detalleOrdenes;


      if (detalleOrdenes.length > 0) {
        this.displayedColumns = Object.keys(detalleOrdenes[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges();
    });
   // Fetch de datos iniciales
   this.restService.getDetalleOrdenFromRemote().subscribe((detalleOrdenes: DetalleOrden[]) => {
    this.restService.updatedetalleOrdenesData(detalleOrdenes);
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

editarDetalleOrden(detalleOrden: DetalleOrden) {
  this.editDetalleOrdenModal("Editar detalleOrden", DetalleordenformComponent, detalleOrden);
}

agregarDetalleOrden() {
  this.addDetalleOrdenModal(DetalleordenformComponent);
}

borrarDetalleOrden(detalleOrden: DetalleOrden) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres eliminar el detalle de esta orden?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.restService.deleteDetalleOrden(detalleOrden.id).subscribe(() => {
        Swal.fire('Eliminado', 'Tu detalle de orden ha sido eliminado.', 'success');
        // Vuelve a cargar todos los detalles de orden después de la eliminación exitosa
        this.restService.getDetalleOrdenFromRemote().subscribe((detalleOrden: DetalleOrden[]) => {
          this.restService.updatedetalleOrdenesData(detalleOrden);
        });
      }, (error) => {
        Swal.fire('Error', 'Hubo un problema al eliminar el detalle de orden.', 'error');
      });
    }
  });
}

editDetalleOrdenModal(title: string, detalleOrdenForm: any, detalleOrden: DetalleOrden) {
  const dialogRef = this.dialog.open(detalleOrdenForm, {
    data: {
      id: detalleOrden.id,
      ordenVentaId: detalleOrden.ordenVentaId,
      zapatoId: detalleOrden.zapatoId,
      cantidad: detalleOrden.cantidad,
      precio: detalleOrden.precio,
    }
  });

  dialogRef.afterClosed().subscribe(updatedDetalleOrden => {
    console.log("updatedDetalleOrden: " + updatedDetalleOrden);
    if (updatedDetalleOrden) {
      this.updateLocalDataSource(updatedDetalleOrden);
    }
  });
}

addDetalleOrdenModal(detalleOrdenForm: any) {
  const dialogRef = this.dialog.open(detalleOrdenForm, {
    data: {}
  });

  dialogRef.afterClosed().subscribe(newDetalleOrden => {
    if (newDetalleOrden) {
      console.log("Nuevo detalle de orden agregado:", newDetalleOrden);
    }
  });
}

updateLocalDataSource(updatedDetalleOrden: DetalleOrden) {
  const currentData = this.dataSource.data;
  const index = currentData.findIndex(detalleOeden => detalleOeden.id === updatedDetalleOrden.id);
  if (index > -1) {
    currentData[index] = updatedDetalleOrden;
    this.restService.updatedetalleOrdenesData([...currentData]);  // Actualiza los datos del servicio
    this.dataSource.data = currentData;
  }
}
}