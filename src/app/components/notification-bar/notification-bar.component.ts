import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  notifications: Notification[];
  
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notifications = this.notificationService.notifications;
  }

}
