import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { User } from 'src/app/models/User';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() event: Event;
  @Input() userEvents: boolean;
  user: User;

  constructor(private api: ApiService, private router: Router, private dialog: MatDialog){
    this.user = JSON.parse(localStorage.getItem('user') || '');
  }

  routerLink(url: string) {
    this.router.navigate([url]);
  }


  handleDelete(id: string){
    this.api.deleteEvent(id).subscribe(() => {
    
    this.api.mySubject.next(true);
    },()=>{
      this.api.mySubject.next(true);
    });
  }

  showAttendees(eventid: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { eventId: eventid };
    this.dialog.open(ViewComponent, dialogConfig);
  }

  openFeedbackForm(eventId: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { eventId:  eventId};
    this.dialog.open(FeedbackComponent, dialogConfig);
  }

}
