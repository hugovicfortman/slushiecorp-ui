import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr';
import { Stats } from '../models/stats.model';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection : SignalR.HubConnection;

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new SignalR.HubConnectionBuilder()
                            .withUrl(`${environment.rootUrl}slushiehub`)
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  // Observable stats source for server changes...
  public statsChangedSource = new Subject<Stats>();
  // Statistics live updates from server calls
  public addStatsUpdatedListener = () => {
    this.hubConnection.on('statsupdated', (data) => {
      let stats: Stats = data;
      this.statsChangedSource.next(stats);
    });
  }
   
  // Observable customers source for server changes...
  public customersChangedSource = new Subject<Customer>();
  // Customers live updates from server calls
  public addCustomersUpdatedListener = () => {
    this.hubConnection.on('customersupdated', (data) => {
      let customer: Customer = data;
      this.customersChangedSource.next(customer);
    });
  }

  // Observable orders source for server changes...
  public ordersChangedSource = new Subject<Order>();
  // Order live updates from server calls
  public addOrdersUpdatedListener = () => {
    this.hubConnection.on('ordersupdated', (data) => {
      let order: Order = data;
      this.ordersChangedSource.next(order);
    });
  }


}
