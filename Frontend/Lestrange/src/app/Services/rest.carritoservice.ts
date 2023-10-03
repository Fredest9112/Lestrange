import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Carrito } from '../Models/carrito.interface';

@Injectable({
  providedIn: 'root'
})

export class CarritoRestService {

  constructor(public api: HttpClient) { }

  getCarritoFromRemote(): Observable<Carrito[]>{
    return this.api.get<Carrito[]>("https://localhost:7200/api/Carrito").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}
