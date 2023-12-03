import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog ,MatDialogRef} from '@angular/material/dialog';
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
  disabled = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { eventId: string }, private fb: FormBuilder, private dialog: MatDialog, private api: ApiService,private dialogRef:MatDialogRef<FeedbackComponent>) {
    this.reviewForm = this.fb.group({
      review: ['', Validators.minLength(1)],
    });

    this.user = api.user;
  }

  submitReview() {
    const feedback = {
      userId: this.user.id,
      review: this.reviewForm.value.review,
      reply: ""
    }
    this.api.giveFeedback(this.data.eventId, feedback).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
