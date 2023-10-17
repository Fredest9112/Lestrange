import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetalleCarrito } from 'src/app/Models/detallecarrito.interface';
import { DetalleCarritoRestService } from 'src/app/Services/rest.detallecarritoservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallecarritoform',
  templateUrl: './detallecarritoform.component.html',
  styleUrls: ['./detallecarritoform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class DetallecarritoformComponent {

  detalleCarritoForm: FormGroup;
  isEditMode: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetalleCarrito,
    private matDialogRef: MatDialogRef<DetallecarritoformComponent>,
    private formBuilder: FormBuilder,
    public restService: DetalleCarritoRestService
  ){
    this.detalleCarritoForm = this.formBuilder.group({
      id: [data.id],
      carritoId: [data.carritoId, Validators.required],
      zapatoId: [data.zapatoId, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      precio: [data.precio, Validators.required]
    })
    this.isEditMode = !!data.id;
  }

  onSave() {
    if (this.detalleCarritoForm.valid) {
      this.restService.editDetalleCarrito(this.detalleCarritoForm.value).subscribe({
        next: (updatedDetalleCarrito) => {
          this.restService.getDetalleCarritoFromRemote().subscribe((detalleCarrito: DetalleCarrito[]) => {
            this.restService.updateDetalleCarritosData(detalleCarrito);
          });
          this.matDialogRef.close(updatedDetalleCarrito);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'DetalleCarrito updated successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error updating DetalleCarrito:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the DetalleCarrito.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.detalleCarritoForm.controls).forEach((key) => {
        const control = this.detalleCarritoForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }
  
  onAdd(){
    const detalleCarritoToCreate = { ...this.detalleCarritoForm.value };
    delete detalleCarritoToCreate.id; // Elimina el ID
  
    if (this.detalleCarritoForm.valid) {
      this.restService.addDetalleCarrito(detalleCarritoToCreate).subscribe({
        next: (createdDetalleCarrito) => {
          this.restService.getDetalleCarritoFromRemote().subscribe((detalleCarrito: DetalleCarrito[]) => {
            this.restService.updateDetalleCarritosData(detalleCarrito);
          });
          this.matDialogRef.close(createdDetalleCarrito);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'DetalleCarrito added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding DetalleCarrito:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the DetalleCarrito.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.detalleCarritoForm.controls).forEach(key => {
        const control = this.detalleCarritoForm.get(key);
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
