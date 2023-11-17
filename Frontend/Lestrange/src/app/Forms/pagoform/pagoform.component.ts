import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagoRestService } from 'src/app/Services/rest.pago.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pago } from 'src/app/Models/pago.interface';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagoform',
  templateUrl: './pagoform.component.html',
  styleUrls: ['./pagoform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class PagoformComponent {

  pagoForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pago,
    private matDialogRef: MatDialogRef<PagoformComponent>,
    private formBuilder: FormBuilder,
    public restService: PagoRestService
  ) {
    this.pagoForm = this.formBuilder.group({
      id: [data.id],
      ordenVentaId: [data.ordenVentaId, Validators.required],
      monto: [data.monto, Validators.required],
      fecha: [data.fecha, Validators.required],
      métodoPago: [data.métodoPago, Validators.required],
    })
    this.isEditMode = !!data.id;
    console.log('isEditMode:', this.isEditMode); // Agrega esta línea para depurar

  }


  onSave() {
    if (this.pagoForm.valid) {
      this.restService.editPago(this.pagoForm.value).subscribe({
        next: (updatedPago) => {
          // Fetch all pagos again after successful update
          this.restService.getPagoFromRemote().subscribe((pagos: Pago[]) => {
            this.restService.updatePagosData(pagos);
          });
          this.matDialogRef.close(updatedPago);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Pago updated successfully!',
            'success'
          ); 
        },
        error: (error) => {
          console.error('Error updating Pago:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the Pago.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.pagoForm.controls).forEach((key) => {
        const control = this.pagoForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }

  onAdd() {
    const pagoToCreate = { ...this.pagoForm.value };
    delete pagoToCreate.id; // remove the ID
  
    if (this.pagoForm.valid) {
      this.restService.addPago(pagoToCreate).subscribe({
        next: (createdPago) => {
          // Fetch all pagos again after successful addition
          this.restService.getPagoFromRemote().subscribe((pagos: Pago[]) => {
            this.restService.updatePagosData(pagos);
          });
          this.matDialogRef.close(createdPago);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Pago added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding Pago:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the Pago.',
            'error'
          );
        },
      });
    } else {
      Object.keys(this.pagoForm.controls).forEach((key) => {
        const control = this.pagoForm.get(key);
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