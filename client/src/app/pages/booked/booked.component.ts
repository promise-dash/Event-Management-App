import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit  {

  bookedEvents: Array<Event> = [];
  loading: boolean = true;

  constructor(private api: ApiService, private activeRoute: ActivatedRoute){
    this.api.fetchEvents()
    .subscribe((res: any[]) => {
      console.log(res);
      this.bookedEvents = res.filter(event => event.attendees.includes(this.activeRoute.snapshot.params['userId']));
      this.loading = false;
      console.log(this.bookedEvents);
    });
  }

  ngOnInit(): void {
    // this.api.fetchEvents()
    // .subscribe((res: any[]) => {
    //   console.log(res);
    //   this.bookedEvents = res.filter(event => event.attendees.includes(this.activeRoute.snapshot.params['userId']));
    //   this.loading = false;
    //   console.log(this.bookedEvents);
    // });
  }
}
