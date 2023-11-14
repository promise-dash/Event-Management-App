import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  event: any;
  user: any;
  
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router){
    this.user = api.user;
    let id = route.snapshot.params['id'];
    this.api.fetchEventById(id).subscribe((res: any) => {
      this.event = res;
      console.log(res);
    })
  }

  bookEvent(){
    this.api.bookAnEvent(this.event.id).subscribe((res: any) => {
      console.log(res);
    });
    alert('You have succeesfully booked the event');
    this.router.navigate(['/']);
  }

}
