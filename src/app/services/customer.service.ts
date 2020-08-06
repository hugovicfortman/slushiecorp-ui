import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignalRService } from './signalr.service';
import { NotificationService } from './notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private customersUrl = `${ environment.apiUrl }customers`;

  // Observable customers stream
  customersChanged$ = this.signalRService.customersChangedSource.asObservable();
  constructor(private http: HttpClient, private signalRService: SignalRService, private notificationService: NotificationService) { }

  getCustomers() : Observable<Customer[]>
  {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  createCustomer(customer: Customer) : Observable<Customer>
  { 
    return this.http.post(this.customersUrl, customer, httpOptions).pipe(
      tap((thisCustomer: Customer) => console.log(`created customer w/ id=${ thisCustomer.customerID }`)),
      catchError(this.handleError<Customer>('createCustomer'))
    );
  }

  
  /** PUT: update the customer on the server */
  updateCustomer (customer: Customer): Observable<any> {
    return this.http.put(`${this.customersUrl}/${customer.customerID}`, customer, httpOptions).pipe(
      tap(_ => console.log(`updated customer id=${customer.customerID}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }
  
  /** Log a CustomerService message with the NotificationService */
  private log(message: string) {
    this.notificationService.popup(`CustomerService: ${message}`);
  }
  
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}