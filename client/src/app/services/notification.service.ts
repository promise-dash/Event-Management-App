import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  oldEvents: Array<any> = [];
  newEvents: Array<any> = [];

  constructor(private api: ApiService) {

    this.api.fetchEvents().subscribe((response) => {
      
      this.oldEvents = response
    })

    setInterval(() => {
      
      this.api.fetchEvents().subscribe((response:any) => {
        this.newEvents=this.getNewEvents(response);
        console.log(this.newEvents);
      });
    }, 60000);

  }


  getNewEvents(response: any[]) {
    
    let currentNewEvents = response.filter((currentResponse: any) => {
      let isPresent=false;
      for(let oldEvent of this.oldEvents)
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
