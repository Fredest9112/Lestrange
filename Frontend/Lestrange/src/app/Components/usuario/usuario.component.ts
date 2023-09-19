import { Component, OnInit } from '@angular/core';
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
  }
  public getUsuario(){
    this.api.getUsuarioFromRemote();
  }
}
