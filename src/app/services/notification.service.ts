import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  notifications: Notification[] = [];

  popup(msg: string): void
  {
    this.push({
      retentive : false,
      message : msg
    });
  }
  notify(msg: string): void
  {
    this.push({
      retentive : true,
      message: msg
    });
  }
  private push(notification: Notification): void
  {
    this.notifications.push(notification);
  }
}
