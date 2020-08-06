import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { OrderStates } from 'src/app/enums/enums';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService, private notificationService: NotificationService) { }

  ngOnInit() {
    // Initial orders
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);

    // Real time orders update
    this.orderService.ordersChanged$
    .subscribe((order: Order): void => {
      // Add new order to catalogue
      if(order.orderState === OrderStates.New)
      {
        this.orders.push(order);
        // log this...
        this.notificationService.popup('New order received');
      }else{
        let orderIndex: number = this.orders.findIndex(o => o.orderID === order.orderID) - 1;
        this.orders.splice(orderIndex, 1);
      }
    });
  }

}
