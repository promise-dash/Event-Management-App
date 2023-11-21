import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

declare let Razorpay: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  event: Event;
  user: User;
  loading = true;
  
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router){
    this.user = api.user;
    const id = route.snapshot.params['id'];
    this.api.fetchEventById(id).subscribe(res => {
      this.event = res;
      this.loading = false;
    })
  }

  bookEvent(){
    this.api.bookAnEvent(this.event.id).subscribe(() => {
      this.payNow();
    });
  }

  //payment integration
  payNow() {
    const RozarpayOptions = {
      description: 'Razorpay',
      currency: 'INR',
      amount: this.event.price * 100,
      name: this.user.name,
      key: 'rzp_test_4XKIJkM8kdRhHp',
      image: 'https://avatars.githubusercontent.com/u/7713209?s=280&v=4',
      prefill: {
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone
      },
      theme: {
        color: '#FFA927'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed');
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback);
  }
    
}
