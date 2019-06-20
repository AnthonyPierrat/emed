import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getTransactionByPublicKey(pbk: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/transactions/${pbk}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message);
  };
}
