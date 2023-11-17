import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrdenVenta } from '../Models/ordenVenta.interface';

@Injectable({
  providedIn: 'root'
})
export class ordenVentaservice {

  private ordenVentasDataSubject = new BehaviorSubject<OrdenVenta[]>([]);
  ordenVentasData$ = this.ordenVentasDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getOrdenVentaFromRemote(): Observable<OrdenVenta[]>{
    return this.api.get<OrdenVenta[]>("https://localhost:7200/api/OrdenVenta").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editOrdenVenta(ordenVenta: OrdenVenta): Observable<OrdenVenta> {
    const editUrl = `https://localhost:7200/api/OrdenVenta/${ordenVenta.id}`;
    console.log('Edit URL:', editUrl);
    console.log('ordenVenta image:', ordenVenta.usuarioId);
    return this.api.put<OrdenVenta>(editUrl, ordenVenta).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing OrdenVenta:', error);
        return throwError(error);
      })
    );
  }

  addOrdenVenta(ordenVenta: OrdenVenta): Observable<OrdenVenta> {
    const addUrl = `https://localhost:7200/api/OrdenVenta`;
    return this.api.post<OrdenVenta>(addUrl, ordenVenta).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding OrdenVenta:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deleteOrdenVenta(ordenVentaId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/OrdenVenta/${ordenVentaId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting OrdenVenta:', error);
        return throwError(error);
      })
    );
  }

  // New method to update ordenVentas data
  updateOrdenVentasData(ordenVentas: OrdenVenta[]) {
    this.ordenVentasDataSubject.next(ordenVentas);
  }
}