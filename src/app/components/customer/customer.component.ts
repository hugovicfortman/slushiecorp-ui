import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerStates, OrderStates } from 'src/app/enums/enums';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { NotificationService } from 'src/app/services/notification.service';

  const CustomerStateCodes = {
      "New Customer" : 0,            // First Order
      "Ordering" : 1,              // ordering
      "Drinking" : -1,            // consuming
      "Empty" : -2,                // empty
      "Supplied" : 10,             // supplied
      "Rejected" : -10             // rejected
  };

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

@Input() customer: Customer;

  constructor(private notificationService: NotificationService, private orderService: OrderService) { }

  ngOnInit() {
    const consuming = setInterval(()=> {
      this.customer.slushieLevel -= this.customer.consumptionRate;
      if(this.customer.slushieLevel <= 0)
      {
        this.customer.slushieLevel = 0;
        clearInterval(consuming);
        if(this.customer.customerState !== CustomerStates.Ordering 
            && this.customer.customerState !== CustomerStates.Rejected)
        {
          this.orderSlushie();
        }
      }
    }, 1000);
  }

  orderSlushie(): void
  {
    this.customer.customerState = CustomerStates.Ordering;
    this.orderService.createOrder({customerID : this.customer.customerID, OrderState: OrderStates.New, customer: this.customer})
      .subscribe((order: Order) => this.notificationService.popup(`${this.customer.customerName} places and order ${ order.orderID }`));
  }

  getStateFriendlyText(code: number): string
  {
    return Object.keys(CustomerStateCodes).find(k => CustomerStateCodes[k] == code);
  }

}
