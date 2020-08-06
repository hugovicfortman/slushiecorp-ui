import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() order: Order;

  constructor(private orderService: OrderService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  confirmTicket()
  {
    this.orderService
    .confirmOrder(this.order)
    .subscribe(() => this.notificationService.popup(`Ticket ${ this.order.orderID } Confirmed.`));
  }

  rejectTicket()
  {
    this.orderService
    .rejectOrder(this.order)
    .subscribe(() => this.notificationService.popup(`Ticket ${ this.order.orderID } Rejected.`));
  }
}
