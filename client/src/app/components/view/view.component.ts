import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],

})
export class ViewComponent implements OnInit {
    
  event: Event;
  attendees: Array<User> = [];
  earnings = 0;
  loading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
  
    this.api.fetchEventById(this.data.eventId).subscribe(res => {
      this.event = res;
  
      const attendeePromises = res.attendees.map((userId: string) => {
        return this.api.fetchUserById(userId).toPromise();
      });
  
      Promise.all(attendeePromises).then((attendees: Array<any>) => {
        this.attendees = attendees;
        this.loading = false;
        this.earnings = this.event.price * this.attendees.length;
      });
    });
  }
}
