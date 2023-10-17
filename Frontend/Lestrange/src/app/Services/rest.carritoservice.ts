import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carrito } from '../Models/carrito.interface';

@Injectable({
  providedIn: 'root'
})

export class CarritoRestService {

  private carritosDataSubject = new BehaviorSubject<Carrito[]>([]);
  carritosData$ = this.carritosDataSubject.asObservable();
  
  constructor(public api: HttpClient) { }

  getCarritoFromRemote(): Observable<Carrito[]>{
    return this.api.get<Carrito[]>("https://localhost:7200/api/Carrito").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editCarrito(carrito: Carrito): Observable<Carrito> {
    const editUrl = `https://localhost:7200/api/Carrito/${carrito.id}`;
    console.log('Edit URL:', editUrl);
    console.log('carrito image:', carrito.usuarioId);
    return this.api.put<Carrito>(editUrl, carrito).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing Carrito:', error);
        return throwError(error);
      })
    );
  }

  addCarrito(carrito: Carrito): Observable<Carrito> {
    const addUrl = `https://localhost:7200/api/Carrito`;
    return this.api.post<Carrito>(addUrl, carrito).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding Carrito:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deleteCarrito(carritoId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/Carrito/${carritoId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting Carrito:', error);
        return throwError(error);
      })
    );
  }
//New method to update carrito data
  updateCarritosData(carritos: Carrito[]) {
    this.carritosDataSubject.next(carritos);
  }
}
