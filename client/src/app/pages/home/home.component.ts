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

  constructor(private api: ApiService, private fb: FormBuilder){
    this.searchForm = this.fb.group({
      searchTerm: ''
    });
  }
  
  ngOnInit(): void {

    this.api.fetchEvents().subscribe((res: any) => {
      this.events = res;
      this.searchedEvents = res;
      this.loading = false;
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.searchedEvents = this.events.filter((event: any) =>
        event.eventName.toLowerCase().includes(value.searchTerm.toLowerCase())
      );
    });
  }

}
