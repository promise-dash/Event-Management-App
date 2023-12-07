import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  user: string;
  message: string;
  messages: any[] = [];
  
  constructor(private signalRService: SignalrService) {
    this.signalRService.receiveMessage().subscribe(data => {
      this.messages.push(data);
    });
  }
  
  sendMessage(): void {
    this.signalRService.sendMessage(this.user, this.message);
    this.message = '';
  }

}