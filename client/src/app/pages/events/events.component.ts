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
      console.log(res);
      this.userEvents = res;
      this.loading = false;
      console.log(this.userEvents);
    });
  }
}
