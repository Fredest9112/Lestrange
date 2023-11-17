import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ordenVentaservice } from 'src/app/Services/rest.ordenVentaservice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrdenVenta } from 'src/app/Models/ordenVenta.interface';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenventaform',
  templateUrl: './ordenventaform.component.html',
  styleUrls: ['./ordenventaform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class OrdenventaformComponent {

  ordenVentaForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrdenVenta,
    private matDialogRef: MatDialogRef<OrdenventaformComponent>,
    private formBuilder: FormBuilder,
    public restService: ordenVentaservice,
  ) {
    this.ordenVentaForm = this.formBuilder.group({
      id: [data.id],
      usuarioId: [data.usuarioId, Validators.required],
      fecha: [data.fecha, Validators.required],
      total: [data.total, Validators.required],
      estado: [data.estado, Validators.required],
    })
    this.isEditMode = !!data.id;
    console.log('isEditMode:', this.isEditMode); // Agrega esta línea para depurar

  }


  onSave() {
    if (this.ordenVentaForm.valid) {
      this.restService.editOrdenVenta(this.ordenVentaForm.value).subscribe({
        next: (updatedOrdenVenta) => {
          // Fetch all ordenVentas again after successful update
          this.restService.getOrdenVentaFromRemote().subscribe((ordenVentas: OrdenVenta[]) => {
            this.restService.updateOrdenVentasData(ordenVentas);
          });
          this.matDialogRef.close(updatedOrdenVenta);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'OrdenVenta updated successfully!',
            'success'
          ); 
        },
        error: (error) => {
          console.error('Error updating OrdenVenta:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the OrdenVenta.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.ordenVentaForm.controls).forEach((key) => {
        const control = this.ordenVentaForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }

  onAdd() {
    const ordenVentaToCreate = { ...this.ordenVentaForm.value };
    delete ordenVentaToCreate.id; // remove the ID
  
    if (this.ordenVentaForm.valid) {
      this.restService.addOrdenVenta(ordenVentaToCreate).subscribe({
        next: (createdOrdenVenta) => {
          // Fetch all ordenVentas again after successful addition
          this.restService.getOrdenVentaFromRemote().subscribe((ordenVentas: OrdenVenta[]) => {
            this.restService.updateOrdenVentasData(ordenVentas);
          });
          this.matDialogRef.close(createdOrdenVenta);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'OrdenVenta added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding OrdenVenta:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the OrdenVenta.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.ordenVentaForm.controls).forEach((key) => {
        const control = this.ordenVentaForm.get(key);
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