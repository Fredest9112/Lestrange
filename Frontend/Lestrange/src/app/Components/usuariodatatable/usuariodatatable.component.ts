import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from 'src/app/Models/usuario.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/Services/rest.usuarioservice';
import Swal from 'sweetalert2';
import { UsuarioformComponent } from 'src/app/Forms/usuarioform/usuarioform.component';

@Component({
  selector: 'app-usuariodatatable',
  templateUrl: './usuariodatatable.component.html',
  styleUrls: ['./usuariodatatable.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, MatIconModule],
})
export class Usuariodatatable implements AfterViewInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = []; // Initialize as an empty array

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public restService: UsuarioService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    // Obtén los datos y asígnalos al origen de datos
    this.restService.usuariosData$.subscribe((usuarios: Usuario[]) => {
      this.dataSource.data = usuarios;
  
      // Popula displayedColumns basado en las propiedades del primer usuario (asumiendo que todos los usuarios tienen las mismas propiedades)
      if (usuarios.length > 0) {
        this.displayedColumns = Object.keys(usuarios[0]);
        this.displayedColumns.push('acciones');
        this.dataSource.sort = this.sort;
      }
      this.cdRef.detectChanges();
    });
    this.restService.getUsuarioFromRemote().subscribe((usuarios: Usuario[]) => {
      this.restService.updateUsuariosData(usuarios);
    });
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarUsuario(usuario: Usuario) {
    this.editUsuarioModal("Editar usuario", UsuarioformComponent, usuario);
    
  }

  agregarUsuario() {
      this.addUsuarioModal(UsuarioformComponent);
  }

  borrarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            this.restService.deleteUsuario(usuario.id).subscribe(() => {
              Swal.fire('¡Eliminado!', 'Tu usuario ha sido eliminado.', 'success');
              // Volver a obtener todos los usuarios después de la eliminación exitosa
              this.restService.getUsuarioFromRemote().subscribe((usuarios: Usuario[]) => {
                  this.restService.updateUsuariosData(usuarios);
              });
            }, (error) => {
              Swal.fire('Error', 'Hubo un problema al eliminar el Usuario.', 'error');
            });
        }
    });
  }
  
    editUsuarioModal(title: string, UsuarioForm: any, usuario: Usuario) {
      const dialogRef = this.dialog.open(UsuarioForm, {
        data: {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario, // Reemplaza los campos según la estructura de tu objeto Usuario
          correo: usuario.correo,
          contrasena: usuario.contrasena,
          direccionEnvio: usuario.direccionEnvio,
          fechaRegistro: usuario.fechaRegistro
        }
      });
      dialogRef.afterClosed().subscribe(updatedUsuario => {
        console.log("updatedUsuario: " + updatedUsuario);
        if (updatedUsuario) {
          this.updateLocalDataSource(updatedUsuario);
        }
      });
    }

  addUsuarioModal(usuarioForm: any) { 
    const dialogRef = this.dialog.open(usuarioForm, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(newUsuario => {
      if (newUsuario) {
        console.log("New usuario added:", newUsuario);
      }
    });
  }
  
  updateLocalDataSource(updatedUsuario: Usuario) {
    const currentData = this.dataSource.data;
    const index = currentData.findIndex(usuario => usuario.id === updatedUsuario.id);
    if (index > -1) {
      currentData[index] = updatedUsuario;
      this.restService.updateUsuariosData([...currentData]);  // Actualizar los datos del servicio
    }
  }
}

