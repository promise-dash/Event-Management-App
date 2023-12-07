import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
// import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

declare let Razorpay: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild('mapframe') mapframe: ElementRef;

  event: Event;
  user: User;
  loading = true;
  currentDate: Date = new Date();

  myApiKey="AIzaSyBn7BVjWnfIFzkrvqKrzIk0mQvsr3HDHCo";

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private notificationService: NotificationService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user = this.api.user;

    this.currentDate.setHours(0, 0, 0, 0);

    this.fetchEventDetails();
  }

  getMapUrl(location: string) {
    // const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${this.myApiKey}&q=${encodeURIComponent(location)}`;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }


  isEventExpired(): boolean {
    const eventDate = Date.parse(this.event.dateOfEvent);
    const currentDateTimestamp = this.currentDate.getTime();
    return eventDate < currentDateTimestamp;
  }

  fetchEventDetails(): void {
    const id = this.route.snapshot.params['id'];
    this.api.fetchEventById(id).subscribe(res => {
      this.event = res;
      this.loading = false;
    });
  }

  bookEvent() {
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
        ondismiss: () => {
          console.log('dismissed');
          return;
        }
      },

      handler: () => {
        this.sendEmail();
        this.router.navigate(["/"]);
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }

  openFeedbackForm(eventId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { eventId };
    const dialogRef = this.dialog.open(FeedbackComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchEventDetails();
    })
  }

  sendEmail() {
    const to = this.user.email;
    const subject = 'Event Booking Confirmation';
    const content = `
    <p>Dear ${this.user.name},</p>
    <p>Thank you for booking our event:</p>
    <div style="margin-left:30px">
      <h3>${this.event.eventName}</h3>
      <p>Date: ${this.event.dateOfEvent}</p>
      <p>Time: ${this.event.time}</p>
      <p>Location: ${this.event.location}</p>
    </div>
    <p>We look forward to seeing you!</p>
  `;
    this.notificationService.sendEmail(to, subject, content)
      .then(response => console.log(response))
      .catch(error => console.error('Error sending email:', error));
  }

}
