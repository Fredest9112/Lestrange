import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Categoria } from '../Models/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaRestService {
  private categoriasDataSubject = new BehaviorSubject<Categoria[]>([]);
  categoriasData$ = this.categoriasDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getCategoriaFromRemote(): Observable<Categoria[]>{
    return this.api.get<Categoria[]>("https://localhost:7200/api/Categorias").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editCategoria(categoria: Categoria): Observable<Categoria> {
    const editUrl = `https://localhost:7200/api/Categorias/${categoria.id}`;
    console.log('Edit URL:', editUrl);
    console.log('categoria name image:', categoria.nombre);
    return this.api.put<Categoria>(editUrl, categoria).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing Categoria:', error);
        return throwError(error);
      })
    );
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    const addUrl = `https://localhost:7200/api/Categorias`;
    return this.api.post<Categoria>(addUrl, categoria).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding Categoria:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deleteCategoria(categoriaId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/Categorias/${categoriaId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting Categoria:', error);
        return throwError(error);
      })
    );
  }

  // New method to update zapatos data
  updateCategoriasData(categorias: Categoria[]) {
    this.categoriasDataSubject.next(categorias);
  }
}
