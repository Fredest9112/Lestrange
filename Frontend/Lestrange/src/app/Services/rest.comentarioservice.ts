import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Comentario } from '../Models/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentarioRestService {

  private comentariosDataSubject = new BehaviorSubject<Comentario[]>([]);
  comentariosData$ = this.comentariosDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getComentarioFromRemote(): Observable<Comentario[]>{
    return this.api.get<Comentario[]>("https://localhost:7200/api/Comentarios").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editComentario(comentario: Comentario): Observable<Comentario> {
    const editUrl = `https://localhost:7200/api/Comentarios/${comentario.id}`;
    console.log('Edit URL:', editUrl);
    console.log('comentario text:', comentario.texto);
    return this.api.put<Comentario>(editUrl, comentario).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing Comentario:', error);
        return throwError(error);
      })
    );
  }

  addComentario(comentario: Comentario): Observable<Comentario> {
    const addUrl = `https://localhost:7200/api/Comentarios`;
    return this.api.post<Comentario>(addUrl, comentario).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding Comentario:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deleteComentario(comentarioId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/Comentarios/${comentarioId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting Comentario:', error);
        return throwError(error);
      })
    );
  }

  updateComentariosData(comentarios: Comentario[]) {
    this.comentariosDataSubject.next(comentarios);
  }
}