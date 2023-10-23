import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pago } from '../Models/pago.interface';

@Injectable({
  providedIn: 'root'
})
export class PagoRestService {

  private pagosDataSubject = new BehaviorSubject<Pago[]>([]);
  pagosData$ = this.pagosDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getPagoFromRemote(): Observable<Pago[]>{
    return this.api.get<Pago[]>("https://localhost:7200/api/Pago").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editPago(pago: Pago): Observable<Pago> {
    const editUrl = `https://localhost:7200/api/Pago/${pago.id}`;
    console.log('Edit URL:', editUrl);
    console.log('pago image:', pago.ordenVentaId);
    return this.api.put<Pago>(editUrl, pago).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing Pago:', error);
        return throwError(error);
      })
    );
  }

  addPago(pago: Pago): Observable<Pago> {
    const addUrl = `https://localhost:7200/api/Pago`;
    return this.api.post<Pago>(addUrl, pago).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding Pago:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deletePago(pagoId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/Pago/${pagoId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting Pago:', error);
        return throwError(error);
      })
    );
  }

  // New method to update pagos data
  updatePagosData(pagos: Pago[]) {
    this.pagosDataSubject.next(pagos);
  }
}