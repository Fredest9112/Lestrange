
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { DetalleOrden } from '../Models/detalleOrden.interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleOrdenRestService {

  private detalleOrdenesDataSubject = new BehaviorSubject<DetalleOrden[]>([]);
  detalleOrdenesData$ = this.detalleOrdenesDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getDetalleOrdenFromRemote(): Observable<DetalleOrden[]>{
    return this.api.get<DetalleOrden[]>("https://localhost:7200/api/DetalleOrden").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editDetalleOrden(detalleOrden: DetalleOrden): Observable<DetalleOrden> {
    const editUrl = `https://localhost:7200/api/DetalleOrden/${detalleOrden.id}`;
    console.log('Edit URL:', editUrl);
    console.log('detalleOrden image:', detalleOrden.ordenVentaId);
    return this.api.put<DetalleOrden>(editUrl, detalleOrden).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing DetalleOrden:', error);
        return throwError(error);
      })
    );
  }

  addDetalleOrden(detalleOrden: DetalleOrden): Observable<DetalleOrden> {
    const addUrl = `https://localhost:7200/api/DetalleOrden`;
    return this.api.post<DetalleOrden>(addUrl, detalleOrden).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding DetalleOrden:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deleteDetalleOrden(detalleOrdenId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/DetalleOrden/${detalleOrdenId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting DetalleOrden:', error);
        return throwError(error);
      })
    );
  }

  // New method to update detalle de orden data
  updatedetalleOrdenesData(detalleOrdenes: DetalleOrden[]) {
    this.detalleOrdenesDataSubject.next(detalleOrdenes);
  }
}