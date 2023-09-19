import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(public api: RestService){}

  ngOnInit(): void {
    this.getCarrito();
  }

  public getCarrito(){
    this.api.getCarritoFromRemote();
  }
}
