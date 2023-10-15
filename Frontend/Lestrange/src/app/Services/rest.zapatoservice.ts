import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Zapato } from '../Models/zapato.interface';

@Injectable({
  providedIn: 'root'
})
export class ZapatoRestService {

  private zapatosDataSubject = new BehaviorSubject<Zapato[]>([]);
  zapatosData$ = this.zapatosDataSubject.asObservable();

  constructor(public api: HttpClient) { }

  getZapatosFromRemote(): Observable<Zapato[]> {
    return this.api.get<Zapato[]>("https://localhost:7200/api/Zapato").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }

  editZapato(zapato: Zapato): Observable<Zapato> {
    const editUrl = `https://localhost:7200/api/Zapato/${zapato.id}`;
    console.log('Edit URL:', editUrl);
    console.log('zapato image:', zapato.imagenUrl);
    return this.api.put<Zapato>(editUrl, zapato).pipe(
      catchError((error: any) => {
        console.error('An error occurred while editing Zapato:', error);
        return throwError(error);
      })
    );
  }

  addZapato(zapato: Zapato): Observable<Zapato> {
    const addUrl = `https://localhost:7200/api/Zapato`;
    return this.api.post<Zapato>(addUrl, zapato).pipe(
      catchError((error: any) => {
        console.error('An error occurred while adding Zapato:', error);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status);
        return throwError(error);
      })
    );
  }

  deleteZapato(zapatoId: number): Observable<void> {
    const deleteUrl = `https://localhost:7200/api/Zapato/${zapatoId}`;
    return this.api.delete<void>(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred while deleting Zapato:', error);
        return throwError(error);
      })
    );
  }

  // New method to update zapatos data
  updateZapatosData(zapatos: Zapato[]) {
    this.zapatosDataSubject.next(zapatos);
  }
}
