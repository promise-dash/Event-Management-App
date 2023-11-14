import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() event: any;
  @Input() userEvents: boolean;

  showAttendees: boolean = false;

  constructor(private api: ApiService, private router: Router){}

  handleEdit(id: string){
    console.log('edit');
  }
  handleDelete(id: string){
    console.log('delete');
    this.api.deleteEvent(id).subscribe((res: any) => {
      console.log(res);
    });
  }

  toggleAttendees(){
    this.showAttendees = !this.showAttendees;

  }

}
