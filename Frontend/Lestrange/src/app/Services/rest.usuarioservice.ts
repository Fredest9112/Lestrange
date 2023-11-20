import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../Models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosDataSubject = new BehaviorSubject<Usuario[]>([]);
  usuariosData$ = this.usuariosDataSubject.asObservable();


  constructor(public api: HttpClient) { }

  getUsuarioFromRemote(): Observable<Usuario[]> {
    return this.api.get<Usuario[]>("https://localhost:7200/api/Usuarios").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editUsuario(usuario: Usuario): Observable<Usuario> {
    const editUrl = `https://localhost:7200/api/Usuarios/${usuario.id}`;
    console.log('Edit URL:', editUrl);
    console.log('usuario image:', usuario.nombreUsuario);
    return this.api.put<Usuario>(editUrl, usuario).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing Usuario:', error);
        return throwError(error);
      })
    );
  }
  
  addUsuario(usuario: Usuario): Observable<Usuario> {
    const addUrl = `https://localhost:7200/api/Usuarios`;
    return this.api.post<Usuario>(addUrl, usuario).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding Usuario:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }
  
  deleteUsuario(usuarioId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/Usuarios/${usuarioId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting Usuario:', error);
        return throwError(error);
      })
    );
  }
  
  updateUsuariosData(usuarios: Usuario[]) {
    this.usuariosDataSubject.next(usuarios);
  }

  loginUser(username: string, password: string): Observable<Usuario | null> {
    return this.getUsuarioFromRemote().pipe(
      map(users => {
        const foundUser = users.find(user => user.nombreUsuario === username && user.contrasena === password);
        if (!foundUser) {
          throw new Error('Invalid username or password');
        }
        return foundUser;
      }),
      catchError((error: any) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }
  
}
