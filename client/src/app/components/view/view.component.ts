import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],

})
export class ViewComponent implements OnInit {
    
  event: any;
  attendees: Array<any> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {
    console.log('view component');
  }

  ngOnInit(): void {
    this.api.fetchEventById(this.data.eventId).subscribe((res: any) => {

      res.attendees.map((userId: any) => {
        this.api.fetchUserById(userId).subscribe((res: any) => {
          this.attendees.push(res);
        });
      });
    });
  }
}
