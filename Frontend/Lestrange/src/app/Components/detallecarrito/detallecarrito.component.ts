import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-detallecarrito',
  templateUrl: './detallecarrito.component.html',
  styleUrls: ['./detallecarrito.component.css']
})

export class DetallecarritoComponent implements OnInit{

    constructor(public api: RestService){}

    ngOnInit(): void{
      this.getDetallecarrito();
    }
    public getDetallecarrito(){
      this.api.getDetallecarritoFromRemote();
    }
}