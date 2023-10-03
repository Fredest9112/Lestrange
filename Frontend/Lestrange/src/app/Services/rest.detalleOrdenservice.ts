import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DetalleOrden } from '../Models/detalleOrden.interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenRestService {

  constructor(public api: HttpClient) { }

  getDetalleOrdenFromRemote(): Observable<DetalleOrden[]>{
    return this.api.get<DetalleOrden[]>("https://localhost:7200/api/DetalleOrden").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}
