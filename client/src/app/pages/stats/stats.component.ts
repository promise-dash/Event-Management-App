import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit {

  events: Array<Event> = [];
  points: { label: string, y: number }[] = [];
  attendeePoints: { label: string, y: number }[] = [];
  loading = true;
  eventChartOptions = {};
  chartOptions= {};

  constructor(private api: ApiService, private ngZone: NgZone) {}
	

  ngAfterViewInit() {
    this.api.fetchEvents().subscribe(res => {
      this.events = res;
      
      this.ngZone.run(() => {
        this.events.forEach(event => {
          this.points.push({ label: event.eventName, y: event.price });
          this.attendeePoints.push({ label: event.eventName, y: event.attendees.length });
        });

        this.loading = false;

        this.eventChartOptions = {
          title: {
            text: "Events Data"
          },
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          axisY: {
            includeZero: true,
            valueFormatString: "₹#"
          },
          data: [{
            type: "column",
            yValueFormatString: "₹#",
            color: "rgb(255, 201, 107)",
            dataPoints: [...this.points]
          }]
        }

        this.chartOptions = {
          title:{
            text: "Total Impressions by Events"
          },
          animationEnabled: true,
          axisY: {
            includeZero: true,
          },
          theme: "light2",
          exportEnabled: true,
          data: [{
            type: "bar",
            yValueFormatString: "#",
            color: "rgb(255, 201, 107)",
            dataPoints: [...this.attendeePoints]
          }]
        }
      });
    });
  }

}