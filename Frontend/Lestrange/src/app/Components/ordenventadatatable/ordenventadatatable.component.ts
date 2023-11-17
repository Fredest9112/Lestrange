import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OrdenVenta } from 'src/app/Models/ordenVenta.interface';
import { MatDialog } from '@angular/material/dialog';
import { ordenVentaservice } from 'src/app/Services/rest.ordenVentaservice';
import Swal from 'sweetalert2';
import { OrdenventaformComponent } from 'src/app/Forms/ordenventaform/ordenventaform.component';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-ordenventadatatable',
  templateUrl: './ordenventadatatable.component.html',
  styleUrls: ['./ordenventadatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Ordenventadatatable implements AfterViewInit {
  dataSource: MatTableDataSource<OrdenVenta> = new MatTableDataSource<OrdenVenta>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: ordenVentaservice, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Fetch data and then assign it to the data source
    this.restService.ordenVentasData$.subscribe((ordenVentas: OrdenVenta[]) => {
      this.dataSource.data = ordenVentas;

      // Populate displayedColumns based on the properties of the first user (assuming all users have the same properties)
      if (ordenVentas.length > 0) {
        this.displayedColumns = Object.keys(ordenVentas[0]);
        this.displayedColumns.push('acciones');
      }
      this.cdRef.detectChanges();
    });

    // Fetch de datos iniciales
    this.restService.getOrdenVentaFromRemote().subscribe((ordenVentas: OrdenVenta[]) => {
      this.restService.updateOrdenVentasData(ordenVentas);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarOrdenVenta(ordenVenta: OrdenVenta) {
    this.editOrdenVentaModal("Editar orden de venta", OrdenventaformComponent, ordenVenta);
  }

  agregarOrdenVenta() {
    this.addOrdenVentaModal(OrdenventaformComponent);
  }
  
  borrarOrdenVenta(ordenVenta: OrdenVenta) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este ordenVenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restService.deleteOrdenVenta(ordenVenta.id).subscribe(() => {
          Swal.fire('Eliminado', 'Tu ordenVenta ha sido eliminado.', 'success');
          // Vuelve a cargar todos los ordenVentas después de la eliminación exitosa
          this.restService.getOrdenVentaFromRemote().subscribe((ordenVentas: OrdenVenta[]) => {
            this.restService.updateOrdenVentasData(ordenVentas);
          });
        }, (error) => {
          Swal.fire('Error', 'Hubo un problema al eliminar el ordenVenta.', 'error');
        });
      }
    });
  }

  editOrdenVentaModal(title: string, ordenVentaForm: any, ordenVenta: OrdenVenta) {
    const dialogRef = this.dialog.open(ordenVentaForm, {
      data: {
        id: ordenVenta.id,
        usuarioId: ordenVenta.usuarioId,
        fecha: ordenVenta.fecha,
        total: ordenVenta.total,
        estado: ordenVenta.estado,
      }
    });

    dialogRef.afterClosed().subscribe(updatedOrdenVenta => {
      console.log("updatedOrdenVenta: " + updatedOrdenVenta);
      if (updatedOrdenVenta) {
        this.updateLocalDataSource(updatedOrdenVenta);
      }
    });
  }

  addOrdenVentaModal(ordenVentaForm: any) {
    const dialogRef = this.dialog.open(ordenVentaForm, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(newOrdenVenta => {
      if (newOrdenVenta) {
        console.log("Nuevo ordenVenta agregado:", newOrdenVenta);
      }
    });
  }

  updateLocalDataSource(updatedOrdenVenta: OrdenVenta) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(ordenVenta => ordenVenta.id === updatedOrdenVenta.id);
    if (index > -1) {
      currentData[index] = updatedOrdenVenta;
      this.restService.updateOrdenVentasData([...currentData]);  // Actualiza los datos del servicio
    }
  }
}
