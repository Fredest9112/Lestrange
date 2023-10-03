import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pago } from '../Models/pago.interface';

@Injectable({
  providedIn: 'root'
})
export class pago {

  constructor(public api: HttpClient) { }

  getPagoFromRemote(): Observable<Pago[]>{
    return this.api.get<Pago[]>("https://localhost:7200/api/Pago").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}