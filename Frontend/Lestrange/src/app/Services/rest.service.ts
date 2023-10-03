import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.interface';
import { Observable, catchError, throwError } from 'rxjs';

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
  public async getDetallecarritoFromRemote(){
    try {
      await this.api.get("https://localhost:7200/api/Detallecarrito").toPromise().then((res)=>{
      console.log(res);
    });
    } catch (error) {
      console.log("error on request: "+error);
    }
  }
  public async getCarritoFromRemote(){
    try {
      await this.api.get("https://localhost:7200/api/Carrito").toPromise().then((res)=>{
      console.log(res);
    });
    } catch (error) {
      console.log("error on request: "+error);
    }
  }
  
  getUsuarioFromRemote(): Observable<Usuario[]> {
    return this.api.get<Usuario[]>("https://localhost:7200/api/Usuarios").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  public async crearUsuario(usuarioData: Usuario) {
    try {
      const response = await this.api.post("https://localhost:7200/api/Usuarios", usuarioData).toPromise();
      console.log("Usuario creado:", response);
    } catch (error) {
      console.log("Error en la solicitud POST:", error);
    }
  }

  public async actualizarUsuario(usuarioId: number, usuarioData: Usuario) {
    try {
      const response = await this.api.put(`https://localhost:7200/api/Usuarios/${usuarioId}`, usuarioData).toPromise();
      console.log("Usuario actualizado:", response);
    } catch (error) {
      console.log("Error en la solicitud PUT:", error);
    }
  }

  public async borrarUsuario(usuarioId: number) {
    try {
      const response = await this.api.delete(`https://localhost:7200/api/Usuarios/${usuarioId}`).toPromise();
      console.log("Usuario eliminado:", response);
    } catch (error) {
      console.log("Error en la solicitud DELETE:", error);
    }
  }
}


