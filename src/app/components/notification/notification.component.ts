import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() message: string;
  @Input() retentive: boolean;
  showing: boolean = false;
  closebutton: boolean = false;
  
  constructor() { }

  ngOnInit() {
    this.show();
  }

  show()
  {
    this.showing = true;
    if(this.retentive)
    {
      this.closebutton = true;
    }else{
      setTimeout(() => { this.close() }, 5000);
    }
  }

  close()
  {
    this.showing = false;
  }
}
