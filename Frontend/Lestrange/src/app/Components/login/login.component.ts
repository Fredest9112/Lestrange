import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/rest.usuarioservice';
import Swal from 'sweetalert2';  // Import SweetAlert

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.usuarioService.loginUser(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        response => {
          console.log('Login successful', response);
          Swal.fire({
            title: 'Success!',
            text: 'Login successful',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/menu']);
            }
          });
        },
        error => {
          console.error('Login failed', error);
          Swal.fire({
            title: 'Error!',
            text: 'Login failed',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
