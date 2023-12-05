import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Event } from 'src/app/models/Event';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('showDivTransition', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('hidden <=> visible', animate('300ms ease-in-out')),
      transition('visible <=> hidden', animate('300ms ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  events: Array<Event> = [];
  loading = true;

  searchForm: FormGroup;
  searchedEvents: Array<Event> = [];

  filteredEvents = this.events;

  locationFilter = 'All';
  categoryFilter = "all";
  dateFilter = '';

  sortOrder: 'asc' | 'desc' = 'desc';
  sortOrderTitle: 'asc' | 'desc' = 'desc';
  show = false;

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
      if (this.locationFilter !== 'All' && event.location !== this.locationFilter) {
        return false;
      }

      if (this.categoryFilter !== 'all' && event.category !== this.categoryFilter) {
        return false;
      }

      return true;
    });
  }

  sortEventsByPrice() {
    if (this.sortOrder === 'asc') {
      this.filteredEvents.sort((a, b) => b.price - a.price);
      this.sortOrder = 'desc';
    } else {
      this.filteredEvents.sort((a, b) => a.price - b.price);
      this.sortOrder = 'asc';
    } 
  }

  sortEventsByTitle() {
    if (this.sortOrderTitle === 'asc') {
      this.filteredEvents.sort((a: any, b: any) => b.eventName.localeCompare(a.eventName));
      this.sortOrderTitle = 'desc';
    } else {
      this.filteredEvents.sort((a: any, b: any) => a.eventName.localeCompare(b.eventName));
      this.sortOrderTitle = 'asc';
    }
  }

  toggleFilter() {
    this.show = !this.show;
  }

}
