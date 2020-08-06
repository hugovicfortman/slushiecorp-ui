import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'slushiecorp-ui';

  constructor(public signalRService: SignalRService, private notificationService: NotificationService, private http: HttpClient) { }
 
  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addStatsUpdatedListener();      // Triggers when stats are updated
    this.signalRService.addCustomersUpdatedListener();  // Triggers when customers are updated
    this.signalRService.addOrdersUpdatedListener();     // Triggers when orders are updated
    this.notificationService.popup("Application Started");
  }
 
}
