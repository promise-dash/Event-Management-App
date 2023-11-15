import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  
  eventForm: FormGroup;
  user: any;
  base64Image: string = '';
  cld: any;
  cloud_name = "de2gj6cj9";
  upload_preset = "onx9phmg";

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
      this.user = this.api.user;
      this.cld = new Cloudinary({cloud: {cloudName: 'de2gj6cj9'}});
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

      this.api.createEvent(this.eventForm.value).subscribe((res: any) => {
        console.log(res);
        this.eventForm.reset();
        this.router.navigate(['/']);
      });
    }
    else{
      alert('Fill all the fields');
    }
  }
}
