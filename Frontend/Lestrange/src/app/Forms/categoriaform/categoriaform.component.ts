import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Categoria } from 'src/app/Models/categoria.interface';
import { CategoriaRestService } from 'src/app/Services/rest.categoriaservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoriaform',
  templateUrl: './categoriaform.component.html',
  styleUrls: ['./categoriaform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class CategoriaformComponent {
  categoriaForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Categoria,
    private matDialogRef: MatDialogRef<CategoriaformComponent>,
    private formBuilder: FormBuilder,
    public restService: CategoriaRestService
  ) {
    this.categoriaForm = this.formBuilder.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });
    this.isEditMode = !!data.id;
  }

  onSave() {
    if (this.categoriaForm.valid) {
      this.restService.editCategoria(this.categoriaForm.value).subscribe({
        next: (updatedCategoria) => {
          // Fetch all zapatos again after successful update
          this.restService.getCategoriaFromRemote().subscribe((categorias: Categoria[]) => {
            this.restService.updateCategoriasData(categorias);
          });
          this.matDialogRef.close(updatedCategoria);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Categoria updated successfully!',
            'success'
          ); 
        },
        error: (error) => {
          console.error('Error updating Categoria:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the Categoria.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.categoriaForm.controls).forEach((key) => {
        const control = this.categoriaForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }

  onAdd() {
    const categoriaToCreate = { ...this.categoriaForm.value };
    delete categoriaToCreate.id; // remove the ID
  
    if (this.categoriaForm.valid) {
      this.restService.addCategoria(categoriaToCreate).subscribe({
        next: (createdCategoria) => {
          // Fetch all zapatos again after successful addition
          this.restService.getCategoriaFromRemote().subscribe((categorias: Categoria[]) => {
            this.restService.updateCategoriasData(categorias);
          });
          this.matDialogRef.close(createdCategoria);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Categoria added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding Categoria:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the Categoria.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.categoriaForm.controls).forEach((key) => {
        const control = this.categoriaForm.get(key);
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
