import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  handleLogin(){
    this.api.loginUser(this.loginForm.value).subscribe((res: User) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.api.isUserLoggedIn = true;
      this.router.navigate(['/']);
    })
  }
}
