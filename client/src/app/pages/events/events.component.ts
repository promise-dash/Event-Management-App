import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  userEvents: Array<Event> = [];
  loading = true;
  total = 0;

  constructor(private api: ApiService, private activeRoute: ActivatedRoute){
    api.mySubject.subscribe(res=>{
      if(res)
      {
        this.getEvents();
      }
    })
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.api.fetchEventsOfUser(this.activeRoute.snapshot.params['id']).subscribe(res => {
      this.userEvents = res;
      this.loading = false;

      this.total = this.userEvents.reduce((acc, event) => {
        return acc + event.attendees.length * event.price;
      }, 0);
    });
  }
}
