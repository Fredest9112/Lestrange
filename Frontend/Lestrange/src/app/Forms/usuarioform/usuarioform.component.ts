import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from 'src/app/Models/usuario.interface';
import { UsuarioService } from 'src/app/Services/rest.usuarioservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class UsuarioformComponent {

  usuarioForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private matDialogRef: MatDialogRef<UsuarioformComponent>,
    private formBuilder: FormBuilder,
    public restService: UsuarioService
  ){
    this.usuarioForm = this.formBuilder.group({
      id: [data.id],
      nombreUsuario: [data.nombreUsuario, Validators.required],
      correo: [data.correo, Validators.required],
      contrasena: [data.contrasena, Validators.required],
      direccionEnvio: [data.direccionEnvio, Validators.required],
      fechaRegistro: [data.fechaRegistro, Validators.required],
    })
    this.isEditMode = !!data.id;
  }

  onSave(){
    if (this.usuarioForm.valid){
      this.restService.editUsuario(this.usuarioForm.value).subscribe({
        next: (updatedUsuario) => {
          this.restService.getUsuarioFromRemote().subscribe((usuarios: Usuario[]) => {
            this.restService.updateUsuariosData(usuarios);
          });
          this.matDialogRef.close(updatedUsuario);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Usuario updated successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error updating Usuario:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the Usuario.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.usuarioForm.controls).forEach((key) => {
        const control = this.usuarioForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }
  
  onAdd() {
    const usuarioToCreate = { ...this.usuarioForm.value };
    delete usuarioToCreate.id; // Elimina el ID
  
    if (this.usuarioForm.valid) {
      this.restService.addUsuario(usuarioToCreate).subscribe({
        next: (createdUsuario) => {
          this.restService.getUsuarioFromRemote().subscribe((usuarios: Usuario[]) => {
            this.restService.updateUsuariosData(usuarios);
          });
          this.matDialogRef.close(createdUsuario);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Usuario added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding Usuario:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the Usuario.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.usuarioForm.controls).forEach(key => {
        const control = this.usuarioForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }

  onCancel() {
    this.matDialogRef.close();
  }  
}
