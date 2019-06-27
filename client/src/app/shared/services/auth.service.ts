import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL = environment.AUTH_URL;

  constructor(private http: HttpClient) { }

  public signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/signup`, data).pipe(catchError(this.handleError));
  }

  public signin(data: any): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/signin`, data).pipe(catchError(this.handleError));
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
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
