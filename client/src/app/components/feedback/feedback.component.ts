import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  reviewForm: FormGroup;
  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialog: MatDialog, private api: ApiService){
    this.reviewForm = this.fb.group({
      review: '',
    });

    this.user = api.user;
  }

  submitReview(){
    const feedback = {
      userId: this.user.id,
      review: this.reviewForm.value.review,
      reply: ""
    }
    this.api.giveFeedback(this.data.eventId, feedback).subscribe(() => {
      this.dialog.closeAll();
      // alert('Thanks for your feedback');
    });
  }
}
