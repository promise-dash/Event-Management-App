import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() event: any;
  @Input() userEvents: boolean;

  constructor(private api: ApiService, private router: Router, private dialog: MatDialog){}

  handleEdit(id: string){
    console.log('edit');
  }
  handleDelete(id: string){
    console.log('delete');
    this.api.deleteEvent(id).subscribe((res: any) => {
      console.log(res);
    });
  }

  showAttendees(eventid: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { eventId: eventid };
    this.dialog.open(ViewComponent, dialogConfig);
  }

}
