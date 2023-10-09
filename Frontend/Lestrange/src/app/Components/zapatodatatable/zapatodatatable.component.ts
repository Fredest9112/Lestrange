import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Zapato } from 'src/app/Models/zapato.interface';
import { ZapatoRestService } from 'src/app/Services/rest.zapatoservice';
import { MatDialog } from '@angular/material/dialog';
import { ZapatoformComponent } from 'src/app/Forms/zapatoform/zapatoform.component';

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

  constructor(public restService: ZapatoRestService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.restService.getZapatosFromRemote().subscribe((zapatos: Zapato[]) => {
      this.dataSource.data = zapatos;

      if (zapatos.length > 0) {
        this.displayedColumns = Object.keys(zapatos[0]);

        this.displayedColumns.push('acciones');

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

  editarZapato(zapato: Zapato) {
    this.editZapatoModal("Editar zapato", ZapatoformComponent, zapato);
  }
  
  borrarZapato(zapato: Zapato) {
    console.log("borrar zapato: "+zapato.descripcion);
  }

  editZapatoModal(title: string, zapatoForm: any, zapato: Zapato) {
    this.dialog.open(zapatoForm, {
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
  }
}
