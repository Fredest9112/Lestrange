import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) { }

  public async getZapatosFromRemote(){
    try {
      await this.api.get("https://localhost:7200/api/Zapato").toPromise().then((res)=>{
      console.log(res);
    });
    } catch (error) {
      console.log("error on request: "+error);
    }
  }

  public async getCategoriasFromRemote(){
    try {
      await this.api.get("https://localhost:7200/api/Categorias").toPromise().then((res)=>{
      console.log(res);
    });
    } catch (error) {
      console.log("error on request: "+error);
    }
  }

  public async getComentariosFromRemote(){
    try {
      await this.api.get("https://localhost:7200/api/Comentarios").toPromise().then((res)=>{
      console.log(res);
    });
    } catch (error) {
      console.log("error on request: "+error);
    }
  }
}
