import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NotificationService } from 'src/app/services/notification.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Array<Event> = [];
  loading = true;

  searchForm: FormGroup;
  searchedEvents: Array<Event> = [];

  filteredEvents = this.events;

  locationFilter = 'all';
  priceFilter = { min: 0, max: 100, value: 50 };
  dateFilter = '';

  theme = '';

  notifiedEvents: Array<Event> = [];

  constructor(private api: ApiService, private fb: FormBuilder,) {
    this.searchForm = this.fb.group({
      searchTerm: ''
    });
    // this.notifiedEvents = notificationService.newEvents;
  }

  ngOnInit(): void {
    this.api.getUserFromLocalStorage();

    this.api.fetchEvents().subscribe((res: Event[]) => {
      this.events = res;
      this.filteredEvents = res;
      this.loading = false;
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.filteredEvents = this.events.filter((event: Event) =>
        event.eventName.toLowerCase().includes(value.searchTerm.toLowerCase())
      );
    });
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      if (this.locationFilter !== 'all' && event.location !== this.locationFilter) {
        return false;
      }

      if (event.price > this.priceFilter.value) {
        return false;
      }

      if (this.dateFilter && event.dateOfEvent !== this.dateFilter) {
        return false;
      }

      return true;
    });
  }

}
