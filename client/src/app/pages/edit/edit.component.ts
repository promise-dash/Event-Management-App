import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  event: any;

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private api: ApiService){
    let id = this.activeRoute.snapshot.params['id'];
    this.api.fetchEventById(id).subscribe((res: any) => {
      this.event = res;
      console.log(res);

      this.editForm.controls['category'].setValue(this.event.category);
      let dateOfEvent = new Date(Date.parse(this.event.dateOfEvent));

      this.editForm.patchValue({
        eventName: this.event.eventName,
        description: this.event.description,
        dateOfEvent: dateOfEvent.toISOString().split('T')[0],
        location: this.event.location,
        price: this.event.price,
        image: this.event.image
      });
    })
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      dateOfEvent: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, Validators.required],
      image: ['', Validators.required]
    });
  }

  handleEdit(){
    console.log('saved');
    console.log(this.editForm.value);

    // this.api.updateEvent(this.event.id, this.event.creator.id, this.editForm.value).subscribe((res: any)=>{
    //   console.log(res);
    // })
  }
}
