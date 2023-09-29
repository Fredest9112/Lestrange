import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario.interface';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(public api: RestService){}
  ngOnInit(): void{
    this.getUsuario();
    const nuevoUsuario: Usuario = {
      nombreUsuario: 'Ebert Rodriguez', // Replace with the actual user data
      correo: 'ebert.r@example.com',
      contrasena: 'pass123',
      direccionEnvio: '456 Main St',
      fechaRegistro: '2023-09-18',
    };
    this.crearUsuario(nuevoUsuario);
  }

  public getUsuario(){
    this.api.getUsuarioFromRemote();
  }

  public crearUsuario(usuarioData : any){
    this.api.crearUsuario(usuarioData);
  }

  public actualizarUsuario(usuarioId : number ,usuarioData : any){
    this.api.actualizarUsuario(usuarioId, usuarioData);
  }

  public borrarUsuario(usuarioId : number){
    this.api.borrarUsuario(usuarioId);
  }
}
