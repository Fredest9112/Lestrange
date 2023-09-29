import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']

})
export class PagoComponent implements OnInit{

  constructor(public api: RestService){}

  ngOnInit(): void{
    this.getPagos();
  }
  public getPagos(){
    this.api.getPagoFromRemote();
  }
}
