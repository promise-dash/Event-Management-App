import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { theme } from '@cloudinary/url-gen/actions/effect';
import { NotificationService } from 'src/app/services/notification.service';

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

  theme: string = '';

  notifiedEvents: Array<any> = [];

  constructor(private api: ApiService, private fb: FormBuilder, private notificationService:NotificationService){
    this.searchForm = this.fb.group({
      searchTerm: ''
    });
    this.notifiedEvents = notificationService.newEvents;
  }
  
  ngOnInit(): void {
    this.api.getUserFromLocalStorage();
    
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

  changeTheme(){
    if(this.api.theme === 'light'){
      this.api.theme = 'dark';
    }
    else{
      this.api.theme = 'light';
    }
  }
}
