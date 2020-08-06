import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from '../services/notification.service';
import * as Enums from '../enums/enums';
import { SignalRService } from './signalr.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl = `${ environment.apiUrl }orders`;

  // Observable orders stream
  ordersChanged$ = this.signalRService.ordersChangedSource.asObservable();
  constructor(private http: HttpClient, private signalRService: SignalRService, private notificationService: NotificationService) { }

  getOrders() : Observable<Order[]>
  {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  createOrder(order: any) : Observable<Order>
  { 
    return this.http.post<Order>(this.ordersUrl, order, httpOptions).pipe(
      tap((thisOrder: Order) => console.log(`created order w/ id=${thisOrder.orderID}`)),
      catchError(this.handleError<Order>('createOrder'))
    );
  }

  rejectOrder(order: Order): Observable<any> {
    order.orderState = Enums.OrderStates.Rejected;
    return this.updateOrder(order);
  }

  confirmOrder(order: Order): Observable<any> {
    order.orderState = Enums.OrderStates.Accepted;
    return this.updateOrder(order);
  }

  
  /** PUT: update the order on the server */
  updateOrder (order: Order): Observable<any> {
    return this.http.put(`${this.ordersUrl}/${order.orderID}`, order, httpOptions).pipe(
      tap(_ => console.log(`updated order id=${order.orderID}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }
  
  /** Log a OrderService message with the NotificationService */
  private log(message: string) {
    this.notificationService.popup(`OrderService: ${message}`);
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
