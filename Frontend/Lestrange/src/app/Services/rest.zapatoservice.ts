import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Zapato } from '../Models/zapato.interface';

@Injectable({
  providedIn: 'root'
})
export class ZapatoRestService {

  constructor(public api: HttpClient) { }

  getZapatosFromRemote(): Observable<Zapato[]>{
    return this.api.get<Zapato[]>("https://localhost:7200/api/Zapato").pipe(
      catchError((error: any) => {
        console.error('An error occurred while fetching data:', error);
        return throwError(error);
      })
    );
  }
}
