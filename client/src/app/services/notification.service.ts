import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  oldEvents: Array<Event> = [];
  newEvents: Array<Event> = [];

  constructor(private api: ApiService) {

    this.api.fetchEvents().subscribe((response) => {
      
      this.oldEvents = response
    })

    setInterval(() => {
      
      this.api.fetchEvents().subscribe(response => {
        this.newEvents=this.getNewEvents(response);
        console.log(this.newEvents);
      });
    }, 2000);
  }
  // 86400000


  getNewEvents(response: Event[]) {
    
    const currentNewEvents = response.filter(currentResponse => {
      let isPresent=false;
      for(const oldEvent of this.oldEvents)
      {
        if(oldEvent.id===currentResponse.id)
        {
          isPresent=true;
        }

      }
      return !isPresent;
    })

    return currentNewEvents;
  }


}
