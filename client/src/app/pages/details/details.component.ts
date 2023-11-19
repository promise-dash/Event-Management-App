import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import emailjs from '@emailjs/browser';
// import * as nodemailer from 'nodemailer';

declare var Razorpay: any;

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
          console.log('dismissed')
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

  // sendEmail() {
  //   const message = `Your booking is confirmed for ${this.event.eventName}`;

  //   let transporter: nodemailer.Transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'promisedash79@gmail.com',
  //       pass: 'pd20010716.'
  //     }
  //   });

  //   let mailOptions: nodemailer.SendMailOptions = {
  //     from: 'YOUR_EMAIL',
  //     to: this.user.email,
  //     subject: 'Booking Confirmation',
  //     text: message
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //   });
  // }

    
}
