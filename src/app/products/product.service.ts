import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errMsg = '';
    if (err.error instanceof ErrorEvent) {
      errMsg = `An error occurred: ${err.error.message}`;
    } else {
      errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errMsg);
    return throwError(errMsg);
  }
}
