import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users : Array<any> = [];

    constructor(private api: ApiService, private dialog: MatDialog){}

    ngOnInit(): void {
      this.api.fetchAllUsers().subscribe((res) => {
        this.users = res;
      })
    }

    deleteUser(id: string){
      this.users=this.users.filter((u)=>u.id!=id);
      this.api.deleteUser(id).subscribe(res => {
        console.log(res);
      },(error)=>{})
    }
}
