import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleOrdenRestService } from 'src/app/Services/rest.detalleOrdenservice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetalleOrden } from 'src/app/Models/detalleOrden.interface';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalleordenform',
  templateUrl: './detalleordenform.component.html',
  styleUrls: ['./detalleordenform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class DetalleordenformComponent {

  detalleOrdenForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetalleOrden,
    private matDialogRef: MatDialogRef<DetalleordenformComponent>,
    private formBuilder: FormBuilder,
    public restService: DetalleOrdenRestService,
  ) {
    this.detalleOrdenForm = this.formBuilder.group({
      id: [data.id],
      ordenVentaId: [data.ordenVentaId, Validators.required],
      zapatoId: [data.zapatoId, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      precio: [data.precio, Validators.required],
    })
    this.isEditMode = !!data.id;
    console.log('isEditMode:', this.isEditMode); // Agrega esta línea para depurar

  }


  onSave() {
    if (this.detalleOrdenForm.valid) {
      this.restService.editDetalleOrden(this.detalleOrdenForm.value).subscribe({
        next: (updatedDetalleOrden) => {
          // Fetch all detalleOrdens again after successful update
          this.restService.getDetalleOrdenFromRemote().subscribe((detalleOrdens: DetalleOrden[]) => {
            this.restService.updatedetalleOrdenesData(detalleOrdens);
          });
          this.matDialogRef.close(updatedDetalleOrden);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'DetalleOrden updated successfully!',
            'success'
          ); 
        },
        error: (error) => {
          console.error('Error updating DetalleOrden:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the DetalleOrden.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.detalleOrdenForm.controls).forEach((key) => {
        const control = this.detalleOrdenForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }

  onAdd() {
    const detalleOrdenToCreate = { ...this.detalleOrdenForm.value };
    delete detalleOrdenToCreate.id; // remove the ID
  
    if (this.detalleOrdenForm.valid) {
      this.restService.addDetalleOrden(detalleOrdenToCreate).subscribe({
        next: (createdDetalleOrden) => {
          // Fetch all detalleOrdens again after successful addition
          this.restService.getDetalleOrdenFromRemote().subscribe((detalleOrdens: DetalleOrden[]) => {
            this.restService.updatedetalleOrdenesData(detalleOrdens);
          });
          this.matDialogRef.close(createdDetalleOrden);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'DetalleOrden added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding DetalleOrden:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the DetalleOrden.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.detalleOrdenForm.controls).forEach((key) => {
        const control = this.detalleOrdenForm.get(key);
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