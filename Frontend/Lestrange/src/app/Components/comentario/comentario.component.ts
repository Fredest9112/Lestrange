import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  constructor(public api: RestService){}

  ngOnInit(): void {
    this.getComentarios();
  }

  public getComentarios(){
    this.api.getComentariosFromRemote();
  }

}
