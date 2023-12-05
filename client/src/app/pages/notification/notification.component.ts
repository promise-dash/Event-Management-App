import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  notifications: string[] = [];
  subscription: Subscription;

  constructor(private notificationService: NotificationService) { }


}
