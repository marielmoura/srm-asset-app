import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = "http://localhost:8080/api/srmasset";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(apiUrl + "/customers")
      .pipe(
        tap(heroes => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getRisks(): Observable<string[]> {
    return this.http.get<[]>(apiUrl + "/risks")
      .pipe(
        tap(heroes => console.log('fetched risks')),
        catchError(this.handleError('getRisks', []))
      );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(apiUrl + "/customers", customer, httpOptions).pipe(
      tap((customer: Customer) => console.log(`added customer w/ id=${customer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  deleteCustomer(id: string): Observable<Customer> {
    const url = `${apiUrl + "/customers"}/${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
