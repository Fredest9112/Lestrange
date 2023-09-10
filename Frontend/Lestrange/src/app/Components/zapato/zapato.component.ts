import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-zapato',
  templateUrl: './zapato.component.html',
  styleUrls: ['./zapato.component.css']
})
export class ZapatoComponent implements OnInit {

  constructor(public api: RestService){}

  ngOnInit(): void {
    this.getZapatos();
  }

  public getZapatos(){
    this.api.getZapatosFromRemote();
  }

}
