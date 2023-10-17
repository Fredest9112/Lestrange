import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { DetalleCarrito } from '../Models/detallecarrito.interface';

@Injectable({
  providedIn: 'root'
})

export class DetalleCarritoRestService {

  private detalleCarritoDataSubject = new BehaviorSubject<DetalleCarrito[]>([]);
  detalleCarritoData$ = this.detalleCarritoDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getDetalleCarritoFromRemote(): Observable<DetalleCarrito[]>{
    return this.api.get<DetalleCarrito[]>("https://localhost:7200/api/DetalleCarrito").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

editDetalleCarrito(detalleCarrito: DetalleCarrito): Observable<DetalleCarrito> {
  const editUrl = `https://localhost:7200/api/DetalleCarrito/${detalleCarrito.id}`;
  console.log('Edit URL:', editUrl);
  console.log('detalleCarrito image:', detalleCarrito.id);
  return this.api.put<DetalleCarrito>(editUrl, detalleCarrito).pipe(
    catchError((error: any) => {
      console.error('An error occurred while editing DetalleCarrito:', error);
      return throwError(error);
    })
  );
}

addDetalleCarrito(detalleCarrito: DetalleCarrito): Observable<DetalleCarrito> {
  const addUrl = `https://localhost:7200/api/DetalleCarrito`; // Cambiar la URL si es necesario
  return this.api.post<DetalleCarrito>(addUrl, detalleCarrito).pipe(
    catchError((error: any) => {
      console.error('An error occurred while adding DetalleCarrito:', error);
      console.error('Error Message:', error.message);
      console.error('Error Status:', error.status);
      return throwError(error);
    })
  );
}

deleteDetalleCarrito(detalleCarritoId: number): Observable<void> {
  const deleteUrl = `https://localhost:7200/api/DetalleCarrito/${detalleCarritoId}`;
  return this.api.delete<void>(deleteUrl).pipe(
    catchError((error: any) => {
      console.error('An error occurred while deleting detalleCarrito:', error);
      return throwError(error);
    })
  );
}

updateDetalleCarritosData(detalleCarritos: DetalleCarrito[]) {
  this.detalleCarritoDataSubject.next(detalleCarritos);
}


}