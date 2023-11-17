import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  event: any;
  user: any;
  loading: boolean = true;
  
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router){
    this.user = api.user;
    let id = route.snapshot.params['id'];
    this.api.fetchEventById(id).subscribe((res: any) => {
      this.event = res;
      this.loading = false;
    })
  }

  bookEvent(){
    this.api.bookAnEvent(this.event.id).subscribe((res: any) => {
      console.log(res);
      // this.sendConfirmation();
      alert('You have succeesfully booked the event');
      this.router.navigate(['/']);
    });
  }

  async sendConfirmation(){
    emailjs.init('YHVQurT2eDVsLtv9w');
    let response = await emailjs.send("service_zhyaqqn","template_ipwr69b",{
      from_name: "EventBee",
      to_name: this.user.name,
      subject: "Event Booking Confirmation",
      message: `You have successfully booked the event: ${this.event.eventName}`,
      });
    }
}
