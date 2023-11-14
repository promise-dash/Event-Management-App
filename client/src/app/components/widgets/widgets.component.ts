import { Component } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {

  events = [
    {
      title: "1. Remote Design Sprint",
      status: "297 people going"
    },
    {
      title: "2. Design Thinking Spirits",
      status: "226 people going"
    },
    {
      title: "3. Framer Prototyping",
      status: "185 people going"
    }
  ];

}
