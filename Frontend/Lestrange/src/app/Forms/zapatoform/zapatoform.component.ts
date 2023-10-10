import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZapatoRestService } from 'src/app/Services/rest.zapatoservice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Zapato } from 'src/app/Models/zapato.interface';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zapatoform',
  templateUrl: './zapatoform.component.html',
  styleUrls: ['./zapatoform.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
})
export class ZapatoformComponent {
  zapatoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Zapato,
    private matDialogRef: MatDialogRef<ZapatoformComponent>,
    private formBuilder: FormBuilder,
    public restService: ZapatoRestService
  ) {
    this.zapatoForm = this.formBuilder.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      precio: [data.precio, Validators.required],
      imagenUrl: [data.imagenUrl, Validators.required],
      stock: [data.stock, Validators.required],
      categoriaId: [data.categoriaId, Validators.required],
    });
  }

  onSave() {
    if (this.zapatoForm.valid) {
      this.restService.editZapato(this.zapatoForm.value).subscribe({
        next: (updatedZapato) => {
          console.log("zapato: "+this.zapatoForm.value)
          console.log('Zapato updated:', updatedZapato);
          this.matDialogRef.close();
        },
        error: (error) => {
          console.error('Error updating Zapato:', error);
        },
      });
      Swal.fire(
        'Datos Ingresados Correctame',
        'you clicked the button',
        'success'
      )  
    } else {
      Object.keys(this.zapatoForm.controls).forEach((key) => {
        const control = this.zapatoForm.get(key);
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
