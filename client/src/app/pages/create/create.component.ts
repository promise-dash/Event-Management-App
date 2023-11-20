import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  eventForm: FormGroup;
  user: User;
  base64Image = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
      this.user = this.api.user;
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      dateOfEvent: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, Validators.required],
      image: ['', Validators.required]
    });
  }

  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleCreate() {
    if (this.eventForm.valid) {
      this.eventForm.value.image = this.base64Image;
      this.eventForm.value.creator = this.user;
      console.log(this.eventForm.value);

      this.api.createEvent(this.eventForm.value).subscribe(() => {
        this.eventForm.reset();
        this.router.navigate(['/']);
      });
    }
    else{
      alert('Fill all the fields');
    }
  }
}
