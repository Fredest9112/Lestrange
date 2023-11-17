import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Pago } from 'src/app/Models/pago.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PagoRestService } from 'src/app/Services/rest.pago.service';
import Swal from 'sweetalert2';
import { PagoformComponent } from 'src/app/Forms/pagoform/pagoform.component';


@Component({
  selector: 'app-pagodatatable', // Cambia el nombre del selector según sea necesario
  templateUrl: './pagodatatable.component.html',
  styleUrls: ['./pagodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Pagodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource<Pago>([]); // Utiliza Pago como tipo
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: PagoRestService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Suscríbete al observable de datos de pago
    this.restService.pagosData$.subscribe((pagos: Pago[]) => {
      this.dataSource.data = pagos;

      if (pagos.length > 0) {
        this.displayedColumns = Object.keys(pagos[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges();
    });

    // Fetch de datos iniciales
    this.restService.getPagoFromRemote().subscribe((pagos: Pago[]) => {
      this.restService.updatePagosData(pagos);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarPago(pago: Pago) {
    this.editPagoModal("Editar pago", PagoformComponent, pago);
  }

  agregarPago() {
    this.addPagoModal(PagoformComponent);
  }

  borrarPago(pago: Pago) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deletePago(pago.id).subscribe(() => {
          Swal.fire('Eliminado', 'Tu pago ha sido eliminado.', 'success');
          // Vuelve a cargar todos los pagos después de la eliminación exitosa
          this.restService.getPagoFromRemote().subscribe((pagos: Pago[]) => {
            this.restService.updatePagosData(pagos);
          });
        }, (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el pago.', 'error');
        });
      }
    });
  }

  editPagoModal(title: string, pagoForm: any, pago: Pago) {
    const dialogRef = this.dialog.open(pagoForm, {
      data: {
        id: pago.id,
        ordenVentaId: pago.ordenVentaId,
        monto: pago.monto,
        fecha: pago.fecha,
        métodoPago: pago.métodoPago,
      }
    });

    dialogRef.afterClosed().subscribe(updatedPago => {
      console.log("updatedPago: " + updatedPago);
      if (updatedPago) {
        this.updateLocalDataSource(updatedPago);
      }
    });
  }

  addPagoModal(pagoForm: any) {
    const dialogRef = this.dialog.open(pagoForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(newPago => {
      if (newPago) {
        console.log("Nuevo pago agregado:", newPago);
      }
    });
  }

  updateLocalDataSource(updatedPago: Pago) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(pago => pago.id === updatedPago.id);
    if (index > -1) {
      currentData[index] = updatedPago;
      this.restService.updatePagosData([...currentData]);  // Actualiza los datos del servicio
    }
  }
}

