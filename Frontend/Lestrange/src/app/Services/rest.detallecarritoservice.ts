import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DetalleCarrito } from '../Models/detallecarrito.interface';

@Injectable({
  providedIn: 'root'
})

export class DetalleCarritoRestService {

  constructor(public api: HttpClient) { }

  getDetalleCarritoFromRemote(): Observable<DetalleCarrito[]>{
    return this.api.get<DetalleCarrito[]>("https://localhost:7200/api/Detallecarrito").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}