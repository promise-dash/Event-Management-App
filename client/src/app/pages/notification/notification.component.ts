import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  notifiedEvents: Array<any> = [];
  loading: boolean = true;
  constructor(private notifictaionService: NotificationService){
    this.notifiedEvents = notifictaionService.newEvents;
    this.loading = false;
  }

}
