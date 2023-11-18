import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() event: any;
  @Input() userEvents: boolean;
  user: any;

  constructor(private api: ApiService, private router: Router, private dialog: MatDialog){
    this.user = JSON.parse(localStorage.getItem('user')!);
  }


  handleDelete(id: string){
    console.log('delete');
    this.api.deleteEvent(id).subscribe((res: any) => {
    
    this.api.mySubject.next(true);
    },(error)=>{
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
