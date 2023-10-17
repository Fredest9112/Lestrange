import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Carrito } from 'src/app/Models/carrito.interface';
import { CarritoRestService } from 'src/app/Services/rest.carritoservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carritoform',
  templateUrl: './carritoform.component.html',
  styleUrls: ['./carritoform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class CarritoformComponent {
  
  carritoForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Carrito,
    private matDialogRef: MatDialogRef<CarritoformComponent>,
    private formBuilder: FormBuilder,
    public restService: CarritoRestService
  ){
    this.carritoForm = this.formBuilder.group({
      id: [data.id],
      usuarioId: [data.usuarioId, Validators.required],
      fechaCreacion: [data.fechaCreacion, Validators.required],
    });
    this.isEditMode = !!data.id;
  }

  onSave(){
    if (this.carritoForm.valid){
      this.restService.editCarrito(this.carritoForm.value).subscribe({
        next: (updatedCarrito) => {
          this.restService.getCarritoFromRemote().subscribe((carrito: Carrito[]) => {
            this.restService.updateCarritosData(carrito);
          });
          this.matDialogRef.close(updatedCarrito);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Carrito updated successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error updating Carrito:', error);
          Swal.fire(
            'Error',
            'There was a problem updating the Carrito.',
            'error'
          );
        },
      });
    }else {
      Object.keys(this.carritoForm.controls).forEach((key) => {
        const control = this.carritoForm.get(key);
        if (control.invalid) {
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }
  onAdd(){
    const carritoToCreate = {...this.carritoForm.value };
    delete carritoToCreate.id; //remove the ID

    if (this.carritoForm.valid){
      this.restService.addCarrito(carritoToCreate).subscribe({
        next: (createdCarrito) => {
          this.restService.getCarritoFromRemote().subscribe((carrito: Carrito[]) => {
            this.restService.updateCarritosData(carrito);
          });
          this.matDialogRef.close(createdCarrito);
          Swal.fire(
            'Datos Ingresados Correctamente',
            'Carrito added successfully!',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding Carrito:', error);
          Swal.fire(
            'Error',
            'There was a problem adding the Carrito.',
            'error'
          );
        },
      });
    }else{
      Object.keys(this.carritoForm.controls).forEach(key => {
        const control = this.carritoForm.get(key);
        if (control.invalid){
          console.log(`Field ${key} has validation errors: `, control.errors);
        }
      });
    }
  }
  
  onCancel() {
    this.matDialogRef.close();
  }
}

