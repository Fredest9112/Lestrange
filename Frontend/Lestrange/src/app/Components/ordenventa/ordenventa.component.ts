import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-ordenventa',
  templateUrl: './ordenventa.component.html',
  styleUrls: ['./ordenventa.component.css']

})
export class OrdenventaComponent implements OnInit{

  constructor(public api: RestService){}

  ngOnInit(): void{
    this.getOrdenventa();
  }
  public getOrdenventa(){
    this.api.getOrdenventaFromRemote();
  }
}
