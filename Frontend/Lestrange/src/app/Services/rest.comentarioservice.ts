import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Comentario } from '../Models/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentarioRestService {

  constructor(public api: HttpClient) { }

  getComentarioFromRemote(): Observable<Comentario[]>{
    return this.api.get<Comentario[]>("https://localhost:7200/api/Comentarios").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}