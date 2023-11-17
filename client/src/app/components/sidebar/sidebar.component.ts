import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  user: any

  constructor(private api: ApiService, private router: Router){
    this.api.getUserFromLocalStorage();
  } 

  ngOnInit(){
    this.user = this.api.user;
  }

  

  handleLogout(){
    localStorage.removeItem('user');
    this.api.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
