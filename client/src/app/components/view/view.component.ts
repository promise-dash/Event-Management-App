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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {}

  ngOnInit(): void {
    this.api.fetchEventById(this.data.eventId).subscribe(res => {
      res.attendees.map((userId: string) => {
        this.api.fetchUserById(userId).subscribe(res => {
          this.attendees.push(res);
        });
      });
    });
  }
}
