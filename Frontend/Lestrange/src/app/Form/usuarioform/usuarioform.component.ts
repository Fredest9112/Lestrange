/*
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})

export class UsuarioformComponent {
  }
  
    id?: number;
    nombreUsuario?: string | null;
    correo?: string | null;
    contrasena?: string | null;
    direccionEnvio?: string | null;
    fechaRegistro?: string | null;
*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nombreUsuario: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, Validators.required],
      direccionEnvio: [null],
      fechaRegistro: [null]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      // Procesar el formulario aquí
      console.log(this.formulario.value);
    }
  }
}

  

