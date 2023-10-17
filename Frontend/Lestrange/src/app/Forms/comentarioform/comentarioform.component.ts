import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Comentario } from 'src/app/Models/comentario.interface';
import { ComentarioRestService } from 'src/app/Services/rest.comentarioservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentarioform',
  templateUrl: './comentarioform.component.html',
  styleUrls: ['./comentarioform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class ComentarioformComponent {
  comentarioForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Comentario,
    private matDialogRef: MatDialogRef<ComentarioformComponent>,
    private formBuilder: FormBuilder,
    public restService: ComentarioRestService
  ) {
    this.comentarioForm = this.formBuilder.group({
      id: [data.id],
      zapatoId: [data.zapatoId, Validators.required],
      usuarioId: [data.usuarioId, Validators.required],
      texto: [data.texto, Validators.required],
      fecha: [data.fecha, Validators.required]
    });
    this.isEditMode = !!data.id;
  }

  onSave() {
    if (this.comentarioForm.valid) {
      this.restService.editComentario(this.comentarioForm.value).subscribe({
        next: (updatedComentario) => {
          // Fetch all zapatos again after successful update
          this.restService.getComentarioFromRemote().subscribe((comentarios: Comentario[]) => {
            this.restService.updateComentariosData(comentarios);
          });
          this.matDialogRef.close(updatedComentario);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Comentario updated successfully!',
            'success'
          ); 
        },
        error: (error) => {
          console.error('Error updating Comentario:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the Comentario.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.comentarioForm.controls).forEach((key) => {
        const control = this.comentarioForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }

  onAdd() {
    const comentarioToCreate = { ...this.comentarioForm.value };
    delete comentarioToCreate.id;
  
    if (this.comentarioForm.valid) {
      this.restService.addComentario(comentarioToCreate).subscribe({
        next: (createdComentario) => {
          this.restService.getComentarioFromRemote().subscribe((comentarios: Comentario[]) => {
            this.restService.updateComentariosData(comentarios);
          });
          this.matDialogRef.close(createdComentario);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Comentario added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding Comentario:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the Comentario.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.comentarioForm.controls).forEach((key) => {
        const control = this.comentarioForm.get(key);
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
