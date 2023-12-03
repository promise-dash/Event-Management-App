import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { Event } from 'src/app/models/Event';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

declare let Razorpay: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  event: Event;
  user: User;
  loading = true;
  currentDate: Date = new Date();
  
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router,  private dialog: MatDialog){}

  ngOnInit(): void {
    this.user = this.api.user;
    
    this.currentDate.setHours(0, 0, 0, 0);
    
    this.fetchEventDetails();
  }

  isEventExpired(): boolean {
    const eventDate = Date.parse(this.event.dateOfEvent);
    const currentDateTimestamp = this.currentDate.getTime();
    return eventDate < currentDateTimestamp;
  }

  fetchEventDetails(): void{
    const id = this.route.snapshot.params['id'];
    this.api.fetchEventById(id).subscribe(res => {
      this.event = res;
      this.loading = false;
    });
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
          return;
        }
      },

      handler: () => {
        this.router.navigate(["/"]);
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

  openFeedbackForm(eventId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { eventId };
    const dialogRef=this.dialog.open(FeedbackComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.fetchEventDetails();
    })
  }
    
}
