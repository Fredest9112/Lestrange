import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from '../Models/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaRestService {

  constructor(public api: HttpClient) { }

  getCategoriaFromRemote(): Observable<Categoria[]>{
    return this.api.get<Categoria[]>("https://localhost:7200/api/Categorias").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}
