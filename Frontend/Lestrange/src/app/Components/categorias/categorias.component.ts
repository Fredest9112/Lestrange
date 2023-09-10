import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(public api: RestService){}

  ngOnInit(): void {
    this.getCategorias();
  }

  public getCategorias(){
    this.api.getCategoriasFromRemote();
  }

}
