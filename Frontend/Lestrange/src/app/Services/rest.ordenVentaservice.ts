import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { OrdenVenta } from '../Models/ordenVenta.interface';

@Injectable({
  providedIn: 'root'
})
export class ordenVentaservice {

  constructor(public api: HttpClient) { }

  getOrdenVentaFromRemote(): Observable<OrdenVenta[]>{
    return this.api.get<OrdenVenta[]>("https://localhost:7200/api/OrdenVenta").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}
