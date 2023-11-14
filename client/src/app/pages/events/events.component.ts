import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  userEvents: Array<any> = [];
  loading: boolean = true;

  constructor(private api: ApiService, private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.api.fetchEventsOfUser(this.activeRoute.snapshot.params['id']).subscribe((res: any) => {
      console.log(res);
      this.userEvents = res;
      this.loading = false;
      console.log(this.userEvents);
    });
  }
}
