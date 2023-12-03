import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { ApiService } from 'src/app/services/api.service';
import { CalendarOptions, Calendar } from "@fullcalendar/core"
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {

  bookedEvents: Array<Event> = [];
  loading = true;

  calendarOptions!: CalendarOptions;

  tempBookedEvents: Array<any> = [];

  constructor(private api: ApiService, private activeRoute: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {

    this.api.fetchEvents()
      .subscribe((res: Array<Event>) => {
        this.bookedEvents = res.filter(event => event.attendees.includes(this.activeRoute.snapshot.params['userId']));
        this.loading = false;
        console.log(this.bookedEvents);
        this.handleCalendarEvents();
      });

    // this.api.fetchEvents()
    // .subscribe((res: Array<Event>) => {
    //   this.bookedEvents = res.filter(event => event.attendees.includes(this.activeRoute.snapshot.params['userId']));
    //   this.tempBookedEvents = this.bookedEvents.map((e: any) => ({
    //     title: e.eventName,
    //     date: e.dateOfEvent,
    //     id: e.id
    //   }));
      
    //   this.calendarOptions = {
    //     initialView: 'dayGridMonth',
    //     plugins: [dayGridPlugin],
    //     events: this.tempBookedEvents,
    //     dateClick: (info) => this.handleDateClick(info),
    //     eventClick: (info) => this.handleEventClick(info)
    //   };
    //   this.loading = false;

    //   setTimeout(() => {
    //     const calendarEl = document.getElementById('calendar');
    //     if (calendarEl !== null) {
    //       const calendar = new Calendar(calendarEl, this.calendarOptions);
    //       calendar.refetchEvents();
    //     }
    //   }, 100);
    // });
  }

  handleCalendarEvents() {
    this.bookedEvents.forEach((e: any) => {
      const obj = {
        title: e.eventName,
        date: e.dateOfEvent,
        id: e.id
      };
  
      this.tempBookedEvents.push(obj);
    });
  
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: this.tempBookedEvents,
      dateClick: (info) => this.handleDateClick(info),
      eventClick: (info) => this.handleEventClick(info)
    };
  }

  handleEventClick(info: any) {
    this.router.navigate([`/details/${info.event._def.publicId}`]);
  }

  handleDateClick(arg: any) {
    console.log(arg);
  }
}
