import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Array<any> = [];
  loading: boolean = true;

  searchForm: FormGroup;
  searchedEvents: Array<any> = [];

  filteredEvents = this.events;

  locationFilter = 'all';
  priceFilter = { min: 0, max: 100, value: 50 };
  dateFilter = '';

  constructor(private api: ApiService, private fb: FormBuilder){
    console.log(this.filteredEvents);

    this.searchForm = this.fb.group({
      searchTerm: ''
    });
  }
  
  ngOnInit(): void {

    console.log("Inside init");
    
    this.api.fetchEvents().subscribe((res: any) => {
      console.log("Inside fetch");
      console.log(res);
      this.events = res;
      this.filteredEvents = res;
      this.loading = false;
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.filteredEvents = this.events.filter((event: any) =>
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
      
      if (this.dateFilter && event.date !== this.dateFilter) {
        return false;
      }
      
      return true;
    });
  }
}
